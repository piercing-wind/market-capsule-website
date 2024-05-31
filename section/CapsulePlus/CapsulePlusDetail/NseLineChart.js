import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
    Filler
);
const NseLineChart = ({ prices }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
            datalabels: {
                display: false,
            }
        },
        scales: {
            y: {
                grid: {
                    display: true, // Hide the grid lines on the y-axis
                },
                border: {
                    display: true
                },
                ticks: {
                    display: true,
                    stepSize: 200,
                    color: '#000000',
                    font: {
                        size: 12,
                        weight: "normal"
                    },
                    beginAtZero: false,

                },
                drawBorder: true
            },
            x: {
                grid: {
                    display: false, // Hide the grid lines on the y-axis
                },
                border: {
                    display: false
                },
                ticks: {
                    display: false,
                }
            },
        }
    };

    const labels = prices?.map((item) => item?.date);
    const dataValues = prices?.map((item) => item?.price);

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: dataValues,
                borderColor: '#3E63FF',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
                    gradient.addColorStop(0, "rgba(123, 178, 255, 1)"); // Adjusted color stop with opacity
                    gradient.addColorStop(1, "rgba(62, 99, 255, 0)");
                    return gradient;
                },

                pointStyle: 'circle',
                pointRadius: 2,
                pointHoverRadius: 5,
                fill: true,
            },

        ],
    };
    return (
        <div>
            <Line options={options} data={data} />

        </div>
    )
}

export default NseLineChart