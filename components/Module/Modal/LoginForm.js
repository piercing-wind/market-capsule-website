import React, { useState } from 'react';
import clsx from "clsx"
import styles from "./style/loginForm.module.scss"
import { EmailIcon } from '@/components/svg/EmailIcon';
import { continueFromSocial } from './loginFormData';
import dynamic from 'next/dynamic';
const LoginButton = dynamic(() => import('../Button/LoginButton'))
const EmailInput = dynamic(() => import('../Input/EmailInput'))


const LoginForm = () => {
    const [emailValue, setEmailValue] = useState("")

    //handle login with social media
    const handleLoginWithSocialMedia = () => {
        console.log("handle login with social media")
    }

    //handle onchange email fun 
    const handleEmailInputFun = (value) => {
        console.log("value", value)
        setEmailValue(value)
    }
    return (
        <div className={clsx(styles.loginFormDiv)}>
            <form className={clsx(styles.form)} >
                <h5>Login for Free</h5>
                <p className='mb-lg-4 mb-2'>Join or Login now to get more benefits</p>
                {/* email */}
                <EmailInput
                    type={"email"}
                    placeholder={"Email address"}
                    onChangeHandleFun={handleEmailInputFun}

                    value={emailValue}
                />
                <LoginButton
                    color={"#FFFFFF"}
                    fontSize={"16px"}
                    fontWeight={"400"}
                    borderRadius={"8px"}
                    pAll={"8px 16px"}
                    bg={"#000000"}
                    border={"none"}
                    type={"submit"}
                    label={"Continue"}
                />

                <p className={clsx("mt-lg-4 mt-2 mb-lg-3 mb-2 text-center", styles.or)}>OR</p>
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
                    <p className='mb-0'>Don`t have an account? </p>
                    <button> Sign up</button>
                </div>

            </form>

        </div>
    )
}

export default LoginForm