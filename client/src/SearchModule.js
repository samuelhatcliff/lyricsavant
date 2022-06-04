import React, { useState, useEffect } from 'react';
import Search from "./Search";

const SearchModule = ({ setSubmit, setLoading, setArtistId, setArtistId2, allArtists }) => {
    const [searchQ1, setSearchQ1] = useState([{}]);
    const [searchQ2, setSearchQ2] = useState([{}]);
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
        }
    }

    return (
        <div>
            {checked ? (
                <div>
                    <Search allArtists={allArtists} setSearchQ={setSearchQ1} />
                    <span>Selected Artist : {searchQ1["name"]}</span>,
                    <Search allArtists={allArtists} setSearchQ={setSearchQ2} />
                    <span>Selected Artist : {searchQ2["name"]}</span>
                </div>
            )
                : (
                    <div>
                        <Search allArtists={allArtists} setSearchQ={setSearchQ1} />
                        <span>Selected Artist : {searchQ1["name"]}</span>
                    </div>
                )}

            <label>
                <input type="checkbox"
                    checked={checked}
                    onChange={handleChecked} />
                Compare two separate artists?
            </label>

            <button type="submit" value="Submit" onClick={handleOnSearch}>Submit</button>
        </div>
    )
}

export default SearchModule