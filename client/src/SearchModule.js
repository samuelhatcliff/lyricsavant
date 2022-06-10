import React, { useState, useContext } from 'react';
import Search from "./Search";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ClearButton from "./ClearButton";



const SearchModule = ({ setSubmit, setLoading, setArtistId, setArtistId2, allArtists, handleOpen }) => {
    const [searchQ1, setSearchQ1] = useState([]);
    const [searchQ2, setSearchQ2] = useState([]);
    const [checked, setChecked] = useState(false);

    const handleChecked = () => {
        setChecked(!checked);
    };

    const handleOnSearch = () => {
        console.log(searchQ1["id"], "on search", searchQ2["id"], "on search")
        if (searchQ1) {
            setArtistId(searchQ1["id"])
            if (setArtistId2) {
                setArtistId2(searchQ2["id"])
            }
            setSubmit(true)
            setLoading(true)
            handleOpen()
        }
    }

    return (
        <div>
            {checked ? (
                <div>
                    <Typography variant="subtitle1" component="div" gutterBottom>
                        <span>Selected Artist: {searchQ1["name"]}</span>
                        <Search allArtists={allArtists} setSearchQ={setSearchQ1} classs={"search1"} />
                        <span>Selected Artist: {searchQ2["name"]}</span>
                        <Search allArtists={allArtists} setSearchQ={setSearchQ2} classs={"search2"} />
                    </Typography>
                </div>
            )
                : (
                    <div>
                        <Typography variant="subtitle1" component="div" gutterBottom>
                            <span>Selected Artist: {searchQ1["name"]}</span>
                            <Search allArtists={allArtists} setSearchQ={setSearchQ1} />
                        </Typography>
                    </div>
                )}
            <label  >
                <Typography variant="body2" component="div" gutterBottom style={{ display: 'inline' }}>
                    <Checkbox onChange={handleChecked} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} style={{ display: 'inline', zIndex: -1 }} />
                    Compare two separate artists?
                </Typography>
            </label>
            <Button className="button" variant="contained" color="success" onClick={handleOnSearch}
                style={{ display: 'block', marginBottom: 9, marginTop: 4 }}>
                Get Insights
            </Button>
            <ClearButton />
            <hr></hr>
        </div >
    )
}

export default SearchModule

//write conditional for Select Artist span so that it defaults to "None" if !searchQ