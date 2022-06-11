import BarChart from "./charts/BarChart"
import WordsChart from "./charts/WordsChart"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import React from 'react';

function Compare({ artist1, artist2 }) {
    console.log("rendering compare component")
    return (
        <React.Fragment >
            <div className="column">

                <img className="item" src="https://blackmantkd.com/wp-content/uploads/2017/04/default-image.jpg" />


                <WordsChart className="item" artist1={artist1} artist2={artist2} />


                <BarChart className="item" artist1={artist1} artist2={artist2} />
            </div>

        </React.Fragment>
    )
}






export default Compare;