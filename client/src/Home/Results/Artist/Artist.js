import PieChart from './Charts/PieChart';
import Biography from './Biography'
import Lyrics from './Lyrics';
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
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
    const [openBio, setOpenBio] = useState(false);
    const [openLyrics, setOpenLyrics] = useState(false);
    //UTILITY FUNCTIONS
    const handleOpenBio = () => setOpenBio(true);
    const handleCloseBio = () => setOpenBio(false);
    const handleOpenLyrics = () => setOpenLyrics(true);
    const handleCloseLyrics = () => setOpenLyrics(false);
    const bioStopIndex = findStopPoint(artist.bio, 14)
    //DISPLAY MESSAGES
    let popularSongs
    if (artistSongs.length > 0) {
        popularSongs = ` ${artistSongs[0]['title']} ${artistSongs[1]['title']},
     ${artistSongs[2]['title']},${artistSongs[3]['title']}, and ${artistSongs[4]['title']}.`
    }

    return (
        <div className={compare !== false ? "column" : "single-row-container"}>

            {/* ITEM 1 */}
            <div className={compare === false ? "rounded-item1" : "item"}>
                <div className='header'>
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
                </div>
                <hr></hr>
                <div className='artist-info'>
                    <span className="bio-text">Bio: {artist.bio.slice(0, bioStopIndex)}
                        {<a className="openModal" onClick={handleOpenBio}>...Open full bio.</a>}
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
            </div>

            {/* ITEM 2 */}
            <div className="item">
                <img
                    height="100%"
                    src={`data:image/jpeg;base64,${wc}`} />
            </div>

            {/* ITEM 3 */}
            <div className={compare === false ? "rounded-item2" : "item"}>
                <PieChart artist={artist} />
            </div>

            {/* MODALS */}
            {
                openBio ? (
                    <Biography artist={artist}
                        open={openBio}
                        handleClose={handleCloseBio} />
                ) : (<></>)
            }
            {
                openLyrics ? (
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

