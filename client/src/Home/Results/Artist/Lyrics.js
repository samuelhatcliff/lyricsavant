
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import './Artist.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    height: "48vw",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 23,
    p: 4,
    padding: 0
}


const Lyrics = ({ songs, openLyrics, handleCloseLyrics }) => {
    function fix(song) {
        const nameLength = song.title.length
        const songText = song.lyrics;
        const firstChars = songText.slice(0, nameLength)
        if (firstChars === song.title) {
            song.lyrics = songText.slice(nameLength + 7)
        }
        const lastChars = song.lyrics.slice(-5, song.lyrics.length)
        if (lastChars === "Embed") {
            const beforeEmbed = song.lyrics.slice(-20, song.lyrics.length)
            console.log('before embed', beforeEmbed, song.title)
            // TODO: Solve Embed mystery. Look at nickelback's satellite. Embed shows up in string by not in html text. similar to \n?
            const choppedLyrics = song.lyrics.slice(0, song.lyrics.length - 5)
            song.lyrics = choppedLyrics
        }
        const n = song.lyrics.split(" ");
        let lastWord = n[n.length - 1];
        const substrings = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        if (substrings.some(char => lastWord.includes(char))) {
            let numIndex;
            for (let i = 0; i < lastWord.length - 1; i++) {
                if (substrings.includes(lastWord[i])) {
                    numIndex = i
                }
            }
            const choppedIndex = lastWord.length - numIndex
            song.lyrics = song.lyrics.slice(0, song.lyrics.length - choppedIndex)
        }
        lastWord = n[n.length - 1];
        if (substrings.some(char => lastWord.includes(char))) {
            song.lyrics = song.lyrics.slice(0, song.lyrics.length)
        } else {
            return song
        }
        fix(song);
    }

    const fixedSongs = songs.map((song) => {
        return fix(song)
    })

    //filteredSongs array exists to filter out songs that have had their lyrics removed as a consequence of the embed bug in fixedSongs array
    const filteredSongs = fixedSongs.filter((song) => song.lyrics.length > 10);
    const expandIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /></svg>
    const songTitles = filteredSongs.map((song) => {
        return (
            <div key={song.id}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={expandIcon}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{song['title']}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <span
                                style={{ whiteSpace: "pre-line" }}>
                                {song['lyrics']}
                            </span>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>)
    });


    return (
        <Modal
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={openLyrics}
            onClose={handleCloseLyrics}
        >
            <Box className="lyrics-container" sx={style}>
                {songTitles}
            </Box>
        </Modal>
    )
}

export default Lyrics