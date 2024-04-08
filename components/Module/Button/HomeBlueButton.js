import React from 'react';
import clsx from "clsx";
import styles from "./style/homeBlueButton.module.scss";
import { useTranslation } from 'next-i18next';

const HomeBlueButton = (props) => {
    const { color, bg, handlerFun, label } = props;
    const { t } = useTranslation("common");

    //handle home btn function
    const btnFun = () => {
        handlerFun()
    }
    return (
        <button style={{ color: color, background: bg }} onClick={btnFun} className={clsx(styles.btn)}>{t(label)}</button>
    )
}

export default HomeBlueButton