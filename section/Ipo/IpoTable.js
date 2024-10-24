import React, { useState } from 'react';
import clsx from "clsx";
import Table from 'react-bootstrap/Table';
import { Trans, useTranslation } from 'next-i18next';
import BlueRightArrow from '@/components/svg/BlueRightArrow';
import dynamic from 'next/dynamic';
import styles from "./style/ipoTable.module.scss"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getIpoCompanyData, setCompanyListCurrentPage } from '@/store/slices/ipoSlice';
import SeeMore from '@/components/Module/Table/SeeMore';
const LoadMoreBtn = dynamic(() => import("@/components/Module/Button/LoadMoreBtn"))

const IpoTable = (props) => {
    const router = useRouter()
    const { dataTableHeading } = props;
    const { t } = useTranslation("common")
    const dispatch = useDispatch()
    const { companyTypeId, sectorId, industryId, companyName, loading, companyList, companyListCurrentPage, companyTotalList } = useSelector((state) => ({
        companyList: state?.ipoSlice?.getIpoCompanyDataObj?.companyList,
        companyListCurrentPage: state?.ipoSlice?.getIpoCompanyDataObj?.companyListCurrentPage,
        companyTotalList: state?.ipoSlice?.getIpoCompanyDataObj?.companyTotalList,
        loading: state?.ipoSlice?.getIpoCompanyDataObj?.loading,
        companyTypeId: state?.ipoSlice?.getIpoCompanyDataObj?.companyTypeId,
        sectorId: state?.ipoSlice?.getIpoCompanyDataObj?.sectorId,
        industryId: state?.ipoSlice?.getIpoCompanyDataObj?.industryId,
        companyName: state?.ipoSlice?.getIpoCompanyDataObj?.companyName,
    }), shallowEqual)

    //load more btn 
    const loadMoreFun = async () => {
        const params = {
            page: companyListCurrentPage,
            limit: 10,
            companyTypeId: companyTypeId || '',
            sectorId: sectorId || "",
            industryId: industryId || "",
            companyName: companyName || "",
        }
        await dispatch(getIpoCompanyData(params))
        dispatch(setCompanyListCurrentPage(companyListCurrentPage + 1))
    }

    console.log("companyList", companyList)
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
                                            <th key={index} className={clsx(styles.heading)} style={{ minWidth: el?.minWidth && el?.minWidth }} >
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
                            companyList?.length > 0 ? (
                                companyList?.map((el, index) => {

                                    return (
                                        <tr key={index} className={clsx(styles.trTable, index % 2 === 0 ? styles.skyBlueBgColor : styles.whiteBgColor)}>
                                            <td >
                                                <Link href={`/ipo/${el?.slug}`} className='link'>
                                                    {el?.companyName ? el?.companyName : "N/A"}
                                                </Link>
                                            </td>
                                            <td className='text-center'>
                                                {el?.openDate ? el?.openDate : "N/A"}
                                            </td>
                                            <td className='text-center'>{el?.offerPricePe ? el?.offerPricePe : "N/A"}</td>
                                            <td className='text-center' >{el?.lastYearSaleGrowth ? `${el?.lastYearSaleGrowth}%` : "N/A"}</td>
                                            <td className='text-center'>
                                                {
                                                    el?.industry ? el?.industry : "N/A"
                                                }
                                            </td>
                                            <td className={clsx('text-center', styles.readMore)}>
                                                <Link href={`/ipo/${el?.slug}`}>

                                                    <p className={clsx('mb-0  d-flex align-items-center ', styles.svg)}>
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
                <SeeMore />

            </div>
            {
                companyList?.length > 9 && (
                    <LoadMoreBtn
                        totalList={companyTotalList}
                        loading={loading}
                        data={companyList}
                        loadMoreFun={loadMoreFun}
                    />
                )
            }
        </>
    )
}

export default IpoTable