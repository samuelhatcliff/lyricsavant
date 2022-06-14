import React, { useState, useEffect } from 'react';
//Our Components
import Artist from "./Artist";
import Compare from "./Compare";
//Styling Components
import { Circles } from 'react-loader-spinner';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import './App.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    height: '40vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    backgroundColor: 'primary.dark',
    boxShadow: 24,
    p: 4,
    margin: 0,
    padding: 1
};

const Results = ({ artistId, artistId2, setLoading, isLoading }) => {
    const [artist, setArtist] = useState(null)
    const [artist2, setArtist2] = useState(null)
    const [expandBio, setExpandBio] = useState(false)

    const expandBioFunc = (artist) => {
        const bio = artist.bio;
        setExpandBio(true)

    }

    console.log("current artist query id:", artistId)
    useEffect(() => {
        console.log("inside Results.js use effect")
        let p2;
        const p1 = fetch(`/api/artists/${artistId}`).then( // gets data for 1st artist
            res => res.json()
        ).then(
            initialData => {
                setArtist(initialData);
            }
        )
        if (artistId2) {
            p2 = fetch(`/api/artists/${artistId2}`).then( // gets data for 1st artist
                res => res.json()
            ).then(
                initialData => {
                    console.log("got 2nd artist", initialData)
                    setArtist2(initialData);
                }
            )
        } else {
            Promise.resolve(p1).then(resolved => {
                setLoading(false)
                console.log("resolved p for Rromise.resolve", resolved)
            }
            )
        }
        if (artistId2) {
            Promise.all([p1, p2]).then(resolved => {
                setLoading(false)
                console.log("resolved p for Rromise.all", resolved)
            })
        }
    }, [artistId, artistId2])

    return (
        < >
            {!isLoading ? (

                <div style={{ height: '60%', width: '100%' }}>
                    {!artist2 ? (
                        <Artist artist={artist} expandBioFunc={expandBioFunc} />) : (
                        console.log("not artist 1", artist)
                    )}
                    {artist2 ? (
                        <div className="container">
                            <Artist artist={artist} expandBioFunc={expandBioFunc} expandBio={expandBio} />
                            <Compare artist1={artist} artist2={artist2} />
                            <Artist artist={artist2} expandBioFunc={expandBioFunc} expandBio={expandBio} />
                        </div>
                    ) : (
                        console.log("not artist 2", artist2)
                    )}
                </div>
            ) : (
                <div className="loading">
                    Loading...
                    <Circles color="#00BFFF" height={80} width={80} />
                </div>
            )
            }
        </>

    )
}


export default Results



