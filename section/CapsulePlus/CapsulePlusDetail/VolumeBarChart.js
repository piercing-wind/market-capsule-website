import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { sensexChartData } from './capsulePlusDetailData';
import { getMonthAbbreviation, isNewYear } from '@/utils/constants';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

// Extract unique starting dates of each month
const uniqueDates = [...new Set(sensexChartData.map(item => item.date.split('-').slice(0, 2).join('-') + '-01'))];
// Configure the ticks for the x-axis
const labels = sensexChartData.map(item => item.date);
const dataValues = sensexChartData.map((item) => ({
    volume: item.volume,
    backgroundColor: '#2EDC90',
    align: 'start'
}));




export const options = {
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false,
        },
        datalabels: {
            display: false,
            anchor: dataValues.map(item => item.align),
            align: dataValues.map(item => item.align),
            color: '#868686', // Set the font color of the labels
            font: {
                size: 20, // Set the font size
                weight: '500', // Set the font weight if needed
            },
            formatter: (value, context) => { // Customize label format
                return uniqueDates[context.dataIndex] ? uniqueDates[context.dataIndex] : ""
                // Format the label to display date

            }
        }
    },
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    scales: {
        x: {
            stacked: false,
            grid: {
                display: false, // Hide the grid lines on the y-axis
            },
            border: {
                display: true
            },
            ticks: {
                display: true,
                color: '#000000',
                font: {
                    size: 12,
                    weight: "normal",
                    style: "normal"

                },
                beginAtZero: false,
                callback: function (value, index, values) {
                    // Get the date value associated with the current tick index
                    const dateValue = labels[index];
                    const monthAbbreviation = getMonthAbbreviation(dateValue);
                    if (isNewYear(dateValue)) {
                        return new Date(dateValue).getFullYear();
                    } else {
                        return uniqueDates.includes(dateValue) ? monthAbbreviation : '';

                    }
                }
            }
        },
        y: {
            stacked: false,
            grid: {
                display: false, // Hide the grid lines on the y-axis
            },
            border: {
                display: true
            },
            ticks: {
                display: true,
                stepSize: 0,
                color: '#000000',
                font: {
                    size: 12,
                    weight: "normal",
                    style: "normal"
                },
                beginAtZero: false,
                callback: function (value, index, values) {
                    return value / 1000000 + 'M';
                }

            }
        },
    },
};

export const data = {
    labels,
    datasets: [
        {
            label: '',
            data: dataValues.map(item => item.volume),
            backgroundColor: dataValues.map(item => item.backgroundColor),
            stack: 'Stack 0',
        },


    ],
};

const VloumeBarChart = () => {
    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}

export default VloumeBarChart
