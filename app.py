# from re import L
# from flask import Flask, request, render_template, flash, redirect, render_template, jsonify, session, g

# from forms import RegisterForm, LoginForm, SearchForm
# from api_calls import api_call, cat_calls
from sent_analysis import polarize

# import psycopg2
# import datetime as dt
# import requests
# from dateutil import parser

# # from flask_debugtoolbar import DebugToolbarExtension 
# from flask_bcrypt import Bcrypt

# bcrypt = Bcrypt()
from flask import Flask, jsonify, request
import json
from models import connect_db, db, Song, Artist
from api import serialize_artist, serialize_song
from math_helpers import Math
math = Math()
from lyricsgenius import Genius
from types import SimpleNamespace


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
#modify our genius object with params to narrow down search results
genius.excluded_terms = ["(Remix)", "(Live)"]
genius.skip_non_songs = True
genius.remove_section_headers = True

db.drop_all()
db.create_all()



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
    print('artistdata', data)
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
    

@app.route("/")
def home():

    return "hello"



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


# test = download_artist("Nirvana", 3)
# n = Artist.query.get(test)
# print(n.pol_score)




# artist = genius.search_artist('Eminem', max_songs=1)
# page = 1
# songs = []
# while page:
#     request = genius.artist_songs(artist.id,
#                                   sort='popularity',
#                                   per_page=50,
#                                   page=page,
#                                   )
#     songs.extend(request['songs'])
#     page = request['next_page']
# song= genius.search_song(songs[0]['title'], artist.name)
# values = song.to_dict()
# print(values['stats'])


# Genius.artist_songs(artist_id, per_page=None, page=None, sort='title')
# Gets artist’s songs.

# Parameters
# artist_id (int) – Genius artist ID

# sort (str, optional) – Sorting preference. Either based on ‘title’, ‘popularity’ or ‘release_date’.

# per_page (int, optional) – Number of results to return per request. It can’t be more than 50.

# page (int, optional) – Paginated offset (number of the page).

# Returns
# dict

#https://lyricsgenius.readthedocs.io/en/master/reference/genius.html
# https://lyricsgenius.readthedocs.io/en/master/reference/types.html
