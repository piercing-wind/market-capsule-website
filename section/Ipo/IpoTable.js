import React, { useState } from 'react';
import clsx from "clsx";
import Table from 'react-bootstrap/Table';
import { Trans, useTranslation } from 'next-i18next';
import BlueRightArrow from '@/components/svg/BlueRightArrow';
import dynamic from 'next/dynamic';
import styles from "./style/ipoTable.module.scss"
import Link from 'next/link';
const LoadMoreBtn = dynamic(() => import("@/components/Module/Button/LoadMoreBtn"))

const IpoTable = (props) => {
    const [itemPerPage, setItemPerPage] = useState(10)

    const { dataTable, dataTableHeading } = props;
    const { t } = useTranslation("common")

    //load more btn 
    const loadMoreFun = () => {
        console.log("load more fun")
        if (dataTable?.length > itemPerPage) {
            setItemPerPage(itemPerPage + 5)
        }
    }



    return (
        <>
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
                        <th style={{ visibility: "hidden" }} className={clsx(styles.heading)}>{`...`}</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        dataTable?.length > 0 ? (
                            dataTable?.slice(0, itemPerPage)?.map((el, index) => {

                                return (
                                    <tr key={index} className={clsx(styles.trTable, index % 2 === 0 ? styles.skyBlueBgColor : styles.whiteBgColor)}>
                                        <td >{el?.companyName}</td>
                                        <td className='text-center'>
                                            {el?.openDate}
                                        </td>
                                        <td className='text-center'>{el?.offerPricePe}</td>
                                        <td className='text-center' >{el?.lySalesGrowth}</td>
                                        <td className='text-center'>
                                            {
                                                el?.industry
                                            }
                                        </td>
                                        <td className={clsx('text-center', styles.readMore)}>
                                            <Link href={`/ipo/abc`}>

                                                <p className={clsx('mb-0  d-flex align-items-center ')}>
                                                    <span style={{ marginRight: "5px" }}>
                                                        <Trans i18nKey={"screenerIdPage.readMore"}>
                                                            Read More
                                                        </Trans>
                                                    </span>
                                                    <BlueRightArrow />
                                                </p>
                                            </Link>

                                        </td>
                                    </tr>
                                )
                            })
                        ) : null
                    }


                </tbody>
            </Table>
            {
                dataTable?.length > 10 && (
                    <LoadMoreBtn data={dataTable} itemPerpage={itemPerPage} loadMoreFun={loadMoreFun} />
                )
            }
        </>
    )
}

export default IpoTable