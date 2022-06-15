import PieChart from './Charts/PieChart';
import WordCloudFunc from './Charts/WordCloud';
import Biography from './Biography'
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
// import '../../../App.css'
import './Artist.css'

function Artist({ artist, data }) {
    console.log("Rendering artist:", artist)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                <p className="bio-text">Bio: {artist.bio.slice(0, 300)} +
                    {<a className="more" onClick={handleOpen}>...more</a>}
                </p>
            </div>

            <div className="item">
                {/* <WordCloudFunc artist={artist} /> */}
                <img src={`data:image/jpeg;base64,${data}`} />

            </div>
            <div className="item"><PieChart artist={artist} /></div>
            {open ? (
                <Biography artist={artist} open={open} handleClose={handleClose} />
            ) : (console.log("expanded bio false"))
            }
        </div >
    )
}

export default Artist;

