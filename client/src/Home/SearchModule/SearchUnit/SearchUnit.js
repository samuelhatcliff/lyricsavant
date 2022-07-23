import React from 'react';
import Search from "../../../Utility/Search/Search.js";
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

