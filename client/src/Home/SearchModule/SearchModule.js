import React, { useState } from 'react';
//Our Components
import Search from "../../Utility/Search/Search.js";
//MUI Components
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import InsightButton from './Buttons/InsightButton.js'
import './SearchModule.css'

const SearchModule = ({ setSubmit, setLoading, setArtistId, setArtistId2, allArtists }) => {
    const [selected, setSelected] = useState(null)
    const [selected2, setSelected2] = useState(null)
    const [checked, setChecked] = useState(false);
    const handleChecked = () => {
        setChecked(!checked);
    };

    if (!checked && selected2) { //acounts for edge-case of user unchecking prompt after selecting a 2nd artist
        setSelected2(null)
    }

    const handleOnSearch = () => {
        if (selected) {
            setArtistId(selected["id"])
            if (selected2) {
                setArtistId2(selected2["id"])
            } else {
                setArtistId2(null)
            }
            setSubmit(true)
            setLoading(true)
        }
    }

    return (
        <div className="search-module-container">
            <div className='col-container'>
                <div className="search">
                    <Typography variant="subtitle1" component="div" gutterBottom>
                        <span>Selected Artist:
                            {selected ? (
                                <span className="selected">
                                    {selected["name"]}
                                </span>
                            ) : (<></>)}
                        </span>
                        <Search allArtists={allArtists}
                            setSelected={setSelected} />
                    </Typography>
                </div>
                {checked ? (
                    <div className="search">
                        <Typography variant="subtitle1" component="div" gutterBottom>
                            <span>Selected Artist:
                                {selected2 ? (
                                    <span className="selected">{selected2["name"]}</span>
                                ) : (<></>)}
                            </span>
                            <Search allArtists={allArtists}
                                placeholder="search2"
                                secondarySearch={true}
                                setSelected={setSelected2} />
                        </Typography>
                    </div>
                )
                    : (
                        <></>
                    )}
                <label className="prompt" >
                    <Typography variant="body2" component="div" gutterBottom style={{ display: 'inline', paddingTop: 12 }}>
                        <Checkbox placeholder="checkbox" onChange={handleChecked} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} style={{ display: 'inline', zIndex: -1 }} />
                        <span>Compare two separate artists?</span>
                    </Typography>
                </label>
            </div>
            <InsightButton selected={selected} handleOnSearch={() => handleOnSearch()}></InsightButton>
        </div >
    )
}

export default SearchModule

