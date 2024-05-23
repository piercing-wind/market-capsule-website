import React from 'react';
import clsx from "clsx";
import styles from "./style/capsulePlusCompanyCard.module.scss"
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Trans, useTranslation } from 'next-i18next';
import Link from 'next/link';
import Bolt from '@/components/svg/Bolt';
import { truncateText } from '@/utils/constants';
import moment from 'moment';
const RightArrow = dynamic(() => import('@/components/svg/RightArrow'))

const CapsulePlusCompanyCard = (props) => {
    const { dataObj } = props;
    const { t } = useTranslation("common");



    return (
        <div className={clsx("px-2 pt-2 pb-4", styles.trandingDiv)}>
            {/* news heading div */}
            <div className={clsx(styles.imageDiv)}>
                <Image className={clsx("w-100 h-auto")} src={dataObj?.featuredImage?.url || `/assests/capsule-plus/red-image.png`} alt={dataObj?.featuredImage?.alternativeText || dataObj?.name} width={278} height={146} />
                {
                    dataObj?.capsuleplus && (
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
                {!dataObj?.capsuleplus && <span className={clsx("px-2 py-1", styles.greenBgColor)}>{t(`screener.free`)}</span>}
                <span className={clsx("px-2 py-1",)} style={{ background: dataObj?.industry?.tag?.colorHash ? dataObj?.industry?.tag?.colorHash : "#FFE0B7" }}>{dataObj?.industry?.name}</span>
                <span className={clsx("px-2 py-1", styles.grayBgColor)}>{dataObj?.createdAt ? moment(dataObj?.createdAt)?.format('DD MMM, YYYY') : ""}</span>

            </div>
            <h5 className={clsx('mt-2 mb-1', styles.hight)}>{truncateText(dataObj?.name, 7)}</h5>

            <Link className={clsx(styles.readNow)} href={`/capsule-plus/${dataObj?.slug}`}>
                <Trans i18nKey={"screener.readNow"}>
                    Read Now
                </Trans>  <RightArrow />
            </Link>
        </div>
    )
}

export default CapsulePlusCompanyCard