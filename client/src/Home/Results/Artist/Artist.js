import PieChart from './Charts/PieChart';
import WordCloudFunc from './Charts/WordCloud';
import Biography from './Biography'
import Avatar from '@mui/material/Avatar';
import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import './Artist.css'

const findStopPoint = (text, wordLimit) => {
    let numSpaces = 0
    for (let i = 0; i < text.length - 1; i++) {
        if (text[i] === " ") numSpaces += 1;
        if (numSpaces === wordLimit) return i;
    }
}

function Artist({ artist }) {
    const [wc, setWc] = useState(null)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const bioStopIndex = findStopPoint(artist.bio, 14)

    console.log("artist:", artist)

    useEffect(() => {
        //Retrieves base64 wordcloud data from our API
        fetch(`/api/artists/${artist.id}/wc`).then(
            res => res.json().then(
                initialData => {
                    const data = initialData['data']
                    setWc(data)
                }
            ))
    }, [])

    return (
        <div className="column">
            <div className="item artist-info">
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Avatar alt={artist.name}
                        src={artist.image}
                        sx={{ width: 60, height: 60, marginTop: .5, marginLeft: 1 }} />
                    <div className="artist-header">
                        <div ><b>Artist: {artist.name}</b></div>
                    </div>
                </Stack>
                <hr></hr>
                <span className="bio-text">Bio: {artist.bio.slice(0, bioStopIndex)} {<a className="more" onClick={handleOpen}>...more</a>}
                </span>
                <span className="num-unique-words">{artist.name} uses {artist.vocab_score} unique words.</span>

            </div>

            <div className="item">
                {/* <WordCloudFunc artist={artist} /> */}
                <img
                    height="100%"
                    src={`data:image/jpeg;base64,${wc}`} />

            </div>
            <div className="item"><PieChart artist={artist} /></div>
            {open ? (
                <Biography artist={artist} open={open} handleClose={handleClose} />
            ) : (<></>)
            }
        </div >
    )
}

export default Artist;

