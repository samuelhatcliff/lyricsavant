import PieChart from './charts/PieChart';
import WordCloudFunc from './charts/WordCloud';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '32vw',
    height: '40vw',
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
                <div className="artist-header">
                    <Avatar alt={artist.name}
                        src={artist.image}
                        sx={{ width: 60, height: 60, marginTop: 1, marginLeft: 1 }} />
                    <span className="name-info" style={{ marginTop: 25.75, marginLeft: 60 }}><b>{artist.name} Info:</b></span>
                </div>
                <p className="bio-text">Bio: {artist.bio.slice(0, 300)} + <span onClick={handleOpen}>more</span></p>
            </div>
            {/* <span >{artist.name} uses {artist.vocab_score} unique words!</span> */}
            {/* <div className="item"><WordCloudFunc className="wordcloudfun" artist={artist} /></div> */}
            <div className="item"><PieChart artist={artist} /></div>
            {open ? (
                <Modal
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        <Stack
                            direction="row"
                            spacing={2}
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
                            <span style={{ marginTop: '3.75vw', marginLeft: '3vw' }}>{artist.name} Full Biography:</span>
                        </Stack>
                        <hr></hr>
                        <Typography variant="body2" component="span" gutterBottom>
                            <div className="bio-text">
                                {artist.bio}
                            </div>
                        </Typography>
                    </Box>
                </Modal>
            ) : (console.log("expanded bio false"))
            }
        </div >
    )
}

export default Artist;

