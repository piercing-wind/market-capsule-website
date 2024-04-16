import React from 'react'
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import styles from "./style/nameInput.module.scss"

const NameInput = (props) => {
    const { type, placeholder, value, formik, name } = props;
    const { t } = useTranslation("common");
    return (
        <div className={clsx("d-flex column-gap-2 align-items-center px-3  mb-2", styles.emailInputDiv)} >
            <input
                name={name}
                type={type}
                placeholder={t(placeholder)}
                value={value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
        </div>
    )
}

export default NameInput