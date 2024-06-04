import React, { useState } from 'react';
import clsx from "clsx";
import Table from 'react-bootstrap/Table';
import { Trans, useTranslation } from 'next-i18next';
import styles from "./style/volumeTable.module.scss"
const VolumeTable = (props) => {
    const { dataTable, currentDate: currentDateString } = props;
    const { t } = useTranslation("common")
    return (
        <>
            <div className={clsx(styles.table)}>
                <Table responsive >
                    <thead>
                        <tr>
                            <th className={clsx(styles.heading, styles.skyBlueBgColor)} >
                                <div className={clsx('d-flex column-gap-2 align-items-center justify-content-center')}>
                                    <span className='text-center'>
                                        Month and Year
                                    </span>
                                </div>

                            </th>
                            {
                                dataTable?.length > 0 ? (
                                    [...dataTable]?.sort((a, b) => {
                                        const dateA = new Date(a.monthAndYear);
                                        const dateB = new Date(b.monthAndYear);
                                        return dateA - dateB;
                                    })?.map((el, index) => {
                                        return (
                                            <th key={index} className={clsx(styles.heading, index % 2 === 1 ? styles.skyBlueBgColor : styles.whiteBgColor)} >
                                                <div className={clsx('d-flex column-gap-2 align-items-center ', "justify-content-center")}>
                                                    <span className='text-center'>
                                                        {
                                                            el?.monthAndYear
                                                        }

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
                            <td className={clsx(styles.trTable, styles.skyBlueBgColor, "text-center")}>Volume</td>
                            {
                                dataTable?.length > 0 ? (
                                    dataTable?.map((el, index) => {
                                        return (
                                            <td className={clsx("text-center", styles.trTable, index % 2 === 1 ? styles.skyBlueBgColor : styles.whiteBgColor)} key={index}>
                                                {
                                                    el?.volume
                                                }
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