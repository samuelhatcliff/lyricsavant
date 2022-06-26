"""General Imports"""
from flask import Flask, jsonify, request, render_template
from lyricsgenius import Genius
from lyrics_api import download_artist

"""Imports from our own costum modules"""
from models import connect_db, db, Song, Artist, Artist_Incomplete, Message
from api import serialize_artist_data, serialize_artist_names, serialize_song
from math_helpers import Math
from python_data_visuals import Python_Data_Visuals
from lyrics_api import download_artist
from db_maintenance import check_songs, delete_artists
pd = Python_Data_Visuals()
math = Math()


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///lyrics-db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "topsecret1"
# from flask_debugtoolbar import DebugToolbarExtension 
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app)

connect_db(app)

db.create_all()

genius = Genius('aPt0Y03tHHx7XAVyDWcJUzgaR7qBN5_D1-Dg_s-BBgTO8ifIJUB0toLzQ0P2YKCF')
#modifies our genius object with params to narrow down search results
genius.excluded_terms = ["(Remix)", "(Live)"]
genius.skip_non_songs = True
genius.remove_section_headers = True
genius.retries = 1

completed = []
failed = []

# check_songs()
@app.route("/test")
def test():
    # artist1 = Artist.query.get(20710) #a7x
    # artist2 = Artist.query.get(17912) #evanescence
    # test = download_artist("fasdfasdfasdfasdfa", 1)
    # print(test)
    return render_template('home.html')

@app.route("/python/results")
def results():
    id1 = request.args["id1"]
    id2 = request.args["id2"]

    """WordCloud"""
    lyrics = math.generate_composite(id1)
    wc_img = pd.get_wordcloud(lyrics)

    """Pie Chart"""
    pie_img = pd.get_pie(id1)

    """Unique Words Bar Chart"""
    bar_img = pd.get_unique_words_bar(id1, id2)
  
    """Polarity Bar Chart"""
    pol_img = pd.get_pol_bar(id1, id2)

    return render_template('results.html', wc_img = wc_img, pie_img=pie_img, bar_img=bar_img, pol_img=pol_img)

"""RESTFUL API"""

@app.route("/api/artists/")
def get_all_artists():
    """Return JSON for all artists in database"""
    print("route hit")
    artists = Artist.query.all()
    dix = [(a.__dict__) for a in artists]
    serialized = [serialize_artist_names(a) for a in dix]
    return jsonify(artists=serialized)

@app.route("/api/artists/<int:id>", methods = ["GET"])
def get_artist(id):
    """Return JSON for a specific artist in database"""
    artist = Artist.query.get(id)
    pol_score = math.avg_pol(artist)
    unique_words = math.get_num_unique_words(id)
    artist_dict = artist.__dict__
    artist_dict['pol_score'] = pol_score
    artist_dict['vocab_score'] = unique_words
    serialized = serialize_artist_data(artist_dict)
    return serialized

@app.route("/api/artists/<int:id>/wc", methods = ["GET"])
def get_py_wc(id):
    artist = Artist.query.get(id)
    words = math.generate_composite(id, "list")
    clean_list = math.clean_up_list(words, artist.name)
    sorted_list = sorted(clean_list)
    clean_str = ' '.join(sorted_list)
    wc_img = pd.get_wordcloud(clean_str)
    return jsonify(data = wc_img)


@app.route("/api/artists/add/<name>", methods = ["POST"])
def post_artist(name):
    """Attempt to add a new Artist to our database"""
    msg = {"message": "Could not find artist on lyrics genius. Please check or revise your spelling."}
    print("Post Route Hit")
    if name == "null":
        print("name was null")
        return jsonify(data = msg)
    result = download_artist(name)
    if result == None:
        print("result was none")
        return jsonify(data = msg)
    if not result.songs:
        return jsonify(data = msg)
    msg = {"message": f"Artist {name} added successfully. Head to the home page to generate insights!"}
    return jsonify(data = msg)

@app.route("/api/seed/status", methods = ["GET"])
def get_progress():
    messages = Message.query.all()
    messages = [message.msg for message in messages]
    return jsonify(data = messages)



@app.route("/api/artists/<int:id>/songs")
def get_songs_by_artist(id):
    artist = Artist.query.get(id)
    serialized = [serialize_song(song) for song in artist.songs]
    return jsonify(songs=serialized)

@app.route("/api/artists/<int:artist_id>/<int:song_id>")
def get_song_by_artist(artist_id, song_id):
    artist = Artist.query.get(artist_id)
    song = Song.query.get(song_id)
    serialized = serialize_song(song)
    return jsonify(songs=serialized)

@app.route("/api/artists/<int:artist_id>/<int:song_id>/lyrics")
def get_lyric_by_artist(artist_id, song_id):
    artist = Artist.query.get(artist_id)
    song = Song.query.get(song_id)
    return song.lyrics



# @app.route("/api/artists/", methods=["POST"])
# def add_artist():
#     name = request.json["name"]
#     quantity = request.json["quantity"]
#     our_artist = download_artist(name, quantity)
#     response = jsonify(serialize_artist_data(our_artist))
#     return (response, 201)



#https://lyricsgenius.readthedocs.io/en/master/reference/genius.html
# https://lyricsgenius.readthedocs.io/en/master/reference/types.html



