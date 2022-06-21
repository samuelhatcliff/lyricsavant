import BarChart from "./Charts/BarChart"
import WordsChart from "./Charts/WordsChart"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import './Compare.css';

function Compare({ artist1, artist2 }) {
    return (
        <>
            <div className="column">
                <div className="item"  >
                    <div className="artist1">
                        <Stack alignItems="center"
                            direction="column"
                            spacing={1}
                        >
                            <span className="text">{artist1.name}</span>
                            <Avatar alt={artist1.name}
                                src={artist1.image}
                                sx={{ width: 80, height: 80, marginTop: 1, marginBottom: 1 }} />
                        </Stack>
                    </div>
                    <span className="vs-text">VS</span>
                    <div className="artist2">
                        <Stack alignItems="center"
                            direction="column"
                            spacing={0.5}
                        >
                            <Avatar alt={artist2.name}
                                src={artist2.image}
                                sx={{ width: 80, height: 80, marginTop: 1, marginBottom: 1 }} />
                            <span className="text">{artist2.name}</span>
                        </Stack>
                    </div>
                </div>
                <WordsChart className="item" artist1={artist1} artist2={artist2} />
                <BarChart className="item" artist1={artist1} artist2={artist2} />
            </div>
        </>
    )
}






export default Compare;