import React, { useState } from 'react';
import clsx from "clsx"
import styles from "./style/loginForm.module.scss"
import { EmailIcon } from '@/components/svg/EmailIcon';
import { continueFromSocial } from './loginFormData';
import dynamic from 'next/dynamic';
import { setAuthType } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
const LoginButton = dynamic(() => import('../Button/LoginButton'))
const EmailInput = dynamic(() => import('../Input/EmailInput'))
import * as Yup from "yup";
import { Trans, useTranslation } from 'next-i18next';


const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("* This field is mandatory"),
});

const signupFormData = {
    email: "",

}
const LoginForm = () => {
    const { t } = useTranslation("common");

    const [emailValue, setEmailValue] = useState("");
    const dispatch = useDispatch()

    //handle login with social media
    const handleLoginWithSocialMedia = () => {
        console.log("handle login with social media")
    }

    //handle onchange email fun 
    const handleEmailInputFun = (value) => {
        console.log("value", value)
        setEmailValue(value)
    }

    //signup form btn 
    const goToSignupModal = () => {
        console.log("signup")
        dispatch(setAuthType("signup"))
    }
    return (
        <div className={clsx(styles.loginFormDiv)}>
            <Formik
                initialValues={signupFormData}
                validationSchema={() => {
                    return validationSchema;
                }}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        console.log("values", values)
                        setSubmitting(false);

                    }, 400);
                }}
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
                                                handleFun={handleLoginWithSocialMedia}
                                                socialType={el?.socialType}
                                            />
                                        )
                                    })
                                ) : null

                            }

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

                    </form>
                )}
            </Formik>


        </div>
    )
}

export default LoginForm