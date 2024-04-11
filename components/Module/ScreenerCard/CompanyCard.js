import React from 'react';
import clsx from "clsx";
import styles from "./style/companyCard.module.scss"
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Trans, useTranslation } from 'next-i18next';
import Link from 'next/link';
import Bolt from '@/components/svg/Bolt';
import { truncateText } from '@/utils/constants';
const RightArrow = dynamic(() => import('@/components/svg/RightArrow'))


const CompanyCard = (props) => {
    const { dataObj } = props;
    const { img, alt, heading, para, slug, labels, capsulePlus } = dataObj;
    const { t } = useTranslation("common");

    const upgradeNowFun = () => {
        console.log("upgrade now ")
    }

    const showLabelBaseOnType = (type) => {
        if (type === "free") {
            return styles.greenBgColor
        } else if (type === "companies") {
            return styles.skyBgColor
        } else {
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
                            <Bolt /><span>capsule+</span>
                        </div>

                    )
                }
            </div>
            <div className={clsx("mt-3 d-flex column-gap-1 flex-wrap row-gap-1", styles.labelDiv)}>
                {
                    labels?.length > 0 ? (
                        labels?.map((el, index) => {
                            return (
                                <span key={index} className={clsx("px-2 py-1", showLabelBaseOnType(el?.type))}>{el?.label}</span>

                            )
                        })
                    ) : null
                }
            </div>
            <h5 className='mt-2 mb-1'>{truncateText(heading, 7)}</h5>
            <p>{truncateText(para, 9)}</p>

            <Link className={clsx(styles.readNow)} href={`/screener/${slug}`}>
                Read Now <RightArrow />
            </Link>
        </div>
    )
}

export default CompanyCard