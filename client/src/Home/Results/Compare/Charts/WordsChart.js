import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const WordsChart = ({ artist1, artist2 }) => {
    // UNIQUE WORDS
    function insightMsg() {
        let winner;
        let loser;
        //rewrite as tertiary operator 
        if (artist1.vocab_score > artist2.vocab_score) {
            winner = artist1;
            loser = artist2;
        } else {
            winner = artist2;
            loser = artist1;
        }
        const subtraction = winner.vocab_score - loser.vocab_score;
        return <span className="text"><span>The artist {winner.name} has a larger vocabulary than {loser.name}
            by {subtraction} words. {winner.name} uses {winner.vocab_score} unique words,
            while {loser.name} uses {loser.vocab_score} unique words.</span></span>
    }

    const state = {
        labels: [
            artist1.name, artist2.name
        ],
        datasets: [
            {
                label: "",
                backgroundColor: ["rgba(75, 192, 192, 1)", "rgba(75, 75, 75, 1)"],
                borderColor: "rgba(0, 0, 0, 1)",
                borderWideth: "2",
                data: [artist1.vocab_score, artist2.vocab_score]
            },
        ]
    }
    const options = {
        scales: {
            x: {
                grid: {
                    color: 'red',
                    borderColor: 'grey',
                    tickColor: 'grey',
                    display: false
                }
            },
            y: {
                grid: {
                    color: 'red',
                    borderColor: 'grey',
                    tickColor: 'grey',
                    display: false
                }
            },
        },
        plugins: {
            legend: {
                display: false,
                position: "bottom"
            },
            title: {
                text: "Number of Unique Words",
                display: true,
                fontSize: 20
            }
        },
        maintainAspectRatio: false
    }

    return (
        <div className="item">
            <Bar data={state}
                width={100}
                height={50}
                options={options} />
            {/* {insightMsg()} */}
        </div>
    )
}

export default WordsChart



