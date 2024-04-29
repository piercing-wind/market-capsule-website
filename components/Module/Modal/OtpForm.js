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
import toast from 'react-hot-toast';
const CountdownTimer = dynamic(() => import('../Timer/CountdownTimer'))


const OtpForm = () => {
    const { t } = useTranslation("common");
    const [otp, setOtp] = useState("");
    const [resetValue, setResetValue] = useState(false);
    const [trigger, setTrigger] = useState(false);

    const dispatch = useDispatch()


    //signup form btn 
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("otp", otp)
        if (otp?.length !== 4) {
            return
        }
        dispatch(setAuthType("accountCreatedSuccessfully"))
    }

    //go to signup modal
    const goToPrevModal = () => {
        dispatch(setAuthType("signup"))

    }

    // resend otp timer
    const resendOtp = async () => {
        setOtp("");
    };
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
                    <button onClick={goToPrevModal} className={clsx(styles.penBtn)}>
                        <PenCircle />

                    </button>
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
                    color={otp?.length !== 4 ? "gray" : "#FFFFFF"}
                    fontSize={"16px"}
                    fontWeight={"400"}
                    borderRadius={"8px"}
                    pAll={"8px 16px"}
                    bg={"#000000"}
                    border={"none"}
                    type={"submit"}
                    label={"otpModal.submit"}
                    disabled={otp?.length !== 4 ? true : false}
                />

                <div className="d-flex  flex-sm-row flex-column align-items-start mt-4 " style={{ marginBottom: "0px", columnGap: "10px", fontSize: "16px", color: "#606F7B", fontWeight: "400" }} >
                    <span style={{ display: resetValue ? "block" : "none" }} >
                        <Trans i18nKey="otpVerifyPage.didNotReceive">
                            {`Didn't receive?`}
                        </Trans></span>
                    <span style={{ display: !trigger ? "inline-block" : "none" }}>
                        <CountdownTimer
                            minSecs={{ minutes: 0, seconds: 180 }}
                            handleSubmit={resendOtp}
                            setResetValue={setResetValue}
                            resetValue={resetValue}
                        />
                    </span>

                </div>

            </form>


        </div>
    )
}

export default OtpForm