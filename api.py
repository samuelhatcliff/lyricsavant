#rewrite serialize functions this as either class methods or a single method

def serialize_artist(artist):
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
    print(serialized, "cereal")
    return serialized

def serialize_song(song):
    """Serialize a song SQLAlchemy obj to dictionary"""
    return {
        "id": song.id,
        "title": song.title,
        "image": song.image,
        "release_date": song.release_date,
        "pol_score": song.pol_score,
        "unique_words": song.unique_words
    }