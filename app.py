"""General imports"""
from flask import Flask, jsonify, request, render_template
import json
from lyricsgenius import Genius
from types import SimpleNamespace
# from flask_debugtoolbar import DebugToolbarExtension 

"""Imports from our own costum modules"""
from sent_analysis import polarize
from models import connect_db, db, Song, Artist
from api import serialize_artist, serialize_song
from math_helpers import Math
math = Math()

"""Data imports"""
from wordcloud import WordCloud, STOPWORDS
stopwords = STOPWORDS
wc= WordCloud(stopwords=stopwords, background_color="white")
from matplotlib import pyplot as plt
plt.switch_backend('Agg')
plt.style.use("fivethirtyeight")
import numpy as np
import io
import sys, os
os.chdir(sys.path[0])
import base64

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///lyrics'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "topsecret1"
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app)

connect_db(app)

db.create_all()

genius = Genius('aPt0Y03tHHx7XAVyDWcJUzgaR7qBN5_D1-Dg_s-BBgTO8ifIJUB0toLzQ0P2YKCF')
#modifies our genius object with params to narrow down search results
genius.excluded_terms = ["(Remix)", "(Live)"]
genius.skip_non_songs = True
genius.remove_section_headers = True

# db.drop_all()
# db.create_all()

def download_artist(name, quantity = 0):
    # quantity refers to number of songs returned with artist in artist.songs

    # if searching an artist tends to be problematic, it might be worth trying to change the  "allow_name_change" 
    # default parameter to 'true'. From docs allow_name_change (bool, optional) – If True, search attempts to switch
    # to intended artist name.
    # Edit: This might already be set to true? When searching Santana, automatically changes artist name to 'Juelz Santana'

    artist = genius.search_artist(name, max_songs=quantity, sort="popularity")
    # in /Desktop/repos-git/lyrics_savant/venv/lib/python3.9/site-packages/lyricsgenius/api/base.py:84, I've set a 'break' before the 
    # timeout error to ensure that a timeout for a single song doesn't halt the entire search. It seems like this simply lets said song 
    # be skipped in favor of the next one (due to the request taking too much time)
    # make sure this is working like i think it is

    #save artist to our database extracting the information that we want from lyricsgenius API
    res = genius.artist(artist.id)
    data = res['artist']
    artist_name = data['name']
    bio = data['description']['plain']
    image = data['image_url']
    # our Artist sqlalchemy object is assigned the same ID given to us by lyricsgenius api for convenience
    our_artist = Artist(id = artist.id, name = artist_name, bio = bio, image = image)
    db.session.add(our_artist)
    db.session.commit()

    if artist.songs:
        # our lyricsgenius artist object may or may not return songs depending on the second arg of our find_artist function
        # if songs are indeed present, we call save_lyrics, which saves each song to our db
        songs = save_lyrics(artist)
        pol_score = math.avg_pol(songs)
        print("pol score from download function", pol_score)
        our_artist.pol_score = pol_score
        db.session.commit()
    
    return artist.id

def save_lyrics(artist):
    """Retrieves lyrics, runs SA on each song, saves song to database along with SA scores"""
    songs = []
    for song in artist.songs:
        try:
            res = genius.song(song.id)
            data = res['song']
            title = data['title']
            release_date = data['release_date']
            image = data['song_art_image_thumbnail_url']
            song_id = data['id']
            url = data['url']
            #lyrics can be retrieved by either genius.lyrics(song_url=url) or genius.lyrics(song_id)
            #however, is seems like the latter requires a second request, causing it to be slower
            lyrics = genius.lyrics(song_url=url)
            score = polarize(lyrics)
            our_song = Song(id = song_id, title=title, image=image, release_date=release_date,
                        lyrics=lyrics, artist_id = artist.id, score=score)
            songs.append(our_song)
            db.session.add(our_song)
            db.session.commit()
        except:
            print(f"problem adding song with id {song.id}")
        finally:
            pass
    
    return songs
    
def get_wordcloud(text):
    image = wc.generate(text).to_image()
    img = io.BytesIO()
    image.save(img, "PNG")
    img.seek(0)
    img_b64 = base64.b64encode(img.getvalue()).decode()
    # source: https://www.codementor.io/@garethdwyer/building-news-word-clouds-using-python-and-repl-it-sy7l88roq
    return img_b64

def save_plt_png(plt):
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    image = base64.b64encode(img.getvalue()).decode()
    plt.clf()
    return image

def get_unique_words_bar(artist_id1, artist_id2):
    # reference https://www.youtube.com/watch?v=nKxLfUrkLE8&t=42s
    artist1 = Artist.query.get(artist_id1)
    artist2 = Artist.query.get(artist_id2)
   
    lyrics1 = set(generate_composite(artist_id1).split())
    lyrics2 = set(generate_composite(artist_id2).split())
    print('hmmmm', lyrics1)
    dummy1 = len(lyrics1) # number of unique words
    dummy2 = len(lyrics2) 

    artists_x = [artist1.name, artist2.name]
    words_y = [dummy1, dummy2]
    plt.bar(artists_x, words_y)
  
    plt.title("Which artist has a larger vocabulary?")
    plt.xlabel("Artists")
    plt.ylabel("Unique words")
    plt.tight_layout() #tutorial said helps with padding, may want to use later

    image = save_plt_png(plt)
    return image

def get_pol_bar(artist_id1, artist_id2):
    artist1 = Artist.query.get(artist_id1)
    artist2 = Artist.query.get(artist_id2)
   
    pol1 = artist1.pol_score
    pol2 = artist2.pol_score

    data1 = json.loads(pol1, object_hook=lambda d: SimpleNamespace(**d))
    data2 = json.loads(pol2, object_hook=lambda d: SimpleNamespace(**d))

    simplified1 = data1.data
    simplified2 = data2.data

    pos1 = simplified1.poss_avg
    neg1 = simplified1.negs_avg
    neu1 = simplified1.neus_avg
    pol1_list = [pos1, neg1, neu1]

    pos2 = simplified2.poss_avg
    neg2 = simplified2.negs_avg
    neu2 = simplified2.neus_avg
    pol2_list = [pos2, neg2, neu2]

    pols_x = ["Positive", "Neutral", "Negative"]
    x_indexes = np.arange(len(pols_x))
    width = 0.1

    plt.bar(x_indexes, pol1_list, width = width, label = artist1.name)
    plt.bar(x_indexes + width, pol2_list, width = width, label = artist2.name)
    plt.legend()
    plt.xticks(ticks = x_indexes, labels = pols_x)
    plt.title("Polarity Data")
    plt.xlabel("Polarity")
    plt.ylabel("Scores")
    plt.tight_layout() 

    image = save_plt_png(plt)
    return image

def get_pie(artist_id):
    labels = ["Positive", "Neutral", "Negative"]
    colors = ['#6d904f', '#e5ae37', '#fc4f30']   # green, yellow, red
    artist = Artist.query.get(artist_id)
    pol = artist.pol_score
    data = json.loads(pol, object_hook=lambda d: SimpleNamespace(**d))
    simplified = data.data
    pos = simplified.poss_avg
    neg = simplified.negs_avg
    neu = simplified.neus_avg
    values = [pos, neg, neu]
    plt.pie(values, labels = labels, wedgeprops={'edgecolor':'black'}, colors = colors)
    plt.title("Polarity")
    plt.tight_layout()

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    image = base64.b64encode(img.getvalue()).decode()
    plt.clf()
    return image


def generate_composite(artist_id):
    """Sums the entirety of an artist's lyrics to a single string to be used to generate data"""
    # This functionality is neccesary because visual data libraries in python tend to accept a single input of text
    # rather than saving every single song's lyrics to our artist object in our db, we'd prefer to generate this text 
    # in a single calculation in the moment we call it. This saves memory and lets us add and remove songs/lyrics from 
    # an artist without having to update a composite string saved to the artist sqalchemy object each time

    artist = Artist.query.get(artist_id)
    comp = ""
    for song in artist.songs:
        comp += song.lyrics

    return comp

@app.route("/")
def home():
    """WordCloud"""
    artist1 = Artist.query.get(604).id
    artist2 = Artist.query.get(9534).id
    lyrics = generate_composite(artist1)
    wc_img = get_wordcloud(lyrics)

    """Pie Chart"""
    pie_img = get_pie(artist1)

    """Unique Words Bar Chart"""
    bar_img = get_unique_words_bar(artist1, artist2)
  
    """Polarity Bar Chart"""
    pol_img = get_pol_bar(artist1, artist2)

    return render_template('home.html', wc_img = wc_img, pie_img = pie_img, bar_img = bar_img, pol_img = pol_img)

@app.route("/api/artists/")
def get_all_artists():
    """Return JSON for all artists in database"""
    artists = Artist.query.all()
    serialized = [serialize_artist(a) for a in artists]
    return jsonify(artists=serialized)

@app.route("/api/artists/<int:id>")
def get_artist(id):
    """Return JSON for a specific artist in database"""
    artist = Artist.query.get(id)
    serialized = serialize_artist(artist)
    return jsonify(artists=serialized)

@app.route("/api/artists/<int:id>/songs")
def get_songs_by_artist(id):
    artist = Artist.query.get(id)
    serialized = [serialize_artist(song) for song in artist.songs]
    return jsonify(songs=serialized)

@app.route("/api/artists/<int:artist_id>/<int:song_id>")
def get_song_by_artist(artist_id, song_id):
    artist = Artist.query.get(artist_id)
    print(artist)
    song = Song.query.get(song_id)
    serialized = serialize_song(song)
    return jsonify(songs=serialized)

@app.route("/api/artists/", methods=["POST"])
def add_artist():
    name = request.json["name"]
    quantity = request.json["quantity"]
    our_artist = download_artist(name, quantity)
    response = jsonify(serialize_artist(our_artist))
    return (response, 201)


#https://lyricsgenius.readthedocs.io/en/master/reference/genius.html
# https://lyricsgenius.readthedocs.io/en/master/reference/types.html
