import React from 'react';
import clsx from 'clsx';
import styles from "./style/headingCom.module.scss"
import { useTranslation } from 'next-i18next';
import moment from 'moment';

const HeadingCom = ({ label, updated = false, capsuleViewHeadingColor = false }) => {
    const { t } = useTranslation("common")
    return (
        <div className={clsx(styles.heading, capsuleViewHeadingColor && styles.capsuleHeading)}>
            <p>
                <span>
                    {t(label)}
                </span>
                {
                    updated && (
                        <span className={clsx(styles.updated)}>
                            {/* {t(`screenerSlugPage.updated`)} */}
                            {
                                moment(updated)?.format('YYYY-MM-DD hh:mm A')
                            }
                        </span>

                    )
                }
            </p>
        </div>
    )
}

export default HeadingCom