import React, { useState, useEffect } from 'react';
//Our Components
import Artist from "./Artist/Artist";
import Compare from "./Compare/Compare";
//Styling Components
import { Circles } from 'react-loader-spinner';
import './Results.css'


const Results = ({ artistId, artistId2, setLoading, isLoading }) => {
    const [artist, setArtist] = useState(null)
    const [artist2, setArtist2] = useState(null)
    console.log("current artist query id:", artistId)
    useEffect(() => {
        console.log("inside Results.js useEffect")
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
                console.log("resolved p for Promise.resolve", resolved)
            }
            )
        }
        if (artistId2) {
            Promise.all([p1, p2]).then(resolved => {
                setLoading(false)
                console.log("resolved p for Promise.all", resolved)
            })
        }
    }, [artistId, artistId2])

    return (
        < >
            {!isLoading ? (
                <div style={{ height: '60%', width: '100%' }}>
                    {!artist2 ? (
                        <div className="container">
                            <Artist artist={artist} />
                        </div>) : (
                        console.log("No 2nd Artist identified. Now returning Artist1:", artist)
                    )}
                    {artist2 ? (
                        <div className="container">
                            <Artist artist={artist} />
                            <Compare artist1={artist} artist2={artist2} />
                            <Artist artist={artist2} />
                        </div>
                    ) : (
                        console.log("not artist 1", artist2)
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



