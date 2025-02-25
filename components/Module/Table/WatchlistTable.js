import Sort from '@/components/svg/Sort';
import clsx from 'clsx';
import Table from 'react-bootstrap/Table';
import styles from "./style/watchlistTable.module.scss"
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTranslation } from 'next-i18next';
import LoadMoreBtn from '../Button/LoadMoreBtn';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getWatchListData, getWatchListObjData, removeToWatchList, setSortWatchList, setWatchListCurrentPage, setWatchListEmpty } from '@/store/slices/watchListSlice';
import { useState } from 'react';
import LoderModule from '../LoaderModule';
import toast from 'react-hot-toast';
import SeeMore from './SeeMore';

function WatchlistTable(props) {
    const { companyTableHeading } = props;
    const { t } = useTranslation("common");
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const { loading, watchListLoading, watchList, watchListCurrentPage, watchListTotalList, sortWatchList } = useSelector((state) => ({
        watchList: state?.watchListSlice?.getWatchListObj?.watchList,
        loading: state?.watchListSlice?.getWatchListObj?.loading,

        watchListCurrentPage: state?.watchListSlice?.getWatchListObj?.watchListCurrentPage,
        watchListTotalList: state?.watchListSlice?.getWatchListObj?.watchListTotalList,
        watchListLoading: state?.watchListSlice?.getWatchListObj?.loading,
        error: state?.watchListSlice?.getWatchListObj?.error,
        sortWatchList: state?.watchListSlice?.getWatchListObj?.sortWatchList,


    }), shallowEqual)


    //sort by filter
    const soringFun = async (type) => {
        let sort = "";
        if (type === "ltp") {
            if (sortWatchList === "LowHighLtp") {
                sort = "highLowLtp";
                dispatch(setSortWatchList("highLowLtp"))
            } else {
                sort = "LowHighLtp";
                dispatch(setSortWatchList("LowHighLtp"))
            }

        } else if (type === "prevClose") {
            if (sortWatchList === "lowHighPreClosePrice") {
                sort = "highLowPreClosePrice";
                dispatch(setSortWatchList("highLowPreClosePrice"))
            } else {
                sort = "lowHighPreClosePrice";
                dispatch(setSortWatchList("lowHighPreClosePrice"))
            }
        } else if (type === "change") {
            if (sortWatchList === "lowHighChange") {
                sort = "highLowChange";
                dispatch(setSortWatchList("highLowChange"))
            } else {
                sort = "lowHighChange";
                dispatch(setSortWatchList("lowHighChange"))
            }
        } else if (type === "changePersent") {
            if (sortWatchList === "lowHighChange%") {
                sort = "highLowChange%";
                dispatch(setSortWatchList("highLowChange%"))
            } else {
                sort = "lowHighChange%";
                dispatch(setSortWatchList("lowHighChange%"))
            }
        } else {
            if (sortWatchList === "lowHighDayLow") {
                sort = "highLowDayLow";
                dispatch(setSortWatchList("highLowDayLow"))
            } else {
                sort = "lowHighDayLow";
                dispatch(setSortWatchList("lowHighDayLow"))
            }
        }
        const params = {
            page: 1,
            limit: 10,
            sort: sort,
        }


        dispatch(setWatchListEmpty())
        await dispatch(getWatchListData(params))
        dispatch(setWatchListCurrentPage(watchListCurrentPage + 1))
    }

    //load more btn 
    const loadMoreFun = async () => {
        const params = {
            page: watchListCurrentPage,
            limit: 10,
            sort: sortWatchList,
        }
        await dispatch(getWatchListData(params))
        dispatch(setWatchListCurrentPage(watchListCurrentPage + 1))
    }

    const removeFromWatchlist = async (companyId) => {
        const submitData = {
            companyId: companyId
        }
        const params = {
            page: 1,
            limit: 10,
            sort: sortWatchList,
        }
        setLoader(true)

        await removeToWatchList(submitData,
            async (res) => {
                if (res?.success) {
                    toast.success(t(res?.message));
                    dispatch(setWatchListEmpty())
                    await dispatch(getWatchListData(params))
                    dispatch(setWatchListCurrentPage(2))
                    setLoader(false)

                } else {
                    toast.error(res?.message);
                    dispatch(setWatchListEmpty())
                    await dispatch(getWatchListData(params))
                    dispatch(setWatchListCurrentPage(2))

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
                loader || loading ? (
                    <LoderModule />
                ) : (

                    <>
                        <div className={clsx("tableScroll")}>

                            <Table responsive>
                                <thead>
                                    <tr>
                                        {
                                            companyTableHeading?.length > 0 ? (
                                                companyTableHeading?.map((el, index) => {
                                                    return (
                                                        <th key={index} className={clsx(styles.heading)} style={{ minWidth: el?.minWidth && el?.minWidth }} >
                                                            <div className={clsx('d-flex column-gap-2 align-items-center ', index !== 0 && "justify-content-center")}>
                                                                <span  >
                                                                    {t(el?.heading)}

                                                                </span>
                                                                {
                                                                    index !== 0 && (
                                                                        <button
                                                                            style={{ cursor: watchList?.length > 0 ? "pointer" : "not-allowed" }}
                                                                            className={clsx(styles.sortBtn)} onClick={() => {
                                                                                if (watchList?.length > 0) {
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
                                        watchList?.length > 0 ? (
                                            [...watchList]?.sort((a, b) => {
                                                switch (sortWatchList) {
                                                    case 'LowHighLtp':
                                                        return a?.companyId?.company_share_detail?.ltp - b?.companyId?.company_share_detail?.ltp;
                                                    case 'highLowLtp':
                                                        return b?.companyId?.company_share_detail?.ltp - a?.companyId?.company_share_detail?.ltp;
                                                    case 'lowHighPreClosePrice':
                                                        return a?.companyId?.company_share_detail?.prevClosePrice - b?.companyId?.company_share_detail?.prevClosePrice;
                                                    case 'highLowPreClosePrice':
                                                        return b?.companyId?.company_share_detail?.prevClosePrice - a?.companyId?.company_share_detail?.prevClosePrice;
                                                    case 'lowHighChange':
                                                        return a?.companyId?.company_share_detail?.change - b?.companyId?.company_share_detail?.change;
                                                    case 'highLowChange':
                                                        return b?.companyId?.company_share_detail?.change - a?.companyId?.company_share_detail?.change;
                                                    case 'lowHighChange%':
                                                        return a?.companyId?.company_share_detail?.changeInPercent - b?.companyId?.company_share_detail?.changeInPercent;
                                                    case 'highLowChange%':
                                                        return b?.companyId?.company_share_detail?.changeInPercent - a?.companyId?.company_share_detail?.changeInPercent;
                                                    case 'highLowDayLow':
                                                        return b?.companyId?.company_share_detail?.dayLow - a?.companyId?.company_share_detail?.dayLow;
                                                    case 'highLowDayHigh':
                                                        return b?.companyId?.company_share_detail?.dayHigh - a?.companyId?.company_share_detail?.dayHigh;
                                                    default:
                                                        return 0;
                                                }
                                            })
                                                ?.map((el, index) => {

                                                    return (
                                                        <tr key={index} className={clsx(styles.trTable, index % 2 === 0 ? styles.skyBlueBgColor : styles.whiteBgColor)}>
                                                            <td >{el?.companyId?.name ? el?.companyId?.name : "N/A"}</td>
                                                            <td className='text-center'>
                                                                {el?.companyId?.company_share_detail?.ltp ? el?.companyId?.company_share_detail?.ltp : "N/A"}
                                                            </td>
                                                            <td className='text-center'>{el?.companyId?.company_share_detail?.prevClosePrice ? el?.companyId?.company_share_detail?.prevClosePrice : "N/A"}</td>
                                                            <td className='text-center' >{el?.companyId?.company_share_detail?.change ? el?.companyId?.company_share_detail?.change : "N/A"}</td>
                                                            <td className='text-center'>{el?.companyId?.company_share_detail?.changeInPercent ? el?.companyId?.company_share_detail?.changeInPercent : "N/A"}</td>
                                                            <td className='text-center'>{`${el?.companyId?.company_share_detail?.dayLow
                                                                ? el?.companyId?.company_share_detail?.dayLow
                                                                : "N/A"}-${el?.companyId?.company_share_detail?.dayHigh ? el?.companyId?.company_share_detail?.dayHigh : "N/A"}`}</td>
                                                            <td >
                                                                <Dropdown className={clsx("threeDotDropdown")}>
                                                                    <Dropdown.Toggle id="dropdown-basic" className={clsx(styles.threeDot)}>
                                                                        <BsThreeDotsVertical />
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu className={clsx(styles.menu)}>
                                                                        <Dropdown.Item onClick={() => {
                                                                            removeFromWatchlist(el?.companyId?.id)
                                                                        }}>Remove </Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                        ) : null
                                    }


                                </tbody>
                            </Table>
                            <SeeMore />

                        </div>
                        {
                            watchList?.length > 9 && (
                                <div className={clsx(styles.loadMoreBtn, "mt-3")} >
                                    <LoadMoreBtn
                                        totalList={watchListTotalList}
                                        loading={watchListLoading}
                                        data={watchList}
                                        loadMoreFun={loadMoreFun}
                                    />
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    );
}

export default WatchlistTable;