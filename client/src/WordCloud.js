import React from 'react';
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

// const data = [
//     { text: 'Hey', value: 1000 },
//     { text: 'lol', value: 200 },
//     { text: 'first impression', value: 800 },
//     { text: 'very cool', value: 1000000 },
//     { text: 'duck', value: 10 },
// ];

function freqCount(arr) {
    const freqs = {};
    for (let item of arr) {
        let currentCount = freqs[item] || 0;
        freqs[item] = currentCount + 1;
    }
    return freqs
}

function toArr(obj) {
    let arr = [];
    for (const [key, value] of Object.entries(obj)) {
        let eachObj = {};
        eachObj["text"] = key;
        eachObj["value"] = value;
        arr.push(eachObj)
    }
    return arr;
}
const WordCloudFunc = ({ artist }) => {
    const data = freqCount(artist.words)
    const newData = toArr(data)
    console.log(newData)
    console.log(newData[0])
    return <div><WordCloud data={newData}
        width={800}
        height={800}
        font="Times"
        // fontStyle="italic"
        fontWeight="bold"
        fontSize={(word) => Math.log2(word.value) * 20}
        spiral="rectangular"
        rotate={(word) => word.value % 360}
        padding={5}
        random={Math.random}
        onWordClick={(event, d) => {
            console.log(`onWordClick: ${d.text}, length: ${d.text.length}`);
        }}

    /></div>
}

export default WordCloudFunc