import React, { useState, useTransition } from 'react';
import clsx from "clsx";
import styles from "../style/filterButton.module.scss";
import { filterButtonArr } from '../homePageData';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { numberToLocaleString } from '@/utils/constants';

const FilterButton = () => {
    const { t } = useTranslation("common");

    const [filterActiveState, setFilterActiveState] = useState("all")

    //show btn color based on type
    const showBtnColorBasedOnType = (type) => {
        // console.log("type", type)
        if ("all" === type) {
            return styles.whiteColor
        } else {
            return styles.blackColor
        }
    }

    //show btn background based on type
    const showBgColorBasedOnType = (type) => {

        const bgMap = {
            all: styles.blackBgColor,
            finance: styles.greenBgColor,
            retail: styles.orangeBgColor,
            agriculture: styles.yellowBgColor,
            technology: styles.seaBgColor,
            // Add more types and corresponding styles here
        };
        return bgMap[type]
    }

    //handle filter based on type
    const handleFilterBasedOnType = (type) => {
        setFilterActiveState(type)
    }

    //give last btn count
    const giveLengthOf = (filterButtonArr) => {
        return numberToLocaleString(filterButtonArr?.length - 5)
    }

    //show all type list
    const showAllListType = () => {
        console.log("show all type")
    }
    return (
        <div className={clsx("py-3 mx-3 d-flex column-gap-1 borderBottomGray", styles.btnScroll)}>
            {
                filterButtonArr?.slice(0, 5)?.map((el, index) => {
                    return (
                        <button key={index}
                            onClick={() => {
                                handleFilterBasedOnType(el?.type)
                            }} className={clsx(styles.btn, showBtnColorBasedOnType(el?.type), showBgColorBasedOnType(el?.type))}>{t(el?.label)}</button>
                    )
                })
            }
            <button
                onClick={() => {
                    showAllListType()
                }} className={clsx(styles.btn, styles.blackColor, styles.grayBgColor)}>{`+ ${giveLengthOf(filterButtonArr)}`}</button>

        </div>

    )
}

export default FilterButton