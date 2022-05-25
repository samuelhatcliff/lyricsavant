"""General Imports"""
import json
from types import SimpleNamespace
from sent_analysis import polarize, tokenize
from models import Artist
from math_helpers import Math
math = Math()

"""Data Imports"""
from wordcloud import WordCloud, STOPWORDS
stopwords2 = ["lyrics", "lyrics", "Embed"] + list(STOPWORDS) + math.get_stopwords()
wc= WordCloud(stopwords=stopwords2, background_color="white")
from matplotlib import pyplot as plt
plt.switch_backend('Agg')
plt.style.use("fivethirtyeight")
import numpy as np
import io
import sys, os
os.chdir(sys.path[0])
import base64


class Python_Data_Visuals:

    def test(self):
        print("worked3")
    
    def get_wordcloud(self, text):
        image = wc.generate(text).to_image()
        img = io.BytesIO()
        image.save(img, "PNG")
        img.seek(0)
        img_b64 = base64.b64encode(img.getvalue()).decode()
        # source: https://www.codementor.io/@garethdwyer/building-news-word-clouds-using-python-and-repl-it-sy7l88roq
        return img_b64

    def save_plt_png(self, plt):
        img = io.BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        image = base64.b64encode(img.getvalue()).decode()
        plt.clf()
        return image

    def get_unique_words_bar(self, artist_id1, artist_id2):
        # reference https://www.youtube.com/watch?v=nKxLfUrkLE8&t=42s
        artist1 = Artist.query.get(artist_id1)
        artist2 = Artist.query.get(artist_id2)
    
        lyrics1 = math.generate_composite(artist_id1)
        lyrics2 = math.generate_composite(artist_id2)

        tokenized1 = tokenize(lyrics1, artist1.name)
        tokenized2 = tokenize(lyrics2, artist2.name)
        
        length1 = len(tokenized1) # number of unique words
        length2 = len(tokenized2) 

        artists_x = [artist1.name, artist2.name]
        words_y = [length1, length2]
        plt.bar(artists_x, words_y)
    
        plt.title("Which artist has a larger vocabulary?")
        plt.xlabel("Artists")
        plt.ylabel("Unique words")
        plt.tight_layout() #tutorial said helps with padding, may want to use later

        image = self.save_plt_png(plt)
        return image

    def get_pol_bar(self, artist_id1, artist_id2):
        artist1 = Artist.query.get(artist_id1)
        artist2 = Artist.query.get(artist_id2)

        scores1 = []
        scores2 = []

        for song in artist1.songs:
            lyrics = song.lyrics
            scores1.append(polarize(lyrics))
    
        for song in artist2.songs:
            lyrics = song.lyrics
            scores2.append(polarize(lyrics))

        pol1 = math.avg_pol(scores1)
        pol2 = math.avg_pol(scores2)

        data1 = json.loads(pol1, object_hook=lambda d: SimpleNamespace(**d))
        data2 = json.loads(pol2, object_hook=lambda d: SimpleNamespace(**d))

        simplified1 = data1.data
        simplified2 = data2.data

        pos1 = simplified1.poss_avg
        neg1 = simplified1.negs_avg
        neu1 = simplified1.neus_avg
        pol1_list = [pos1, neg1, neu1]

        pos2 = simplified2.poss_avg
        neg2 = simplified2.negs_avg
        neu2 = simplified2.neus_avg
        pol2_list = [pos2, neg2, neu2]

        pols_x = ["Positive", "Neutral", "Negative"]
        x_indexes = np.arange(len(pols_x))
        width = 0.1

        plt.bar(x_indexes, pol1_list, width = width, label = artist1.name)
        plt.bar(x_indexes + width, pol2_list, width = width, label = artist2.name)
        plt.legend()
        plt.xticks(ticks = x_indexes, labels = pols_x)
        plt.title("Polarity Data")
        plt.xlabel("Polarity")
        plt.ylabel("Scores")
        plt.tight_layout() 

        image = self.save_plt_png(plt)
        return image

    def get_pie(self, artist_id):
        labels = ["Positive", "Neutral", "Negative"]
        colors = ['#6d904f', '#e5ae37', '#fc4f30']   # green, yellow, red
        artist = Artist.query.get(artist_id)
        scores = []
        for song in artist.songs:
            lyrics = song.lyrics
            polarized = polarize(lyrics)
            scores.append(polarized)

        pol_score = math.avg_pol(scores)
        data = json.loads(pol_score, object_hook=lambda d: SimpleNamespace(**d))
        simplified = data.data
        pos = simplified.poss_avg
        neg = simplified.negs_avg
        neu = simplified.neus_avg
        values = [pos, neg, neu]
        plt.pie(values, labels = labels, wedgeprops={'edgecolor':'black'}, colors = colors)
        plt.title("Polarity")
        plt.tight_layout()

        img = io.BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        image = base64.b64encode(img.getvalue()).decode()
        plt.clf()
        return image


    
