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

"""Genius API"""
from lyricsgenius import Genius
genius = Genius('aPt0Y03tHHx7XAVyDWcJUzgaR7qBN5_D1-Dg_s-BBgTO8ifIJUB0toLzQ0P2YKCF')
#modifies our genius object with params to narrow down search results
genius.excluded_terms = ["(Remix)", "(Live)"]
genius.skip_non_songs = True
genius.remove_section_headers = True
genius.retries = 1

from models import Artist, Artist_Incomplete, Song, db

def check_songs():
    artists = Artist.query.all()
    marked = []
    for artist in artists:
        if len(artist.songs) != 40:
            msg = f"ALERT, {artist} only has {len(artist.songs)} songs!"
            marked.append(msg)
            incomplete_artist = Artist_Incomplete(name = artist.name, artist_id = artist.id)
            db.session.add(incomplete_artist)
            db.session.commit()

    db.session.commit()
    print(marked)
    return marked

id_list = [2303581, 2116961, 2986459, 2074624, 3140017, 2018738, 1141199, 1796101, 26254, 1814801, 2252591, 1560860, 247886  ]

def delete_artists(id_list):
    deleted = []
    for id in id_list:
        db.session.query(Artist).filter(
        Artist.id == id
        ).delete()
        db.session.commit()
        deleted.append(id)
    db.session.commit()
    return deleted

def fill_artist_songs(artist_id, limit = 40):
    db_artist = Artist.query.get(artist_id)
    current_amount = len(db.artist.songs)
    api_artist = genius.search_artist(db_artist.name, max_songs=100, sort="popularity", allow_name_change = False)
    if api_artist.songs:
        while current_amount < limit:
            existing_songs = db_artist.songs
            existing_song_ids = []
            for song in existing_songs:
                existing_song_ids.append(song.id)
            for song in api_artist.songs:
                if song.id not in existing_song_ids:
                    # Todo: most of this logic is the same as save_lyrics function in lyrics_api.py--combine into single function
                    res = genius.song(song.id)
                    data = res['song']
                    title = data['title']
                    release_date = data['release_date']
                    image = data['song_art_image_thumbnail_url']
                    song_id = data['id']
                    url = data['url']
                    lyrics = genius.lyrics(song_url=url)
            
                    our_song = Song(id = song_id, title=title, image=image, release_date=release_date,
                                    lyrics=lyrics, artist_id = db_artist.id)
                    db.session.add(our_song)
                    db.session.commit()
                    current_amount += 1
    return f"Fill amount function completed. Artist {db_artist.name} now has {len(db_artist.songs)} songs."

def auto_fill(limit = 40):
    check_songs()
    incomplete_artists = Artist_Incomplete.query.all()
    for artist in incomplete_artists:
        fill_artist_songs(artist.id, limit)        


