import React from 'react';
import clsx from "clsx";
import styles from "./style/greenCheckbox.module.scss";


const GreenCheckbox = ({ checkboxName, formik, value, touchedName, errorName }) => {
    return (

        <div
            type="checkbox"
            className={clsx(styles.checkboxStyle, value && styles.greenBg,
                (touchedName &&
                    Boolean(errorName)) && "borderRed"

            )}
            onClick={() => {
                formik.setFieldValue(
                    checkboxName,
                    !value
                );
            }}
        >
            <div className={clsx(styles.innerCheckboxStyle)}></div>
            <div
                className={clsx(styles.checkmarkStyle)}
                style={{
                    display: value
                        ? "block"
                        : "none",
                }}
            ></div>
        </div>
    )
}

export default GreenCheckbox