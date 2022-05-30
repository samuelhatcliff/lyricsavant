import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const BarChart = ({ artist1, artist2 }) => {

    const state = {
        labels: [
            "Positive", "Negative", "Nuetral"
        ],
        datasets:
            [
                {
                    label: artist1.name,
                    backgroundColor: "rgba(75, 192, 192, 1)",
                    borderColor: "rgba(0, 0, 0, 1)",
                    borderWideth: "2",
                    data: [
                        artist1.pol_score.data.poss_avg,
                        artist1.pol_score.data.negs_avg,
                        artist1.pol_score.data.neus_avg
                    ]
                },
                {
                    label: artist2.name,
                    backgroundColor: "rgba(75, 75, 75, 1)",
                    borderColor: "rgba(0, 0, 0, 1)",
                    borderWideth: "2",
                    data: [
                        artist2.pol_score.data.poss_avg,
                        artist2.pol_score.data.negs_avg,
                        artist2.pol_score.data.neus_avg
                    ]

                },
            ]

    }
    const options = {
        plugins: {
            legend: {
                display: true,
                position: "bottom"
            },
            title: {
                text: "Polarity Data",
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

export default BarChart