import React, { useState } from 'react';
//Our Components
import Search from "../../../Utility/Search/Search.js";
//MUI Components
import Typography from '@mui/material/Typography';

const SearchUnit = ({ selected, setSelected, secondarySearch, allArtists }) => {

    return (
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
                    setSelected={setSelected}
                    secondarySearch={secondarySearch} />
            </Typography>
        </div>
    )
}

export default SearchUnit

