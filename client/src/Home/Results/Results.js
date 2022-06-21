import React, { useState, useEffect } from 'react';
//Our Components
import Artist from "./Artist/Artist";
import Compare from "./Compare/Compare";
//Styling Components
import { Circles } from 'react-loader-spinner';
import './Results.css';



const Results = ({ artistId, artistId2, setLoading, isLoading, setIsLoaded, isLoaded }) => {
    const [artist, setArtist] = useState(null)
    const [artist2, setArtist2] = useState(null)
    const [artistSongs, setArtistSongs] = useState([])
    const [artistSongs2, setArtistSongs2] = useState([])



    useEffect(() => {
        let p2;
        let getSongs2;
        const p1 = fetch(`/api/artists/${artistId}`).then( // gets data for 1st artist
            res => res.json()
        ).then(
            initialData => {
                setArtist(initialData);
            }
        )
        const getSongs = fetch(`/api/artists/${artistId}/songs`).then( // gets data for 1st artist
            res => res.json()
        ).then(
            initialData => {
                setArtistSongs(initialData['songs']);
                console.log(artistSongs)
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
            getSongs2 = fetch(`/api/artists/${artistId2}/songs`).then( // gets data for 1st artist
                res => res.json()
            ).then(
                initialData => {
                    setArtistSongs2(initialData['songs']);
                    console.log(artistSongs2, "artist songs 2")
                }
            )
        } else {
            Promise.resolve(p1).then(resolved => {
                setLoading(false)
                setIsLoaded(true)
            }
            )
        }
        if (artistId2) {
            Promise.all([p1, p2]).then(resolved => {
                setLoading(false)
                setIsLoaded(true)
            })
        }
    }, [artistId, artistId2, isLoading])

    return (
        < >
            <div>
                {!isLoaded ? (<hr></hr>
                )
                    :
                    (<></>)}
            </div>
            {!isLoading ? (
                <div style={{ height: '60%', width: '100%' }}>
                    {!artist2 ? (
                        <div className="single-column-container">
                            <Artist artist={artist} artistSongs={artistSongs} />
                        </div>) : (
                        console.log("No 2nd Artist identified. Now returning Artist1:", artist)
                    )}
                    {artist2 ? (
                        <div className="container">
                            <Artist artist={artist} artistSongs={artistSongs} />
                            <Compare artist1={artist} artist2={artist2} />
                            <Artist artist={artist2} artistSongs={artistSongs2} />
                        </div>
                    ) : (
                        <></>)}
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



