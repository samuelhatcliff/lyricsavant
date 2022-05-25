import json
from types import SimpleNamespace
from models import Artist

class Math:
    def avg_pol(self, scores):
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

        print(coms, poss, negs, neus, "arrays1")
        
        coms_avg = round((sum(coms) / len(coms)), 2)
        poss_avg = round((sum(poss) / len(poss)), 2)
        negs_avg = round((sum(negs) / len(negs)), 2)
        neus_avg = round((sum(neus) / len(neus)), 2)

        obj = {"coms_avg": coms_avg,
        "poss_avg": poss_avg, "negs_avg": negs_avg, "neus_avg": neus_avg}

        data = { "data": obj }
        pol_score = json.dumps(data)
        print("got1 json score", pol_score)
        return pol_score
  
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

    def generate_composite(self, artist_id):
        """Sums the entirety of an artist's lyrics to a single string to be used to generate data"""
        # This functionality is neccesary because visual data libraries in python tend to accept a single input of text
        # rather than saving every single song's lyrics to our artist object in our db, we'd prefer to generate this text 
        # in a single calculation in the moment we call it. This saves memory and lets us add and remove songs/lyrics from 
        # an artist without having to update a composite string saved to the artist sqalchemy object each time
        artist = Artist.query.get(artist_id)
        comp = ""
        for song in artist.songs:
            comp += song.lyrics

        return comp

    def clean_up(self, text, author, song_title):
        print(text, "ogtext")
        lst = text.split()
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
        return ["na", "na", "say", "want", "need", "naa", "nah", "ha", "yes", "Hey", "u", "make", "mi", "ooh", "around", "oh", "still", "see", "after", "afterwards", "ag", "again", "well", "one", "em", "let", "go",
"ah", "ain", "ain't", "aj", "al", "all","almost",  "already", "also", "although", 
"am","an", "and","another", "any", "are", "aren", "arent", "as", "a's", "right", "wanna", "ya ya", "I'ma", "ya", "til",
"did", "didn", "didn't", "do", "does", "doesn", "doesn't","either", "else", "for", 
"gave", "ge", "get", "gets", "getting", "gi", "give", "given", "gives", "giving", "gj", "gl",
 "go", "goes", "going", "got", "gotten", "has", "hasn", "hasnt", "hasn't", "have", "haven", "haven't",
 "he", "hed", "he'd", "he'll", "here", "hereafter", "hereby", "herein", "heres",
 "him", "himself", "his", "i'd", "ie", "if", "ig", "ih", "ii", "ij", "il", "i'll", "im", "i'm",
 "it'd", "it'll", "its", "it's", "itself", "iv", "i've", "just", "like", "my", "no", "not",
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
      "very", "s", "t", "can", "will", "just", "don", "should", "now"]

