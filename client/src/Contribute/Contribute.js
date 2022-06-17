import React, { useState, useEffect } from 'react';
import Search from "../Home/SearchModule/Search";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Circles } from 'react-loader-spinner';

// ToDo: check database to see how many artists were added accidentally while writing this and remove each
// delete artist ids on line 40 of app.py

const Contribute = (({ allArtists }) => {
    const [searchQ1, setSearchQ1] = useState(null);
    const [valid, setValid] = useState(true);
    const [msg, setMsg] = useState("Enter an Artist that hasn't been added to our database yet. Check to see if artist has been added by typing there name into the drop down. If they appear as a suggestion, the artist has already been added.");
    const [loading, setLoading] = useState(false)

    console.log("All artists in contribute", allArtists)
    useEffect(() => {
        if (allArtists.length > 1 && searchQ1 !== null) {
            for (let obj of allArtists) {
                console.log("obj", obj)
                if (obj['name'] === searchQ1['name'] || obj['name'].toLowerCase() === searchQ1.toLowerCase()) {
                    setValid(false);
                    console.log("MATCH", "obj['name'] = ", obj['name'], "searchq1['name']", searchQ1['name'])
                    break;
                } else {
                    console.log("elese")
                    setValid(true);
                }
            }
        }
    }, [searchQ1]);

    function attemptSeed() {
        setLoading(true)
        console.log("attempting seed")
        fetch(`/api/artists/add/${searchQ1}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res =>
            res.json().then(data =>
                setMsg(data.data.message),
                setLoading(false)
            ))
    }

    return (
        <>
            <Typography variant="body2" component="div" gutterBottom>
                <Search allArtists={allArtists} setSearchQ={setSearchQ1} type="contribute"
                />
                {valid ? (
                    <div>
                        <Button variant="contained" color="success" onClick={attemptSeed}
                            style={{ display: 'block' }}>
                            Seed Artist
                        </Button> {msg}
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
                {loading ? <div className="App">
                    Loading...
                    <Circles color="#00BFFF" height={80} width={80} />
                </div> :
                    console.log("notloading")}
            </Typography>
        </>
    )
})


export default Contribute