import React, { useState, useEffect } from 'react';
import Search from "./Search";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Backdrop from '@mui/material/Backdrop';
import ClearButton from "./ClearButton";

//To-Do: "Clear" state might be serving the same exact function as "submit". Review this and try to combine both into one state if possible

const SearchModule = ({ setSubmit, setLoading, setArtistId, setArtistId2, allArtists, clear, setClear }) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

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
            setClear(false)
            setLoading(true)
            handleToggle()
        }
    }

    return (
        <div>
            {checked && !clear ? (
                <div>
                    <Typography variant="subtitle1" component="div" gutterBottom>
                        <Search allArtists={allArtists} setSearchQ={setSearchQ1} />
                        <span>Selected Artist: {searchQ1["name"]}</span>
                        <Search allArtists={allArtists} setSearchQ={setSearchQ2} />
                        <span>Selected Artist: {searchQ2["name"]}</span>
                        <ClearButton setClear={setClear} />
                    </Typography>
                </div>
            )
                : (
                    <div>
                        <Typography variant="subtitle1" component="div" gutterBottom>
                            <Search allArtists={allArtists} setSearchQ={setSearchQ1} />
                            <span>Selected Artist: {searchQ1["name"]}</span>
                            <ClearButton setClear={setClear} />
                        </Typography>
                    </div>
                )}

            <label  >
                <Typography variant="body2" component="div" gutterBottom style={{ display: 'inline' }}>
                    <Checkbox onChange={handleChecked} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                    Compare two separate artists?
                </Typography>
            </label>
            <Button variant="contained" color="success" onClick={handleOnSearch}
                style={{ display: 'block' }}>
                Get Insights
            </Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
            </Backdrop>
        </div >
    )
}

export default SearchModule

//write conditional for Select Artist span so that it defaults to "None" if !searchQ