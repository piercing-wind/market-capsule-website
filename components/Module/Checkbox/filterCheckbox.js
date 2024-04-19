import React from 'react';
import clsx from "clsx";
import styles from "./style/filterCheckbox.module.scss";


const FilterCheckbox = ({ handleCheckbox, type, status }) => {

    const handleFun = () => {
        handleCheckbox(type, status);
    };
    return (

        <div
            className={clsx(styles.checkboxStyle, status && styles.greenBg)}
            onClick={handleFun}
        >
            <div className={clsx(styles.innerCheckboxStyle)}></div>
            <div
                className={clsx(styles.checkmarkStyle)}
                style={{
                    display: status
                        ? "block"
                        : "none",
                }}
            ></div>
        </div>
    )
}

export default FilterCheckbox