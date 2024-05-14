import React, { useState, useTransition } from 'react';
import clsx from "clsx";
import styles from "../style/filterButton.module.scss";
import { homePageFilterModalArr } from '../homePageData';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { numberToLocaleString } from '@/utils/constants';
import { setShowFilterModalForm } from '@/store/slices/homePageSlice';
import { useDispatch } from 'react-redux';
const HomepageFilterModal = dynamic(() => import('@/components/Module/Modal/HomepageFilterModal'))

const FilterButton = () => {
    const { t } = useTranslation("common");
    const dispatch = useDispatch()
    const [filterActiveState, setFilterActiveState] = useState("all1771")

    //handle filter based on type
    const handleFilterBasedOnType = (type) => {
        console.log("type", type)
        setFilterActiveState(type)
    }

    //give last btn count
    const giveLengthOf = (homePageFilterModal) => {
        return numberToLocaleString(homePageFilterModal?.length - 5)
    }

    //show all type list
    const showAllListType = () => {
        console.log("show all type")
        dispatch(setShowFilterModalForm(true))
    }
    return (
        <>

            <div className={clsx("py-3 mx-3 d-flex column-gap-1 borderBottomGray", styles.btnScroll)}>
                {
                    homePageFilterModalArr?.slice(0, 5)?.map((el, index) => {
                        return (
                            <button key={index}
                                onClick={() => {
                                    handleFilterBasedOnType(el?.attributes?.slug)
                                }}
                                style={{
                                    color: el?.attributes?.slug === filterActiveState ? "white" : "black",
                                    background: el?.attributes?.slug === filterActiveState ? "black" : el?.attributes?.tag?.data?.attributes?.name
                                }}

                                className={clsx(styles.btn)}>{t(el?.attributes?.name)}</button>
                        )
                    })
                }
                <button
                    onClick={() => {
                        showAllListType()
                    }} className={clsx(styles.btn, styles.blackColor, styles.grayBgColor)}>{`+ ${giveLengthOf(homePageFilterModalArr)}`}</button>

            </div>
            <HomepageFilterModal
                filterActiveState={filterActiveState}
                setFilterActiveState={setFilterActiveState}
            />
        </>

    )
}

export default FilterButton