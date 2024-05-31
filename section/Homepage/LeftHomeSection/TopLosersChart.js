import ChartLineUpGreen from '@/components/svg/ChartLineUpGreen'
import React, { useEffect, useState } from 'react'
import clsx from "clsx";
import styles from "../style/topGainersAndLosersCard.module.scss"
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
import { getScreenHeight, getScreenWidth } from '@/utils/constants';
import ChartLineUpRed from '@/components/svg/ChartLineUpRed';
import { Trans, useTranslation } from 'next-i18next';
import NotFoundCard from '@/components/Module/NotFoundCard/NotFoundCard';
import { shallowEqual, useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const TopLosersChart = () => {
    const { t } = useTranslation("common");
    const { topLosersList } = useSelector((state) => ({
        topLosersList: state?.homePageSlice?.topLosersObj?.topLosersList,
    }), shallowEqual)
    // Extract labels and data from topLosersList
    const labels = topLosersList?.map((item) => item?.attributes?.company?.data?.attributes?.name);
    const dataValues = topLosersList?.map((item) => item?.attributes?.value);

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: dataValues,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "#FF4F55");
                    gradient.addColorStop(1, "#FFAFB2");
                    return gradient;
                },
                borderColor: [
                    'rgba(127, 253, 198,1)',
                ],
                borderRadius: 30,
                barPercentage: 0.6, // Adjust as needed
            },

        ],
    };
    const [screenWidth, setScreenWidth] = useState(getScreenWidth());
    const [screenHeight, serScreenHeight] = useState(getScreenHeight())
    function calculateAspectRatio() {
        // If screen width is less than 991px, use the default aspect ratio of 1
        if (screenWidth < 991) {
            // Set the desired aspect ratio based on the ratio of width to height
            // For example, 16:9 is a common aspect ratio
            // You can adjust this value according to your specific requirements
            const aspectRatio = 16 / 9; // 16:9 aspect ratio
            // Calculate the aspect ratio dynamically based on screen size
            // You can adjust this calculation as needed
            const calculatedAspectRatio = screenWidth / screenHeight * aspectRatio;
            return calculatedAspectRatio
        } else {
            return 1;

        }
    }

    const options = {
        indexAxis: 'y',
        aspectRatio: calculateAspectRatio(),
        elements: {
            bar: {
                borderRadius: 20,
                borderSkipped: '',
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "",
                display: false,

            },
            title: {
                display: false,
                text: 'Chart.js Horizontal Bar Chart',
            },
            datalabels: {
                anchor: 'end',
                align: 'end',
                color: '#232323', // Set the color of the labels
                font: {
                    size: 10, // Set the font size
                    weight: '600', // Set the font weight if needed
                },
                formatter: (value, context) => { // Customize label format
                    return value?.toFixed(2); // Format the value to two decimal places
                }
            }

        },
        scales: {
            y: {
                grid: {
                    display: false, // Hide the grid lines on the y-axis
                },
                ticks: {
                    color: '#868686',
                    font: {
                        size: 10, // specify the font size here
                    },
                    align: 'left', // Align labels to the left
                    autoSkip: false,
                    labelOffset: 0,
                    crossAlign: "far",

                },

                drawBorder: false
            },
            x: {
                ticks: {
                    color: '#868686',
                    font: {
                        size: 10, // specify the font size here
                    },
                },
                border: {
                    display: false
                },

            },

        },
    };

    useEffect(() => {
        function handleResize() {
            setScreenWidth(getScreenWidth());
            serScreenHeight(getScreenHeight());
        }
        const resizeListener = () => handleResize();
        window.addEventListener("resize", resizeListener);
        return () => {
            window.removeEventListener("resize", resizeListener);
        };
    }, []);

    return (
        <div className='mt-4'>
            <div className={clsx('d-flex column-gap-2', styles.topGainer)}>
                <ChartLineUpRed />
                <h5 className={clsx("mb-0")}>{t("homepage.leftSection.topLosers")}</h5>
            </div>
            {
                topLosersList?.length > 0 ? (
                    <div className={clsx(styles.barContainer)}>
                        <Bar options={options} data={data} />
                        <span>{t("homepage.leftSection.dayChange")}</span>
                    </div>
                ) : (
                    <NotFoundCard />
                )
            }
        </div>
    )
}

export default TopLosersChart