import React, { useState, useEffect } from 'react';
import Artist from "./Artist";
import { Circles } from 'react-loader-spinner';




const Results = ({ artistId, artistId2, setLoading, isLoading }) => {
    const [artist, setArtist] = useState(null)
    const [artist2, setArtist2] = useState(null)
    // setLoading(true)
    // const [isLoading, setLoading] = useState(true)
    console.log("current artist query id:", artistId)
    useEffect(() => {
        console.log("inside use effect")
        if (artistId2) {
        }

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
                console.log("resolved p", resolved)
            }
            )
        }
        if (artistId2) {
            Promise.all([p1, p2]).then(resolved => {
                setLoading(false)
                console.log("resolved p for promise.all", resolved)

            })
        }
    }, [artistId, artistId2])

    return (
        <div>
            {!isLoading ? (
                <div>
                    {artist ? (
                        <Artist artist={artist} />) : (
                        console.log("results rendered without rendering child component: Artist1", artist)
                    )}

                    {artist2 ? (
                        <Artist artist={artist2} />) : (
                        console.log("results rendered without rendering child component: Artist2", artist2)
                    )}
                </div>

            ) : (
                <div className="App">
                    Loading...
                    <Circles color="#00BFFF" height={80} width={80} />
                </div>
            )}
        </div>
    )
}


export default Results



  // if (artistId2) {
    //     setCompare(true);
    //     setProcess([...process, { "id": artistId2, "isLoading": true }])
    // }
    // const changeProcess = (artistId) => {
    //     const newArr = [];
    //     for (let obj of process) {
    //         if (artistId === obj["id"]) {
    //             obj["isLoading"] = false;
    //         }
    //         newArr.push(obj);
    //     }
    //     setProcess(newArr)
    // }

    // const loading = (element) => element["isLoading"] === true;
    // const stillLoading = process.some(loading);