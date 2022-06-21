import PieChart from './Charts/PieChart';
import Biography from './Biography'
import Lyrics from './Lyrics';
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

function Artist({ artist, artistSongs, compare, wc }) {
    //STATE
    // const [wc, setWc] = useState(null)
    const [openBio, setOpenBio] = useState(false);
    const [openLyrics, setOpenLyrics] = useState(false);
    //UTILITY FUNCTIONS
    const handleOpenBio = () => setOpenBio(true);
    const handleCloseBio = () => setOpenBio(false);
    const handleOpenLyrics = () => setOpenLyrics(true);
    const handleCloseLyrics = () => setOpenLyrics(false);
    const bioStopIndex = findStopPoint(artist.bio, 14)
    //DISPLAY MESSAGES
    const popularSongs = ` ${artistSongs[0]['title']} ${artistSongs[1]['title']},
     ${artistSongs[2]['title']},${artistSongs[3]['title']}, and ${artistSongs[4]['title']}.`

    // useEffect(() => {
    //     //Retrieves base64 wordcloud data from our API
    //     fetch(`/api/artists/${artist.id}/wc`).then(
    //         res => res.json().then(
    //             initialData => {
    //                 const data = initialData['data']
    //                 setWc(data)
    //             }
    //         ))
    // }, [])

    return (
        <div className={compare ? "column" : "single-row-container"}>

            {/* ITEM 1 */}
            <div className="item artist-info">
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Avatar alt={artist.name}
                        src={artist.image}
                        sx={{ width: 60, height: 60, marginTop: .5, marginLeft: 1 }} />
                    <div className="artist-header">
                        <div>
                            <b>Artist: {artist.name}</b>
                        </div>
                    </div>
                </Stack>
                <hr></hr>
                <span className="bio-text">Bio: {artist.bio.slice(0, bioStopIndex)}
                    {<a className="openModal" onClick={handleOpenBio}>...more</a>}
                </span>
                <p>Popular song lyrics include
                    {popularSongs} {<a
                        className="openModal"
                        onClick={handleOpenLyrics}>
                        See all lyrics.
                    </a>}
                </p>
                <span className="num-unique-words">{artist.name} uses {artist.vocab_score} unique words.</span>
            </div>

            {/* ITEM 2 */}
            <div className="item">
                <img
                    height="100%"
                    src={`data:image/jpeg;base64,${wc}`} />
            </div>

            {/* ITEM 3 */}
            <div className="item">
                <PieChart artist={artist} />
            </div>

            {/* MODALS */}
            {openBio ? (
                <Biography artist={artist}
                    open={openBio}
                    handleClose={handleCloseBio} />
            ) : (<></>)
            }
            {openLyrics ? (
                <Lyrics
                    openLyrics={openLyrics}
                    handleCloseLyrics={handleCloseLyrics}
                    songs={artistSongs} />
            ) : (<></>)
            }
        </div >
    )
}

export default Artist;

