import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from './Cards/Cards';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FEFEFE '
        }
    }
}
);

const heading1 = "How It Works";
const paragraph1 = `Lyrics Savant uses web scraping to extract lyrics for a given artist and generate data insights based on the text
 contents of each lyric. The number of unique words used is calculated alongside polarity data to determine whether the content of an
  artist's lyrics leans more positive or negative.`
const heading2 = "Side-By-Side Comparisons";
const paragraph2 = `Have you ever wanted to know if an artist has a larger vocabulary than another? What about which artist tends to use a more
optimistic vs pessimistic tone? Check "Compare two separate artists" to generate results for each artist that includes
charts comparing the number of unique words used and polarity data to acquire insights as to
how one might compare to another.`;
const heading3 = "Contribute";
const paragraph3 = `We may not yet have scraped the web
for the lyrics of your favorite niche artist. You can check to see if an artist is already included in our database
by typing their name into the search bar and seeing if they appear as a suggested result. If the artist does not appear
and you would like to generate data for this artist, click the "Contribute" tab in the navbar and enter the artist in the
search bar. Please be patient as the artist seeds to our database, as separate request are required to scrape lyrics for each
song.`

const Explanation = () => {
    return (<div>
        <hr></hr>
        <Box sx={{ flexGrow: 1 }} style={{ padding: 10, margin: 3 }}>
            <Grid container spacing={3}>
                <ThemeProvider theme={theme}>
                    <Card heading={heading1} paragraph={paragraph1}></Card>
                    <Card heading={heading2} paragraph={paragraph2}></Card>
                    <Card heading={heading3} paragraph={paragraph3}></Card>
                </ThemeProvider>
            </Grid>
        </Box>
    </div>
    )
}

export default Explanation;