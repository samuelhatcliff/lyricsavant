import React, { useState, useEffect, useContext } from 'react';

import Artist from "./Artist";
import Compare from "./Compare";
import { Circles } from 'react-loader-spinner';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Results = ({ artistId, artistId2, setLoading, isLoading }) => {
    const [artist, setArtist] = useState(null)
    const [artist2, setArtist2] = useState(null)
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
        <Typography variant="body2" component="div" gutterBottom>
            {!isLoading ? (
                <div>
                    {!artist2 ? (
                        <Artist artist={artist} />) : (
                        console.log("not artist 1", artist)
                    )}

                    {artist2 ? (
                        <Box sx={{ flexGrow: 1, backgroundColor: 'primary.dark', }}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                spacing={30}
                            >
                                <Grid container direction="column" item xs={4}  >
                                    <Artist artist={artist} />
                                </Grid>
                                <Grid container direction="column" item xs={4}  >
                                    <Compare artist1={artist} artist2={artist2} />
                                </Grid>
                                <Grid container direction="column" item xs={4}  >
                                    <Artist artist={artist2} />
                                </Grid>
                            </Grid>
                        </Box>
                    ) : (
                        console.log("not artist 2", artist2)
                    )}
                </div>
            ) : (
                <div >
                    Loading...
                    <Circles color="#00BFFF" height={80} width={80} />
                </div>
            )}
        </Typography>

    )
}


export default Results



