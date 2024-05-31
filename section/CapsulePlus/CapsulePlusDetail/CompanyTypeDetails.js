import React, { useState } from 'react';
import clsx from "clsx";
import Table from 'react-bootstrap/Table';
import { Trans, useTranslation } from 'next-i18next';
import styles from "./style/companyTypeDetail.module.scss"

const CompanyTypeDetail = (props) => {
    const { dataTable, dataTableHeading } = props;
    const { t } = useTranslation("common")
    return (
        <>
            <div className={clsx("tableScroll")}>
                <Table responsive>
                    <thead>
                        <tr>
                            {
                                dataTableHeading?.length > 0 ? (
                                    dataTableHeading?.map((el, index) => {
                                        return (
                                            <th key={index} className={clsx(styles.heading)} >
                                                <div className={clsx('d-flex column-gap-2 align-items-center ', index !== 0 && "justify-content-center")}>
                                                    <span className='text-center'>
                                                        {t(el?.heading)}

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
                        {
                            dataTable?.length > 0 ? (
                                dataTable?.map((el, index) => {

                                    return (
                                        <tr key={index} className={clsx(styles.trTable, index % 2 === 0 ? styles.skyBlueBgColor : styles.whiteBgColor)}>
                                            <td >{el?.title}</td>
                                            <td className='text-center'>
                                                {el?.value}
                                            </td>
                                            <td className='text-center'>{el?.remark}</td>

                                        </tr>
                                    )
                                })
                            ) : null
                        }


                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default CompanyTypeDetail