import React, { useState, useEffect } from 'react';
import BarChart from "./BarChart.js";
import PieChart from './PieChart';
import WordsChart from './WordsChart';
import WordCloudFunc from './WordCloud';

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

