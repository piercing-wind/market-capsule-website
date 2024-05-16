import React, { useEffect, useState } from 'react';
import clsx from "clsx"
import dynamic from 'next/dynamic';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
const LoginButton = dynamic(() => import('../Button/LoginButton'))
import { Trans, useTranslation } from 'next-i18next';
import PenCircle from '@/components/svg/PenCircle';
import OtpInput from "react-otp-input";
import styles from "./style/otpForm.module.scss";
import { setAuthType, setShowForm, setUpdateJwtToken, setUpdateProfileDetails, setUpgradeNow } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';
import LoderModule from '../LoaderModule';
import { getCookiesStorage, getSessionStorage, removeSessionStorage, setCookiesStorage, setSessionStorage } from '@/utils/storageService';
import { apiEndPoints } from '@/utils/apiEndPoints';
import { useRouter } from 'next/router';
import { postMethod } from '@/utils/apiServices';
const CountdownTimer = dynamic(() => import('../Timer/CountdownTimer'))


const OtpForm = () => {
    const { t } = useTranslation("common");
    const [otp, setOtp] = useState("");
    const [otpData, setOtpData] = useState(false);
    const [resetValue, setResetValue] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    const dispatch = useDispatch()
    const { upgradeNow } = useSelector((state) => ({
        upgradeNow: state?.authSlice?.upgradeNow,

    }), shallowEqual)

    //signup form btn 
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!otpData?.token) {
            toast.error("Verification key missing!")
            return false;
        }
        if (!otp) {
            toast.error("Please enter OTP!")
            return false
        }
        if (otp?.length != 4) {
            toast.error("Please enter correct 4 digits OTP!")
            return false
        }
        setLoader(true);

        await postMethod(`${apiEndPoints.endPointSignupOtpVerify}`, { verifyToken: otpData?.token, otp: otp }).then((response) => {
            if (response?.error?.status && response?.error?.message) {
                toast.error(response?.error?.message)
                setLoader(false)
            } else {
                if (response?.success) {
                    if (response?.data?.token) {
                        setCookiesStorage("_jwt", response?.data?.token)
                        dispatch(setUpdateJwtToken(response?.data?.token))
                        dispatch(setUpdateProfileDetails(response?.data?.user))
                        toast.success(response?.message);
                        if (upgradeNow && otpData?.prevPath !== "signup") {
                            dispatch(setShowForm(false))
                            dispatch(setAuthType("homePage"))
                            dispatch(setUpgradeNow(false))
                            router.push("/subscription")
                        }
                        else if (otpData?.prevPath === "login") {
                            dispatch(setShowForm(false))
                            dispatch(setAuthType("homePage"))
                            router.push("/")

                        } else {

                            dispatch(setAuthType("accountCreatedSuccessfully"))
                        }
                        removeSessionStorage("_verify");

                    } else {
                        toast.error(response?.message)
                        setLoader(false)
                    }
                } else {
                    setLoader(false)
                }
            }
        })

    }

    //go to signup modal
    const goToPrevModal = () => {
        if (otpData?.prevPath === "login") {
            dispatch(setAuthType("login"))

        } else {
            dispatch(setAuthType("signup"))

        }

    }

    // resend otp timer
    const resendOtp = async () => {
        setLoader(true);
        const submitData = ({
            email: otpData?.email ? otpData?.email : '',
        })

        await postMethod(apiEndPoints.resendOtp, submitData).then((response) => {
            if (response?.error?.status && response?.error?.message) {
                toast.error(response?.error?.message)
                setLoader(false)
            } else {
                if (response?.success) {
                    if (response?.data?.token) {
                        const updateData = ({ email: otpData?.email, token: response?.data?.token, timestamp: new Date(), prevPath: otpData?.prevPath })
                        setOtpData(updateData)
                        setSessionStorage("_verify", updateData)
                        toast.success(response?.message)
                        setLoader(false)
                    } else {
                        toast.error(response?.message)
                        setLoader(false)
                    }
                } else {
                    setLoader(false)
                }
            }
        })
    };

    useEffect(() => {
        if (getSessionStorage("_verify")) {
            const dataVerify = getSessionStorage("_verify");
            setOtpData(dataVerify);
        } else {
            router.push("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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
                    <span className={clsx("me-1", styles.blue)}>{otpData?.email}</span>
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
            {
                loader ?
                    <LoderModule isAbsolute={true} />
                    : null
            }


        </div>
    )
}

export default OtpForm