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
import { addToWatchList, setSortWatchList } from '@/store/slices/watchListSlice';
import moment from 'moment';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getScreenerIdData, setCompanyListCurrentPage, setCompanyListEmpty, setCompanySorting } from '@/store/slices/screenerIdSlice';
const LoadMoreBtn = dynamic(() => import("@/components/Module/Button/LoadMoreBtn"))

const ScreenerDetailTable = (props) => {
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const { dataTableHeading } = props;
    const { t } = useTranslation("common")
    const dispatch = useDispatch()
    const { loading, companyList, companyListCurrentPage, companyTotalList, sortCompany } = useSelector((state) => ({
        companyList: state?.screenerIdSlice?.getScreenerIdDataObj?.companyList,
        companyListCurrentPage: state?.screenerIdSlice?.getScreenerIdDataObj?.companyListCurrentPage,
        companyTotalList: state?.screenerIdSlice?.getScreenerIdDataObj?.companyTotalList,
        loading: state?.screenerIdSlice?.getScreenerIdDataObj?.loading,
        sortCompany: state?.screenerIdSlice?.getScreenerIdDataObj?.sortCompany,
    }), shallowEqual)



    //load more btn 
    const loadMoreFun = async () => {
        // const params = {
        //     page: 1,
        //     limit: 10,
        //     slug: router?.query?.id,
        //     companyTypeId: "",
        //     peGte: "",
        //     peLte: "",
        //     marketCapLte: "",
        //     marketCapGte: "",
        //     sort: sortCompany ? sortCompany : ""

        // }
        const params = {
            page: 1,
            limit: 10,
            slug: router?.query?.id,
            companyTypeId: "",
            pe: {
                gte: "",
                lte: ""
            },
            marketCap: {
                gte: "",
                lte: ""
            },
            sort: sortCompany ? sortCompany : ""

        }
        await dispatch(getScreenerIdData(params))
        dispatch(setCompanyListCurrentPage(companyListCurrentPage + 1))
    }

    //sort by filter
    const soringFun = async (type) => {
        let sort = "";
        if (type === "marketCapInCrore") {
            if (sortCompany === "lowHighMarketCap") {
                sort = "highLowMarketCap";
                dispatch(setCompanySorting("highLowMarketCap"))
            } else {
                sort = "lowHighMarketCap";
                dispatch(setCompanySorting("lowHighMarketCap"))
            }

        } else {
            if (sortCompany === "lowHighTTMPE") {
                sort = "highLowTTMPE";
                dispatch(setCompanySorting("highLowTTMPE"))
            } else {
                sort = "lowHighTTMPE";
                dispatch(setCompanySorting("lowHighTTMPE"))
            }
        }
        const params = {
            page: 1,
            limit: 10,
            slug: router?.query?.id,
            companyTypeId: "",
            peGte: "",
            peLte: "",
            marketCapLte: "",
            marketCapGte: "",
            sort: sort

        }


        dispatch(setCompanyListEmpty())
        await dispatch(getScreenerIdData(params))
        dispatch(setCompanyListCurrentPage(companyListCurrentPage + 1))
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
                                                                    <button className={clsx(styles.sortBtn)} onClick={() => {
                                                                        if (el?.type) {
                                                                            soringFun(el?.type)
                                                                        }
                                                                    }}>
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
                                    companyList?.length > 0 ? (
                                        companyList?.map((el, index) => {
                                            return (
                                                <tr key={index} className={clsx(styles.trTable, index % 2 === 0 ? styles.skyBlueBgColor : styles.whiteBgColor)}>
                                                    <td >{el?.name}</td>
                                                    <td className='text-center'>
                                                        {el?.company_share_detail?.marketCap ? el?.company_share_detail?.marketCap : "N/A"}
                                                    </td>
                                                    <td className='text-center'>{el?.company_share_detail?.ttpmPE ? el?.company_share_detail?.ttpmPE : "N/A"}</td>
                                                    <td className='text-center' >{el?.createdAt
                                                        ? moment(el?.createdAt).format('MMM D, YYYY')
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
                            companyList?.length > 10 &&

                            (
                                <div className={clsx(styles.loadMoreBtn, "mt-3")} >
                                    <LoadMoreBtn
                                        totalList={companyTotalList}
                                        loading={loading}
                                        data={companyList}
                                        loadMoreFun={loadMoreFun}
                                    />
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default ScreenerDetailTable