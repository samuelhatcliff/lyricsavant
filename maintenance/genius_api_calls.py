"""Lyrics genius API imports and config"""
import os
from lyricsgenius import Genius
api_key = os.getenv('API_KEY')
genius = Genius(api_key) #the following configuration modifies our genius object with params to narrow down search results
genius.excluded_terms = ["(Remix)", "(Live)", "(Demo)"]
genius.skip_non_songs = True
genius.remove_section_headers = True
genius.retries = 1

"""Imports from our own costum modules"""
from models import db, Song, Artist, Message
from helpers import Math
from python_data_visuals import Python_Data_Visuals
pd = Python_Data_Visuals()
math = Math()
print('test change')
def download_artist(name, quantity = 40):
    #deletes data from last artist
    Message.query.delete()
    db.session.commit()
    completed = []
    failed = []
    # quantity refers to number of songs returned with artist in artist.songs

    # if searching an artist tends to be problematic, it might be worth trying to change the  "allow_name_change" 
    # default parameter to 'true'. From docs allow_name_change (bool, optional) – If True, search attempts to switch
    # to intended artist name.
    # Edit: This might already be set to true? When searching Santana, automatically changes artist name to 'Juelz Santana'
    try:
        artist = genius.search_artist(name, max_songs=quantity, sort="popularity", allow_name_change = False)
        # in /Desktop/repos-git/lyrics_savant/venv/lib/python3.9/site-packages/lyricsgenius/api/base.py:84, I've set a 'break' before the 
        # timeout error to ensure that a timeout for a single song doesn't halt the entire search. It seems like this simply lets said song 
        # be skipped in favor of the next one (due to the request taking too much time)
        # make sure this is working like i think it is

        if artist == None:
            print("artist was none")
            #Todo: Replace print statement with error handing
            return None
        #save artist to our database extracting the information that we want from lyricsgenius API
        res = genius.artist(artist.id)
        data = res['artist']
        artist_name = data['name']
        bio = data['description']['plain']
        image = data['image_url']
        # our Artist sqlalchemy object is assigned the same ID given to us by lyricsgenius api for convenience
        try:
            our_artist = Artist(id = artist.id, name = artist_name, bio = bio, image = image)
            db.session.add(our_artist)
            db.session.commit()
        except:
            print("Something went wrong when adding artist to DB")
            if Artist.query.get(artist.id):
                artist = Artist.query.get(artist.id)
                artist.name = artist_name
                artist.bio = bio
                artist.image = image
                db.session.commit()

        if artist.songs:
            # our lyricsgenius artist object may or may not return songs depending on the 2nd argument passed to this function
            # if songs are indeed present, we call save_lyrics, which saves each song to our db
            save_lyrics(artist)

        completed.append(name)
        print(f"completed seeding data for {name}")
        return artist
    except:
        failed.append(name)
        print(f"failed seeding data for {name}")
        #todo: replace print statement with error handling
        db.session.rollback()

    finally:
        pass

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
            lyrics = genius.lyrics(song_url=url)
            #Todo: if lyrics == null, raise error instead of adding to database

            if not lyrics:
                continue
            our_song = Song(id = song_id, title=title, image=image, release_date=release_date,
                        lyrics=lyrics, artist_id = artist.id)
            songs.append(our_song)
            db.session.add(our_song)
            db.session.commit()
            message = Message(msg = f"Added {title} to our database!")
            db.session.add(message)
            db.session.commit()
        except:
            print(f"problem adding song with id {song.id}")
            #todo: replace print statement with error handling
        finally:
            pass
    
    return songs


data = ['Major Lazer', 'Pharrell Williams', 'Tyga', 'blink-182', 'The xx', 'Bastille', 'Pearl Jam', 'The Cure', 'Macklemore & Ryan Lewis', 'Bon Iver', '50 Cent', 'Trey Songz', 'Mariah Carey', 'Dr. Dre', 'One Direction', 'Ty Dolla $ign', 'Enrique Iglesias', 'The Lumineers', '2 Chainz', 'Halsey', 'Nickelback', 'Jason Mraz', 'DJ Khaled', 'Jennifer Lopez', 'Train', 'Tame Impala', 'Jay-Z', 'Hozier', 'Chance the Rapper', 'The Strokes', 'Arcade Fire', 'Jack Johnson', 'Bob Dylan', 'Ne-Yo', 'Weezer', 'Tyler, The Creator', 'Kelly Clarkson', 'Michael Bublé', 'Avril Lavigne', 'Migos', 'Bon Jovi',
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

