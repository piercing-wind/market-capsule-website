import React from 'react';
import clsx from 'clsx';
import styles from "./style/headingCom.module.scss"
import { useTranslation } from 'next-i18next';

const HeadingCom = ({ label, updated = false }) => {
    const { t } = useTranslation("common")
    return (
        <div className={clsx(styles.heading)}>
            <p>
                <span>
                    {t(label)}
                </span>
                {
                    updated && (
                        <span className={clsx(styles.updated)}>
                            {t(`screenerSlugPage.updated`)}
                        </span>

                    )
                }
            </p>
        </div>
    )
}

export default HeadingCom