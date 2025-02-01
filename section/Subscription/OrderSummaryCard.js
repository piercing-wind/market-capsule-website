import React, { useState } from 'react';
import clsx from 'clsx';
import styles from "./style/orderSummaryCard.module.scss";
import dynamic from 'next/dynamic';
import Lock from '@/components/svg/Lock';
import { Trans, useTranslation } from 'next-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { buyPlanApi, setBuyPlanData } from '@/store/slices/subscriptionSlice';
import toast from 'react-hot-toast';
import { initializeRazorpay } from '@/utils/apiEndPoints';
import { useRouter } from 'next/router';
import LoderModule from '@/components/Module/LoaderModule';
import { XIcon } from 'lucide-react';
const IconPayNowButton = dynamic(() => import("@/components/Module/Button/IconPayNowButton"))


const FreeModel = ({ setShowFreeModel }) => {
    return (
        <div onClick={() => setShowFreeModel(false)} className='w-full inset-0 fixed h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-5 rounded-lg relative mx-2' onClick={(e) => e.stopPropagation()}>
                <h1 className='text-green-500 font-semibold !tracking-widest' style={{ color: "#22c55e" }}>Free</h1>
                <p>All Content is available for free! You don't have to pay anything for now.</p>
                <button onClick={() => setShowFreeModel(false)} className='rounded-md px-8 py-1 bg-blue-800 text-white' style={{ background: "#3E63FF" }}>Ok</button>
                <XIcon 
                    onClick={() => setShowFreeModel(false)}
                    className='absolute cursor-pointer'
                    style={{ top: "10px", right: "10px" }}
                />
            </div>
        </div>
    );
};

const OrderSummaryCard = () => {
    const { t } = useTranslation("common");
    const [loader, setLoader] = useState(false)
    const [showFreeModel, setShowFreeModel] = useState(true)
    const router = useRouter()
    const { planId, checkoutData, userDetails } = useSelector((state) => (
        {
            planId: state?.subscriptionSlice?.getPlanDataObj?.planId,
            checkoutData: state?.subscriptionSlice?.promoCodeModalObj?.checkoutData,
            userDetails: state?.authSlice?.userDetails,
        }
    ), shallowEqual)

    const dispatch = useDispatch()
    const panyNowFun = async () => {
        const submitData = {
            amount: checkoutData?.totalPayableAmount,
            planId: planId,
            currency: checkoutData?.currency || "INR",
            receipt: "buy a subscription plan"
        }
        setShowFreeModel(true)
        // setLoader(true)
        // await buyPlanApi(submitData,
        //     (res) => {
        //         if (res?.success) {
        //             dispatch(setBuyPlanData(res?.data))
        //             handleRazorpay(res?.data)
        //             // toast.success(t(res?.message));
        //             setLoader(false)
        //         } else {
        //             toast.error(res?.message);
        //             setLoader(false);
        //         }
        //     },
        //     (err) => {
        //         if (!err?.success) {
        //             toast.error(err?.message);
        //             setLoader(false)
        //         }
        //     }
        // );
    }


    const handleRazorpay = async (checkoutData) => {
        const resRazerPayInit = await initializeRazorpay();
        if (!resRazerPayInit) {
            toast.error(t(`message.failedToInitializeRazorpay`));
            window.location.reload()
            return false;
        }
        var options = {
            key: process.env.RAZORPAY_KEY,
            amount: checkoutData?.totalPayableAmount ? checkoutData?.totalPayableAmount : 0,
            currency: process.env.CURRENCY || 'INR',
            name: userDetails?.fullName ? userDetails?.fullName : "",
            description: `THANK YOU!, Your order has been placed successfully. Your order id is ${checkoutData?.orderId}`,
            image: `${process.env.IMGURL}/logo.png`,
            order_id: checkoutData?.orderId,
            handler: async (response) => {
                const paymentVerify = async () => {
                    setLoader(true)
                    let res = await fetch(`${process.env.API}/api/plan/paymentVerify`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                            "x-razorpay-signature": `${response?.razorpay_signature}`
                        },
                        body: JSON.stringify({
                            "orderId": `${response?.razorpay_order_id}`,
                            "paymentId": `${response?.razorpay_payment_id}`
                        })
                    })
                    if (!res.ok) {
                        throw new Error(t(`message.networkResponseWasNotOk`));
                    }
                    return res?.json();
                }

                try {
                    const data = await paymentVerify();
                    if (data?.success) {
                        toast.success(data?.message);
                        router?.push("/subscription/payment-successfull")
                    } else {
                        toast.error(t(`message.paymentVerificationFailed`));
                        router?.push("/subscription/payment-failure")

                    }
                } catch (error) {
                    console.error(t(`message.paymentVerificationFailed`), error);
                } finally {
                    setLoader(false)
                }
            },
            prefill: {
                name: userDetails?.fullName ? userDetails?.fullName : "",
                email: userDetails?.email ? userDetails?.email : "",
                contact: userDetails?.mobile ? userDetails?.mobile : "",
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
         {showFreeModel && <FreeModel setShowFreeModel={setShowFreeModel} />}
            {
                loader ? (
                    <LoderModule />
                ) : (
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
                                ₹ {checkoutData?.amount}
                            </p>
                        </div>

                        {
                            checkoutData?.promoCodeDiscount > 0 && (
                                <div className={clsx("d-flex justify-content-between align-items-center mt-2", styles.div1)}>
                                    <p className='d-flex flex-column'>
                                        <span className={clsx(styles.medium)}>
                                            <Trans i18nKey={"subscriptionPage.annualPlanSubscription"}>

                                                Promo code discount
                                            </Trans>
                                        </span>
                                    </p>
                                    <p >
                                        ₹ {checkoutData?.promoCodeDiscount}
                                    </p>
                                </div>
                            )
                        }
                        <div className={clsx("d-flex justify-content-between align-items-center", styles.div2)}>
                            <p>
                                <Trans i18nKey={"subscriptionPage.totalDueToday"}>
                                    Total due today
                                </Trans>
                            </p>
                            <p>
                                ₹ {checkoutData?.totalPayableAmount}
                            </p>
                        </div>
                        <p className={clsx(styles.para1)}>
                            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod */}
                        </p>
                        <div className={clsx("d-flex justify-content-center align-items-center", styles.btnDiv)}>
                            <IconPayNowButton
                                color={"#FFFFFF"}
                                bg={"#3E63FF"}
                                label={`${t(`subscriptionPage.pay`)}₹ ${checkoutData?.totalPayableAmount} ${t(`subscriptionPage.now`)}`}
                                type={"button"}
                                fontSize={"16px"}
                                fontWeight={"400"}
                                borderRadius={"8px"}
                                pAll={"10px 24px"}
                                border={"none"}
                                icon={<Lock />}
                                handleFun={panyNowFun}
                                disabled={loader ? true : false}
                            />
                        </div>
                    </div>
                )
            }
        </>
    )

}

export default OrderSummaryCard

