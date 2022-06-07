import PieChart from './charts/PieChart';
import WordCloudFunc from './charts/WordCloud';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import React from 'react';



function Artist({ artist }) {
    console.log("Rendering artist:", artist)


    return (
        <React.Fragment>
            <Grid item spacing={3}>
                <div>
                    <img width="300px;" src={artist.image} />
                    <p>Bio: {artist.bio.slice(0, 300)} + more</p>
                </div>
            </Grid>
            <Grid item spacing={3}>
                <div>
                    <p>{artist.name} uses {artist.vocab_score} unique words!</p>
                    {/* <WordCloudFunc width="300px;" artist={artist} />, */}
                </div>
            </Grid>
            <Grid item spacing={3}>
                <div>
                    <PieChart artist={artist} />
                </div>
            </Grid>
        </React.Fragment >

    )
}

export default Artist;

