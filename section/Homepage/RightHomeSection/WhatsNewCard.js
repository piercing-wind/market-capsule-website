import React from 'react';
import Image from 'next/image';
import clsx from "clsx";
import styles from '../style/trandingNewsCard.module.scss'
import { truncateText } from '@/utils/constants';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const WhatsNewCard = ({ data, logo, headingLabel }) => {
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
                                <Link className={clsx(el?.attributes?.slug ? styles.link : styles.linkDisabled)} key={index} href={`${el?.attributes?.slug ? `/capsule-plus/${el?.attributes?.slug}` : ""}`} passHref>

                                    <div key={index} className={clsx("d-flex flex-column column-gap-2 ", styles.trandingHeadlineDiv, hideBorderInLastDiv(data?.length, index))}>
                                        <div className={clsx("d-flex align-items-center column-gap-2 ",)}>
                                            <Image
                                                src={el?.attributes?.whatsNewInCapsulePlusImage?.data?.attributes?.url
                                                }
                                                alt={el?.attributes?.whatsNewInCapsulePlusImage?.data?.attributes?.alternativeText
                                                    ? el?.attributes?.whatsNewInCapsulePlusImage?.data?.attributes?.alternativeText
                                                    : "Whats New in Capsule Plus"}
                                                width={58}
                                                height={43} />
                                            <p className={styles.paragraph}>{truncateText(el?.attributes?.title, 25)}</p>
                                        </div>

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

export default WhatsNewCard