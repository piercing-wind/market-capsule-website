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
import { sensexChartData, topGainerArr } from '../homePageData';
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

export const options = {

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
                display: false, // Hide the grid lines on the y-axis
            },
            border: {
                display: false
            },
            ticks: {
                display: false
            },

            drawBorder: false
        },
        x: {
            grid: {
                display: false, // Hide the grid lines on the y-axis
            },
            border: {
                display: false
            },
            ticks: {
                display: false
            }

        },

    }
};

const labels = sensexChartData.map((item) => item.date);
const dataValues = sensexChartData.map((item) => item.value);

export const data = {
    labels,
    datasets: [
        {
            label: '',
            data: dataValues,
            borderColor: '#7A92B1',
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                gradient.addColorStop(0, "#D9E9FF");
                gradient.addColorStop(1, "#FFFFFF");
                return gradient;
            },

            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 5,
            fill: true,
        },

    ],
};

console.log("sensexChartData", sensexChartData)
const LineChart = () => {
    return (
        <div>
            <Line options={options} data={data} />

        </div>
    )
}

export default LineChart