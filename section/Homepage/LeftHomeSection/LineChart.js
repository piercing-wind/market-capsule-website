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
import { shallowEqual, useSelector } from 'react-redux';

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

const LineChart = () => {
    const { sensexAndNiftyData } = useSelector((state) => ({
        sensexAndNiftyData: state?.homePageSlice?.sensexAndNiftyObj?.sensexAndNiftyData,
    }), shallowEqual)

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
    let sortedIndexes;
    if (Array.isArray(sensexAndNiftyData?.indexes)) {
        sortedIndexes = [...sensexAndNiftyData.indexes].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    const labels = sortedIndexes?.map((item) => item?.date);
    const dataValues = sortedIndexes?.map((item) => item?.price);

    const data = {
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
    return (
        <div>
            <Line options={options} data={data} />
        </div>
    )
}

export default LineChart