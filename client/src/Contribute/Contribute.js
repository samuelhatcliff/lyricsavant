import React, { useState, useEffect } from 'react';
import Search from "../Home/SearchModule/Search";
import SWR from "./SWR/SWR"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import './Contribute.css'


//todo: fix bug where it displays last message.length before reseting to 0

const Contribute = (({ allArtists, setRefresh, refresh }) => {
    const [searchQ1, setSearchQ1] = useState("");
    const [valid, setValid] = useState(false);
    const [msg, setMsg] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (allArtists) {
            for (let artist of allArtists) {
                if (artist['name'].toLowerCase() === searchQ1.toLowerCase() || !searchQ1) {
                    setValid(false);
                    break;
                } else {
                    setValid(true);
                }
            }
        }
    }, [searchQ1]);

    function attemptSeed() {
        if (!valid) {
            return
        }
        setLoading(true)
        fetch(`/api/artists/add/${searchQ1}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res =>
            res.json().then(data => {
                setMsg(data.data)
                setLoading(false)
                setRefresh(!refresh)
            }
            ))
    }
    return (
        <div>
            <Typography className="contribute-container" variant="body2" component="div" gutterBottom>
                <div className="message" >
                    <span className="instructions">
                        Enter an Artist that hasn't been added to our database yet.
                        Check to see if artist has been added by typing there name into the drop down.
                        If they appear as a suggestion, the artist has already been added.</span></div>
                <div className="seed-button">
                    <Button variant="contained" color="success" disabled={valid ? false : true} onClick={attemptSeed}
                        style={{ display: 'block' }}>
                        Seed Artist
                    </Button>
                </div>
                <div className='contribute-search'>
                    <Search allArtists={allArtists} setSearchQ={setSearchQ1} type="POST"
                    />
                </div>

                <div >
                    {!valid && searchQ1 !== "None" && searchQ1 ? (
                        <Alert severity="error">This artist already exists in our database!</Alert>) : (<></>)}
                    {msg.message ? (<Alert severity={msg.type}>
                        {msg.message}
                    </Alert>) : (<></>)}
                </div>
                {
                    loading ? <div className="App">
                        Seeding Artist...
                        <SWR />
                    </div> :
                        <></>
                }
            </Typography >
        </div >
    )
})


export default Contribute