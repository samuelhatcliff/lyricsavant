import BarChart from "./charts/BarChart"
import WordsChart from "./charts/WordsChart"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import React from 'react';

function Compare({ artist1, artist2 }) {
    console.log("rendering compare component")
    return (
        <React.Fragment >
            <div className="column">

                <div className="item"  >
                    <span className="vs-text">{artist1.name}</span>
                    <Avatar alt={artist1.name}
                        src={artist1.image}
                        sx={{ width: 80, height: 80, marginTop: 1, marginBottom: 1 }} />
                    <span className="vs-text">VS</span>
                    <Avatar alt={artist2.name}
                        src={artist2.image}
                        sx={{ width: 80, height: 80, marginTop: 1, marginBottom: 1 }} />
                    <span className="vs-text">{artist2.name}</span>
                </div>


                <WordsChart className="item" artist1={artist1} artist2={artist2} />


                <BarChart className="item" artist1={artist1} artist2={artist2} />
            </div>

        </React.Fragment>
    )
}






export default Compare;