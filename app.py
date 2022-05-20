"""General Imports"""
from flask import Flask, jsonify, request, render_template
import json
from lyricsgenius import Genius
from types import SimpleNamespace

"""Web Scraping"""
import requests
from bs4 import BeautifulSoup
URL = "https://www.songkick.com/leaderboards/popular_artists?page=5"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")
results = soup.find_all("td", class_="name")
artist_list = []
for td in results:
    a= td.find("a")
    artist_list.append(a.text)

print(artist_list, "artlist5,", len(artist_list))

data = ['Rihanna', 'Drake', 'Coldplay', 'Eminem', 'Maroon 5', 'Ed Sheeran', 'Bruno Mars', 'Kanye West', 'Adele', 'The Weeknd', 'U2', 'Beyoncé', 'Justin Bieber', 'Katy Perry', 'Taylor Swift', 'Kendrick Lamar', 'Red Hot Chili Peppers', 'Lil Wayne', 'Nicki Minaj', 'Calvin Harris', 'Imagine Dragons', 'Chris Brown', 'Lady Gaga', 'David Guetta', 'Ariana Grande', 'Justin Timberlake', 'The Killers', 'Lana Del Rey', 'Wiz Khalifa', 'Queen', 'Usher', 'Radiohead', 'Kings of Leon', 'Arctic Monkeys', 'Ellie Goulding', 'Pitbull', 'Green Day', 'Post Malone', 'Muse', 'Mumford & Sons', 
'J. Cole', 'Black Eyed Peas', 'Jason Derulo', 'Miley Cyrus', 'Sia', 'The Rolling Stones', 'Flo Rida', 'A$AP Rocky', 'Alicia Keys', 'Sam Smith', 'Metallica', 'Big Sean', 'Foo Fighters', 'Fleetwood Mac', 'OneRepublic', 'Future', 'Fall Out Boy', 'Britney Spears', 'Snoop Dogg', 'Elton John', 'John Legend', 'Shakira', 'Frank Ocean', 'Twenty One Pilots', 'Kid Cudi', 'Lorde', 'Paramore', 'Gorillaz', 'Travis Scott', 'John Mayer', 'Khalid', 'Demi Lovato', 'Childish Gambino', 'Skrillex', 'MGMT', 'The Chainsmokers', 'Billie Eilish', 'The Black Keys', 'Panic! At the Disco', "Guns N' Roses", 'Kesha', 'Shawn Mendes', 'AC/DC', 
'Selena Gomez', 'Foster the People', 'T.I.', 'Major Lazer', 'Pharrell Williams', 'Tyga', 'blink-182', 'The xx', 'Bastille', 'Pearl Jam', 'The Cure', 'Macklemore & Ryan Lewis', 'Bon Iver', '50 Cent', 'Trey Songz', 'Mariah Carey', 'Dr. Dre', 'One Direction', 'Ty Dolla $ign', 'Enrique Iglesias', 'The Lumineers', '2 Chainz', 'Halsey', 'Nickelback', 'Jason Mraz', 'DJ Khaled', 'Jennifer Lopez', 'Train', 'Tame Impala', 'Jay-Z', 'Hozier', 'Chance the Rapper', 'The Strokes', 'Arcade Fire', 'Jack Johnson', 'Bob Dylan', 'Ne-Yo', 'Weezer', 'Tyler, The Creator', 'Kelly Clarkson', 'Michael Bublé', 'Avril Lavigne', 'Migos', 'Bon Jovi',
 'Aerosmith', 'G-Eazy', 'Madonna', 'Young Thug', 'Zedd', 'Christina Aguilera', 'B.o.B',
 'Avicii', 'Stevie Wonder', 'Miguel', 'OutKast', 'The Script', 'alt-J', 'Jessie J', 'Disclosure', 'Akon', 'Gucci Mane', 'Cardi B', 'Linkin Park', 'Of Monsters and Men', 'Jeremih', 'Ludacris', 'Dua Lipa', 'Vampire Weekend', 'The Fray', 'Kygo', 'Nelly', 'Billy Joel', 'Cage the Elephant', 'The Kooks', 'System of a Down', 'Two Door Cinema Club', 'T-Pain', 'Martin Garrix', 'P!NK', 'Rick Ross', 'The Neighbourhood', 'Logic', 'Eagles', 'Bruce Springsteen', 'Beck', 'Death Cab for Cutie', 'Meek Mill', 'Tiësto', 'Journey', 'Clean Bandit', '5 Seconds of Summer', 'French Montana', 'Lil Uzi Vert', 
 'Vance Joy', 'Meghan Trainor', 'Eric Clapton', 'Sean Paul', 'DJ Snake', 'M83', 'Snow Patrol', 'Mark Ronson', 'Fun.', 'Tove Lo', 'Phoenix', 'SZA', 'Diplo', 'The Smashing Pumpkins', 'The 1975', 'Luke Bryan', 'ScHoolboy Q', 'Nas', 'Lady A', 'Slipknot', 'Florence + The Machine', '21 Savage', 'Daft Punk', 'The Beach Boys', 'Rae Sremmurd', 'The Who', 'J Balvin', 'Flume', 'Depeche Mode', 'Camila Cabello', 'The Offspring', 'YG', 'Marshmello', 'Gotye', 'Lupe Fiasco', 'Charlie Puth', 'Deadmau5', 'Little Mix', 'Pixies', 'ZAYN', 'The Goo Goo Dolls', 'will.i.am', 'Wale', 'Santana', 'M.I.A.', 'Passenger', 'R. Kelly', 'Modest Mouse', 
 'Harry Styles', 'Iggy Azalea', 'Jason Aldean', 'Carly Rae Jepsen', 'Gwen Stefani', 'Alessia Cara', 'Timbaland', 'Passion Pit', 'Carrie Underwood', 'Fetty Wap', 'Daddy Yankee', 'Lynyrd Skynyrd', 'Kodak Black', 'Evanescence', 'Franz Ferdinand', 'Juicy J', 'Moby', 'Mary J. Blige', 'The National', 'Rascal Flatts', 'Robin Thicke', 'Fergie', 'Mike Posner', 'Bryson Tiller', 'Jhené Aiko', 'Tim McGraw', 'Kehlani', 'Korn', 'Lily Allen', 'Kiss', 'Lil Yachty', 'Rod Stewart', 'Owl City', 'Bryan Adams', 'Swedish House Mafia', 'Labrinth', 'Incubus', 'Norah Jones', 'Van Morrison', 'Queens of the Stone Age', 'Neil Young', 'Keith Urban',
  'James Blake', 'Yeah Yeah Yeahs', 'Kid Ink', 'The All-American Rejects', 'Three Days Grace', 'Band of Horses', 'Christina Perri', 'The Game', 'Disturbed', 'Paul McCartney', 'Florida Georgia Line', 'The Shins', 'Bebe Rexha', 'Blackbear', 'James Arthur', 'Zac Brown Band', 'Bring Me The Horizon', 'Blake Shelton', 'Thirty Seconds to Mars', 'Blur', 'Ciara', 'Mac Miller', 'George Ezra', 'Charli XCX', 'Sublime', 'Taio Cruz', 'Earth, Wind & Fire', 'Birdy', 'Fifth Harmony', 'Grouplove', 'Nine Inch Nails', 'MØ', 'A$AP Ferg', 'James Blunt', 'Iron & Wine', 'Portugal. The Man', 'Tory Lanez', 'PARTYNEXTDOOR', 'Sufjan Stevens', 
  'Avenged Sevenfold', 'Massive Attack', 'Fleet Foxes', 'James Bay', 'All Time Low', 'Quavo', 'Empire of the Sun', 'Dave Matthews Band', 'Steve Aoki', '3 Doors Down', 'Foals', 'Beach House', 'Backstreet Boys', 'Russ', 'AWOLNATION', 'Ice Cube', 'Edward Sharpe & The Magnetic Zeros', 'Nelly Furtado', 'Ozzy Osbourne', 'Papa Roach', 
'A Boogie Wit da Hoodie', 'Bad Bunny', 'BTS', 'Troye Sivan', 'Pusha T', 'Lykke Li', 'Zara Larsson', 'Missy Elliott', 'Marilyn Manson', 'Iron Maiden', 'Def Leppard', 'Van Halen', 'The Temper Trap', 'Counting Crows', 'Rise Against', 'Busta Rhymes', 'Young the Giant', 'Sean Kingston', 'Colbie Caillat', 'Keane', 'Sara Bareilles', 'Brad Paisley', 'Sting', 'Machine Gun Kelly', 'Rita Ora', "Plain White T's", 'Anderson .Paak', 'Milky Chance', 'Jimmy Eat World', 'Jonas Brothers', 'Rudimental', 'Walk the Moon', 'Kenny Chesney', 'Sigur Rós', 'Afrojack', 'Mac DeMarco', 'Macklemore', 
'Neon Trees', 'Olly Murs', 'Lenny Kravitz', 'New Order', 'Glass Animals', 'Kasabian', 'Duran Duran', 'No Doubt', 'Blondie', 'Celine Dion', 'Ben Howard', 'A Tribe Called Quest', 'LMFAO', 'Chemical Brothers', 'Cold War Kids', 'Gym Class Heroes', 'Trippie Redd', 'Waka Flocka Flame', 'Sum 41', 'Nick Jonas', 'TLC', 'Alice In Chains', 'Jeezy', 'Robbie Williams', 'Glee Cast', 'Alabama Shakes', 'Leona Lewis', 'Wu-Tang Clan', 'HAIM', 'Regina Spektor', 'Limp Bizkit', 'Doja Cat', 'Lauv', 'Phil Collins', 'Bloc Party', 'Feist', 'Yo Gotti', 'ODESZA', 'Tinie Tempah', 'Erykah Badu', 'Jess Glynne', 
'Aloe Blacc', 'X Ambassadors', 'Armin van Buuren', 'Breaking Benjamin', 'CHVRCHES', 'Lil Baby', 'The Verve', 'Joey Bada$$', 'My Chemical Romance', 'Offset', 'The Naked and Famous', 'Playboi Carti', 'Toto', 'Rex Orange County', 'Alanis Morissette', 'Melanie Martinez', 'Shaggy', 'Daniel Caesar', 'Aminé', '6LACK', 'Maluma', 'Angus & Julia Stone', 'The Wombats', 'Miranda Lambert', 'MARINA', 'Interpol', 'Galantis', 'Shinedown', 'Justice', 'Alesso', 'Björk', 'Emeli Sandé', 'Lil Nas X', 'A Day to Remember', 'The Prodigy', 'The Flaming Lips', 'Hailee Steinfeld', 'Bonobo', 'Grizzly Bear',
 'Daryl Hall & John Oates', '3OH!3', 'Bazzi', 'Kali Uchis', 'Tears For Fears', 'ZZ Top', 'James Taylor', 'Paul Simon', 'The Wanted', 'La Roux', 'Robin Schulz', 'Miike Snow', 'Grimes', 'Five Finger Death Punch', 'Fatboy Slim', 'Ozuna', 'Lil Jon', 'Sheryl Crow', 'Gavin DeGraw', 'Kodaline', 'Fabolous', 'Common', 'Anne-Marie', 'Julia Michaels', 'Niall Horan', 'Hans Zimmer', 'Lionel Richie', 'The Pussycat Dolls', 'Nicky Jam', 'lil pump', 'Foreigner', 'Kelly Rowland', 'Matchbox Twenty', 'The Head and the Heart', 'Joji', 'Jamiroquai', 'Tinashe', 'Lifehouse', 'José González', 'Jamie Foxx',
  'Jonas Blue', 'Dido', 'Icona Pop', 'Damien Rice', 'Vince Staples', 'Mika', 'Lizzo', 'Deftones', 'Cyndi Lauper', 'Hot Chip', 'Boyz II Men', 'Rammstein', 'Kylie Minogue', 'The Temptations', 'The Band Perry', 'Good Charlotte', 'Jorja Smith', 'Eric Church', 'Tracy Chapman', 'Seether', 'Local Natives', 'Her', 'CeeLo Green', 'Simple Plan', 'London Grammar', 'Spoon', 'NF', 'Phantogram', 'John Newman', 'Deep Purple', 'Paolo Nutini', 'Kaiser Chiefs', 'Scorpions', 'DMX', 'Mötley Crüe', 'Janelle Monáe', 'Metro Boomin', 'Al Green', 'Fitz & The Tantrums', 'Alan Walker', 'Lewis Capaldi', 'Metric', 
  'Wilco', 'Stone Temple Pilots', 'Boston', 'Luis Fonsi', 'The Roots', 'NERO', 'Jack White', 'Bill Withers', 'Placebo', 'Gnarls Barkley', 'Tegan and Sara', 'Kid Rock', 'Santigold', 'Rich the Kid', 'Natasha Bedingfield', 'Daughter', 'Bombay Bicycle Club', 'Bullet for My Valentine', 'Ray LaMontagne', 'Tool', 'Brockhampton', 'Portishead', 'Ratatat', 'Dolly Parton', 'Third Eye Blind', 'Kyle', 'Daughtry', 'Beirut', 'Far East Movement', 'Kaskade', 'Kevin Gates', 'Cake', 'Pentatonix', 'BANKS', 'Becky G', 'E-40', 'Rage Against The Machine', 'Black Sabbath', 'Toby Keith', 'Jay Sean', 'Capital Cities', 
  'Willie Nelson', 'Swae Lee', 'Steve Miller Band', 'Ingrid Michaelson', 'Dierks Bentley', 'Tom Odell', 'Keri Hilson', 'Years & Years', 'Magic!', 'Cypress Hill', 'Little Dragon', 'Estelle', 'PnB Rock', 'Sleeping With Sirens', 'Gunna', 'Crystal Castles', 'Thomas Rhett', 'Robyn', 'Ms. Lauryn Hill', 'Billy Idol', 'Sam Hunt', 'Air', 'Pantera', 'Chief Keef', 'Desiigner', 'Stereophonics', 'Alice Cooper', 'Iggy Pop', 'AlunaGeorge', 'George Strait', 'Aretha Franklin', 'Belle and Sebastian', 'Skylar Grey', 'Dababy', 'Selena Gomez & The Scene', 'Janet Jackson', 'a-ha', 'Cat Power', 'Jaden', 'Don Omar', 'Benny Benassi', 'Broken Bells', 
  'Stromae', 'Lord Huron', 'Lukas Graham', 'NAV', 'The Vamps', 'The Avett Brothers', 'WIZKID', 'Peter Bjorn and John', 'Mos Def', 'Sage the Gemini', 'Bright Eyes', 'N.W.A.', 'TV On the Radio', 'Oh Wonder', 'Andy Grammer', 'Prince Royce', 'Ski Mask The Slump God', 'GoldLink', 'Sarah McLachlan', 'Earl Sweatshirt', 'Peter Gabriel', '6ix9ine', 'INXS', 'Heart', 'Megadeth', 'LCD Soundsystem', 'Nick Cave and The Bad Seeds', 'Leon Bridges', 'The Decemberists', 'Hardwell', 'The Vaccines', 'Shania Twain', 'Metronomy', 'James Morrison', 'Rich Homie Quan', 
'Toro y Moi', 'Shelley FKA DRAM', 'Kelis', 'Juice WRLD', 'Mayday Parade', 'City and Colour', 'Rush', 'Romeo Santos', 'DNCE', 'Mario', 'BØRNS', 'St. Vincent', 'Skillet', 'Wyclef Jean', 'The Lonely Island', 'Ryan Adams', 'Asking Alexandria', 'Rob Zombie', 'Plan B', 'Boys Like Girls', 'Young Money', 'Staind', 'Daya', 'Röyksopp', 'Jay Rock', 'Jordin Sparks', 'Ben Harper', 'BASSNECTAR', 'Eddie Vedder', 'Darius Rucker', 'Stormzy', 'Skepta', 'SBTRKT', 'Cobra Starship', 'Kaytranada', 'Chris Stapleton', 'Lil Dicky', 'Animal Collective', 'Cascada', 'Caribou', 'Cheat Codes', 'gnash',
'Tech N9ne', 'Hunter Hayes', 'Tom Waits', 'Clairo', 'Pierce the Veil', 'Kool & The Gang', 'N.E.R.D.', 'The Stone Roses', 'Doobie Brothers', 'Ja Rule', 'Alex Clare', 'Martin Solveig', 'The Ting Tings', 'Yellowcard', 'Cher', 'The Raconteurs', 'The Fratellis', 'Jake Bugg', 'Neil Diamond', 'The Cranberries', 'Marc Anthony', 'Dizzee Rascal', 'Kansas', 'Hollywood Undead', 'PSY', 'Simple Minds', 'First Aid Kit', 'Tom Petty And The Heartbreakers', 'Matt and Kim', 'Chicago', 'Washed Out', 'Phillip Phillips', 'Flux Pavilion', 'Jon Bellion', 'Tenacious D', 'Ginuwine', 'The Civil Wars', 'Dillon Francis', 'Godsmack', 
'My Morning Jacket', 'Liam Payne', 'Cher Lloyd', 'LL Cool J', 'Corinne Bailey Rae', 'Bush', 'Smash Mouth', 'Duke Dumont', 'Ricky Martin', 'James Vincent McMorrow', 'Keyshia Cole', 'Iyaz', 'Creed', 'Flying Lotus', 'Adam Lambert', 'We The Kings', 'Pendulum', 'Billy Currington', 'Taking Back Sunday', 'lil skies', 'Craig David', 'Ludovico Einaudi', 'Naughty Boy', 'Ella Mai', 'Adam Levine', 'Supertramp', 'Example', 'Flight Facilities', 'Andrew Bird', 'SB19', 'Silversun Pickups', 'R3HAB', 'ZHU', 'Omarion', 'Stone Sour', 'UB40', 'The Isley Brothers', 'Jamie xx', 'Jessie Ware', 'Steely Dan', 'Wolfmother', 'Little Big Town', 'Ashanti', 
'David Gray', 'Brandy', 'PJ Harvey', 'Michael Kiwanuka', 'Kacey Musgraves', 'Blue Öyster Cult', 'Fat Joe', 'American Authors', 'Lee Brice', 'AJR', '311', 'Travie McCoy', 'Switchfoot', 'John Williams', 'Hoobastank', 'Cigarettes After Sex', 'Will Smith', 'Solange', 'Biffy Clyro', 'BLACKPINK', 'The-Dream', 'Royal Blood', 'Enya', 'Jake Owen', 'Alan Jackson', 'The Chicks (US)', 'Survivor', 'Willow', 'Olivia Rodrigo', 'Porter Robinson', 'Father John Misty', 'Soundgarden', 'Chris Young', 'Dropkick Murphys', 'The Animals', 'The Drums', 'Mura Masa', 'Stevie Nicks', 'Farruko', 'Seal', 'Chromeo', 'Garbage', 'Editors', 'Lloyd', 
'Unknown Mortal Orchestra', 'Pretty Lights', 'Elbow', 'Diddy', 'Sugarland', 'Bone Thugs-n-Harmony', 'The War on Drugs', 'Purity Ring', 'Pet Shop Boys', 'Duffy', 'Nico & Vinz', 'Snakehips', 'Denzel Curry', 'YoungBoy Never Broke Again', 'Fiona Apple', 'Tori Kelly', 'Cheap Trick', 'Take That', 'Catfish and the Bottlemen', 'Megan Thee Stallion', 'Judas Priest', 'Conor Maynard', 'The Used', 'Matisyahu', 'Jax Jones', 'Slayer', 'OK Go', 'Danny Brown', 'Mr Probz', 'Hillsong United', '$UICIDEBOY$', "Rag'n'Bone Man", 'Maná', 'Chet Faker', 'Groove Armada', 'MadeinTYO', 'Dan + Shay', 'August Alsina', 'Soulja Boy', 'The Red Jumpsuit Apparatus',
 'OMI', 'Imogen Heap', 'Chase & Status', 'Aphex Twin', 'A Perfect Circle', 'Eels', 'Brand New', 'Maxwell', 'Sade', 'Diana Ross', 'Theory of a Deadman', 'Jet', 'Thievery Corporation', 'Scissor Sisters', 'Talib Kweli', 'Sampha', 'The Cardigans', 'Cut Copy', 'EXO', 'Jennifer Hudson', "Jane's Addiction", 'Kiiara', 'Goldfrapp', 'Twista', 'Knife Party', 'Pretenders', 'Jill Scott', 'Styx', 'Blackstreet', 'Mazzy Star', 'Prince', 'Sleeping At Last', 'Puddle of Mudd', 'Kenny Loggins', 'Barenaked Ladies', 'Jesse McCartney', 'YNW Melly', 'De La Soul', 'The Internet', 'Matt Nathanson', 'Echosmith', 'KT Tunstall', 'Violent Femmes', 'Explosions in the Sky',
  'Alina Baraz', 'Chevelle', 'Bowling for Soup', 'Deorro', 'KALEO', 'MKTO', 'Falling In Reverse', 'Jessie Reyez', 'Atmosphere', 'A$AP Mob', 'DJ Shadow', 'Dean Lewis', 'Juanes', 'Hinder', 'The Cinematic Orchestra', 'Metro Station', 'The Commodores', 'Whitesnake', 'Brantley Gilbert', 'Method Man', 'Faith No More', 'Broken Social Scene', 'REO Speedwagon', 'Hot Chelle Rae', "D'Angelo", 'Famous Dex', 'Lil Durk', 'Roddy Ricch', 'Morrissey', 'Lost Frequencies', "The B-52's", 'Basement Jaxx', 'The Tallest Man On Earth', 'Die Antwoord', 'The Kills', 'Jungle', 'Eric Prydz', 'Tom Misch', 'Chiddy Bang', 'AFI', 'Mogwai', 'Noah Cyrus', 'Kimbra', 'Echo & The Bunnymen',
   'Four Tet', 'Real Estate', 'Future Islands', 'Felix Jaehn', 'Thundercat', 'Idina Menzel', 'Bee Gees', 'Poison', 'Krewella', 'The Cars', 'Killswitch Engage', 'Kurt Vile', 'Baby Bash', 'Annie Lennox', 'Brent Faiyaz', 'Pulp', 'Hoodie Allen', 'The Hives', 'Vic Mensa', 'Action Bronson', 'Toni Braxton', 'Josh Turner', 'Manu Chao', 'Blood Orange', 'Pat Benatar', 'Dr. Dog', 'Aventura', 'D12', 'Elvis Costello', 'RÜFÜS DU SOL', 'Paloma Faith', 'Mustard', 'Of Mice & Men', 'Tina Turner', 'K Camp', 'Dej Loaf', 'Fort Minor', 'FKA twigs', 'Dashboard Confessional', 'Yeasayer', 'Dexys Midnight Runners', 'Coolio', 'STRFKR', 'Zero 7', 'Fugees', 'The Human League',
    'LANY', 'Gary Clark Jr.', 'Majid Jordan', 'of Montreal', 'Mobb Deep', 'Live', 'America', 'Yes', 'The Pretty Reckless', 'Cash Cash', 'John Mellencamp', 'Crowded House', 'Escape the Fate', 'Public Enemy', 'New Boyz', 'Austin Mahone']
# from flask_debugtoolbar import DebugToolbarExtension 

completed = []
failed = []
"""Imports from our own costum modules"""
from sent_analysis import polarize, tokenize
from models import connect_db, db, Song, Artist
from api import serialize_artist, serialize_song
from math_helpers import Math
math = Math()

"""Data Imports"""
from wordcloud import WordCloud, STOPWORDS
stopwords = ["lyrics", "lyrics", "Embed"] + list(STOPWORDS)
wc= WordCloud(stopwords=stopwords, background_color="white")
from matplotlib import pyplot as plt
plt.switch_backend('Agg')
plt.style.use("fivethirtyeight")
import numpy as np
import io
import sys, os
os.chdir(sys.path[0])
import base64

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///lyrics'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "topsecret1"
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app)

connect_db(app)

db.create_all()

genius = Genius('aPt0Y03tHHx7XAVyDWcJUzgaR7qBN5_D1-Dg_s-BBgTO8ifIJUB0toLzQ0P2YKCF')
#modifies our genius object with params to narrow down search results
genius.excluded_terms = ["(Remix)", "(Live)"]
genius.skip_non_songs = True
genius.remove_section_headers = True
genius.retries = 1

db.drop_all()
db.create_all()


def download_artist(name, quantity = 100):
    # quantity refers to number of songs returned with artist in artist.songs

    # if searching an artist tends to be problematic, it might be worth trying to change the  "allow_name_change" 
    # default parameter to 'true'. From docs allow_name_change (bool, optional) – If True, search attempts to switch
    # to intended artist name.
    # Edit: This might already be set to true? When searching Santana, automatically changes artist name to 'Juelz Santana'
    try:
        artist = genius.search_artist(name, max_songs=quantity, sort="popularity")
        # in /Desktop/repos-git/lyrics_savant/venv/lib/python3.9/site-packages/lyricsgenius/api/base.py:84, I've set a 'break' before the 
        # timeout error to ensure that a timeout for a single song doesn't halt the entire search. It seems like this simply lets said song 
        # be skipped in favor of the next one (due to the request taking too much time)
        # make sure this is working like i think it is

        #save artist to our database extracting the information that we want from lyricsgenius API
        res = genius.artist(artist.id)
        data = res['artist']
        artist_name = data['name']
        bio = data['description']['plain']
        image = data['image_url']
        # our Artist sqlalchemy object is assigned the same ID given to us by lyricsgenius api for convenience
        our_artist = Artist(id = artist.id, name = artist_name, bio = bio, image = image)
        db.session.add(our_artist)
        db.session.commit()

        if artist.songs:
            # our lyricsgenius artist object may or may not return songs depending on the second arg of our find_artist function
            # if songs are indeed present, we call save_lyrics, which saves each song to our db
            songs = save_lyrics(artist)
            pol_score = math.avg_pol(songs)
            print("pol score from download function", pol_score)
            our_artist.pol_score = pol_score
            db.session.commit()

        completed.append(name)
        print(f"completed seeding data for {name}")
    except:
        failed.append(name)
        print(f"failed seeding data for {name}")

    finally:
        pass
    return artist.id

def save_lyrics(artist):
    """Retrieves lyrics, runs SA on each song, saves song to database along with SA scores"""
    songs = []
    for song in artist.songs:
        try:
            res = genius.song(song.id)
            data = res['song']
            title = data['title']
            release_date = data['release_date']
            image = data['song_art_image_thumbnail_url']
            song_id = data['id']
            url = data['url']
            #lyrics can be retrieved by either genius.lyrics(song_url=url) or genius.lyrics(song_id)
            #however, is seems like the latter requires a second request, causing it to be slower
            lyrics = genius.lyrics(song_url=url)
            score = polarize(lyrics)
            our_song = Song(id = song_id, title=title, image=image, release_date=release_date,
                        lyrics=lyrics, artist_id = artist.id, score=score)
            songs.append(our_song)
            db.session.add(our_song)
            db.session.commit()
        except:
            print(f"problem adding song with id {song.id}")
        finally:
            pass
    
    return songs

for artist in data:
    download_artist(artist)

def get_wordcloud(text):
    image = wc.generate(text).to_image()
    img = io.BytesIO()
    image.save(img, "PNG")
    img.seek(0)
    img_b64 = base64.b64encode(img.getvalue()).decode()
    # source: https://www.codementor.io/@garethdwyer/building-news-word-clouds-using-python-and-repl-it-sy7l88roq
    return img_b64

def save_plt_png(plt):
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    image = base64.b64encode(img.getvalue()).decode()
    plt.clf()
    return image

def get_unique_words_bar(artist_id1, artist_id2):
    # reference https://www.youtube.com/watch?v=nKxLfUrkLE8&t=42s
    artist1 = Artist.query.get(artist_id1)
    artist2 = Artist.query.get(artist_id2)
   
    lyrics1 = generate_composite(artist_id1)
    lyrics2 = generate_composite(artist_id2)

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

    image = save_plt_png(plt)
    return image

def get_pol_bar(artist_id1, artist_id2):
    artist1 = Artist.query.get(artist_id1)
    artist2 = Artist.query.get(artist_id2)
   
    pol1 = artist1.pol_score
    pol2 = artist2.pol_score

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

    image = save_plt_png(plt)
    return image

def get_pie(artist_id):
    labels = ["Positive", "Neutral", "Negative"]
    colors = ['#6d904f', '#e5ae37', '#fc4f30']   # green, yellow, red
    artist = Artist.query.get(artist_id)
    pol = artist.pol_score
    data = json.loads(pol, object_hook=lambda d: SimpleNamespace(**d))
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


def generate_composite(artist_id):
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

@app.route("/")
def home():
    """WordCloud"""
    artist1 = Artist.query.get(604).id
    artist2 = Artist.query.get(9534).id
    lyrics = generate_composite(artist1)
    wc_img = get_wordcloud(lyrics)

    """Pie Chart"""
    pie_img = get_pie(artist1)

    """Unique Words Bar Chart"""
    bar_img = get_unique_words_bar(artist1, artist2)
  
    """Polarity Bar Chart"""
    pol_img = get_pol_bar(artist1, artist2)

    artist1 = Artist.query.get(artist1)
    artist2 = Artist.query.get(artist2)


    songs1 = artist1.songs
    songs2 = artist2.songs

    for song in songs1:
        print(song.lyrics)
    
    for song in songs2:
        print(song.lyrics)


    return render_template('home.html', wc_img = wc_img, pie_img = pie_img, bar_img = bar_img, pol_img = pol_img)

@app.route("/api/artists/")
def get_all_artists():
    """Return JSON for all artists in database"""
    artists = Artist.query.all()
    serialized = [serialize_artist(a) for a in artists]
    return jsonify(artists=serialized)

@app.route("/api/artists/<int:id>")
def get_artist(id):
    """Return JSON for a specific artist in database"""
    artist = Artist.query.get(id)
    serialized = serialize_artist(artist)
    return jsonify(artists=serialized)

@app.route("/api/artists/<int:id>/songs")
def get_songs_by_artist(id):
    artist = Artist.query.get(id)
    serialized = [serialize_artist(song) for song in artist.songs]
    return jsonify(songs=serialized)

@app.route("/api/artists/<int:artist_id>/<int:song_id>")
def get_song_by_artist(artist_id, song_id):
    artist = Artist.query.get(artist_id)
    print(artist)
    song = Song.query.get(song_id)
    serialized = serialize_song(song)
    return jsonify(songs=serialized)

@app.route("/api/artists/", methods=["POST"])
def add_artist():
    name = request.json["name"]
    quantity = request.json["quantity"]
    our_artist = download_artist(name, quantity)
    response = jsonify(serialize_artist(our_artist))
    return (response, 201)


#https://lyricsgenius.readthedocs.io/en/master/reference/genius.html
# https://lyricsgenius.readthedocs.io/en/master/reference/types.html



