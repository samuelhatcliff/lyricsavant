import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const BarChart = ({ artist1, artist2 }) => {
    const comp1 = artist1.pol_score.data.coms_avg;
    const comp2 = artist2.pol_score.data.coms_avg;
    function insightMsg() {
        let leans;
        //artist with more positive lyrics assigned to "winner", rewrite as tertiary operator 
        if (comp1 > comp2) {
            //A higher score should indicate more positive lyrics
            leans = "positive"
        } else {
            leans = "negative"
        }
        const math = console.log("import calculation written in python")
        return `The artist ${artist1.name} generally has more ${leans} lyrics than ${artist2.name}
            by ${math} percent.`
    }

    const state = {
        labels: [
            "Positive", "Negative"
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
                        // artist1.pol_score.data.neus_avg
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
                        // artist2.pol_score.data.neus_avg
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
            {insightMsg()}
        </div>
    )
}

export default BarChart