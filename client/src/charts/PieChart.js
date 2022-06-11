import React from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


const PieChart = ({ artist }) => {
    const data = artist.pol_score.data;
    function insightMsg() {
        if (data.poss_avg > data.negs_avg) {
            return <span className="text">The artist {artist.name} uses lyrics that tend to be more positive than negative, with an average polarity score of
                {data.poss_avg} for positive lyrics, and {data.negs_avg} for negative lyrics. </span>
        } else {
            return <span className="text">The artist {artist.name} uses lyrics that tend to be more negative than positive, with an average polarity score of
                {data.negs_avg} for negative lyrics, and {data.poss_avg} for positive lyrics. </span>
        }
    }
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
                    data.poss_avg,
                    data.negs_avg,
                    data.neus_avg
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
                fontSize: 10
            }
        }
    }

    return (
        <div className="pie">
            <Pie data={state}
                options={options} />
            {/* {insightMsg()} */}
        </div>
    )
}

export default PieChart