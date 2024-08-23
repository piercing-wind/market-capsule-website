import React, { use, useEffect, useState } from 'react';
import clsx from "clsx"
import styles from "./style/loginForm.module.scss"
import { genderData } from './loginFormData';
import dynamic from 'next/dynamic';
import { getProfessionList, setAuthType, setShowForm, setUpgradeNow } from '@/store/slices/authSlice';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Formik } from 'formik';
const LoginButton = dynamic(() => import('../Button/LoginButton'))
const NameInput = dynamic(() => import('../Input/NameInput'))
const GenderDropdown = dynamic(() => import('../Dropdown/GenderDropdown'))
const DobDatePikar = dynamic(() => import('../DatePikar/DobDatePikar'))
import moment from 'moment';
import * as Yup from "yup";
import { Trans, useTranslation } from 'next-i18next';
import { apiEndPoints } from '@/utils/apiEndPoints';
import { putMethod } from '@/utils/apiServices';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[A-Za-z ]+$/, "Name must only contain letters")
        .required("* This field is mandatory"),
});

const signupFormData = {
    name: "",
    gender: "",
    dob: "",
    profession: ""

}
const AccountCreatedSuccessForm = () => {
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    const { professionData, upgradeNow } = useSelector((state) => (
        {
            professionData: state?.authSlice?.professionDataObj?.professionData,
            upgradeNow: state?.authSlice?.upgradeNow,

        }
    ), shallowEqual)
    const { t } = useTranslation("common");
    const dispatch = useDispatch()

    // handle gender dropdown
    const handleGenderFun = (formik, value) => {
        formik.setValues({
            ...formik.values,
            gender: value,
        });

    }

    // handle professional dropdown
    const handleProfessionFun = (formik, value) => {
        formik.setValues({
            ...formik.values,
            profession: value,
        });

    }

    //handle dob dropdown
    const handleDobFun = (formik, value) => {
        formik.setValues({
            ...formik.values,
            dob: value,
        });
    }

    //create account
    const handleCreateAccountFun = async (values, { setSubmitting, resetForm }) => {
        const { name, gender, dob, profession } = values;
        if (!name) {
            toast.error("Name required!")
            return false
        }
        // setLoader(true)
        const submitData = ({
            fullName: name ? name : '',
            gender: gender ? gender : '',
            dob: dob ? moment(dob).format('YYYY-MM-DD') : '',
            profession: profession ? profession : '',

        })
        await putMethod(`${apiEndPoints?.updateUserDetail}`, submitData).then((response) => {
            if (response?.error?.status && response?.error?.message) {
                toast.error(response?.error?.message)
                setLoader(false)
            } else {
                if (response?.success) {
                    toast.success(response?.message)
                    dispatch(setShowForm(false))
                    dispatch(setAuthType("homePage"))
                    if (upgradeNow) {
                        // router.push("/subscription")
                        dispatch(setUpgradeNow(false))
                        // window.location.reload();
                        window.open(`/subscription`, "_self")

                    } else {
                        router.push("/")
                        window.location.reload();
                    }
                    // resetForm()

                } else {
                    setLoader(false)
                }
            }
        })
    }

    useEffect(() => {
        dispatch(getProfessionList())
    }, [])

    return (
        <div className={clsx(styles.loginFormDiv)}>
            <Formik
                initialValues={signupFormData}
                validationSchema={() => {
                    return validationSchema;
                }}
                enableReinitialize={true}
                onSubmit={handleCreateAccountFun}
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
                            value={formik?.values?.gender}
                            handleFun={handleGenderFun}
                            formik={formik}
                        />
                        <DobDatePikar
                            setStartDate={handleDobFun}
                            startDate={formik?.values.dob}
                            formik={formik}

                        />
                        <div style={{ marginBottom: "21px" }}>
                            <GenderDropdown
                                data={professionData?.data}
                                defaultValue={"accountCreatedSuccessfullyModal.profession"}
                                value={formik?.values?.profession}
                                handleFun={handleProfessionFun}
                                formik={formik}


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