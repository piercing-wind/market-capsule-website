import React, { useState } from 'react';
import clsx from 'clsx';
import styles from "./style/planCard.module.scss";
import Bolt from '@/components/svg/Bolt';
import { planCardData } from './subscriptionData';
import { Trans, useTranslation } from 'next-i18next';

const PlanCard = () => {
    const [plan, setPlan] = useState("yearlyPlan")
    const { t } = useTranslation("common");

    //const handle plan
    const handlePlan = (value) => {
        setPlan(value)
    }
    return (
        <div className={clsx("p-3", styles.planCard)}>
            {
                planCardData?.map((el, index) => {
                    return (
                        <div key={index} className={clsx("px-3 py-4 d-flex justify-content-between align-items-center", styles.planDiv, plan === el?.type && styles.selectedDiv)}>
                            {/* left div */}
                            <div className={clsx("d-flex  align-items-center column-gap-3", styles.leftInputDiv)}>
                                <input checked={plan === el?.type} type='radio' name="plan" value={el?.type} onChange={(e) => {
                                    handlePlan(e.target.value)
                                }} />
                                <div className={clsx(styles.leftDiv)}>
                                    <p className='mb-0'>
                                        <Bolt />
                                        <span>
                                            <Trans i18nKey={"subscriptionPage.capsulePlus"}>
                                                capsule+
                                            </Trans>
                                        </span>
                                    </p>
                                    <p className={clsx('mb-0', styles.planPara)}>{t(el?.plan)}</p>
                                </div>

                            </div>

                            {/* right div */}
                            <div className={clsx("d-flex column-gap-2", styles.rightDiv)}>
                                {
                                    plan === el?.type && (
                                        <p className='d-flex flex-column'>

                                            <span className={clsx(styles.realPrice)}>₹{el?.realPrice}</span>
                                            <span className={clsx(styles.redColor)}>{el?.offerInPersent}
                                                <Trans i18nKey={"subscriptionPage.persentOff"}>
                                                    % OFF
                                                </Trans>
                                            </span>
                                        </p>

                                    )
                                }
                                <p >
                                    <span className={clsx(styles.offerPrice)}>₹ {el?.offerPrice}</span>
                                    <span className={clsx(styles.planDuration)}>/{el?.planDuration}</span>
                                </p>
                            </div>

                        </div>

                    )
                })

            }
        </div>
    )
}

export default PlanCard