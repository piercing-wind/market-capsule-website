import React, { useState } from 'react';
import clsx from "clsx"
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
const LoginButton = dynamic(() => import('../Button/LoginButton'))
import { Trans, useTranslation } from 'next-i18next';
import PenCircle from '@/components/svg/PenCircle';
import OtpInput from "react-otp-input";
import styles from "./style/otpForm.module.scss";
import { setAuthType } from '@/store/slices/authSlice';


const OtpForm = () => {
    const { t } = useTranslation("common");
    const [otp, setOtp] = useState("");

    const dispatch = useDispatch()


    //signup form btn 
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("otp", otp)
        dispatch(setAuthType("accountCreatedSuccessfully"))
    }
    return (
        <div className={clsx(styles.loginFormDiv)}>
            <form className={clsx(styles.form)} onSubmit={handleSubmit}>
                <h5>
                    <Trans i18nKey={"otpModal.confirmation"}>
                        Confirmation
                    </Trans>
                </h5>
                <div className={clsx('mb-lg-4 mb-2', styles.otpSendTo)}>
                    <span>
                        <Trans i18nKey={"otpModal.otpSentTo"}>
                            OTP sent to
                        </Trans>
                    </span>
                    <span className={clsx("me-1", styles.blue)}>johndoe@gmail.com</span>
                    <PenCircle />
                </div>
                {/* enter otp section */}
                <div>
                    <p className={clsx(styles.enterOtp)}>
                        <Trans i18nKey={"otpModal.enterOtp"}>
                            Enter OTP
                        </Trans>
                    </p>
                    <div className={clsx(styles.otpDiv, "mb-3")}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span>&nbsp;&nbsp;</span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={styles.inputStyle1}
                            containerStyle={styles.containerStyle1}
                            shouldAutoFocus
                        />
                    </div>
                </div>
                <LoginButton
                    color={"#FFFFFF"}
                    fontSize={"16px"}
                    fontWeight={"400"}
                    borderRadius={"8px"}
                    pAll={"8px 16px"}
                    bg={"#000000"}
                    border={"none"}
                    type={"submit"}
                    label={"otpModal.submit"}
                />



            </form>


        </div>
    )
}

export default OtpForm