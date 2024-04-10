import React from 'react';
import clsx from "clsx";
import { useTranslation } from 'next-i18next';
import styles from "./style/filterButton.module.scss"
const FilterButton = (props) => {
    const { color, bg, handlerFun, label, type } = props;
    const { t } = useTranslation("common");

    //handle home btn function
    const btnFun = () => {
        handlerFun(type)
    }
    return (
        <button style={{ color: color, background: bg }} onClick={btnFun} className={clsx(styles.btn)}>{t(label)}</button>
    )
}

export default FilterButton