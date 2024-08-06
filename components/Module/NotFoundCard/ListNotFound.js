import React from 'react';
import clsx from "clsx";
import styles from "./style/notFoundCard.module.scss";

const ListNotFound = ({ heading, label }) => {
    return (
        <div className={clsx(styles.rightDiv)} >
            <h5>
                {heading}
            </h5>
            <p>
                {label}</p>
        </div>
    )
}

export default ListNotFound