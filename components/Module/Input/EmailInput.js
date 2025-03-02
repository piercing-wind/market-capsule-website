import React from 'react'
import { EmailIcon } from '@/components/svg/EmailIcon'
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import styles from "./style/emailInput.module.scss"

const EmailInput = (props) => {
    const { type, placeholder, value, formik, name, touchedName, errorName, readOnly = false } = props;
    const { t } = useTranslation("common");
    return (
        <div className={clsx("d-flex column-gap-2 align-items-center px-2 py-3 mb-lg-3 mb-2", styles.emailInputDiv,
            (touchedName &&
                Boolean(errorName)) && "borderRed")}>
            <EmailIcon />
            <input
                name={name}
                type={type}
                placeholder={t(placeholder)}
                value={value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly={readOnly ? true : false}

            />
        </div>
    )
}

export default EmailInput