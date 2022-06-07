import React, { useState, useEffect } from 'react';
// Our own components 
import SearchModule from './SearchModule';
import Results from "./Results";
import BasicGrid from './charts/GridDemo';
import Contribute from "./Contribute";

function App() {
  const [allArtists, setAllArtists] = useState([{}]);
  const [artistId, setArtistId] = useState(null);
  const [artistId2, setArtistId2] = useState(null)
  const [submit, setSubmit] = useState(false);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // console.log("get all artist effect ran. Current Artists:", artistId, artistId2)
    const p3 = fetch("/api/artists/").then( // gets all artist names
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

  return (
    <div className="App">
      {/* <BasicGrid></BasicGrid> */}
      {/* <Contribute allArtists={allArtists} /> */}

      <SearchModule setSubmit={setSubmit}
        setLoading={setLoading}
        allArtists={allArtists}
        setArtistId={setArtistId}
        setArtistId2={setArtistId2} />
      {submit ? (
        <Results artistId={artistId}
          artistId2={artistId2}
          setLoading={setLoading}
          isLoading={isLoading} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;

