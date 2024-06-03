import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from "./style/planCard.module.scss";
import Bolt from '@/components/svg/Bolt';
import { Trans, useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { checkoutApi, setCheckoutData, setPlanId } from '@/store/slices/subscriptionSlice';
import toast from 'react-hot-toast';
import { findDiscount, findYear } from '@/utils/constants';

const PlanCard = ({ planCardData }) => {
    const [plan, setPlan] = useState("yearly")
    const { t } = useTranslation("common");
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    //const handle plan
    const handlePlan = (value) => {
        setPlan(value)
    }

    const chackoutFun = async (planId) => {
        const submitData = {
            promoCode: "",
            planId: planId
        }
        setLoader(true)
        await checkoutApi(submitData,
            (res) => {
                if (res?.success) {
                    dispatch(setCheckoutData(res?.data))
                    // toast.success(t(res?.message));
                    setLoader(false)
                } else {
                    toast.error(res?.message);
                    setLoader(false);
                }
            },
            (err) => {
                if (!err?.success) {
                    toast.error(err?.message);
                    setLoader(false)
                }
            }
        );
    }


    useEffect(() => {
        // Set the default planId to the id of the first "yearly" plan
        if (planCardData && planCardData?.length > 0) {
            const defaultPlan = planCardData?.find(plan => plan?.attributes?.planType === "yearly");
            if (defaultPlan) {
                dispatch(setPlanId(defaultPlan?.id));
                chackoutFun(defaultPlan?.id)
            }
        }
    }, []);

    return (
        <div className={clsx("p-3", styles.planCard)}>
            {
                planCardData?.map((el, index) => {
                    return (
                        <div key={index} className={clsx("px-3 py-4 d-flex justify-content-between align-items-center", styles.planDiv, plan === el?.attributes?.planType && styles.selectedDiv)}>
                            {/* left div */}
                            <div className={clsx("d-flex  align-items-center column-gap-3", styles.leftInputDiv)}>
                                <input checked={plan === el?.attributes?.planType} type='radio' name="plan" value={el?.attributes?.planType} onChange={(e) => {
                                    handlePlan(e.target.value)
                                    dispatch(setPlanId(el?.id));
                                    chackoutFun(el?.id)
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
                                    <p className={clsx('mb-0', styles.planPara)}>{t(el?.attributes?.name)}</p>
                                </div>

                            </div>

                            {/* right div */}
                            <div className={clsx("d-flex column-gap-2", styles.rightDiv)}>
                                {
                                    plan === el?.attributes?.planType && (
                                        <p className='d-flex flex-column'>

                                            <span className={clsx(styles.realPrice)}>₹{el?.attributes?.regularPrice}</span>
                                            <span className={clsx(styles.redColor)}>{findDiscount(el?.attributes?.regularPrice, el?.attributes?.price)}
                                                <Trans i18nKey={"subscriptionPage.persentOff"}>
                                                    % OFF
                                                </Trans>
                                            </span>
                                        </p>

                                    )
                                }
                                <p >
                                    <span className={clsx(styles.offerPrice)}>₹ {el?.attributes?.price}</span>
                                    <span className={clsx(styles.planDuration)}>/
                                        {
                                            el?.attributes?.durationInDays >= 365 ? `${findYear(el?.attributes?.durationInDays) && findYear(el?.attributes?.durationInDays)} YEAR` : `${el?.attributes?.durationInDays} DAYS`}
                                    </span>
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