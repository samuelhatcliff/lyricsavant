import React, { useState, useEffect } from 'react';
import Search from "../Home/SearchModule/Search";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Circles } from 'react-loader-spinner';
import './Contribute.css'



const Contribute = (({ allArtists, setRefresh, refresh }) => {
    const [searchQ1, setSearchQ1] = useState(false);
    const [selected, setSelected] = useState(null);
    const [valid, setValid] = useState(false);
    const [msg, setMsg] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (allArtists && searchQ1 !== false) {
            for (let obj of allArtists) {
                if (obj['name'].toLowerCase() === searchQ1.toLowerCase() || searchQ1 === false) {
                    setValid(false);
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
        <div>
            <Typography className="contribute-container" variant="body2" component="div" gutterBottom>
                <Search allArtists={allArtists} setSelected={setSelected} setSearchQ={setSearchQ1} type="contribute"
                />
                <div className="seed-button">
                    <Button variant="contained" color="success" disabled={valid ? false : true} onClick={attemptSeed}
                        style={{ display: 'block' }}>
                        Seed Artist
                    </Button>
                </div>
                <div >
                    {!valid && searchQ1 ? (
                        <span>This artist already exists in our database!</span>) : (
                        <span className="message-text">{msg}</span>

                    )}
                    <div className="message" >
                        <span className="instructions">

                            Enter an Artist that hasn't been added to our database yet.
                            Check to see if artist has been added by typing there name into the drop down.
                            If they appear as a suggestion, the artist has already been added.</span></div>


                </div>
                {loading ? <div className="App">
                    Loading...
                    <Circles color="#00BFFF" height={80} width={80} />
                </div> :
                    <></>}
            </Typography>
        </div>
    )
})


export default Contribute