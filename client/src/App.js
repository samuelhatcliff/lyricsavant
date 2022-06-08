import React, { useState, useEffect } from 'react';
// Our own components 
import SearchModule from './SearchModule';
import Results from "./Results";
import BasicGrid from './charts/GridDemo';
import Contribute from "./Contribute";
import Explanation from "./Explanation";

function App() {
  const [allArtists, setAllArtists] = useState([{}]);
  const [artistId, setArtistId] = useState(null);
  const [artistId2, setArtistId2] = useState(null)
  const [submit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(false)
  const [clear, setClear] = useState(true)


  useEffect(() => {
    fetch("/api/artists/").then( // gets all artist names
      res => res.json()
    ).then(
      artists => {
        let names = artists.artists.map(({ name, id }) => (
          { "name": name, "id": id }
        ))
        setAllArtists(names)
      },
    )
  }, []);

  console.log("Loeading?", isLoading)
  return (
    <div className="App">
      {/* <BasicGrid></BasicGrid> */}
      {/* <Contribute allArtists={allArtists} /> */}

      <SearchModule setSubmit={setSubmit}
        setLoading={setLoading}
        allArtists={allArtists}
        setArtistId={setArtistId}
        setArtistId2={setArtistId2}
        clear={clear}
        setClear={setClear} />
      {submit && !clear ? (
        <Results artistId={artistId}
          artistId2={artistId2}
          setLoading={setLoading}
          isLoading={isLoading} />
      ) : (
        <></>
      )}
      {!isLoading && clear ? (
        <Explanation />) : <></>}
    </div>
  );
}

export default App;

