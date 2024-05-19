import Sort from '@/components/svg/Sort';
import clsx from 'clsx';
import Table from 'react-bootstrap/Table';
import styles from "./style/watchlistTable.module.scss"
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTranslation } from 'next-i18next';
import LoadMoreBtn from '../Button/LoadMoreBtn';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getWatchListData, getWatchListObjData, removeToWatchList, setWatchListCurrentPage, setWatchListEmpty } from '@/store/slices/watchListSlice';
import { useState } from 'react';
import LoderModule from '../LoaderModule';
import toast from 'react-hot-toast';

function WatchlistTable(props) {
    const { companyTableHeading } = props;
    const { t } = useTranslation("common");
    const [sort, setSort] = useState("highLowDayLow")
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const { watchListLoading, watchList, watchListCurrentPage, watchListTotalList } = useSelector((state) => ({
        watchList: state?.watchListSlice?.getWatchListObj?.watchList,
        watchListCurrentPage: state?.watchListSlice?.getWatchListObj?.watchListCurrentPage,
        watchListTotalList: state?.watchListSlice?.getWatchListObj?.watchListTotalList,
        watchListLoading: state?.watchListSlice?.getWatchListObj?.loading,
        watchListError: state?.watchListSlice?.getWatchListObj?.error,

    }), shallowEqual)


    //sort by filter
    const soringFun = async (type) => {
        let sort = "highLowDayLow"
        if (type === "ltp") {
            sort = "ltp"
        } else if (type === "prevClose") {
            sort = "prevClose"
        } else if (type === "change") {
            sort = "change"
        } else if (type === "changePersent") {
            sort = "changePersent"
        } else {
            sort = "highLowDayLow"
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
            sort: sort,
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
            sort: sort,
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
                loader ? (
                    <LoderModule />
                ) : (

                    <>

                        <Table responsive>
                            <thead>
                                <tr>
                                    {
                                        companyTableHeading?.length > 0 ? (
                                            companyTableHeading?.map((el, index) => {
                                                return (
                                                    <th key={index} className={clsx(styles.heading)} >
                                                        <div className={clsx('d-flex column-gap-2 align-items-center ', index !== 0 && "justify-content-center")}>
                                                            <span  >
                                                                {t(el?.heading)}

                                                            </span>
                                                            {
                                                                index !== 0 && (
                                                                    <button className={clsx(styles.sortBtn)} onClick={() => {
                                                                        soringFun(el?.type)
                                                                        setSort(el?.type)
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
                                        watchList?.map((el, index) => {

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

                        <div className={clsx(styles.loadMoreBtn, "mt-3")} >
                            <LoadMoreBtn
                                totalList={watchListTotalList}
                                loading={watchListLoading}
                                data={watchList}
                                loadMoreFun={loadMoreFun} />
                        </div>

                    </>
                )
            }
        </>
    );
}

export default WatchlistTable;