import React, { useState, useEffect } from 'react';
import Search from "../Home/SearchModule/Search";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Circles } from 'react-loader-spinner';

// ToDo: check database to see how many artists were added accidentally while writing this and remove each
// delete artist ids on line 40 of app.py
// Use usecontext or something else to update getallartist (react router wont automatically update when going back to home tab)

const Contribute = (({ allArtists, setRefresh, refresh }) => {
    const [searchQ1, setSearchQ1] = useState(null);
    const [selected, setSelected] = useState(null);
    const [valid, setValid] = useState(false);
    const [msg, setMsg] = useState("Enter an Artist that hasn't been added to our database yet. Check to see if artist has been added by typing there name into the drop down. If they appear as a suggestion, the artist has already been added.");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (allArtists && searchQ1 !== null) {
            console.log("sq1.name", searchQ1['name'])
            for (let obj of allArtists) {
                if (obj['name'] === searchQ1['name'] || searchQ1 === false) {
                    setValid(false);
                    console.log("MATCH", "obj['name'] = ", obj['name'], "searchq1['name']", searchQ1['name'])
                    break;
                } else {
                    setValid(true);
                }
            }
        }
    }, [searchQ1, selected]);

    function attemptSeed() {
        if (!valid) {
            return
        }
        setLoading(true)
        console.log("attempting seed")
        fetch(`/api/artists/add/${searchQ1}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res =>
            res.json().then(data => {
                setMsg(data.data.message)
                setLoading(false)
                setRefresh(!refresh)
            }
            ))
    }

    return (
        <>
            <Typography variant="body2" component="div" gutterBottom>
                <Search allArtists={allArtists} setSelected={setSelected} setSearchQ={setSearchQ1} type="contribute"
                />
                <div>
                    <Button variant="contained" color="success" disabled={valid ? false : true} onClick={attemptSeed}
                        style={{ display: 'block' }}>
                        Seed Artist
                    </Button>
                </div>
                {!valid && searchQ1 ? (
                    <span>This artist already exists in our database!</span>) : (
                    <span>{msg}</span>
                )}

                {loading ? <div className="App">
                    Loading...
                    <Circles color="#00BFFF" height={80} width={80} />
                </div> :
                    <></>}
            </Typography>
        </>
    )
})


export default Contribute