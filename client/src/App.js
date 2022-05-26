import './App.css';
import React, { useState, useEffect, PureComponent } from 'react';
import { PieChart, Pie, Sector, Legend, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import BarChart from "./BarChart.js";

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

// const data01 = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
//   { name: 'Group E', value: 278 },
//   { name: 'Group F', value: 189 },
// ];



// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };
function App() {
  const [initialData, setData] = useState([{}])

  useEffect(() => {
    fetch("/test").then(
      res => res.json()
    ).then(
      initialData => {
        setData(initialData)
        console.log(initialData)
      }
    )
  }, [])

  return (
    <div className="App">
      <BarChart />


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