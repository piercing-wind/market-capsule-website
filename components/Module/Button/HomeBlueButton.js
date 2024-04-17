import React from 'react';
import clsx from "clsx";
import styles from "./style/homeBlueButton.module.scss";
import { useTranslation } from 'next-i18next';

const HomeBlueButton = (props) => {
    const { color, bg, handlerFun = false, label, type = "button" } = props;
    const { t } = useTranslation("common");

    //handle home btn function
    const btnFun = () => {

        if (handlerFun) {

            handlerFun()
        }
    }
    return (
        <button type={type} style={{ color: color, background: bg }} onClick={btnFun} className={clsx(styles.btn)}>{t(label)}</button>
    )
}

export default HomeBlueButton