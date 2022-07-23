import React, { useState } from 'react';
import InsightButton from './Buttons/InsightButton.js'
import SearchUnit from './SearchUnit/SearchUnit.js';
import Prompt from './Prompt/Prompt.js'
import './SearchModule.css'

const SearchModule = ({ setSubmit, setLoading, setArtistId, setArtistId2, allArtists }) => {
    const [selected, setSelected] = useState(null)
    const [selected2, setSelected2] = useState(null)
    const [checked, setChecked] = useState(false);
    const handleChecked = () => {
        setChecked(!checked);
    };

    if (!checked && selected2) setSelected2(null) //acounts for edge-case of user unchecking prompt after selecting a 2nd artist

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
                <SearchUnit allArtists={allArtists} selected={selected} setSelected={setSelected} secondarySearch={false}></SearchUnit>
                {checked ? (
                    <SearchUnit allArtists={allArtists} selected={selected2} setSelected={setSelected2} secondarySearch={true}></SearchUnit>
                )
                    : (
                        <></>
                    )}
                <Prompt handleChecked={() => handleChecked()}></Prompt>
            </div>
            <InsightButton selected={selected} handleOnSearch={() => handleOnSearch()}></InsightButton>
        </div >
    )
}

export default SearchModule

