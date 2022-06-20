import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FEFEFE '
        }
    }
}
);

const Explanation = () => {
    return (
        <Box sx={{ flexGrow: 1 }} style={{ padding: 10, margin: 3 }}>
            <Grid container spacing={3}>
                <ThemeProvider theme={theme}>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{
                            ':hover': {
                                boxShadow: 6,
                            },
                            backgroundColor: 'primary.main',
                            borderRadius: 3,
                            boxShadow: 2
                        }} style={{ textAlign: 'center', padding: 3 }}>
                            <h2>How It Works</h2>
                            <p style={{ textAlign: 'center', padding: 10, margin: 3 }}>Lyrics Savant uses web scraping to extract lyrics for a given artist and generate
                                data insights based on the text contents of each lyric. The number of unique words
                                used is calculated alongside polarity data to determine whether the content of an
                                artist's lyrics leans more positive or negative.</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{
                            ':hover': {
                                boxShadow: 6,
                            },
                            backgroundColor: 'primary.main',
                            borderRadius: 3,
                            boxShadow: 2
                        }} style={{ textAlign: 'center', padding: 3 }}>
                            <h2>Side-By-Side Comparisons</h2>
                            <p style={{ textAlign: 'center', padding: 10, margin: 3 }}>Have you ever wanted to know if an artist has a larger vocabulary than another? What about which artist tends to use a more
                                optimistic vs pessimistic tone? Check "Compare two separate artists" to generate results for each artist that includes
                                charts comparing the number of unique words used and polarity data to acquire insights as to
                                how one might compare to another.
                            </p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{
                            ':hover': {
                                boxShadow: 6,
                            },
                            borderRadius: 3,
                            backgroundColor: 'primary.main',
                            boxShadow: 2
                        }} style={{ textAlign: 'center', padding: 3 }}>
                            <h2>Contribute</h2>
                            <p style={{ textAlign: 'center', padding: 10, margin: 3 }}>We may not yet have scraped the web
                                for the lyrics of your favorite niche artist. You can check to see if an artist is already included in our database
                                by typing their name into the search bar and seeing if they appear as a suggested result. If the artist does not appear
                                and you would like to generate data for this artist, click the "Contribute" tab in the navbar and enter the artist in the
                                search bar. Please be patient as the artist seeds to our database, as separate request are required to scrape lyrics for each
                                song.
                            </p>
                        </Paper>
                    </Grid>
                </ThemeProvider>
            </Grid>
        </Box>
    )
}

export default Explanation;