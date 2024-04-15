import React from 'react';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import styles from "./style/loginButton.module.scss"

const LoginButton = (props) => {
    const { t } = useTranslation("common");

    const { label, color, fontSize, fontWeight, borderRadius, pAll, bg, border, type, handleFun = false } = props;
    const handleBtnFun = () => {
        if (handleFun) {
            props?.handleFun(props?.socialType)
        }
    }
    return (
        <button
            className={clsx('w-100 d-flex column-gap-3 justify-content-center align-items-center', styles.btn)}
            type={type}
            style={{
                color: color,
                fontSize: fontSize,
                fontWeight: fontWeight,
                borderRadius: borderRadius,
                padding: pAll,
                background: bg,
                border: border
            }}
            onClick={handleBtnFun}
        >
            {
                props?.icon && (
                    props?.icon
                )
            }

            <span>
                {t(label)}

            </span>
        </button>
    )
}

export default LoginButton