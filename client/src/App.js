import './App.css';
import React, { useState, useEffect } from 'react';

// External components/libraries
import axios from "axios";
import { Bars, Circles, Grid } from 'react-loader-spinner';

// Our own components 
import Search from "./Search";
import Artist from "./Artist";
import Results from "./Results";

function App() {
  let [allArtists, setAllArtists] = useState([{}]);
  let [artistId, setArtistId] = useState(null);
  let [artistId2, setArtistId2] = useState(null)
  let [submit, setSubmit] = useState(false);
  const [checked, setChecked] = useState(false);
  let [searchQ1, setSearchQ1] = useState([{}]);
  let [searchQ2, setSearchQ2] = useState([{}]);
  let [completed, setCompleted] = useState([{}]);

  // const [selectedArtists, setSelected] = useState([])
  // const addSelectedArtist = (id) => {
  //   setSelected(selectedArtists => [...selectedArtists,
  //     id])
  // }
  // const removeSelectedArtist = (id) => {
  //   setSelected(selectedArtists.filter(selectedArtists => id !== id))
  // }

  const handleOnSearch = () => {
    console.log(searchQ1["id"], "on search", searchQ2["id"], "on search")
    if (searchQ1) {
      setArtistId(searchQ1["id"])
      if (setArtistId2) {
        setArtistId2(searchQ2["id"])
      }
      setSubmit(true)
      setCompleted([])
    }
  }



  const handleChecked = () => {
    setChecked(!checked);
  };

  // console.log(
  //   "App function body, rendering"
  // )

  // useEffect(() => {
  //   if (completed[0] && completed[1] == true) {
  //     setLoading(false)
  //   }
  // }, [completed]);

  useEffect(() => {
    console.log("get all artist effect ran. Current Artist:", artistId)
    const p3 = fetch("/api/artists/").then( // gets all artist names
      res => res.json()
    ).then(
      artists => {
        let names = artists.artists.map(({ name, id }) => (
          { "name": name, "id": id }
        ))
        setAllArtists(names)
        console.log(allArtists)
      },
    )
  }, []);

  return (
    <div className="App">
      <div className="Search">
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
      </div>
      <label>
        <input type="checkbox"
          checked={checked}
          onChange={handleChecked} />
        Compare two separate artists?
      </label>

      <button type="submit" value="Submit" onClick={handleOnSearch}>Submit</button>


      {submit ? (
        <Results artistId={artistId} artistId2={artistId2} />
      ) : (
        <></>
      )}



      {/* <WordsChart artist1={artist1} artist2={artist2} />
      <BarChart artist1={artist1} artist2={artist2} />
      <PieChart artist={artist2} /> */}
    </div>
  );
}

export default App;

