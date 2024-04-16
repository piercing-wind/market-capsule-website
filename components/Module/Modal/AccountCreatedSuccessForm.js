import React, { useState } from 'react';
import clsx from "clsx"
import styles from "./style/loginForm.module.scss"
import { continueFromSocial, genderData, professionData } from './loginFormData';
import dynamic from 'next/dynamic';
import { setAuthType, setShowForm } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
const LoginButton = dynamic(() => import('../Button/LoginButton'))
const NameInput = dynamic(() => import('../Input/NameInput'))
const GenderDropdown = dynamic(() => import('../Dropdown/GenderDropdown'))
const DobDatePikar = dynamic(() => import('../DatePikar/DobDatePikar'))

import * as Yup from "yup";
import { Trans, useTranslation } from 'next-i18next';

const validationSchema = Yup.object().shape({
    name: Yup.string().required("* This field is mandatory"),
});


const signupFormData = {
    name: "",
    gender: "",
    dateOfBirte: "",
    profession: ""

}
const AccountCreatedSuccessForm = () => {
    const { t } = useTranslation("common");
    const dispatch = useDispatch()



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
                        dispatch(setShowForm(false))
                    }, 400);
                }}
            >
                {formik => (

                    <form className={clsx(styles.form)} onSubmit={formik?.handleSubmit}>
                        <h5>
                            <Trans i18nKey={"accountCreatedSuccessfullyModal.accountCreatedSuccessfully"}>
                                Account Created Successfully!
                            </Trans>
                        </h5>
                        <p className='mb-lg-4 mb-2'>
                            <Trans i18nKey={"accountCreatedSuccessfullyModal.completeYourProfileNow"}>
                                Complete your profile now.
                            </Trans>


                        </p>
                        {/*full name */}
                        <NameInput
                            type={"text"}
                            placeholder={"accountCreatedSuccessfullyModal.whatIsYourName"}
                            value={formik?.values?.name}
                            name={"name"}
                            formik={formik}

                        />
                        <GenderDropdown
                            data={genderData}
                            defaultValue={"accountCreatedSuccessfullyModal.gender"}
                        />
                        <DobDatePikar />
                        <div style={{ marginBottom: "21px" }}>
                            <GenderDropdown
                                data={professionData}
                                defaultValue={"accountCreatedSuccessfullyModal.profession"}
                            />

                        </div>
                        <LoginButton
                            color={formik.errors.name || !formik.values.name ? "gray" : "#ffffff"}
                            fontSize={"16px"}
                            fontWeight={"400"}
                            borderRadius={"8px"}
                            pAll={"8px 16px"}
                            bg={"#000000"}
                            border={"none"}
                            type={"submit"}
                            label={"accountCreatedSuccessfullyModal.getStarted"}
                            disabled={formik.errors.name || !formik.values.name ? true : false}

                        />



                    </form>
                )}
            </Formik>


        </div>
    )
}

export default AccountCreatedSuccessForm