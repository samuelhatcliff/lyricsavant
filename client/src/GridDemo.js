import React, { useState, useEffect, useContext } from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PieChart from './charts/PieChart';
import DemoContext from "./Context";
import WordCloudFunc from "./charts/WordCloud";
import WordsChart from "./charts/WordsChart";
import BarChart from "./charts/BarChart"



import './App.css'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // width: "800px"
}));


const cardiacs = "https://i.inews.co.uk/content/uploads/2018/01/1984-Surbiton-Assembly-Rooms_ROBIN-FRANSELLA-e1515410258208.jpg"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '32vw',
    height: '40vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 23,
    p: 4,
    padding: 0

};

export default function BasicGrid(artistId = 111, artistId2 = 130) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const img1 = "https://images.genius.com/8bbf2ed2197d5a2122ab41e3c108df81.567x567x1.jpg";
    const img2 = "https://images.genius.com/ac3405000c21ab2d69a0540609b1c8f6.300x300x1.jpg"
    const [demoArtist, setArtist] = useState(null)
    const [demoArtist2, setArtist2] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        console.log("inside Results.js use effect")
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
    }, [])
    console.log("demo artist:", demoArtist, "demo artist2:", demoArtist2)
    return (

        <section>
            {!loading ? (
                <div className="container">
                    <div className="column">
                        <div className="item artist-info">
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
                        <div className="item"><PieChart artist={demoArtist} /></div>

                    </div>
                    <div className="column">
                        <Item className="item"  >
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
                    <div className="column">
                        <div className="item artist-info">
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
                        <div className="item"><PieChart artist={demoArtist2} /></div>


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


{/* <Box className="container">
<Grid container spacing={3} direction="row" alignItems="center">
    <Grid item xs={4} container direction="column">
        <Item>Artist Info</Item>
        <Item>WordCloud</Item>
        <Item>PieChart</Item>
    </Grid>
    {/* <Grid item xs={4} container direction="column">
        <Item>Compare</Item>
        <Item>Vocab</Item>
        <Item>Polarity</Item>
    </Grid>
    <Grid item xs={4} container direction="column">
        <Item>ArtistInfo</Item>
        <Item>WordCloud</Item>
        <Item>PieChart</Item>
    </Grid> */}

// </Grid>
// </Box> */}

const history = <span>"One day Geoff Shelton buys a real electric guitar, it’s all painted in flowers and it is about 1972. Geoff is a boy who lives over the road from brothers Jim and Tim Smith in Chessington Surrey England… so, Jim is made to buy a bass guitar from the shops so that he and Geoff can play a blues riff at each other over and over again in the garage. Jim’s fat little eleven year old brother Tim owns a snare drum and spoilt the boys fun by drumming along with them with one stick in one hand on one drum, and in his other hand, his face. Then a cymbal and stand came. Another time, maybe a year or so later…Geoff Shelton lends Tim Smith a ‘how to play the guitar’ long playing record and during one of his visits teaches him the ‘G’ chord. From the record Tim learns how to play ‘Frankie and Johnny’. He forces his mum to sing it for him while he strummed and strummed and strummed and his fingers bled red. He later hears a section of a record by someone that makes his stomach go ‘funny’ and gives him goosebumps. “So, music can do this then can it!?” he probably realised. At secondary school Tim had a friend called Colvin Mayers, they were friends from the age of five, we join them now aged 14…in the playground at Fleetwood Secondary school Chessington. Someone fat who they don’t know yet bounds up to them all sweaty and in a high pitched not-broken-yet voice says something like “I hear you like the Mahavishnu Orchestra?” and Colvin Mayers bursts out a shriek of high pitched laughing. It is Mark Cawthra and he would file his front teeth with a heavy-duty metalwork file leaving bits of tooth all along it. He had just been expelled from his other school and nobody ever found out why. On the other side of the playground is Peter Tagg hanging about with his older friends, all of these people talked about so far (except Geoff Shelton) would at one point or another end up playing in Cardiacs."</span>
const bio1 = <span>Aubrey Drake Graham (born October 24, 1986) is a Canadian rapper, singer, songwriter, record producer, actor, and entrepreneur. Drake is part of a generation of rappers, along with Wiz Khalifa, Kid Cudi and others, who came up through internet mixtapes. Drizzy put out three mixtapes from 2006 to 2009: Room for Improvement, Comeback Season, and So Far Gone. These mixtapes got him the attention of Lil Wayne, and spawned the hit singles “Forever” and “Best I Ever Had,” the latter coming from his critically acclaimed mixtape So Far Gone. During this period, Drake also made a slew of guest appearances on tracks by artists from DJ Khaled to JAY-Z.

    Even before the release of his debut album, Drake was being referred to by Billboard as “the biggest buzz” and “possibly the most sought-after artist” in hip-hop. Reportedly three major labels were courting him in “one of the biggest bidding wars ever.” Even a New York Times article began, “If there was a time in hip-hop before Drake, it’s tough to remember.” Drake finally signed to Lil Wayne’s Young Money Entertainment label in 2009 and his debut album Thank Me Later came out the following year. His second album, Take Care, was released in November 2011 and ultimately led to celebration with his crew for earning his first Grammy Award (for Best Rap Album). The album has been certified 4x platinum as of March 29, 2016. His third studio album, Nothing Was The Same, was released September 24th, 2013. Two years later on February 13, 2015, Drake released If You’re Reading This It’s Too Late. Just months after that, he released a collaborative mixtape with American rapper Future, called What A Time To Be Alive. His fourth studio album, Views, was released on April 29, 2016. Following the release of Views, Drake announced the release of his new “playlist,” More Life, on OVOSOUND Radio. It was released on March 18, 2017.

    On January 19, 2018, Drake surprisingly released a two-track EP, which was titled Scary Hours. In the following weeks Drake would make a song with his friend BlocBoy JB called “Look Alive”, the song would debut at #6 on the billboard and would mark Drake’s 23rd Top 10 Billboard hit. After “God’s Plan” debuted and spent 11 consecutive weeks at #1 on the Billboard, Drake released “Nice For What” to continue the streak of a successful 2018. “Nice for What” would go on to replace “God’s Plan” as the #1 song on the Hot 100. Drake went on to release his fifth studio album Scorpion on June 29, 2018. It featured 25 tracks and was released as a double album. Upon release, it set the single day album streaming record on both Apple Music and Spotify and broke the first-week streaming record for an album in a mere three days. That week, a record-shattering seven songs from the album placed in the Billboard Hot 100’s top ten.

    In a December 25, 2019 interview with Rap Radar, Drake confirmed upcoming music. He followed this statement up by releasing two songs with Future, “Life is Good” and “Desires,” on January 10, 2020, and January 31, 2020, respectively. A month later, Drake would drop two tracks: “When to Say When” and “Chicago Freestyle.” On April 3, 2020, Drake released “Toosie Slide,” the first official single from his upcoming material. Dark Lane Demo Tapes, Drake’s 5th official mixtape, was released on May 1, 2020 with the promise of a new studio album for summer 2020.

    On October 24, 2020, Drake’s 34th birthday, he revealed the album trailer for Certified Lover Boy and announced a January 2021 release date, which was postponed following a knee injury. On March 4th, 2021, Drake released Scary Hours 2, the sequel to Drake’s January 2018 EP Scary Hours. The mixtape includes features from Lil Baby and Rick Ross. Certified Lover Boy finally dropped on September 3, 2021.

    Drizzy has also been involved in many beefs, including ones with Common and Tyga. His most eventful beef was with Philadelphia rapper Meek Mill. This started the whole conspiracy over “Drake has a ghostwriter.” Drake fired back immediately with “Charged Up” and with no response from Meek, he dropped another diss track four days later titled “Back to Back.” Meek then released his diss track titled “Wanna Know.”. Drake was nominated for a Grammy for “Best Rap Performance” for “Back to Back.”</span>

const bio2 = <span>Christopher Brian Bridges, better known by his stage name Ludacris, is an American rapper, entrepreneur and actor. Along with his manager, Chaka Zulu, Ludacris is the co-founder of Disturbing tha Peace, an imprint distributed by Def Jam Recordings.

    Luda wrote his first rap song at age nine when moving to Atlanta, and joined an amateur rap group three years later.

    Born in Champaign, Illinois, Ludacris moved to Atlanta at age nine, where he began rapping. After a brief stint as a DJ, he released his first album Incognegro in 1999, followed by Back for the First Time also in 2000, which contained the singles “Southern Hospitality” and “What’s Your Fantasy”. In 2001, he released Word of Mouf, followed by Chicken-n-Beer in 2003 and The Red Light District in 2004. He took a more serious approach with his next two albums, Release Therapy (2006), and Theater of the Mind (2008). His next record, Battle of the Sexes, was released in 2010 and featured the tone of his previous albums. Ludaversal was released on March 31, 2015. As an actor, he has appeared in films including Crash (2004), Gamer (2009), and New Year’s Eve (2011). He is best known for playing Tej Parker in The Fast and the Furious film series.

    Ludacris has won Screen Actors Guild, Critic’s Choice, MTV, and Grammy Awards. Along with fellow Atlanta-based rappers Big Boi and André 3000 of OutKast, Ludacris was one of the first and most influential “Dirty South” rappers to achieve mainstream success during the early 2000s. In 2014, Ludacris was featured in Forbes list titled “Hip-Hop Cash Kings”, as he earned $8 million</span>
  // < div >
            //     <h2>Artist Bio</h2>
            //     <Button onClick={handleOpen}>Click here</Button>

            //     <Modal
            //         aria-labelledby="modal-modal-title"
            //         aria-describedby="modal-modal-description"
            //         open={open}
            //         onClose={handleClose}
            //     >


            //         <Box sx={style}>
            //             <Stack direction="row" spacing={2}>

            //                 <Avatar alt="Tim Smith"
            //                     src={cardiacs}
            //                     sx={{ width: 60, height: 60, marginLeft: 1, marginTop: 1 }} />

            //                 <span style={{ marginTop: '3.75vw', marginLeft: '3vw' }}>Cardiacs Biography:</span>

            //             </Stack>
            //             <hr></hr>
            //             <Typography variant="body2" component="span" gutterBottom>

            //                 <div className="bio-text">
            //                     {history}
            //                 </div>
            //             </Typography>


            //         </Box>

            //     </Modal>
            // </div>


            // <Item className="item" style={{ padding: 0 }} >
            //                 However, not all effects can be deferred. For example, a DOM mutation that is visible to the user must fire synchronously before the next paint so that the user does not perceive a visual inconsistency. (The distinction is conceptually similar to passive versus active event listeners.) For these types of effects, React provides one additional Hook called  useLayoutEffect.
            //                 https://reactjs.org/docs/hooks-reference.html#useeffect
            //                 Is useLayoutEffect commonly used?Vocab</Item>

            // <div className="item"> <img width="100%" height="100%"
            //                 src={img2} />
            //             </div>