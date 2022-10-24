# Lyric Savant

## `Tech Stack`
Python, Flask, Sqlalchemy, Postgres, Javascript, React, CSS, HTML.
### External Libraries
#### Python
NLTK, MatPlotLib, WordCloud.
#### Javascript
SWR, Axios, React Router, Material UI, Chart.js

## `Summary`

Lyric Savant is a data-driven User Interface that leverages the Lyrics Genius API to webscrape an artist's lyrics to display a module that includes their biographical information, a sample of their lyrics, and statistical insights regarding their vocabulary and polarity scores of their lyrics. Artists can be compared side-by-side to help users visualize such data insights. If an artist is not already present in our database, users have the option to contribute to the project by submitting an http request to our API to seed said artist to our database. Learn more about our RESTFUL API below. 

## `Lyrics Savant API`

We have built an API using Restful principles to handle the flow of data between the user interface, our own Postgres database, and the Lyrics Genius web-scraping API. Due to the fact that the Lyrics Genius API doesn't directly store lyrical data and instead relies on sending HTTP requests for each song by an artist, I decided to build my own API to interface between users and our database. At the time of writing, over 1000 popular artists, each having a sample of 40 lyrics amongst other information have been saved to our Postgres database. In v2, a program will be added to automatically find new artists not already included in the database, and will proceed to seed those artists. Our API interacts with the front-end by responding to GET requests asking for song and artist information, as well has handling POST requests to seed a new artist to the database. 

## `User Flow`
Lyrics Savant uses React Router to allow client-side routing between a `Home` page which renders data results for an artist, and a `Contribute` page. The insights page contains a search bar with a checkbox that allows an optional 2nd search bar for an additional artist if the user wishes to compare two separate artists. Instructions are included in containers a the bottom of the page. A user must select at least one artist that already exists in the site database for the `Get Insights` button to become enabled. Likewise, a user must enter an artist into the search bar in the `Contribute` page that does *not* already exist in the database of the `Seed Artist` button to become enabled. After clicking `Get Insights`, a module renders containing an artist's photo, biography, vocabulary size, lyrics samples, wordcloud, and pie-chart containing polarity data. If an additional artist is searched for, an additional component is rendered between the two artists that displayes a bar graph comparing the vocabulary size of each artist as well as polarity data.

## `Data Flow`
The flow of data from the Lyrics Genius API to the UI is roughly written below. The same data flow occurs in reverse order, and then back again for POST requests initiated by a user seeding a new artist.
`Lyrics Genius API ---Lyrics Savant Api---> Lyrics Savant Postgres DB ----Lyrics Savant Api---> Fetch JS Requests`
