import React from 'react';
import clsx from "clsx";
import styles from "./style/upgradeCard.module.scss"
import { Trans, useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setShowForm, setUpgradeNow } from '@/store/slices/authSlice';
import { findDiscount, findYear } from '@/utils/constants';
const IconPayNowButton = dynamic(() => import("../Button/IconPayNowButton"))

const UpgradeCard = ({ getSubscriptionBtnObj }) => {
    const { subscriptionBtnData } = getSubscriptionBtnObj || {};
    const { t } = useTranslation("common");
    const { jwt } = useSelector((state) => ({
        jwt: state?.authSlice?.jwt,
    }), shallowEqual)
    const dispatch = useDispatch()
    const router = useRouter()
    const handleUpgradeNowFun = () => {
        if (!jwt) {
            dispatch(setShowForm(true))
            dispatch(setUpgradeNow(true))

        } else {
            router.push("/subscription")
        }
    }

    return (
        <div className={clsx('d-flex', styles.card)}>
            <div className={clsx("px-sm-4 py-sm-4 p-3 d-flex flex-lg-row flex-column row-gap-2 justify-content-between align-items-center", styles.planDiv)}>
                <div className={clsx("d-flex  align-items-center column-gap-3", styles.leftPara)}>
                    <p className='m-0 text-center'>
                        {
                            subscriptionBtnData?.attributes?.title
                        }
                    </p>
                </div>

                <div className={clsx("d-flex column-gap-2 align-items-center", styles.rightDiv)}>
                    <p className={clsx('d-flex flex-column mb-0', styles.minWidth)}>
                        <span className={clsx(styles.realPrice)}>
                            ₹{subscriptionBtnData?.attributes?.plan?.data?.attributes?.regularPrice}
                        </span>
                        <span className={clsx(styles.redColor, "d-flex")} >
                            {findDiscount(subscriptionBtnData?.attributes?.plan?.data?.attributes?.regularPrice, subscriptionBtnData?.attributes?.plan?.data?.attributes?.price)}<Trans i18nKey={"capsulePlusPage.persentOff"}>% OFF</Trans>
                        </span>
                    </p>
                    <p className='mb-0 '>
                        <span className={clsx(styles.offerPrice)}>₹{subscriptionBtnData?.attributes?.plan?.data?.attributes?.price}</span>
                        <span className={clsx(styles.planDuration)}>/
                            {
                                subscriptionBtnData?.attributes?.plan?.data?.attributes?.durationInDays >= 365 ? `${findYear(subscriptionBtnData?.attributes?.plan?.data?.attributes?.durationInDays) && findYear(subscriptionBtnData?.attributes?.plan?.data?.attributes?.durationInDays)}YEAR` : `${subscriptionBtnData?.attributes?.plan?.data?.attributes?.durationInDays}DAYS`
                            }
                        </span>
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
                        gradient={true}

                    />
                </div>
            </div>

        </div>
    )
}

export default UpgradeCard