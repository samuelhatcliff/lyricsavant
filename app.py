"""General Imports"""
from flask import Flask, jsonify, request, render_template
import json
from lyricsgenius import Genius
from types import SimpleNamespace
from lyrics_api import download_artist

"""Web Scraping"""
# import requests
# from bs4 import BeautifulSoup
# URL = "https://www.songkick.com/leaderboards/popular_artists?page=5"
# page = requests.get(URL)
# soup = BeautifulSoup(page.content, "html.parser")
# results = soup.find_all("td", class_="name")
# artist_list = []
# for td in results:
#     a= td.find("a")
#     artist_list.append(a.text)


# from flask_debugtoolbar import DebugToolbarExtension 

"""Imports from our own costum modules"""
from models import connect_db, db, Song, Artist
from api import serialize_artist_data, serialize_artist_names, serialize_song
from math_helpers import Math
from sent_analysis import polarize, tokenize
from python_data_visuals import Python_Data_Visuals
from lyrics_api import download_artist
pd = Python_Data_Visuals()
math = Math()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///lyrics-db'
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
genius.retries = 1

completed = []
failed = []

@app.route("/test")
def home():
    artist1 = Artist.query.get(20710) #a7x
    artist2 = Artist.query.get(17912) #evanescence
    test = download_artist("fasdfasdfasdfasdfa", 1)
    print(test)
    return {"members": ["mem1", "mem2"]}

@app.route("/results")
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

    return render_template('results.html', wc_img = wc_img, pie_img = pie_img, bar_img = bar_img, pol_img = pol_img)



"""RESTFUL API"""

@app.route("/api/artists/")
def get_all_artists():
    """Return JSON for all artists in database"""
    artists = Artist.query.all()
    dix = [(a.__dict__) for a in artists]
    serialized = [serialize_artist_names(a) for a in dix]
    return jsonify(artists=serialized)

@app.route("/api/artists/<int:id>")
def get_artist(id):
    """Return JSON for a specific artist in database"""
    artist = Artist.query.get(id)
    words = math.generate_composite(id, "list")
    words_filtered_stopwords = math.clean_up_list(words)
    pol_score = math.avg_pol(artist)
    unique_words = math.get_num_unique_words(id)
    artist_dict = artist.__dict__
    artist_dict['pol_score'] = pol_score
    artist_dict['vocab_score'] = unique_words
    artist_dict['words'] = words_filtered_stopwords
    serialized = serialize_artist_data(artist_dict)
    return serialized

@app.route("/api/artists/<name>")
def post_artist(name):
    """Attempt to add a new Artist to our database"""
    result = download_artist(name)
    if result == None:
        return "Could not find artist on lyrics genius. Please check or revise your spelling"
    return "Artist {result} added successfully. Head to the home page to generate insights!"




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

# @app.route("/api/artists/", methods=["POST"])
# def add_artist():
#     name = request.json["name"]
#     quantity = request.json["quantity"]
#     our_artist = download_artist(name, quantity)
#     response = jsonify(serialize_artist_data(our_artist))
#     return (response, 201)



#https://lyricsgenius.readthedocs.io/en/master/reference/genius.html
# https://lyricsgenius.readthedocs.io/en/master/reference/types.html



