import React, { useState } from 'react';
import clsx from 'clsx';
import styles from "./style/orderSummaryCard.module.scss";
import dynamic from 'next/dynamic';
import Lock from '@/components/svg/Lock';
import { Trans, useTranslation } from 'next-i18next';
const IconPayNowButton = dynamic(() => import("@/components/Module/Button/IconPayNowButton"))

const OrderSummaryCard = () => {
    const [price, setPrice] = useState("4999")
    const { t } = useTranslation("common")

    const panyNowFun = () => {
        console.log("paynow")
    }
    return (
        <div className={clsx("px-3 py-4", styles.planCard)}>

            <div className={clsx("d-flex justify-content-between align-items-center mt-2", styles.div1)}>
                <p className='d-flex flex-column'>
                    <span>Capsule+</span>
                    <span className={clsx(styles.medium)}>
                        <Trans i18nKey={"subscriptionPage.annualPlanSubscription"}>

                            (Annual Plan Subscription)
                        </Trans>
                    </span>
                </p>
                <p >
                    ₹ {price}
                </p>
            </div>
            <div className={clsx("d-flex justify-content-between align-items-center", styles.div2)}>
                <p>
                    <Trans i18nKey={"subscriptionPage.totalDueToday"}>
                        Total due today
                    </Trans>
                </p>
                <p>
                    ₹ {price}
                </p>
            </div>
            <p className={clsx(styles.para1)}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            </p>
            <div className={clsx("d-flex justify-content-center align-items-center", styles.btnDiv)}>
                <IconPayNowButton
                    color={"#FFFFFF"}
                    bg={"#3E63FF"}
                    label={`${t(`subscriptionPage.pay`)}₹ ${price} ${t(`subscriptionPage.now`)}`}
                    type={"button"}
                    fontSize={"16px"}
                    fontWeight={"400"}
                    borderRadius={"8px"}
                    pAll={"10px 24px"}
                    border={"none"}
                    icon={<Lock />}
                    handleFun={panyNowFun}
                />

            </div>

        </div>
    )
}

export default OrderSummaryCard