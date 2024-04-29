import React, { useState } from 'react';
import clsx from "clsx";
import styles from "./style/screenerDetailTable.module.scss";
import Sort from '@/components/svg/Sort';
import Table from 'react-bootstrap/Table';
import { Trans, useTranslation } from 'next-i18next';
import AddToWatchlistBookmark from '@/components/svg/AddToWatchlistBookmark';
import BlueRightArrow from '@/components/svg/BlueRightArrow';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
const LoadMoreBtn = dynamic(() => import("@/components/Module/Button/LoadMoreBtn"))

const ScreenerDetailTable = (props) => {
    const [itemPerPage, setItemPerPage] = useState(10);
    const router = useRouter()
    console.log("router", router)

    const { dataTable, dataTableHeading } = props;
    const { t } = useTranslation("common")

    //load more btn 
    const loadMoreFun = () => {
        console.log("load more fun")
        if (dataTable?.length > itemPerPage) {

            setItemPerPage(itemPerPage + 5)
        }
    }

    //sort by filter
    const soringFun = () => {
        console.log("sort fun")
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
                                                <span  >
                                                    {t(el?.heading)}

                                                </span>
                                                {
                                                    index !== 0 && index !== dataTableHeading?.length - 1 && (
                                                        <button className={clsx(styles.sortBtn)} onClick={soringFun}>
                                                            <Sort />

                                                        </button>
                                                    )
                                                }

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
                                            {el?.marketCapInCr}
                                        </td>
                                        <td className='text-center'>{el?.ttmPe}</td>
                                        <td className='text-center' >{el?.dateOfInformation}</td>
                                        <td className='text-center'>
                                            <p className={clsx(' d-flex align-items-center  mb-0', styles.addTo)}>
                                                <AddToWatchlistBookmark />
                                                <span style={{ marginLeft: "5px" }}>
                                                    <Trans i18nKey={"screenerIdPage.addToWatchlist"}>
                                                        Add to Watchlist
                                                    </Trans>
                                                </span>
                                            </p>
                                        </td>
                                        <td className={clsx('text-center', styles.readMore)}>
                                            <Link href={`/screener/${router?.query?.id}/${el?.slug}`}>
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

export default ScreenerDetailTable