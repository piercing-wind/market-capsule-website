import React from 'react';
import clsx from 'clsx';
import styles from "./style/disclamerCard.module.scss"
import { Trans } from 'next-i18next';

const DisclamerCard = ({ heading, para }) => {
    return (
        <div className={clsx(styles.paraDiv)} >
            <span className={clsx(styles.heading)}>
                <Trans i18nKey={`screenerSlugPage.disclaimer`}>

                    {heading}
                </Trans>
            </span>
            <span>{para}</span>
        </div>
    )
}

export default DisclamerCard