import React, { useState } from 'react';
// Our own components 
import SearchModule from './SearchModule';
import Results from "./Results";
import Explanation from "./Explanation";
//MUI Components
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';





const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    height: '40vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 23,
    p: 4,

};

function Home({ allArtists }) {
    const [artistId, setArtistId] = useState(null);
    const [artistId2, setArtistId2] = useState(null)
    const [submit, setSubmit] = useState(false);
    const [isLoading, setLoading] = useState(false)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <SearchModule setSubmit={setSubmit}
                setLoading={setLoading}
                allArtists={allArtists}
                setArtistId={setArtistId}
                setArtistId2={setArtistId2}
                submit={submit}
                handleOpen={handleOpen}
            />
            <Modal
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>

                    {submit ? (
                        <Results artistId={artistId}
                            artistId2={artistId2}
                            setLoading={setLoading}
                            isLoading={isLoading}
                        />
                    ) : (
                        <></>
                    )}
                </Box>

            </Modal>
            {!open ? (
                <Explanation />) : <></>}
        </>
    );
}

export default Home;