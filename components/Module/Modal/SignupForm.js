import React, { useState } from 'react';
import clsx from "clsx"
import styles from "./style/loginForm.module.scss";
import signupStyles from "./style/signupCheckbox.module.scss"
import { continueFromSocial } from './loginFormData';
import dynamic from 'next/dynamic';
import { setAuthType } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Formik } from 'formik';
const LoginButton = dynamic(() => import('../Button/LoginButton'))
const EmailInput = dynamic(() => import('../Input/EmailInput'))
const GreenCheckbox = dynamic(() => import('../Checkbox/GreenCheckbox'))
import * as Yup from "yup";
import { Trans, useTranslation } from 'next-i18next';

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
    const [emailValue, setEmailValue] = useState("");
    const dispatch = useDispatch()

    //handle login with social media
    const handleLoginWithSocialMedia = () => {
        console.log("handle login with social media")
    }

    //go to login form 
    const goToLoginModal = () => {
        console.log("login")
        dispatch(setAuthType("login"))
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
                        dispatch(setAuthType("otp"))

                    }, 400);
                }}
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
                            <EmailInput
                                type={"email"}
                                placeholder={"loginAndSignupModal.emailAddress"}
                                value={formik?.values?.email}
                                name={"email"}
                                formik={formik}
                                touchedName={formik.touched.email}
                                errorName={formik.errors.email}
                            />
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
                                        <Link href={"#"} className={clsx(signupStyles.link)}>
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
                                        <Link href={"#"} className={clsx(signupStyles.link)}>
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
                                    <Trans i18nKey={"loginAndSignupModal.alreadyHaveAnAccount"}>
                                        Already have an account?
                                    </Trans>
                                    &nbsp;</p>
                                <button type='button' onClick={goToLoginModal}>
                                    <Trans i18nKey={"loginAndSignupModal.loginIn"}>
                                        Login In
                                    </Trans>
                                </button>
                            </div>

                        </form>
                    </>

                )}
            </Formik>

        </div>
    )
}

export default SignupForm