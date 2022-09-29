"""General Imports"""
import os
from flask import Flask, jsonify, session
from lyricsgenius import Genius
from lyrics_api import download_artist

"""Imports from our own costum modules"""
from models import connect_db, db, Song, Artist, Artist_Incomplete, Message
from api import serialize_artist_data, serialize_artist_names, serialize_song, serialize_lyric
from sqlalchemy import exc
from math_helpers import Math
from python_data_visuals import Python_Data_Visuals
from lyrics_api import download_artist
from db_maintenance import check_songs, delete_artists
pd = Python_Data_Visuals()
math = Math()

production = True
if production:
    api_key = os.environ.get("API_KEY")
    app = Flask(__name__, static_folder="client/build", static_url_path="/")
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        'DATABASE_URL', 'postgresql:///lyrics-db')
else:
    from creds import api_key
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///lyrics-db'


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", "topsecret1")
connect_db(app)

db.create_all()

genius = Genius(api_key)
#modifies our genius object with params to narrow down search results
genius.excluded_terms = ["(Remix)", "(Live)"]
genius.skip_non_songs = True
genius.remove_section_headers = True
genius.retries = 1
application = app
completed = []
failed = []

@app.route("/")
def index():
    test = Artist.query.all()
    artist = Artist.query.all()[0]
    # songs = Song.query.all()


    return app.send_static_file('index.html')

"""RESTFUL API"""

"""Artist Endpoint"""

@app.route("/api/artists/")
def get_all_artists():
    """Return JSON for all artists in database"""
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

@app.route("/api/artists/<int:id>", methods = ["DELETE"])
def remove_artist(id):
    """Removes an artist by id"""
    try:
        artist = Artist.query.get(id)
        if not artist:
            raise NameError(f"Artist with id of {id} was not found in our database and therefor can not be deleted. ")
        Song.query.filter_by(artist_id = id).delete()
        Artist.query.filter_by(id=id).delete()
        db.session.commit()
        return {"message":f"Success! Artist with id of {id} was deleted."}
    except NameError:
        response = {"Unable to delete artist with id": f"{id}"}
        return response


@app.route("/api/artists/<int:id>/wc", methods = ["GET"])
def get_py_wc(id):
    artist = Artist.query.get(id)
    words = math.generate_composite(id, "list")
    clean_list = math.clean_up_list(words, artist.name)
    sorted_list = sorted(clean_list)
    clean_str = ' '.join(sorted_list)
    wc_img = pd.get_wordcloud(clean_str)
    return jsonify(data = wc_img)


@app.route("/api/artists/<name>", methods = ["POST"])
def post_artist(name):
    """Attempt to add a new Artist to our database"""
    Message.query.delete() #clears progress state
    db.session.commit()
    msg = {"message": "Could not find artist on lyrics genius. Please check or revise your spelling.",
    "type":"error"}
    print("Post Route Hit")
    if name == "null":
        return jsonify(data = msg)
    result = download_artist(name)
    if result == None:
        return jsonify(data = msg)
    if not result.songs:
        return jsonify(data = msg)
    msg = {"message": f'Artist "{name}" added successfully. Head to the home page to generate insights!',
            "type": "success"}
    return jsonify(data = msg)

@app.route("/api/seed/status", methods = ["GET"])
def get_progress():
    messages = Message.query.all()
    messages = [message.msg for message in messages]
    return jsonify(data = messages)

@app.route("/api/artists/<int:id>/songs", methods = ["GET"])
def get_all_songs_by_artist(id):
    artist = Artist.query.get(id)
    serialized = [serialize_song(song) for song in artist.songs]
    return jsonify(songs=serialized)

@app.route("/api/artists/<int:artist_id>/<int:song_id>", methods = ["GET"])
def get_song_by_artist(artist_id, song_id):
    artist = Artist.query.get(artist_id) #add error handling for if song doesn't exist in artist
    song = Song.query.get(song_id)
    serialized = serialize_song(song)
    return jsonify(songs=serialized)

@app.route("/api/artists/<int:artist_id>/<int:song_id>/lyrics", methods = ["GET"])
def get_lyric_by_artist(artist_id, song_id):
    artist = Artist.query.get(artist_id) #add error handling for if song doesn't exist in artist
    song = Song.query.get(song_id)
    return jsonify(lyrics=song.lyrics)

@app.route("/api/artists/<int:artist_id>/lyrics", methods = ["GET"])
def get_all_lyrics_by_artist(artist_id):
    artist = Artist.query.get(artist_id)
    serialized = [serialize_lyric(song) for song in artist.songs]
    return jsonify(lyrics=serialized)


"""Songs Endpoint"""
@app.route("/api/songs",  methods = ["GET"]) #add pagination
def get_all_songs(id):
    songs = Song.query.all()
    serialized = [serialize_song(song) for song in songs]
    return jsonify(songs=serialized)

@app.route("/api/songs/<int:song_id>",  methods = ["GET"])
def get_song_by_id(song_id):
    song = Song.query.get(song_id)
    serialized = serialize_song(song)
    return jsonify(song=serialized)

@app.route("/api/songs/<int:song_id>/lyrics",  methods = ["GET"])
def get_song_lyrics_by_id(song_id):
    song = Song.query.get(song_id)
    return jsonify(song=song.lyrics)

