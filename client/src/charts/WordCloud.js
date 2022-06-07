import React from 'react';
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';


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

function filterArray(arr) {
    const length = arr.length;
    let sum = 0;
    for (let eachObj of arr) {
        sum += eachObj["value"];
    }
    const average = sum / length
    const reducedArr = [];
    for (let eachObj of arr) {
        if (eachObj["value"] > average) {
            reducedArr.push(eachObj)
        }
    }
    return reducedArr;
}
const WordCloudFunc = ({ artist }) => {
    const data = freqCount(artist.words)
    const arrData = toArr(data)
    const reducedData = filterArray(arrData)

    return <div>
        <WordCloud data={reducedData}
            width={1200}
            height={800}
            font="Times"
            // fontStyle="italic"
            fontWeight="bold"
            fontSize={(word) => Math.log2(word.value) * 25}
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