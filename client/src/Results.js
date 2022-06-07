import React, { useState, useEffect } from 'react';
import Artist from "./Artist";
import Compare from "./Compare";
import { Circles } from 'react-loader-spinner';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


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
        <div>
            <Typography variant="body2" component="div" gutterBottom>
                {!isLoading ? (
                    <div>
                        {/* <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Artist artist={artist} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>xs=4</Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item>xs=4</Item>
                                </Grid>
                                <Grid item xs={8}>
                                    <Item>xs=8</Item>
                                </Grid>
                            </Grid>
                        </Box> */}
                        {/* {!artist2 ? (
                            <Artist artist={artist} />) : (
                            console.log("not artist 1", artist)
                        )} */}

                        {artist2 ? (
                            <div>
                                <Box sx={{ flexGrow: 1, backgroundColor: 'primary.dark', }}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        spacing={30}

                                    // justifyContent="center"
                                    // alignItems="center"
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

                            </div>) : (
                            console.log("not artist 2", artist2)
                        )}


                    </div>

                ) : (

                    <div className="App">
                        Loading...
                        <Circles color="#00BFFF" height={80} width={80} />
                    </div>

                )}
            </Typography>
        </div>
    )
}


export default Results



