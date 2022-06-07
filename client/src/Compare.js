import BarChart from "./charts/BarChart"
import WordsChart from "./charts/WordsChart"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import React from 'react';

function Compare({ artist1, artist2 }) {
    console.log("rendering compare component")
    return (
        <React.Fragment>
            {/* <Grid item >
                <img width="300px;" src="https://blackmantkd.com/wp-content/uploads/2017/04/default-image.jpg" />
            </Grid> */}
            <Grid item >
                <WordsChart artist1={artist1} artist2={artist2} />
            </Grid>
            <Grid item >
                <BarChart artist1={artist1} artist2={artist2} />
            </Grid>
        </React.Fragment>
    )
}






export default Compare;