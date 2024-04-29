import React from 'react';
import clsx from 'clsx';
import styles from "./style/disclamerCard.module.scss"

const DisclamerCard = ({ heading, para }) => {
    return (
        <div className={clsx(styles.paraDiv)} >
            <span className={clsx(styles.heading)}>{heading}</span>
            <span>{para}</span>
        </div>
    )
}

export default DisclamerCard