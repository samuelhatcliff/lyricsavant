import PieChart from './charts/PieChart';
import WordCloudFunc from './charts/WordCloud';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './App.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '32vw',
    height: "40vw",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 23,
    p: 4,
    padding: 0
}




function Artist({ artist }) {
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

            {/* <div className="item"><WordCloudFunc artist={artist} /></div> */}
            <div className="item"><PieChart artist={artist} /></div>
            {open ? (
                <Modal
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <Box className="biography-expand" sx={style}>
                        <Stack
                            direction="row"
                            spacing={0}
                        >
                            <Avatar
                                alt={artist.name}
                                src={artist.image}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    marginLeft: 1,
                                    marginTop: 1
                                }}
                            />
                            <div className='full-bio-title'>{artist.name} Full Biography:</div>
                        </Stack>
                        <hr></hr>
                        <div className="bio-text">
                            <Typography variant="body2" component="span" gutterBottom >

                                {artist.bio}
                            </Typography>
                        </div>

                    </Box>
                </Modal>
            ) : (console.log("expanded bio false"))
            }
        </div >
    )
}

export default Artist;

