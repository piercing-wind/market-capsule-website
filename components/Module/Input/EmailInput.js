import React from 'react'
import { EmailIcon } from '@/components/svg/EmailIcon'
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import styles from "./style/emailInput.module.scss"

const EmailInput = (props) => {
    const { type, placeholder, onChangeHandleFun, value } = props;
    const { t } = useTranslation("common");

    return (
        <div className={clsx("d-flex column-gap-2 align-items-center px-2 py-3 mb-lg-3 mb-2", styles.emailInputDiv)}>
            <EmailIcon />
            <input
                type={type}
                placeholder={t(placeholder)}
                onChange={(e) => {
                    onChangeHandleFun(e.target.value)
                }}
                value={value}
            />
        </div>
    )
}

export default EmailInput