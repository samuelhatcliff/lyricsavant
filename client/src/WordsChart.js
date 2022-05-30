import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const WordsChart = ({ artist1, artist2 }) => {
    // UNIQUE WORDS
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
        }
    }

    return (
        <div>
            <Bar data={state}
                options={options} />
        </div>
    )
}

export default WordsChart