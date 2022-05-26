import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const BarChart = () => {
    const state = {
        labels: [
            "Jan", "Feb", "March", "April", "May"
        ],
        datasets: [
            {
                label: "Rainfall",
                backgroundColor: "rgba(75, 192, 192, 1)",
                borderColor: "rgba(0, 0, 0, 1)",
                borderWideth: "2",
                data: [65, 45, 123, 42, 43]

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
                text: "Average Rainfall per month",
                display: true,
                fontSize: 20
            }
        }
    }
    return (
        <div>
            <Bar data={state}
                options={options} />


            <p>Bar Chart</p>
        </div>
    )
}

export default BarChart