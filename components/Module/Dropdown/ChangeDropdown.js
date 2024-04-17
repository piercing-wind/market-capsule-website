import React, { useState, useTransition } from 'react';
import styles from "./style/changeDropdown.module.scss";
import { Dropdown } from 'react-bootstrap';
import clsx from "clsx";
import { Trans, useTranslation } from 'next-i18next';
import { DownArrow } from '@/components/svg/DownArrow';


const ChangeDropdown = (props) => {
    const { defaultValue, data, value, handleFun } = props;
    const { t } = useTranslation("common")

    const setValueFun = (valueObj) => {
        handleFun(valueObj?.label)
    }
    return (
        <div className={clsx(styles.genderDropdown)}>
            <Dropdown className={clsx("changeDropdown")}>
                <Dropdown.Toggle className={clsx("d-flex align-items-center column-gap-1", styles.blackColor)} >
                    <span>
                        {value ? value : t(defaultValue)}
                    </span>
                    <DownArrow
                        color='#3E63FF'
                    />
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

export default ChangeDropdown