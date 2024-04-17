import React, { useState, useTransition } from 'react';
import styles from "./style/genderDropdown.module.scss";
import { Dropdown } from 'react-bootstrap';
import clsx from "clsx";
import { Trans, useTranslation } from 'next-i18next';


const GenderDropdown = (props) => {
    const { defaultValue, data, value, formik, handleFun, readOnly = false } = props;
    const { t } = useTranslation("common")

    const setValueFun = (valueObj) => {
        handleFun(formik, valueObj?.label)
    }
    return (
        <div className={clsx('mb-2', styles.genderDropdown)}>
            <Dropdown className={clsx("genderDropdown")}>
                <Dropdown.Toggle id="dropdown-basic" className={clsx(value && styles.blackColor)} disabled={readOnly ? true : false}>
                    <span>
                        {value ? value : t(defaultValue)}
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className={clsx("w-100", styles.menu)}>
                    {
                        data?.map((el, index) => {
                            return (

                                <Dropdown.Item key={index} onClick={() => {
                                    setValueFun(el)
                                }} >{el?.label}</Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>


        </div>
    )
}

export default GenderDropdown