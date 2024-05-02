import React from 'react';
import clsx from "clsx";
import styles from "./style/searchResultCard.module.scss"
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Trans, useTranslation } from 'next-i18next';
import Link from 'next/link';
import Bolt from '@/components/svg/Bolt';
import { truncateText } from '@/utils/constants';
const RightArrow = dynamic(() => import('@/components/svg/RightArrow'))

const SearchResultCard = (props) => {
    const { dataObj } = props;
    const { img, alt, heading, para, slug, labels, capsulePlus, category } = dataObj;
    const { t } = useTranslation("common");

    const upgradeNowFun = () => {
        console.log("upgrade now ")
    }

    const showLabelBaseOnType = (type) => {
        if (type === "IPO ZONE") {
            return styles.greenBgColor
        } else if (type === "SCREENER") {
            return styles.pinkBgColor
        }
        else {
            return styles.lightYellowBgColor

        }
    }
    return (
        <div className={clsx("px-2 pt-2 pb-4", styles.trandingDiv)}>
            {/* news heading div */}
            <div className={clsx(styles.imageDiv)}>
                <Image className={clsx("w-100 h-auto")} src={img} alt={alt} width={278} height={146} />
                {
                    capsulePlus && (
                        <div className={clsx("d-flex column-gap-1 align-items-center justify-content-center", styles.capsulePlusDiv)}>
                            <Bolt /><span>
                                <Trans i18nKey={"screener.capsulePlus"}>
                                    capsule+
                                </Trans>
                            </span>
                        </div>

                    )
                }
            </div>
            <div className={clsx("mt-3 d-flex column-gap-1 flex-wrap row-gap-1", styles.labelDiv)}>
                <span className={clsx("px-2 py-1", showLabelBaseOnType(category))}>{category}</span>
            </div>
            <h5 className={clsx('mt-2 mb-1', styles.hight)}>{truncateText(heading, 7)}</h5>

            <Link className={clsx(styles.readNow)} href={`/capsule-plus/${slug}`}>
                <Trans i18nKey={"screener.readNow"}>
                    Read Now
                </Trans>  <RightArrow />
            </Link>
        </div>
    )
}

export default SearchResultCard