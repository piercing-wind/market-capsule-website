import React, { Children, useState } from 'react';
import clsx from "clsx";
import styles from "./style/promoCode.module.scss"
import CrossCircle from '@/components/svg/CrossCircle';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { checkPromoCode, checkoutApi, setCheckoutData, setDiscountAmount, setShowForm } from '@/store/slices/subscriptionSlice';
import BadgeCheck from '@/components/svg/BadgeCheck';
import IconPayNowButton from '../Button/IconPayNowButton';
import toast from 'react-hot-toast';
import { Trans, useTranslation } from 'next-i18next';

const PromoCodeModal = () => {
    const { t } = useTranslation("common")
    const [promoCodeValid, setPromoCodeValid] = useState(false)
    const [promoInput, setPromoInput] = useState("")
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    const { showForm, planId, discountAmount } = useSelector((state) => (
        {
            showForm: state?.subscriptionSlice?.promoCodeModalObj?.showForm,
            discountAmount: state?.subscriptionSlice?.promoCodeModalObj?.discountAmount,
            planId: state?.subscriptionSlice?.getPlanDataObj?.planId,

        }
    ), shallowEqual)
    const applyNowFun = async () => {
        const submitData = {
            promoCode: promoInput,
            planId: planId
        }
        setLoader(true)

        if (promoInput) {
            await checkoutApi(submitData,
                (res) => {
                    if (res?.success) {
                        dispatch(setCheckoutData(res?.data))
                        toast.success(t(res?.message));
                        setLoader(false)
                        dispatch(setShowForm(false))
                        
                    } else {
                        toast.error(res?.message);
                        setLoader(false);
                        dispatch(setShowForm(false))

                    }
                },
                (err) => {
                    if (!err?.success) {
                        toast.error(err?.message);
                        setLoader(false)
                        dispatch(setShowForm(false))

                    }
                }
            );

        } else {
            toast.error(t(`message.pleaseEnterPromoCode`))
            setLoader(false)

        }
    }

    //handle on change 
    const handlePromoInput = (e) => {
        setPromoInput(e.target.value)
    }

    const checkPromoFun = async () => {

        const submitData = {
            promoCode: promoInput,
            planId: planId
        }
        setLoader(true)

        if (promoInput) {
            await checkPromoCode(submitData,
                (res) => {
                    if (res?.success) {
                        dispatch(setDiscountAmount(res?.data?.discount))
                        toast.success(t(res?.message));
                        setLoader(false)
                        setPromoCodeValid(true)
                    } else {
                        toast.error(res?.message);
                        setLoader(false);
                        setPromoCodeValid(false)
                    }
                },
                (err) => {
                    if (!err?.success) {
                        toast.error(err?.message);
                        setLoader(false)
                        setPromoCodeValid(false)
                    }
                }
            );

        } else {
            toast.error(t(`message.pleaseEnterPromoCode`))
            setLoader(false)

        }
    }
    return (
        <div className={clsx(styles.floatMainDiv)}>

            {
                showForm ? (
                    <>
                        <div

                            className={clsx(styles.fGOverlay)}
                        />

                        <div>

                            <div className={clsx(styles.feedbackGForm)} id="f_form_open" >
                                <div className={clsx("getintouchPage box", styles.getintouchPageUpdate)}>
                                    <div
                                        onClick={() => {
                                            dispatch(setShowForm(false))
                                            setPromoInput("")
                                            dispatch(setDiscountAmount(0))
                                            setPromoCodeValid(false)

                                        }}

                                        onTouchEnd={() => {
                                            dispatch(setShowForm(false))
                                            setPromoInput("")
                                            dispatch(setDiscountAmount(0))
                                            setPromoCodeValid(false)


                                        }}

                                        className={clsx(styles.crossIcon)}>
                                        <CrossCircle />
                                    </div>
                                    <Row className={clsx("d-flex justify-content-center mx-0", styles.formRow)}>
                                        <Col className={clsx(styles.formCol)} >
                                            <h5>
                                                <Trans i18nKey={"subscriptionPage.promoCodeModal.promoCode"}>
                                                    Promo code
                                                </Trans>
                                            </h5>
                                            <p>
                                                <Trans i18nKey={"subscriptionPage.promoCodeModal.reedem"}>
                                                    Redeem your promo code here
                                                </Trans>
                                            </p>
                                            <div className={clsx("d-flex justify-content-between", styles.inputDiv)}>
                                                <input value={promoInput} onChange={handlePromoInput} type="text" placeholder={t(`subscriptionPage.promoCodeModal.enterCoupenCode`)} />
                                                <button onClick={() => {
                                                    if (!loader) {
                                                        checkPromoFun()
                                                    }
                                                }}>
                                                    <Trans i18nKey={"subscriptionPage.promoCodeModal.check"}>
                                                        CHECK
                                                    </Trans>


                                                </button>
                                            </div>
                                            {
                                                promoCodeValid && (
                                                    <div className={clsx("d-flex column-gap-2 align-items-center mt-3", styles.promoShowDiv)} >
                                                        <BadgeCheck />
                                                        <p className="mb-0">
                                                            <span className={clsx(styles.bold)}>Rs {discountAmount}</span>&nbsp;
                                                            <span>
                                                                <Trans i18nKey={"subscriptionPage.promoCodeModal.offOn"}>
                                                                    off on capsule+ subscription
                                                                </Trans>
                                                            </span>
                                                        </p>
                                                    </div>


                                                )
                                            }


                                            <div className={clsx('d-flex justify-content-center', styles.marginBtn)}>
                                                <IconPayNowButton
                                                    label={"subscriptionPage.promoCodeModal.applyNow"}
                                                    color={`#FFFFFF`}
                                                    fontSize={`16px`}
                                                    fontWeight={`400`}
                                                    borderRadius={`8px`}
                                                    pAll={`10px 20px`}
                                                    bg={`#000000`}
                                                    border={"none"}
                                                    type={"button"}
                                                    handleFun={applyNowFun}
                                                    disabled={promoCodeValid ? false : true}
                                                />

                                            </div>
                                        </Col>
                                    </Row>

                                </div>


                            </div>



                        </div>


                    </>
                ) : null
            }

        </div>

    )
}

export default PromoCodeModal