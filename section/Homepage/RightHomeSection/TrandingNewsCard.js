import React from 'react';
import Image from 'next/image';
import clsx from "clsx";
import styles from '../style/trandingNewsCard.module.scss'
import { truncateText } from '@/utils/constants';
import { useTranslation } from 'next-i18next';
import LoderModule from '@/components/Module/LoaderModule';


const TrandingNewsCard = ({ data }) => {
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
                    data?.headingLogo
                }
                <h5>{t(data?.headingLabel)}</h5>
            </div>

            {/* news div */}
            <div className={clsx(" ps-2 pe-3 pb-2")}>
                {
                    data?.trandingNewsArr?.length ? (
                        data?.trandingNewsArr?.map((el, index) => {
                            return (
                                <div key={index} className={clsx("d-flex flex-column column-gap-2 ", styles.trandingHeadlineDiv, hideBorderInLastDiv(data?.trandingNewsArr?.length, index))}>
                                    <div className={clsx("d-flex align-items-center column-gap-2 ",)}>
                                        <Image src={el?.img} alt='newsimg' width={58} height={43} />
                                        <p className={styles.paragraph}>{truncateText(el?.para, 25)}</p>

                                    </div>
                                    {
                                        el?.source ? (
                                            <p className={clsx("mb-0 mt-2", styles.sourcePara)}>
                                                <span>
                                                    {t("homepage.rightSection.source")}
                                                </span>
                                                {" "}
                                                <span className={clsx("mb-0", styles.mediumItalic)}>
                                                    {el?.source}
                                                </span>
                                            </p>
                                        ) : null
                                    }
                                </div>
                            )
                        })
                    ) : null
                }
            </div>
        </div>
    )
}

export default TrandingNewsCard