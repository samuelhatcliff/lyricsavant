from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()



def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

    
class Artist(db.Model):
    __tablename__ = "artists"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    bio = db.Column(db.String)
    image = db.Column(db.Text)
    pol_score = db.Column(db.String)     # average score of all songs associated with artist
    vocab_score = db.Column(db.Integer)

    def __repr__(self):
        return f"<ID: {self.id}, Name:{self.name}>"

class Artist_Incomplete(db.Model):
    __tablename__ = "artists_incomplete"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable = False)
    name = db.Column(db.String, nullable=False)
    num_songs = db.Integer

    def __repr__(self):
        return f"<ID: {self.id}, Name:{self.name}>, Artist-ID: {self.artist_id}, Number of Songs {self.num_songs}"

class Message(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    msg = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"{self.msg}"

class Song(db.Model):
    __tablename__ = "songs"
    id = db.Column(db.Integer,
    primary_key=True,
    autoincrement=True)
    title = db.Column(db.String, nullable = False)
    image = db.Column(db.String)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
    artist = db.relationship('Artist', backref= 'songs') 
    release_date = db.Column(db.String)    #change this to date type
    lyrics = db.Column(db.Text, nullable=False)
    score = db.Column(db.String)
    unique_words = db.Column(db.Integer)

    def __repr__(self):
        return f"<ID: {self.id}, Title:{self.title}>"

"""add User class with additional feautures if time permits"""

# class User(db.Model):
    
#     __tablename__ = "users"
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     username = db.Column(db.String(20),
#                      nullable=False, 
#                      unique=True)
#     password = db.Column(db.Text,
#                      nullable=False)
#     email = db.Column(db.String(50),
#                      nullable=False, 
#                      unique=True)
#     first_name = db.Column(db.String(30),
#                      nullable=False)
#     last_name = db.Column(db.String(30),
#                      nullable=False)
    
#     @classmethod
#     def register(cls, username, pwd, email, first_name, last_name):
#         hashed= bcrypt.generate_password_hash(pwd)
        
#         hashed_utf8 = hashed.decode("utf8")
        
#         new_user = cls(username=username, password=hashed_utf8, email=email, first_name=first_name, last_name=last_name)
#         db.session.add(new_user)
#         return new_user
    
#     @classmethod
#     def authenticate(cls, username, pwd):
#         u = User.query.filter_by(username=username).first()
        
#         if u and bcrypt.check_password_hash(u.password, pwd):
#             return u
#         else:
#             return False

#     def __repr__(self):
#         return f"<ID: {self.id}, Username:{self.username}>"
