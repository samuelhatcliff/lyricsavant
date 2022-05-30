import React from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


const PieChart = ({ artist }) => {
    const state = {
        labels: [
            "Positive", "Negative", "Nuetral"
        ],
        datasets: [
            {
                label: artist.name,
                backgroundColor: ['#6d904f', '#c2484e', '#b3adad',],  // green, red, gray
                borderColor: "rgba(0, 0, 0, 1)",
                borderWideth: "2",
                data: [
                    artist.pol_score.data.poss_avg,
                    artist.pol_score.data.negs_avg,
                    artist.pol_score.data.neus_avg
                ]
            }
        ]
    }
    const options = {
        plugins: {
            legend: {
                display: true,
                position: "bottom"
            },
            title: {
                text: artist.name,
                display: true,
                fontSize: 20
            }
        }
    }

    return (
        <div>
            <Pie data={state}
                options={options} />

        </div>
    )
}

export default PieChart