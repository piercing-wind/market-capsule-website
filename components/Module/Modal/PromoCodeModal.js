import React, { Children, useState } from 'react';
import clsx from "clsx";
import styles from "./style/promoCode.module.scss"
import CrossCircle from '@/components/svg/CrossCircle';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { setShowForm } from '@/store/slices/subscriptionSlice';
import BadgeCheck from '@/components/svg/BadgeCheck';
import IconPayNowButton from '../Button/IconPayNowButton';
import toast from 'react-hot-toast';
import { Trans, useTranslation } from 'next-i18next';

const PromoCodeModal = () => {
    const { t } = useTranslation("common")
    const [promoCodeValid, setPromoCodeValid] = useState(false)
    const [promoInput, setPromoInput] = useState("")
    const dispatch = useDispatch()
    const { showForm } = useSelector((state) => (
        {
            showForm: state?.subscriptionSlice?.promoCodeModal?.showForm,
        }
    ), shallowEqual)

    const applyNowFun = () => {
        console.log("applyNowFun")
    }

    //handle on change 
    const handlePromoInput = (e) => {
        setPromoInput(e.target.value)
    }

    const checkPromoFun = () => {
        if (promoInput === "200") {
            setPromoCodeValid(true)
        } else {
            setPromoCodeValid(false)
            toast.error(t("subscriptionPage.promoCodeModal.notValid"))
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
                                        }}

                                        onTouchEnd={() => {
                                            dispatch(setShowForm(false))
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
                                                <input onChange={handlePromoInput} type="text" placeholder={t(`subscriptionPage.promoCodeModal.enterCoupenCode`)} />
                                                <button onClick={checkPromoFun}>
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
                                                            <span className={clsx(styles.bold)}>Rs 200</span>&nbsp;
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