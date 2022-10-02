from models import Artist
from sent_analysis import polarize
from data.stopwords import my_stopwords
import re
import nltk
nltk.download('omw-1.4')
nltk.download('wordnet')
from nltk.corpus import wordnet, stopwords
from nltk.stem.wordnet import WordNetLemmatizer as wnl
wnl.lemmatize('tests', "tests")
nltk.download('stopwords')
nltk_sw_en = stopwords.words('english')
nltk_sw_es = stopwords.words('spanish')

class Math:
    def avg_pol(self, artist):
        # first create a list of score objects for each songs 
        scores = []
        for song in artist.songs:
            lyric = song.lyrics
            scores.append(polarize(lyric))

        # then separate specific scores for coms, pos, negs, and neus
        coms = []
        poss = []
        negs = []
        neus = []
        try: 
            for score in scores:
               # this is wrapped in a try/except block because of a bug I'm experiencing where flask tells me the dict is actually a nonetype.
               # really weird and would be nice to figure out what's going on, even though lines 30-33 work perfectly when contained in try block
               # todo: write a test that will fail if except is ran
                coms.append(score['avg_com'])
                poss.append(score['avg_pos'])
                negs.append(score['avg_neg'])
                neus.append(score['avg_neu'])
        except: 
            print("except1", artist.name)
            pass


        # get average for each category by averaging list
        coms_avg = round((sum(coms) / len(coms)), 2)
        poss_avg = round((sum(poss) / len(poss)), 2)
        negs_avg = round((sum(negs) / len(negs)), 2)
        neus_avg = round((sum(neus) / len(neus)), 2)

        # creates an object with these averagesx
        obj = {"coms_avg": coms_avg,
        "poss_avg": poss_avg, "negs_avg": negs_avg, "neus_avg": neus_avg}

        data = { "data": obj }
        return data
  
    def percent_dif(self, item1, item2):
        result = ((item2 - item1) / item1) * 100 
        return result

    def result_msg(self, item1, item2, subject):
        dif = self.percent_dif(item1, item2)
        if dif > 0:
            return f"{item2} is {dif}% more {subject} than {item1}"
        if dif < 0:
            return f"{item2} is {dif}% less {subject} than {item1}"
        if dif == 0:
            return f"{item1} and {item2} score exactly the same. Weird."


class Lyric:
    def generate_composite(self, artist_id, type = "string"):
        """Sums the entirety of an artist's lyrics to a single string or list (if specified) to be used to generate data"""
        # This functionality is neccesary because visual data libraries in python tend to accept a single input of text
        # rather than saving every single song's lyrics to our artist object in our db, we'd prefer to generate this text 
        # in a single calculation in the moment we call it. This saves memory in our db and lets us add and remove songs/lyrics from 
        # an artist without having to update a composite string saved to the artist sqalchemy object each time
        artist = Artist.query.get(artist_id)
        
        if type == "list": 
            words_lst = []
            for song in artist.songs:
                lyric_lst = song.lyrics.split()
                words_lst.extend(lyric_lst)
            return words_lst # returns list of every word in every song

        comp = ""         
        for song in artist.songs:
            comp += song.lyrics

        return comp # returns string of every word in every song

    def get_num_unique_words(self, artist_id):
        artist = Artist.query.get(artist_id)
        list_composite = self.generate_composite(artist_id, "list")
        regexed = self.clean_up_list(list_composite, artist.name)
        regexed_set = set(regexed)
        return len(regexed_set)

    def regex_word_clean_up(self, word): 
        stopwords = self.get_stopwords()

        #regex expression to eliminate words that contain special char - but don't start or end with -
        word = re.sub(r'\S+-\S+', "", word)

        #regex expression to eliminate special characters from word--does most of the heavy lifting in this func
        regexed = re.sub(r"[^A-Za-z']", "", word)

        #lemmatization attempt--arbitrarily receive error of AttributeError: 'WordNetCorpusReader' object has no attribute '_LazyCorpusLoader__args'
        regexed = wnl.lemmatize(regexed, regexed)

        #filters out words that are single letters or only two letters, which are often junk
        if len(regexed) == 0 or len(regexed) == 1:
            return False

        #filters out common non-lyrical content form webscaping
        #todo: write a switch statement for line 115 instead
        if "embed" in regexed or "Embed" in regexed or "lyrics" in regexed or "Lyrics" in regexed or ".com" in regexed:
            return False
        
        #filters out words that don't contain vowels
        vowels = set('aeiou')
        if vowels.isdisjoint(regexed):
            return False

        #after applying regular expressions to clean up our word, we can now check again if the word is a stopword
        if regexed in stopwords:
            return False

        #if the word meets all of the above conditions, it can be returned and added to our filtered list in clean_up_list
        return regexed
        

    def clean_up_list(self, lst, author = ""):
        stopwords = self.get_stopwords() 
        filtered = []
        for word in lst:
            word = word.lower()
            if word not in stopwords:
                legit = self.regex_word_clean_up(word)
                if legit == False or legit==author:
                    continue
                filtered.append(legit)

        return filtered

    def get_stopwords(self):
        #todo: add stopword list from wordcloud. once all external stopword lists are added (including in various languages, convert to set and then back to list)
        return my_stopwords + nltk_sw_en + nltk_sw_es

class Serialize:
    def artist_data(self, artist):
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

    def artist_names(self, artist):
        """Serialize an artist SQLAlchemy obj to dictionary"""
        #This is done so that it can be converted to JSON for our API using the jsonify method
        serialized = {
            "id": artist['id'],
            "name": artist['name']
        }
        return serialized

    def lyric(self, song):
        serialize = {
            "title": song.title,
            "id": song.id,
            "artist": song.artist,
            "lyrics": song.lyrics
        }
        return serialize

    def song(self, song):
        """Serialize a song SQLAlchemy obj to dictionary"""
        return {
            "id": song.id,
            "title": song.title,
            "image": song.image,
            "release_date": song.release_date,
            "lyrics": song.lyrics
        }