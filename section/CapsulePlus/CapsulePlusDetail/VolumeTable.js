import React, { useState } from 'react';
import clsx from "clsx";
import Table from 'react-bootstrap/Table';
import { Trans, useTranslation } from 'next-i18next';
import styles from "./style/volumeTable.module.scss"
import { getMonthAndYearAbbreviation } from '@/utils/constants';

const VolumeTable = (props) => {

    const { dataTable, currentDate: currentDateString } = props;
    const { t } = useTranslation("common")
    const currentDate = new Date(currentDateString);
    // Get the current date
    const currentYear = currentDate?.getFullYear();
    const currentMonth = currentDate?.getMonth() + 1; // Month is 0-indexed

    // Calculate the start and end dates for the last 12 months
    const last12Months = [];
    let month = currentMonth;
    let year = currentYear;
    for (let i = 0; i < 12; i++) {
        if (month === 0) {
            month = 12;
            year--;
        }
        last12Months.push(`${year}-${month.toString().padStart(2, '0')}-01`);
        month--;
    }

    // Filter dataTable to include only entries within the last 12 months
    const filteredData = dataTable?.filter(item => last12Months?.includes(item.date));

    // Extract unique dates from the filtered data
    const uniqueDates = [...new Set(filteredData?.map(item => item?.date))];

    // Function to get volume data for a specific date
    const getVolumeForDate = (date) => {
        return filteredData?.find(item => item?.date === date)?.volume || "";
    };
    return (
        <>
            <div className={clsx(styles.table)}>
                <Table responsive >
                    <thead>
                        <tr>
                            <th className={clsx(styles.heading, styles.skyBlueBgColor)} >
                                <div className={clsx('d-flex column-gap-2 align-items-center')}>
                                    <span className='text-center'>
                                        Month and Year
                                    </span>


                                </div>

                            </th>
                            {
                                uniqueDates?.length > 0 ? (
                                    uniqueDates?.map((el, index) => {
                                        return (
                                            <th key={index} className={clsx(styles.heading, index % 2 === 1 ? styles.skyBlueBgColor : styles.whiteBgColor)} >
                                                <div className={clsx('d-flex column-gap-2 align-items-center ', index !== 0 && "justify-content-center")}>
                                                    <span className='text-center'>
                                                        {getMonthAndYearAbbreviation(el)}

                                                    </span>


                                                </div>

                                            </th>
                                        )
                                    })
                                ) : null
                            }

                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td className={clsx(styles.trTable, styles.skyBlueBgColor)}>Volume</td>

                            {
                                uniqueDates?.length > 0 ? (
                                    uniqueDates?.map((el, index) => {

                                        return (
                                            <td className={clsx("text-center", styles.trTable, index % 2 === 1 ? styles.skyBlueBgColor : styles.whiteBgColor)} key={index}>
                                                {getVolumeForDate(el)}
                                            </td>
                                        )
                                    })
                                ) : null
                            }
                        </tr>


                    </tbody>
                </Table>

            </div>

        </>
    )
}

export default VolumeTable