import './App.css';
import React, { useState, useEffect, PureComponent } from 'react';
import axios from "axios";
import { Default } from "react-awesome-spinners";
import { Bars, Circles, Grid } from 'react-loader-spinner';







// import { PieChart, Pie, Sector, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import BarChart from "./BarChart.js";
import PieChart from './PieChart';
import WordsChart from './WordsChart';
import WordCloudFunc from './WordCloud';
import Search from "./Search";



// let artist1;
// let artist2;

// getData();

function App() {
  let [isLoading, setLoading] = useState(true);
  let [artist1, setArtist1] = useState([{}])
  let [artist2, setArtist2] = useState([{}])
  let [allArtists, setAllArtists] = useState([{}])
  useEffect(() => {
    const p1 = fetch("/api/artists/20710").then( // gets data for 1st artist
      res => res.json()
    ).then(
      initialData => {
        console.log(initialData)
        artist1 = initialData;
        setArtist1(initialData);
      }
    )
    const p2 = fetch("/api/artists/18453").then( // gets data for 2nd artist
      res => res.json()
    ).then(
      initialData => {
        artist2 = initialData;
        setArtist2(initialData);
        console.log(artist2)
      }
    )
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

    Promise.all([p1, p2, p3]).then(v => {
      setLoading(false);
    });
  }, []);


  if (isLoading) {
    return <div className="App">
      Loading...
      <Circles color="#00BFFF" height={80} width={80} />
    </div>;
  }

  console.log(allArtists)
  return (
    <div className="App">
      <Search allArtists={allArtists} />
      <WordCloudFunc artist={artist1} />

      <WordsChart artist1={artist1} artist2={artist2} />
      <BarChart artist1={artist1} artist2={artist2} />
      <PieChart artist={artist1} />
      <PieChart artist={artist2} />


    </div>
  );
}





export default App;


// CUSTOMIZE TOOLTIP CONTENT
// https://recharts.org/en-US/guide/customize

// import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];
// ...
// function getIntroOfPage(label) {
//   if (label === 'Page A') {
//     return 'Page A is about men's clothing';
//   } if (label === 'Page B') {
//     return 'Page B is about women's dress';
//   } if (label === 'Page C') {
//     return 'Page C is about women's bag';
//   } if (label === 'Page D') {
//     return 'Page D is about household goods';
//   } if (label === 'Page E') {
//     return 'Page E is about food';
//   } if (label === 'Page F') {
//     return 'Page F is about baby food';
//   }
// }

// function CustomTooltip({ payload, label, active }) {
//   if (active) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label} : ${payload[0].value}`}</p>
//         <p className="intro">{getIntroOfPage(label)}</p>
//         <p className="desc">Anything you want can be displayed here.</p>
//       </div>
//     );
//   }

//   return null;
// }
// const renderBarChart = (
//   <BarChart width={600} height={300} data={data}>
//     <XAxis dataKey="name" tick={renderCustomAxisTick} />
//     <YAxis />
//     <Tooltip content={<CustomTooltip />}/>
//     <Bar dataKey="uv" fill="#8884d8"
//       shape={<TriangleBar />} />
//   </BarChart>
// );

// CUSTOMIZE LEGEND EXAMPLE     
// <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />


/* <ResponsiveContainer width="100%" aspect={3}>

    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      < Tooltip />
    </PieChart>


  </ResponsiveContainer>
  <ResponsiveContainer width="100%" aspect={3}>
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data01}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  </ResponsiveContainer> */