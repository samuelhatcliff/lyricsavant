import { BrowserRouter, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css'
import Typography from '@mui/material/Typography';

// Our own components 
import Home from "./Home/Home";
import NavBar from "./NavBar/NavBar";
import Contribute from "./Contribute/Contribute.js";

function App() {
  const [allArtists, setAllArtists] = useState([]);
  const [refresh, setRefresh] = useState(false) //value inverts after new artist has been seeded so that
  //the API call below executes and retrieves artist info to show up in search,
  // instead of the browser itself refreshing
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
  }, [refresh]);

  return (
    <BrowserRouter>
      <Typography variant="body2" component="div" gutterBottom>
        <NavBar />
        <Route exact path="/">
          <Home allArtists={allArtists} />
        </Route>
        <Route exact path="/contribute">
          <Contribute allArtists={allArtists} setRefresh={setRefresh} refresh={refresh} />
        </Route>
      </Typography>
    </BrowserRouter>
  );
}

export default App;

