import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// Our own components 
import Home from "./Home";
import BasicGrid from './charts/GridDemo';
import Contribute from "./Contribute";
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
    <main className="App">
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/contribute">Contribute</Link>
        {/* <Link to="/grid">Grid</Link> */}
        <Route exact path="/">
          <Home allArtists={allArtists} />
        </Route>
        <Route exact path="/contribute">
          <Contribute allArtists={allArtists} />
        </Route>
        {/* <Route exact path="/grid">
          <BasicGrid />
        </Route> */}
      </BrowserRouter>
    </main>
  );
}

export default App;

