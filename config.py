import os 

class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    API_KEY = os.getenv("API_KEY")
    SECRET_KEY = os.getenv("SECRET_KEY")

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql:///lyrics-db'

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_ECHO = False
    DEBUG_TB_HOSTS= ['dont-show-debug-toolbar']
    WTF_CSRF_ENABLED = False
