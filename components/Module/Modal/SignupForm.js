import React, { useEffect, useState } from 'react';
import clsx from "clsx"
import styles from "./style/loginForm.module.scss";
import signupStyles from "./style/signupCheckbox.module.scss"
import { continueFromSocial } from './loginFormData';
import dynamic from 'next/dynamic';
import { setAuthType, setShowForm, setUpdateJwtToken, setUpdateProfileDetails, setUpgradeNow, socialLoginApi } from '@/store/slices/authSlice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Formik } from 'formik';
const LoginButton = dynamic(() => import('../Button/LoginButton'))
const EmailInput = dynamic(() => import('../Input/EmailInput'))
const GreenCheckbox = dynamic(() => import('../Checkbox/GreenCheckbox'))
import * as Yup from "yup";
import { Trans, useTranslation } from 'next-i18next';
import LoderModule from '../LoaderModule';
import { postMethod } from '@/utils/apiServices';
import toast from 'react-hot-toast';
import { setCookiesStorage, setSessionStorage } from '@/utils/storageService';
import { apiEndPoints } from '@/utils/apiEndPoints';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FacebookIcon } from '@/components/svg/FacebookIcon';
import { useGoogleLogin } from '@react-oauth/google';

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("* This field is mandatory"),

    termsAndCondition: Yup.boolean().oneOf(
        [true],
        "You must accept our Privacy Policy and Terms of Use"
    ).required("You must accept our Privacy Policy and Terms of Use"),

});


const signupFormData = {
    email: "",
    termsAndCondition: false,
    newsletters: false
}

const SignupForm = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false);
    const [provider, setProvider] = useState('');
    const [googleLogin, setGoogleLogin] = useState('');



    //go to login form 
    const goToLoginModal = () => {
        dispatch(setAuthType("login"))
    }

    //signup function
    const signupFun = async (values, { setSubmitting, resetForm }) => {

        const { email, termsAndCondition, newsletters } = values;
        if (!email) {
            toast.error("Email required!")
            return false
        }

        if (!termsAndCondition) {
            toast.error("Terms and Conditions required!")
            return false
        }


        // setLoader(true)
        const submitData = ({
            email: email,
            isTermAndConditionAccept: termsAndCondition,
            newslettersSubscribed: newsletters
        })
        setSubmitting(false);
        await postMethod(`${apiEndPoints.endPointSignUp}`, submitData).then((response) => {
            if (response?.error?.status && response?.error?.message) {
                toast.error(response?.error?.message)
                setLoader(false)
            } else {
                if (response?.success) {
                    if (response?.data?.token) {
                        setSessionStorage("_verify", ({ email: submitData?.email, token: response?.data?.token, timestamp: new Date(), prevPath: "signup" }))
                        toast.success(response?.message)
                        // window.open("?q=verify", "_self");
                        dispatch(setAuthType("otp"))
                        resetForm()
                    } else {
                        toast.error(response?.message)
                        setLoader(false)
                        resetForm()
                    }
                } else {
                    setLoader(false)
                }
            }
        })

    }
    const responseFacebook = async (response) => {
        if (response?.accessToken) {
            let data = {
                token: response?.accessToken,
                provider: "facebook",
            }
            await socialLoginApi(data,
                (res) => {
                    if (res?.success) {
                        setCookiesStorage("_jwt", res?.data?.token)
                        dispatch(setUpdateJwtToken(res?.data?.token))
                        dispatch(setUpdateProfileDetails(res?.data?.user))
                        toast.success(res?.message)
                        setLoader(false)
                        dispatch(setShowForm(false))
                        dispatch(setAuthType("homePage"))
                        dispatch(setUpgradeNow(false))
                        window.open(window.location.pathname, "_self")

                    } else {
                        toast?.error(res?.message);
                        setLoader(false);
                    }
                },
                (err) => {
                    if (!err?.success) {
                        toast?.error(err?.message);
                        setLoader(false)
                    }
                }
            )

        }
    }
    //handle login with social media
    const handleLoginWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => setGoogleLogin(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const loginWithSocial = async () => {
        if (googleLogin && provider === "google") {
            let data = {
                token: googleLogin?.access_token,
                provider: provider,
            }
            await socialLoginApi(data,
                (res) => {
                    if (res?.success) {
                        setCookiesStorage("_jwt", res?.data?.token)
                        dispatch(setUpdateJwtToken(res?.data?.token))
                        dispatch(setUpdateProfileDetails(res?.data?.user))
                        toast.success(res?.message)
                        setLoader(false)
                        dispatch(setShowForm(false))
                        dispatch(setAuthType("homePage"))
                        dispatch(setUpgradeNow(false))
                        window.open(window.location.pathname, "_self")

                    } else {
                        toast?.error(res?.message);
                        setLoader(false);
                    }
                },
                (err) => {
                    if (!err?.success) {
                        toast?.error(err?.message);
                        setLoader(false)
                    }
                }
            )
        } else {
            return false
        }
    }


    useEffect(() => {
        loginWithSocial()
    }, [googleLogin])

    return (
        <div className={clsx(styles.loginFormDiv)}>
            <Formik
                initialValues={signupFormData}
                validationSchema={() => {
                    return validationSchema;
                }}
                enableReinitialize={true}
                onSubmit={signupFun}
            >
                {formik => (

                    <>

                        <form className={clsx(styles.form)} onSubmit={formik?.handleSubmit} >
                            <h5>
                                <Trans i18nKey={"loginAndSignupModal.createAnAccount"}>
                                    Create an account
                                </Trans>
                            </h5>
                            <p className='mb-lg-4 mb-2'>
                                <Trans i18nKey={"loginAndSignupModal.joinOrLogin"}>
                                    Join or Login now to get more benefits
                                </Trans>
                            </p>
                            {/* email */}
                            <div className={clsx(signupStyles.emailInput)}>
                                <EmailInput
                                    type={"email"}
                                    placeholder={"loginAndSignupModal.emailAddress"}
                                    value={formik?.values?.email}
                                    name={"email"}
                                    formik={formik}
                                    touchedName={formik.touched.email}
                                    errorName={formik.errors.email}
                                />
                            </div>
                            {/* checkbox */}
                            <div className={clsx(signupStyles.checkMainDiv)}>
                                <div className={clsx("d-flex", signupStyles.checkboxDiv)}>
                                    <GreenCheckbox
                                        id={"termsAndPrivacy"}
                                        checkboxName="termsAndCondition" // Set the name to match your form structure
                                        formik={formik}
                                        value={formik?.values?.termsAndCondition}
                                        touchedName={formik.touched.termsAndCondition}
                                        errorName={formik.errors.termsAndCondition}

                                    />
                                    <label className={clsx(signupStyles.label)} htmlFor="termsAndPrivacy">
                                        <span>
                                            <Trans i18nKey={"loginAndSignupModal.iAgreeToAll"}>
                                                I agree to all
                                            </Trans>
                                            {" "} </span>
                                        <Link
                                            onClick={() => {
                                                dispatch(setShowForm(false))
                                            }} href={"/terms-and-conditions"} className={clsx(signupStyles.link)}>
                                            <span >
                                                <Trans i18nKey={"loginAndSignupModal.termsAndCondition"}>
                                                    Terms & Conditions
                                                </Trans>
                                            </span>
                                        </Link>
                                        <span>{" "}
                                            <Trans i18nKey={"loginAndSignupModal.and"}>
                                                and
                                            </Trans>
                                            {" "} </span>
                                        <Link onClick={() => {
                                            dispatch(setShowForm(false))
                                        }} href={"/privacy-policy"} className={clsx(signupStyles.link)}>
                                            <span >
                                                <Trans i18nKey={"loginAndSignupModal.privacyPolicy"}>
                                                    Privacy Policy
                                                </Trans>
                                                {" "}</span>
                                        </Link>

                                        <span>
                                            <Trans i18nKey={"loginAndSignupModal.ofMarketCapsule"}>
                                                of Market Capsule
                                            </Trans>
                                        </span>

                                    </label>
                                </div>

                                <div className={clsx("d-flex", signupStyles.checkboxDiv)}>
                                    <GreenCheckbox
                                        id={"newsletters"}
                                        checkboxName="newsletters" // Set the name to match your form structure
                                        formik={formik}
                                        value={formik?.values?.newsletters}
                                        touchedName={formik.touched.newsletters}
                                        errorName={formik.errors.newsletters}
                                    />
                                    <label htmlFor="newsletters" className={clsx(signupStyles.label)}>
                                        <Trans i18nKey={"loginAndSignupModal.iAgreeToReceive"}>
                                            I agree to receive Newsletters and other promotional mails from Market Capsule
                                        </Trans>
                                    </label>
                                </div>



                            </div>

                            <LoginButton
                                color={(formik.errors.email || formik.errors.termsAndCondition) || !formik.values.email ? "gray" : "#FFFFFF"}
                                fontSize={"16px"}
                                fontWeight={"400"}
                                borderRadius={"8px"}
                                pAll={"8px 16px"}
                                bg={"#000000"}
                                border={"none"}
                                type={"submit"}
                                label={"loginAndSignupModal.continue"}
                                disabled={(formik.errors.email || formik.errors.termsAndCondition) || !formik.values.email ? true : false}

                            />

                            <p className={clsx("mt-lg-4 mt-2 mb-lg-3 mb-2 text-center", styles.or)}>
                                <Trans i18nKey={"loginAndSignupModal.or"}>
                                    OR
                                </Trans>
                            </p>
                            <div className={clsx("d-flex flex-column", styles.socialLoginBtnDiv)}>
                                {
                                    continueFromSocial?.length > 0 ? (
                                        continueFromSocial?.map((el, index) => {
                                            return (
                                                <LoginButton
                                                    key={index}
                                                    color={"#000000"}
                                                    fontSize={"16px"}
                                                    fontWeight={"400"}
                                                    borderRadius={"8px"}
                                                    pAll={"8px 16px"}
                                                    bg={"#F5F5F5"}
                                                    border={"1px solid #DDDDDD"}
                                                    type={"button"}
                                                    label={el?.label}
                                                    icon={el?.icon}
                                                    handleFun={() => {

                                                        if (el?.provider === "google") {
                                                            handleLoginWithGoogle()

                                                        }
                                                        setProvider(el?.provider)
                                                    }}
                                                    socialType={el?.provider}
                                                />
                                            )
                                        })
                                    ) : null

                                }
                                <FacebookLogin
                                    appId={process.env.Facebook_APP_ID}
                                    // autoLoad={true}
                                    callback={responseFacebook}
                                    render={renderProps => (
                                        <LoginButton
                                            color={"#000000"}
                                            fontSize={"16px"}
                                            fontWeight={"400"}
                                            borderRadius={"8px"}
                                            pAll={"8px 16px"}
                                            bg={"#F5F5F5"}
                                            border={"1px solid #DDDDDD"}
                                            type={"button"}
                                            label={`loginAndSignupModal.continueWithFacebook`}
                                            icon={<FacebookIcon />}
                                            handleFun={() => {
                                                renderProps.onClick()
                                                setProvider(`facebook`)
                                            }}
                                        />
                                    )}
                                />

                            </div>

                            <div className={clsx("d-flex justify-content-center align-items-center mt-lg-4 mt-2 column-gap-1", styles.signUpBtnDiv)}>
                                <p className='mb-0'>
                                    <Trans i18nKey={"loginAndSignupModal.alreadyHaveAnAccount"}>
                                        Already have an account?
                                    </Trans>
                                </p>
                                <button type='button' onClick={goToLoginModal}>
                                    {" "}
                                    <Trans i18nKey={"loginAndSignupModal.loginIn"}>
                                        Login In
                                    </Trans>
                                </button>
                            </div>
                        </form>
                        {
                            loader ?
                                <LoderModule isAbsolute={true} />
                                : null
                        }
                    </>

                )}
            </Formik>

        </div>
    )
}

export default SignupForm