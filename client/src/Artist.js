import React, { useState, useEffect } from 'react';
import BarChart from "./BarChart.js";
import PieChart from './PieChart';
import WordsChart from './WordsChart';
import WordCloudFunc from './WordCloud';
import { Bars, Circles, Grid } from 'react-loader-spinner';

function Artist({ artist }) {

    console.log("Rendering artist:", artist)

    return (
        <div>
            <div>
                <img src={artist.image} />
                Bio: {artist.bio}
                <p>{artist.name} uses {artist.vocab_score} unique words!</p>
                <WordCloudFunc artist={artist} />,
                <PieChart artist={artist} />
            </div>
        </div>
    )

}

export default Artist;


// return (
//     !isLoading ? (
//         <div>
//             <img src={artist1.image} />
//             Bio: {artist1.bio}
//             <p>{artist1.name} uses {artist1.vocab_score} unique words!</p>
//             <WordCloudFunc artist={artist1} />,
//             <PieChart artist={artist1} />
//         </div>
//     ) : (
//         <div className="App">
//             Loading...
//             <Circles color="#00BFFF" height={80} width={80} />
//         </div>
//     ))

// }

// return (
//     <div>
//         <img src={artist.image} />
//         Bio: {artist.bio}
//         <p>{artist.name} uses {artist.vocab_score} unique words!</p>
//         <WordCloudFunc artist={artist} />,
//         <PieChart artist={artist} />
//     </div>
// )