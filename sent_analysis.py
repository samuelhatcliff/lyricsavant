#libraries for parsing and sentiment analysis
from calendar import c
import nltk
nltk.download('stopwords')
nltk.download('punkt')
from nltk.corpus import stopwords


from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA
sia = SIA()
import re
import json 
import spacy
nlp = spacy.load('en_core_web_sm', disable=["parser", "ner"])

def polarize(text):
    #function returns an object of two sepearate polarity scores; one based off the text of the article and the other
    #from just the headline alone. Each of these are represented in their own respective objects. 
    pol_obj = {}
    """Logic for polarity from article text"""
  
    sentenced = nltk.tokenize.sent_tokenize(text)

    coms = []
    pos = []
    negs = []
    neus = []

    for sentence in sentenced:
        res = sia.polarity_scores(sentence)

        pos.append(res["pos"])
        negs.append(res["neg"])
        neus.append(res["neu"])
        if res['compound']:
            #sometimes the composite will be zero for certain sentences. We don't want to include that data. 
            coms.append(res['compound'])
        

    if len(coms) == 0:
        return None

    avg_com = round((sum(coms) / len(coms)), 2)
    avg_pos = round((sum(pos) / len(pos)), 2)
    avg_neu = round((sum(neus) / len(neus)), 2)
    avg_neg = round((sum(negs) / len(negs)), 2)

    pol_obj["avg_com"] = round(avg_com, 2)
    pol_obj["avg_pos"] = round(avg_pos, 2)
    pol_obj["avg_neg"] = round(avg_neg, 2)
    pol_obj["avg_neu"] = round(avg_neu, 2)

  #TRY TO USE ROUNDED VERSIONS IN message
    pol_obj["message"] = f"compound: {avg_com}. {avg_neg *100}% Negative, {avg_neu *100}% Neutral, and {avg_pos *100}% Positive"

    return pol_obj

def tokenize(text, author):
    #tokenization from spacy and remove punctuations, convert to set to remove duplicates
    words = set([str(token) for token in nlp(text) if not token.is_punct])


    # remove digits and other symbols except "@"--used to remove email
    words = list(words)
    words = [re.sub(r"[^A-Za-z@]", "", word) for word in words]
     #remove special characters
    words = [re.sub(r'\W+', '', word) for word in words]
    #remove websites and email addresses 
    words = [re.sub(r'\S+@\S+', "", word) for word in words]
    #remove empty spaces 
    words = [word for word in words if word!=""]

    # remove words containing embed
    for word in words.copy():
        if "Embed" in word:
            words.remove(word)
        if author in word:
            if word in words:
                words.remove(word)
    
    # convert all to lowercase
    words = [word.lower() for word in words]

    #import lists of stopwords from NLTK
    stop_words = set(stopwords.words('english'))
    words = [w for w in words if not w.lower() in stop_words]

    # lemmization from spacy. doesn't appear to be doing anything. fix this
    # words = [token.lemma_ for token in nlp(str(words)) if not token.is_punct]
    # print("Below is length after Lemmatization")
    # print(len(words))

 
    # remove "words" that don't contain vowels
    vowels = ['a','e','i','o','u']
    words = [word for word in words if any(v in word for v in vowels)]

    #eliminate duplicate words by turning list into a set
    words_set = set(words)

    return words_set
    # sources: https://towardsdatascience.com/a-step-by-step-tutorial-for-conducting-sentiment-analysis-a7190a444366
    #https://datascience.stackexchange.com/questions/39960/remove-special-character-in-a-list-or-string
