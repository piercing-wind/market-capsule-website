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
    const {
        id, name, slug, capsuleplus, description, image, count } = dataObj;
    const { t } = useTranslation("common");

    const upgradeNowFun = () => {
        console.log("upgrade now ")
    }
    console.log("dataObj", dataObj)

    return (
        <div className={clsx("px-2 pt-2 pb-4", styles.trandingDiv)}>
            {/* news heading div */}
            <div className={clsx(styles.imageDiv)}>
                <Image className={clsx("w-100 h-auto")} src={image?.url} alt={image?.alternativeText ? image?.alternativeText : name} width={278} height={146} />
                {
                    capsuleplus && (
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
                {
                    !capsuleplus && (
                        <span className={clsx("px-2 py-1", styles.greenBgColor)}>{`Free`}</span>
                    )
                }
                <span className={clsx("px-2 py-1", styles.skyBgColor)}>{`${count} Companies`}</span>
                <span className={clsx("px-2 py-1", styles.lightYellowBgColor)}>{`Recently updated`}</span>
            </div>
            <h5 className='mt-2 mb-1'>{truncateText(name, 7)}</h5>
            <p>{truncateText(description, 9)}</p>

            <Link className={clsx(styles.readNow)} href={`/screener/${slug}`}>
                <Trans i18nKey={"screener.readNow"}>
                    Read Now
                </Trans>  <RightArrow />
            </Link>
        </div>
    )
}

export default CompanyCard