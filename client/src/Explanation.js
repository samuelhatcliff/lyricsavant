import Typography from '@mui/material/Typography';




const Explanation = () => {

    return (
        <Typography variant="body2" component="div" gutterBottom>
            <h2>How It Works:</h2>

            <p>Lyrics Savant uses web scraping to extract lyrics for a given artist and generate
                data insights based on the text contents of each lyric. The number of unique words
                used is calculated alongside polarity data to determine whether the content of an
                artist's lyrics leans more positive or negative.</p>

            <h2>Side-By-Side Comparisons</h2>

            <p>Have you ever wanted to know if an artist has a larger vocabulary than another? What about which artist tends to use a more
                optimistic vs pessimistic tone? Check "Compare two separate artists" to generate results for each artist that includes
                charts comparing the number of unique words used and polarity data to acquire insights as to
                how one might compare to another.
            </p>

            <h2>Contribute</h2>
            <p>Although Lyrics Savant is constantly added more artists to our database, we may not yet have scraped the web
                for the lyrics of your favorite niche artist. You can check to see if an artist is already included in our database
                by typing their name into the search bar and seeing if they appear as a suggested result. If the artist does not appear
                and you would like to generate data for this artist, click the "Contribute" tab in the navbar and enter the artist in the
                search bar. Please be patient as the artist seeds to our database, as separate request are required to scrape lyrics for each
                song.
            </p>
        </Typography>

    )
}

export default Explanation;