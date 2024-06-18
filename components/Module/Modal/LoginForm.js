import React, { useEffect, useState } from 'react';
import clsx from "clsx"
import styles from "./style/loginForm.module.scss"
import { continueFromSocial } from './loginFormData';
import dynamic from 'next/dynamic';
import { getGoogleConnect, setAuthType, setShowForm, setUpdateJwtToken, setUpdateProfileDetails, setUpgradeNow, socialLoginApi, } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
const LoginButton = dynamic(() => import('../Button/LoginButton'))
const EmailInput = dynamic(() => import('../Input/EmailInput'))
import * as Yup from "yup";
import { Trans, useTranslation } from 'next-i18next';
import { apiEndPoints } from '@/utils/apiEndPoints';
import { removeSessionStorage, setCookiesStorage, setSessionStorage } from '@/utils/storageService';
import toast from 'react-hot-toast';
import LoderModule from '../LoaderModule';
import { postMethod } from '@/utils/apiServices';
import Image from 'next/image';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FacebookIcon } from '@/components/svg/FacebookIcon';

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("* This field is mandatory"),
});

const signupFormData = {
    email: "",

}
const LoginForm = () => {
    const { t } = useTranslation("common");
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch()
    const [googleLogin, setGoogleLogin] = useState('');
    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState("");
    //handle login with social media
    const handleLoginWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => setGoogleLogin(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    const responseFacebook = async (response) => {
        console.log("responseFacebook", response);
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

    const componentClicked = () => {
        console.log("Facebook login button clicked");
    };

    //signup form btn 
    const goToSignupModal = () => {
        dispatch(setAuthType("signup"))
    }

    //login form submit
    const loginFormSubmit = async (values) => {
        const { email } = values;
        if (!email) {
            toast.error("Email required!")
            return false
        }
        setLoader(true)
        const submitData = ({
            email: email ? email : '',
        })
        await postMethod(`${apiEndPoints?.endPointSignIn}`, submitData).then((response) => {
            if (response?.error?.status && response?.error?.message) {
                toast.error(response?.error?.message)
                setLoader(false)
            } else {
                if (response?.success) {
                    if (response?.data?.token) {
                        setSessionStorage("_verify", ({ email: submitData?.email, token: response?.data?.token, timestamp: new Date(), prevPath: "login" }))
                        toast.success(response?.message)
                        dispatch(setAuthType("otp"))
                    }
                    else {
                        toast.error(response?.message)
                        setLoader(false)
                    }
                } else {
                    setLoader(false)
                }
            }
        })
    }

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
                onSubmit={loginFormSubmit}
            >
                {formik => (

                    <form className={clsx(styles.form)} onSubmit={formik?.handleSubmit}>

                        <h5>
                            <Trans i18nKey={"loginAndSignupModal.loginForFree"}>
                                Login for Free
                            </Trans>
                        </h5>
                        <p className='mb-lg-4 mb-2'>
                            <Trans i18nKey={"loginAndSignupModal.joinOrLogin"}>
                                Join or Login now to get more benefits
                            </Trans>

                        </p>
                        {/* email */}
                        <EmailInput
                            type={"email"}
                            placeholder={"loginAndSignupModal.emailAddress"}
                            value={formik?.values?.email}
                            name={"email"}
                            formik={formik}
                            touchedName={formik.touched.email}
                            errorName={formik.errors.email}
                        />
                        <LoginButton
                            color={formik.errors.email || !formik.values.email ? "gray" : "#FFFFFF"}
                            fontSize={"16px"}
                            fontWeight={"400"}
                            borderRadius={"8px"}
                            pAll={"8px 16px"}
                            bg={"#000000"}
                            border={"none"}
                            type={"submit"}
                            label={"loginAndSignupModal.continue"}
                            disabled={formik.errors.email || !formik.values.email ? true : false}

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

                                                    } else {
                                                        handleLoginWithFacebook()

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
                                            console.log("hello")
                                            setProvider(`facebook`)
                                        }}
                                    />
                                    // <button onClick={renderProps.onClick}>This is my custom FB button</button>
                                )}
                            />,

                        </div>

                        <div className={clsx("d-flex justify-content-center align-items-center mt-lg-4 mt-2", styles.signUpBtnDiv)}>
                            <p className='mb-0'>
                                <Trans i18nKey={"loginAndSignupModal.dontHaveAnAccount"}>
                                    Don`t have an account?
                                </Trans>

                            </p>
                            <button type='button' onClick={goToSignupModal} >
                                <Trans i18nKey={"loginAndSignupModal.signUp"}>
                                    Sign up
                                </Trans>

                            </button>
                        </div>
                        {
                            loader ?
                                <LoderModule isAbsolute={true} />
                                : null
                        }

                    </form>
                )}
            </Formik>


        </div>
    )
}

export default LoginForm