import React from 'react';
import clsx from "clsx";
import styles from "./style/upgradeCard.module.scss"
import { Trans, useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const IconPayNowButton = dynamic(() => import("../Button/IconPayNowButton"))

const UpgradeCard = () => {
    const { t } = useTranslation("common");
    const router = useRouter()
    const handleUpgradeNowFun = () => {
        router.push("/subscription")
    }

    return (
        <div className={clsx('d-flex', styles.card)}>
            <div className={clsx("px-sm-4 py-sm-4 p-3 d-flex flex-lg-row flex-column row-gap-2 justify-content-between align-items-center", styles.planDiv)}>
                <div className={clsx("d-flex  align-items-center column-gap-3", styles.leftPara)}>
                    <p className='m-0 text-center'>
                        <Trans i18nKey={"capsulePlusPage.upgradeToCapsulePlus"}>
                            Upgrade to Capsule+ now to unlock exclusive content!
                        </Trans>
                    </p>
                </div>

                <div className={clsx("d-flex column-gap-2 align-items-center", styles.rightDiv)}>
                    <p className={clsx('d-flex flex-column mb-0', styles.minWidth)}>
                        <span className={clsx(styles.realPrice)}>
                            ₹6000
                        </span>
                        <span className={clsx(styles.redColor, "d-flex")} >
                            20<Trans i18nKey={"capsulePlusPage.persentOff"}>% OFF</Trans>
                        </span>
                    </p>
                    <p className='mb-0'>
                        <span className={clsx(styles.offerPrice)}>₹4999</span>
                        <span className={clsx(styles.planDuration)}>/
                            <Trans i18nKey={"capsulePlusPage.year"}>YEAR</Trans></span>
                    </p>
                    <IconPayNowButton
                        label={"capsulePlusPage.upgradeNow"}
                        color={"#FFFFFF"}
                        fontSize={"16px"}
                        fontWeight={"400"}
                        borderRadius={"8px"}
                        pAll={"10px 20px"}
                        bg={"transparent linear-gradient(106deg, #3E63FF 0%, #2EDC90 100%) 0% 0% no-repeat padding-box"}
                        border={"none"}
                        type={"button"}
                        handleFun={handleUpgradeNowFun}
                    />
                </div>
            </div>

        </div>
    )
}

export default UpgradeCard