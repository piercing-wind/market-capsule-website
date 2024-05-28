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
import { faker } from "@faker-js/faker";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { sensexChartBarData, sensexChartData } from '../homePageData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);


const labels = ['21', '22', '23', '24', '25', '26', '27', "28", "29", "01"];
const dataValues = sensexChartBarData?.map((item) => ({
    value: item?.value,
    backgroundColor: item?.value > 0 ? '#2EDC90' : '#FF4F55',
    align: item?.value > 0 ? 'start' : 'end'
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
            display: true,
            anchor: dataValues.map(item => item?.align),
            align: dataValues.map(item => item?.align),
            color: '#868686', // Set the font color of the labels
            font: {
                size: 10, // Set the font size
                weight: '500', // Set the font weight if needed
            },
            formatter: (value, context) => { // Customize label format
                return sensexChartBarData[context.dataIndex]?.date; // Format the label to display date
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
            stacked: true,
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
        y: {
            stacked: true,
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
    },
};

export const data = {
    labels,
    datasets: [
        {
            label: '',
            data: dataValues?.map(item => item.value),
            backgroundColor: dataValues.map(item => item?.backgroundColor),
            stack: 'Stack 0',
        },


    ],
};

const DateBarChart = () => {
    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}

export default DateBarChart