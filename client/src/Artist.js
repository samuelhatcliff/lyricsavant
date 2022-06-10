import PieChart from './charts/PieChart';
import WordCloudFunc from './charts/WordCloud';
import Grid from '@mui/material/Grid';
import React from 'react';



function Artist({ artist }) {
    console.log("Rendering artist:", artist)
    return (
        <React.Fragment>
            <Grid item spacing={3}>
                <img width="100px;" src={artist.image} />
                <p>Bio: {artist.bio.slice(0, 300)} + more</p>
            </Grid>
            <Grid item spacing={3}>
                <p>{artist.name} uses {artist.vocab_score} unique words!</p>
                {/* <WordCloudFunc width="300px;" artist={artist} />, */}
            </Grid>
            <Grid item spacing={3}>
                <PieChart artist={artist} />
            </Grid>
        </React.Fragment >

    )
}

export default Artist;

