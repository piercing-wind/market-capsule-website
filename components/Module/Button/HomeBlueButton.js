import React from 'react';
import clsx from "clsx";
import styles from "./style/homeBlueButton.module.scss";
import { useTranslation } from 'next-i18next';

const HomeBlueButton = (props) => {
    const { color, bg, handlerFun = false, label, type = "button", disable = false, fontSize = "16px" } = props;
    const { t } = useTranslation("common");

    //handle home btn function
    const btnFun = () => {

        if (handlerFun) {

            handlerFun()
        }
    }
    return (
        <button
            disabled={disable}
            type={type}
            style={{ color: color, fontSize: fontSize, background: bg, cursor: disable ? "not-allowed" : "pointer" }}
            onClick={btnFun} className={clsx(styles.btn)}
        >{t(label)}</button>
    )
}

export default HomeBlueButton