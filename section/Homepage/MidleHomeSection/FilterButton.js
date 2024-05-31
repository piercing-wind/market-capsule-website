import React, { useState, useTransition } from 'react';
import clsx from "clsx";
import styles from "../style/filterButton.module.scss";
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { numberToLocaleString } from '@/utils/constants';
import { getFeedList, setFeedCurrentPage, setFeedListEmpty, setIndustryId, setShowFilterModalForm } from '@/store/slices/homePageSlice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
const HomepageFilterModal = dynamic(() => import('@/components/Module/Modal/HomepageFilterModal'))

const FilterButton = () => {
    const { t } = useTranslation("common");
    const dispatch = useDispatch()
    const { industryList } = useSelector((state) => ({
        industryList: state?.homePageSlice?.industriesObj?.industryList,
    }), shallowEqual)
    const [filterActiveState, setFilterActiveState] = useState(industryList?.[0]?.id)

    //handle filter based on type
    const handleFilterBasedOnType = async (industryId) => {
        setFilterActiveState(industryId)
        dispatch(setIndustryId(industryId))
        dispatch(setFeedListEmpty())
        const feedListParams = {
            page: 1,
            limit: 5,
            industryId: industryId !== 0 ? industryId : ""
        }
        dispatch(setFeedCurrentPage(2))
        await dispatch(getFeedList(feedListParams))
    }

    //give last btn count
    const giveLengthOf = (homePageFilterModal) => {
        return numberToLocaleString(homePageFilterModal?.length - 5)
    }

    //show all type list
    const showAllListType = () => {
        dispatch(setShowFilterModalForm(true))
    }
    return (
        <>
            {
                industryList?.length > 0 ? (
                    <div className={clsx("py-3 mx-3 d-flex column-gap-1 borderBottomGray", styles.btnScroll)}>
                        {
                            industryList?.slice(0, 5)?.map((el, index) => {
                                return (
                                    <button key={index}
                                        onClick={() => {
                                            if (el?.id !== filterActiveState) {
                                                handleFilterBasedOnType(el?.id)
                                            }
                                        }}
                                        style={{
                                            color: el?.id === filterActiveState ? "white" : "black",
                                            background: el?.id === filterActiveState ? "black" : el?.attributes?.tag?.data?.attributes?.colorHash,
                                            cursor: el?.id === filterActiveState ? "not-allowed" : "pointer"
                                        }}

                                        className={clsx(styles.btn)}>{t(el?.attributes?.name)}</button>
                                )
                            })
                        }
                        {
                            industryList?.length > 5 && (
                                <button
                                    onClick={() => {
                                        showAllListType()
                                    }} className={clsx(styles.btn, styles.blackColor, styles.grayBgColor)}>{`+ ${giveLengthOf(industryList)}`}</button>

                            )
                        }
                    </div>
                ) : null
            }
            <HomepageFilterModal
                filterActiveState={filterActiveState}
                setFilterActiveState={setFilterActiveState}
            />
        </>
    )
}

export default FilterButton