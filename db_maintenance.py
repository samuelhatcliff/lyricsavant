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
from lyrics_api import download_artist

def check_songs(mark_in_db = False):
    artists = Artist.query.all()
    artist_ids = []
    for artist in artists:
        if len(artist.songs) != 40:
            msg = f"ALERT, {artist} only has {len(artist.songs)} songs!"
            print(msg)
            artist_ids.append(artist.id)
            if mark_in_db:
                incomplete_artist = Artist_Incomplete(name = artist.name, artist_id = artist.id)
                db.session.add(incomplete_artist)
                db.session.commit()

    print("ids", artist_ids)
    return artist_ids


def delete_artists(id_list):
    deleted_artists = []
    for id in id_list:
        artist = Artist.query.get(id)
        artist_song_ids = [song.id for song in artist.songs]
        for song_id in artist_song_ids:
            db.session.query(Song).filter(Song.id == song_id).delete()
            db.session.commit()

        db.session.query(Artist).filter(
        Artist.id == id
        ).delete()
        db.session.commit()
        deleted_artists.append(id)
    db.session.commit()
    return deleted_artists

def fill_artist_songs(artist_id, limit = 40):
    db_artist = Artist.query.get(artist_id)
    api_artist = genius.search_artist(db_artist.name, max_songs=100, sort="popularity", allow_name_change = False)
    if len(api_artist.songs) > limit:
            existing_songs = db_artist.songs
            existing_song_ids = []
            current_amount = len(db_artist.songs)
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
                    print(f'lyrics1 for song {title}')

                    if not lyrics:
                        print(lyrics, "THIS!")
                        continue
                    if current_amount < limit:
                        our_song = Song(id = song_id, title=title, image=image, release_date=release_date,
                                        lyrics=lyrics, artist_id = db_artist.id)
                        db.session.add(our_song)
                        db.session.commit()
                        current_amount += 1
                    else:
                        continue
    else:
        return f"could only find {len(api_artist.songs)}. Not enough to max out to limit of {limit}"
    return f"Fill amount function completed. Artist {db_artist.name} now has {len(db_artist.songs)} songs."

def auto_fill(limit = 40):
    check_songs()
    incomplete_artists = Artist_Incomplete.query.all()
    for artist in incomplete_artists:
        fill_artist_songs(artist.id, limit)        

def roll_call(data):
    """Checks our DB against data from webscraping to ensure all artists in data have been added to our DB"""
    roll_call = Artist.query.all()
    present = []
    failed = []
    for artist in roll_call:
        present.append(artist.name)

    for artist in data:
        if artist not in present:
            download_artist(artist)
            present.append(artist)
            print(f"Downloaded artist {artist}. Artists already added: {present}. Artists that failed to download: {failed}")
    return {"present": present,
            "failed": failed}
        


ids = [23895, 10662, 1788, 14181, 26076, 26369, 24215, 25943, 43384, 278311, 65238, 1082, 41287, 743, 16671, 763, 12025, 13585, 49449, 609667, 582361, 25227, 8196, 1016, 60945, 332, 38215, 47522, 37694, 2621, 18072, 168601, 106694, 11800, 989523, 811, 161892, 68154, 1770892, 18738, 48669, 17659, 36539, 138906, 23881, 290017, 632979, 435, 12519, 86546, 783, 456537, 20663, 1145, 2301, 35483, 17941, 1121, 52217, 626678, 19327, 1484, 2005, 154344, 5407, 4384, 565381, 240008, 2373, 16026, 197, 508218, 34555, 14714, 11735, 33699, 22962, 1144133, 19153, 619, 8526, 27011, 48889, 14083, 45313, 1186, 22931, 38216, 390884, 168236, 669, 18945, 1944322, 34095, 31426, 667, 55741, 155207, 30732, 78447, 18769, 14258, 14136, 143728, 212037, 6996, 73177, 292730, 12047, 38515, 50825, 26868, 62572, 222773, 346537, 155057, 37434, 357385, 30848, 248387, 301799, 155465, 104446, 126879, 395104, 14481, 704, 75256, 220144, 16002, 1138, 17395, 720, 20645, 12459, 105006, 547449, 175579, 48352, 377002, 59876, 31376, 534092, 71873, 59420, 1990582, 386203, 376066, 114380, 1819951]
