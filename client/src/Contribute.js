import React, { useState, useEffect } from 'react';
import Search from "./Search";
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';

const Contribute = (({ allArtists }) => {
    const [searchQ1, setSearchQ1] = useState(null);
    const [valid, setValid] = useState(true)

    useEffect(() => {
        if (allArtists.length > 1) {
            for (let obj of allArtists) {
                if (obj['name'] === searchQ1['name'] || obj['name'].toLowerCase() === searchQ1.toLowerCase()) {
                    setValid(false);
                    console.log("MATCH", "obj['name'] = ", obj['name'], "searchq1['name']", searchQ1['name'])
                    break;
                } else {
                    setValid(true);
                }
            }
        }
    }, [searchQ1]);

    const attemptSeed = (searchQ1) => {

    }


    return (
        <>
            <Search allArtists={allArtists} setSearchQ={setSearchQ1} type="contribute" onClick={attemptSeed(searchQ1)} />
            {valid ? (
                <div>
                    <Button variant="contained" color="success"
                        style={{ display: 'block' }}>
                        Seed Artist
                    </Button>
                </div>
            ) :
                <div>

                    <Button variant="contained" disabled color="error"
                        style={{ display: 'block' }}>
                        Seed Artist
                    </Button>
                    <span>This artist already exists in our database!</span>
                </div>
            }

        </>


    )
})


export default Contribute