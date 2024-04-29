import React from 'react';
import clsx from "clsx";
import { Trans, useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const IconPayNowButton = dynamic(() => import("../Button/IconPayNowButton"));
import styles from "./style/indepthCard.module.scss"
import { CapsulePlus } from '@/components/svg/CapsulePlus';
import MarketCapsule from '@/components/svg/MarketCapsule';

const InDepthCard = () => {
    const { t } = useTranslation("common");
    const router = useRouter()
    const handleUpgradeNowFun = () => {
        router.push("/subscription")
    }

    return (
        <div className={clsx('d-flex', styles.card)}>
            <div className={clsx("px-lg-4 py-lg-4 p-3 d-flex flex-md-row flex-column row-gap-2 column-xl-gap-0 column-gap-3 justify-content-between align-items-center", styles.planDiv)}>
                <div className={clsx("", styles.leftPara)}>
                    <h5 className={clsx(styles.heading)}>
                        <Trans i18nKey={""}>
                            Discover In-depth Insights About the Company
                        </Trans>
                    </h5>
                    <p className={clsx("mb-0", styles.para)}>
                        {`Explore detailed information regarding the company's share capital, exclusive statistics, insights, and much more.`}
                    </p>
                </div>

                <div className={clsx("d-flex column-gap-3 align-items-center", styles.rightDiv)}>
                    <p className='mb-0'>
                        <span className={clsx(styles.offerPrice)}>EXCLUSIVE FOR</span>
                        <MarketCapsule />
                    </p>
                    <IconPayNowButton
                        label={"Read Now"}
                        color={"#FFFFFF"}
                        fontSize={"16px"}
                        fontWeight={"400"}
                        borderRadius={"8px"}
                        pAll={"10px 20px"}
                        bg={"transparent linear-gradient(106deg, #3E63FF 0%, #2EDC90 100%) 0% 0% no-repeat padding-box"}
                        border={"none"}
                        type={"button"}
                        handleFun={handleUpgradeNowFun}
                        gradient={true}

                    />
                </div>
            </div>

        </div>
    )
}

export default InDepthCard