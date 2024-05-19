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
import LoderModule from '@/components/Module/LoaderModule';
import toast from 'react-hot-toast';
import { addToWatchList } from '@/store/slices/watchListSlice';
// import { addToWatchList } from '@/store/slices/watchlistSlice';
const LoadMoreBtn = dynamic(() => import("@/components/Module/Button/LoadMoreBtn"))

const ScreenerDetailTable = (props) => {
    const [itemPerPage, setItemPerPage] = useState(10);
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const { dataTable, dataTableHeading } = props;
    console.log("dataTable", dataTable)
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

    //add to watchlist
    const addToWatchlist = async (id) => {
        console.log("add to watchlist", id)
        const submitData = {
            companyId: id
        }
        setLoader(true)

        await addToWatchList(submitData,
            (res) => {
                if (res?.success) {
                    toast.success(t(res?.message));
                    setLoader(false)

                } else {
                    toast.error(res?.message);
                    setLoader(false);
                }
            },
            (err) => {
                if (!err?.success) {
                    toast.error(err?.message);
                    setLoader(false)
                }
            }
        );

    }

    return (
        <>
            {
                loader ? (
                    <LoderModule />
                ) : (
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
                                                    <td >{el?.name}</td>
                                                    <td className='text-center'>
                                                        {el?.marketCapInCr?.marketCap ? el?.marketCapInCr?.marketCap : "N/A"}
                                                    </td>
                                                    <td className='text-center'>{el?.marketCapInCr?.ttpmPE ? el?.marketCapInCr?.ttpmPE : "N/A"}</td>
                                                    <td className='text-center' >{el?.marketCapInCr?.createdAt
                                                        ? moment(el?.marketCapInCr?.createdAt).format('MMM D, YYYY')
                                                        : "N/A"}</td>
                                                    <td className='text-center'>
                                                        <p className={clsx(' d-flex align-items-center  mb-0', styles.addTo)} onClick={() => {
                                                            addToWatchlist(el?.id)
                                                        }}>
                                                            <AddToWatchlistBookmark />
                                                            <span style={{ marginLeft: "5px" }}>
                                                                <Trans i18nKey={"screenerIdPage.addToWatchlist"}>
                                                                    Add to Watchlist
                                                                </Trans>
                                                            </span>
                                                        </p>
                                                    </td>
                                                    <td className={clsx('text-center', styles.readMore)}>
                                                        <Link href={`/screener/${router?.query?.id}/${el?.id}`}>
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
        </>
    )
}

export default ScreenerDetailTable