import React, { useState } from 'react';
// Our own components 
import SearchModule from './SearchModule';
import Results from "./Results";
import Explanation from "./Explanation";
//MUI Components
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Home({ allArtists }) {
    const [artistId, setArtistId] = useState(null);
    const [artistId2, setArtistId2] = useState(null)
    const [submit, setSubmit] = useState(false);
    const [isLoading, setLoading] = useState(false)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        console.log("opening")
        // setSubmit(true);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    // if (submit) {
    //     handleOpen()
    // }
    const hm = () => console.log("made it")
    console.log("submit?", submit)
    console.log("artistid1", artistId, "artistId2", artistId2)

    return (
        <div className="App">
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
            {!isLoading && submit === false ? (
                <Explanation />) : <></>}
        </div>
    );
}

export default Home;