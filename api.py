#rewrite serialize functions this as either class methods or a single method

def serialize_artist_data(artist):
    """Serialize an artist SQLAlchemy obj to dictionary"""
    #This is done so that it can be converted to JSON for our API using the jsonify method
    serialized = {
        "id": artist['id'],
        "name": artist['name'],
        "bio": artist['bio'],
        "image": artist['image'],
        "pol_score": artist['pol_score'],
        "vocab_score": artist['vocab_score']
    }
    return serialized

def serialize_artist_names(artist):
    """Serialize an artist SQLAlchemy obj to dictionary"""
    #This is done so that it can be converted to JSON for our API using the jsonify method
    serialized = {
        "id": artist['id'],
        "name": artist['name']
    }
    return serialized

def serialize_lyric(song):
    serialize = {
        "title": song.title,
        "id": song.id,
        "artist": song.artist,
        "lyrics": song.lyrics
    }
    return serialize


def serialize_song(song):
    """Serialize a song SQLAlchemy obj to dictionary"""
    return {
        "id": song.id,
        "title": song.title,
        "image": song.image,
        "release_date": song.release_date,
        "lyrics": song.lyrics
    }