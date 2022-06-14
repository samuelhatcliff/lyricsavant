import React, { useState, useEffect } from 'react';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PieChart from '../Home/Results/Artist/Charts/PieChart';
import WordCloudFunc from "../Home/Results/Artist/Charts/WordCloud";
import WordsChart from "../Home/Results/Compare/Charts/WordsChart";
import BarChart from "../Home/Results/Compare/Charts/BarChart"
import './GridDemo.css'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));


export default function BasicGrid(artistId = 111, artistId2 = 130) {
    const [demoArtist, setArtist] = useState(null)
    const [demoArtist2, setArtist2] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let p2;
        const p1 = fetch("/api/artists/111").then( // gets data for 1st artist
            res => res.json()
        ).then(
            initialData => {
                setArtist(initialData);
            }
        )
        if (artistId2) {
            p2 = fetch("/api/artists/130").then( // gets data for 1st artist
                res => res.json()
            ).then(
                initialData => {
                    setArtist2(initialData);
                }
            )
        } else {
            Promise.resolve(p1).then(resolved => {
                setLoading(false)
            }
            )
        }
        if (artistId2) {
            Promise.all([p1, p2]).then(resolved => {
                setLoading(false)
            })
        }
    }, [])
    return (

        <section>
            {!loading ? (
                <div className="demo-container">
                    <div className="demo-column">
                        <div className="demo-item artist-info">
                            <Stack>
                                <div className="artist-header">
                                    <Avatar alt={demoArtist.name}
                                        src={demoArtist.image}
                                        sx={{ width: 60, height: 60, marginTop: 1, marginLeft: 1 }} />
                                    <span className="name-info" style={{ marginTop: 25.75, marginLeft: 60 }}><b>{demoArtist.name} Info:</b></span>
                                </div>
                                <p className="bio-text">Bio: {demoArtist.bio.slice(0, 300)} + more</p>
                            </Stack>
                        </div>
                        <WordCloudFunc artist={demoArtist} />
                        <div className="demo-item"><PieChart artist={demoArtist} /></div>

                    </div>
                    <div className="demo-column">
                        <Item className="demo-item"  >
                            <span className="vs-text">{demoArtist.name}</span>
                            <Avatar alt={demoArtist.name}
                                src={demoArtist.image}
                                sx={{ width: 80, height: 80, marginTop: 1, marginBottom: 1 }} />
                            <span className="vs-text">VS</span>
                            <Avatar alt={demoArtist2.name}
                                src={demoArtist2.image}
                                sx={{ width: 80, height: 80, marginTop: 1, marginBottom: 1 }} />
                            <span className="vs-text">{demoArtist2.name}</span>
                        </Item>
                        <WordsChart artist1={demoArtist} artist2={demoArtist2} />
                        <BarChart artist1={demoArtist} artist2={demoArtist2} />


                    </div>
                    <div className="demo-column">
                        <div className="demo-item artist-info">
                            <Stack>
                                <div className="artist-header">
                                    <Avatar alt={demoArtist2.name}
                                        src={demoArtist2.image}
                                        sx={{ width: 60, height: 60, marginTop: 1, marginLeft: 1 }} />
                                    <span className="name-info" style={{ marginTop: 25.75, marginLeft: 60 }}><b>{demoArtist2.name} Info:</b></span>
                                </div>
                                <p className="bio-text">Bio: {demoArtist2.bio.slice(0, 300)} + more</p>
                            </Stack>
                        </div>
                        <WordCloudFunc artist={demoArtist2} />
                        <div className="demo-item"><PieChart artist={demoArtist2} /></div>


                        {/* <div className="item">
                            <div width="100%">
                                <span className="text">
                                    PieChart1However, not all effects can be deferred. For example, a DOM mutation that is visible to the user must fire synchronously before the next paint so that the user does not perceive a visual inconsistency. (The distinction is conceptually similar to passive versus active event listeners.) For these types of effects, React provides one additional Hook called  useLayoutEffect.
                                    https://reactjs.org/docs/hooks-reference.html#useeffect
                                    Is useLayoutEffect commonly used?Vocab
                                </span>
                            </div>
                        </div> */}

                    </div>
                </div >) : (
                console.log("sdafa")
            )}


        </section >

    )
}


