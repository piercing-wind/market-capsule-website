import React from 'react';
import clsx from "clsx";
import styles from "./style/homeBlueButton.module.scss";

const HomeBlueButton = (props) => {
    const { color, bg, handlerFun, label } = props;

    //handle home btn function
    const btnFun = () => {
        handlerFun()
    }
    return (
        <button style={{ color: color, background: bg }} onClick={btnFun} className={clsx(styles.btn)}>{label}</button>
    )
}

export default HomeBlueButton