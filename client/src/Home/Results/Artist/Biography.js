
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './Artist.css'

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

const Biography = ({ artist, open, handleClose }) => {
    return (
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
                    <div className='full-bio-title'>{artist.name}'s Full Biography:</div>
                </Stack>
                <hr></hr>
                <div className="bio-text">
                    <Typography variant="body2" component="span" gutterBottom >
                        {artist.bio}
                    </Typography>
                </div>
            </Box>
        </Modal>
    )
}

export default Biography