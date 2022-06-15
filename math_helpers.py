import json
from types import SimpleNamespace
from models import Artist
from sent_analysis import polarize, tokenize
from collections import Counter
import nltk
import re
nltk.download('stopwords')
from nltk.corpus import stopwords
nltk_sw = stopwords.words('english')

class Math:
    def avg_pol(self, artist):
        # first create a list of score objects for each songs 
        scores = []
        print("artist11",artist)
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
               # really weird and would be nice to figure out what's going on, even though the try/except solution works 
                coms.append(score['avg_com'])
                poss.append(score['avg_pos'])
                negs.append(score['avg_neg'])
                neus.append(score['avg_neu'])
        except: 
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
        # pol_score = json.dumps(data)
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

    def generate_composite(self, artist_id, type = "string"):
        """Sums the entirety of an artist's lyrics to a single string to be used to generate data"""
        # This functionality is neccesary because visual data libraries in python tend to accept a single input of text
        # rather than saving every single song's lyrics to our artist object in our db, we'd prefer to generate this text 
        # in a single calculation in the moment we call it. This saves memory and lets us add and remove songs/lyrics from 
        # an artist without having to update a composite string saved to the artist sqalchemy object each time
        artist = Artist.query.get(artist_id)
        
        if type == "list": # returns list of every word in every song
            words_lst = []
            for song in artist.songs:
                lyric_lst = song.lyrics.split()
                words_lst.extend(lyric_lst)
            return words_lst

        # returns string of every word in every song
        comp = ""
        for song in artist.songs:
            comp += song.lyrics

        return comp

    def get_num_unique_words(self, artist_id):
        artist = Artist.query.get(artist_id)
        lyrics = self.generate_composite(artist_id)
        tokenized = tokenize(lyrics, artist.name)
        num_unique = len(tokenized) 
        return num_unique

    def regex_word_clean_up(self, word): #function is recursive because there may be multiple characters that need to be removed
        stopwords = self.get_stopwords()
        if len(word) == 0:
            return None

        #regex expression to eliminate words that contain special char - but don't start or end with -
        word = re.sub(r'\S+-\S+', "", word)
        #regex expression to eliminate special characters from word--does most of the heavy lifting in this func
        regexed = re.sub(r"[^A-Za-z']", "", word)

        if len(regexed) == 0 or len(regexed) == 1:
            return None

        if "embed" in regexed or "Embed" in regexed:
            return None
        
        if regexed in stopwords:
            return None

        return regexed
        

    def clean_up_list(self, lst, author = ""):
        stopwords = self.get_stopwords() + nltk_sw
        stopwords_dict = Counter(stopwords)
        filtered = []
        for word in lst:
            word = word.lower()
            if word not in stopwords_dict:
                regexed = self.regex_word_clean_up(word)
                if regexed == None:
                    continue
                filtered.append(regexed)
        print(len(filtered), "length of filtered5 list of words")
        print(len(lst), "length of original list of words")
        print("filtered1 words list", (filtered))
        
        return filtered

    def clean_up_string(self, text, author, song_title):
        lst = list(text.split(" "))

        for word in lst.copy():
            if "lyrics" in word:
                if word in lst:
                    lst.remove(word)
            if "Lyrics" in word:
                if word in lst:
                    lst.remove(word)
            if "Embed" in word:
                if word in lst:
                    lst.remove(word)
            if "embed" in word:
                if word in lst:
                    lst.remove(word)
            if author in word:
                if word in lst:
                    lst.remove(word)
            if song_title in word:
                if word in lst:
                    lst.remove(word)
            if author.lower() in word:
                if word in lst:
                    lst.remove(word)     
            if song_title.lower() in word:
                if word in lst:
                    lst.remove(word)       

        string = ' '.join(lst)
        return string 

    def get_stopwords(self):
        return ["di", "'s", "ay"," ", "uh", "trs" "e", "'em", "em", "i'll", "let's", "and", "be", "yet", "so", "~", "-", "_", "/", ".", ",", "[", "]", "*", "lyrics", "na", "say", "want", "need", "naa", "nah", "ha", "yes", "Hey", "u", "make", "mi", "ooh", "around", "oh", "still", "see", "after", "afterwards", "ag", "again", "well", "one", "em", "let", "go",
"ah", "ain", "ain't", "aj", "al", "all","almost",  "already", "also", "although", 
"am","an", "and","another", "any", "are", "aren", "arent", "as", "a's", "right", "wanna", "ya ya", "I'ma", "ya", "til",
"did", "didn", "didn't", "do", "does", "doesn", "doesn't","either", "else", "for", 
"gave", "ge", "get", "gets", "getting", "gi", "give", "given", "gives", "giving", "gj", "gl",
 "go", "goes", "going", "got", "gotten", "has", "hasn", "hasnt", "hasn't", "have", "haven", "haven't",
 "he", "hed", "he'd", "he'll", "he's", "here", "hereafter", "hereby", "herein", "heres",
 "him", "himself", "his", "i'd", "ie", "if", "ig", "ih", "ii", "ij", "il", "im", "i'm",
 "it'd", "it'll","ill", "its", "it's", "itself", "iv", "i've", "ive" "just", "like", "my", "no", "not",
 "she'd", "she'll", "shes", "she's", "should", "shouldn", "shouldn't", "should've", "since",
 "them", "then", "there", "that", "that'll", "thats", "that's", "that've", "the", "their", "theirs", "them", "themselves",
 "these", "they", "theyd", "they'd", "they'll", "theyre", "they're", "they've",
 "this", "thorough", "thoroughly", "those", "thou", "though", "um", 
 "you", "youd", "you'd", "you'll", "your", "youre", "you're", "yours", "yourself", "yourselves", "you've",
 "want", "wants", "was", "wasn", "wasnt", "wasn't", "way", "we", "wed", "we'd",
 "well", "we'll", "well-b", "went", "were", "we're", "weren", "werent", "weren't", "we've", "what",
 "what'll", "whats", "what's", "when", "whence", "whenever", "when's", "where", "whereafter", "whereas", 
 "whereby", "wherein", "wheres", "where's", "whereupon", "wherever", "whether", "which", "while", 
 "who", "whod", "whoever", "whole", "who'll", "whom", "whomever", "whos", "who's", "whose",
 "with", "won't", "would", "wouldn", "wouldnt", "wouldn't",
"came", "can", "cannot", "cant", "can't","comes", "could", "couldn", "couldnt", "couldn't"
"say", "said", "gonna", "give", "even", "ohh", "yeah", "know", "cause", "ain't", "tell",
"now", "got", "back", "come", "i", "me", "my", "myself", "we", "our", "ours",
"ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his",
    "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them",
     "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", 
     "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", 
     "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but",
      "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", 
      "about", "against", "between", "into", "through", "during", "before", "after", 
      "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", 
      "under", "again", "further", "then", "once", "here", "there", "when", "where", 
      "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", 
      "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", 
      "very", "s", "t", "can", "will", "just", "us", "don", "should", "now"] + nltk_sw

