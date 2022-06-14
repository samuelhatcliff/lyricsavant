import { BrowserRouter, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css'
import Typography from '@mui/material/Typography';

// Our own components 
import Home from "./Home/Home";
import NavBar from "./NavBar/NavBar";
import BasicGrid from './GridDemo/GridDemo';
import Contribute from "./Contribute/Contribute";

function App() {
  const [allArtists, setAllArtists] = useState([{}]);
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
  console.log("All artists:", allArtists)
  return (
    <main >
      <BrowserRouter>
        <Typography variant="body2" component="div" gutterBottom>
          <NavBar />
          <Route exact path="/">
            <Home allArtists={allArtists} />
          </Route>
          <Route exact path="/contribute">
            <Contribute allArtists={allArtists} />
          </Route>
          <Route exact path="/grid">
            <BasicGrid />
          </Route>
        </Typography>
      </BrowserRouter>
    </main>
  );
}

export default App;

