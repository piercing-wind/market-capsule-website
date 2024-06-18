import React from 'react';
import Image from 'next/image';
import clsx from "clsx";
import styles from '../style/trandingNewsCard.module.scss'
import { truncateText } from '@/utils/constants';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const TrandingNewsCard = ({ data, logo, headingLabel }) => {
    const { t } = useTranslation("common");
    const hideBorderInLastDiv = (trandingNewsArrLength, index) => {
        if (trandingNewsArrLength - 1 !== index) {
            return styles.trandingBorder
        }
    }

    return (
        <div className={clsx(styles.trandingDiv, "marginTop12")}>
            {/* news heading div */}
            <div className={clsx("d-flex align-items-center column-gap-2 ps-3 pt-4 pb-3", styles.trandingHeadingDiv, styles.trandingBorder)}>
                {
                    logo
                }
                <h5>{t(headingLabel)}</h5>
            </div>
            {/* news div */}
            <div className={clsx(" ps-2 pe-3 pb-2")}>
                {
                    data?.length > 0 ? (
                        data?.map((el, index) => {
                            return (
                                <Link className={clsx(el?.attributes?.url ? styles.link : styles.linkDisabled)} key={index} target='_blank' href={`${el?.attributes?.url ? el?.attributes?.url : ""}`} passHref>
                                    <div className={clsx("d-flex flex-column column-gap-2 ", styles.trandingHeadlineDiv, hideBorderInLastDiv(data?.length, index))}>
                                        <div className={clsx("d-flex align-items-center column-gap-2 ",)}>
                                            <Image
                                                src={el?.attributes?.image?.data?.attributes?.url}
                                                alt={el?.attributes?.image?.data?.attributes?.alternativeText
                                                    ? el?.attributes?.image?.data?.attributes?.alternativeText
                                                    : "Tranding News"}
                                                width={58}
                                                height={43} />
                                            <p className={styles.paragraph}>{truncateText(el?.attributes?.title, 25)}</p>
                                        </div>
                                        {
                                            el?.attributes?.source ? (
                                                <p className={clsx("mb-0 mt-2", styles.sourcePara)}>
                                                    <span>
                                                        {t("homepage.rightSection.source")}
                                                    </span>
                                                    {" "}
                                                    <span className={clsx("mb-0", styles.mediumItalic)}>
                                                        {el?.attributes?.source}
                                                    </span>
                                                </p>
                                            ) : null
                                        }
                                    </div>

                                </Link>
                            )
                        })
                    ) : null
                }
            </div>
        </div>
    )
}

export default TrandingNewsCard