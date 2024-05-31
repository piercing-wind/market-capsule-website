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
import { shallowEqual, useSelector } from 'react-redux';
import moment from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const DateBarChart = () => {
    const { sensexAndNiftyData } = useSelector((state) => ({
        sensexAndNiftyData: state?.homePageSlice?.sensexAndNiftyObj?.sensexAndNiftyData,
    }), shallowEqual)
    let sortedIndexes;
    if (Array.isArray(sensexAndNiftyData?.indexes)) {
        sortedIndexes = [...sensexAndNiftyData.indexes].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    const labels = sortedIndexes?.map((item) => (moment(item?.date)?.format('DD MMM YYYY')));
    const dataValues = sortedIndexes?.map((item) => ({
        value: item?.price,
        backgroundColor: item?.price > 0 ? '#2EDC90' : '#FF4F55',
        // align: item?.price > 0 ? 'start' : 'end'
        align: "end"
    }));

    const options = {
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
            datalabels: {
                display: true,
                anchor: dataValues?.map(item => item?.align),
                align: dataValues?.map(item => item?.align),
                color: '#868686', // Set the font color of the labels
                font: {
                    size: 10, // Set the font size
                    weight: '500', // Set the font weight if needed
                },
                formatter: (value, context) => { // Customize label format
                    const date = sortedIndexes?.[context.dataIndex]?.date;
                    const formattedDate = moment(date)?.format('DD ');
                    return formattedDate;
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

    const data = {
        labels,
        datasets: [
            {
                label: "",
                data: dataValues?.map(item => item.value),
                backgroundColor: dataValues?.map(item => item?.backgroundColor),
                stack: 'Stack 0',
            },
        ],
    };
    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}

export default DateBarChart