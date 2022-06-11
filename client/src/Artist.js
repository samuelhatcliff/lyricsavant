import PieChart from './charts/PieChart';
import WordCloudFunc from './charts/WordCloud';
import Grid from '@mui/material/Grid';
import React from 'react';



function Artist({ artist }) {
    console.log("Rendering artist:", artist, artist.image, artist.bio)
    return (
        <React.Fragment >
            <div className="column">
                <div className="item">
                    <div >
                        <img width="100%" height="100%" src={artist.image} />
                    </div>
                    <span className="text">Bio: {artist.bio.slice(0, 300)} + more</span>
                </div>
                <span className="text">{artist.name} uses {artist.vocab_score} unique words!</span>
                <WordCloudFunc className="item" artist={artist} />,
                <PieChart className="item" artist={artist} />
            </div>
        </React.Fragment >

    )
}

export default Artist;

