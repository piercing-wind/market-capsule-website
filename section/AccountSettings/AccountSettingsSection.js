import React, { useCallback, useState } from 'react';
import clsx from "clsx";
import styles from "./style/accountSettings.module.scss";
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import PenCircle from '@/components/svg/PenCircle';
import { Col, Row } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { genderData, professionData } from '@/components/Module/Modal/loginFormData';
import { Formik } from 'formik';
const NameInput = dynamic(() => import('@/components/Module/Input/NameInput'))
const GenderDropdown = dynamic(() => import('@/components/Module/Dropdown/GenderDropdown'))
const DobDatePikar = dynamic(() => import('@/components/Module/DatePikar/DobDatePikar'))
const EmailInput = dynamic(() => import('@/components/Module/Input/EmailInput'))
const HomeBlueButton = dynamic(() => import('@/components/Module/Button/HomeBlueButton'))
const DefaultProfile = dynamic(() => import('@/components/Module/ProfileImage/DefaultProfile'))
import * as Yup from "yup";
import { useDropzone } from 'react-dropzone';
import { RxCross2 } from "react-icons/rx";
import CrossCircle from '@/components/svg/CrossCircle';

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("* This field is mandatory"),
    name: Yup.string().required("* This field is mandatory"),

});
const AccountSettingsSection = () => {
    const [editForm, setEditForm] = useState(false);
    const [profileURL, setProfileUrl] = useState("/assests/user-profile/user-img.png")
    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        fileRejections?.forEach((file) => {
            file?.errors?.forEach((err) => {
                if (err?.code === "file-too-large") {
                    toast.error("File is larger than 20MB");
                }
                if (err?.code === "file-invalid-type") {
                    toast.error(err.message);
                }
            });
        });
        // Set the profile image URL
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setProfileUrl(URL.createObjectURL(file));
        }
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
            "image/png": [".png"],
        },
        maxSize: 1048576 * 20,

    });

    const editProfileFormData = {
        profile: "",
        name: "John Doe",
        gender: "Male",
        dob: new Date(),
        profession: "Professional stocker",
        email: "johndoe@gmail.com"

    }

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

    //handle edit form 
    const handleEditForm = () => {
        setEditForm(true)
    }

    //remove profile image
    const removeProfileImage = () => {
        setProfileUrl("")
    }

    return (
        <div className={clsx(styles.leftSidebarMaindDiv, "px-sm-4 px-3")}>
            {/* heading section */}
            <div className={clsx("d-flex align-items-center column-gap-3", styles.upperDiv)}>
                <h4 className='mb-0'>Account Settings</h4>
                <button onClick={handleEditForm} className='d-flex align-items-center column-gap-1'>
                    <span>Edit</span>
                    <PenCircle />
                </button>
            </div>
            <Formik
                initialValues={editProfileFormData}
                validationSchema={() => {
                    return validationSchema;
                }}
                enableReinitialize={true}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        console.log("values", values)
                        setEditForm(false)

                        setSubmitting(false);

                    }, 400);
                }}
            >

                {formik => (
                    <form onSubmit={formik?.handleSubmit}>
                        <div className="d-flex align-items-start  column-gap-1">
                            <div className={clsx(styles.userImage,)}
                                {...getRootProps()}>
                                <input
                                    type="file"
                                    multiple={false}
                                    {...getInputProps()}
                                />
                                <DefaultProfile firstCharHeight={"75px"} firstCharWidth={"75px"} userName={formik?.values?.name} src={profileURL} width={75} height={75} />

                            </div>

                            {
                                profileURL && (
                                    <button type="button" className={clsx(styles.crossBtn)} onClick={removeProfileImage}>
                                        <CrossCircle width={"20"} height={"20"} />
                                    </button>
                                )
                            }
                        </div>
                        <Row className='mx-0'>
                            <Col className='ps-lg-0 pe-lg-1 pb-1 px-sm-3 px-0' lg={6}>
                                <NameInput
                                    type={"text"}
                                    placeholder={"accountCreatedSuccessfullyModal.whatIsYourName"}
                                    value={formik?.values?.name}
                                    name={"name"}
                                    formik={formik}
                                    readOnly={!editForm ? true : false}

                                />

                            </Col>
                            <Col className='ps-lg-1 pe-lg-0 pb-1 px-sm-3 px-0' lg={6}>
                                <GenderDropdown
                                    data={genderData}
                                    defaultValue={"accountCreatedSuccessfullyModal.gender"}
                                    value={formik?.values?.gender}
                                    handleFun={handleGenderFun}
                                    formik={formik}
                                    readOnly={!editForm ? true : false}

                                />

                            </Col>
                            <Col className='ps-lg-0 pe-lg-1 pb-1 px-sm-3 px-0' lg={6}>
                                <DobDatePikar
                                    setStartDate={handleDobFun}
                                    startDate={formik?.values.dob}
                                    formik={formik}
                                    readOnly={!editForm ? true : false}

                                />

                            </Col>
                            <Col className='ps-lg-1 pe-lg-0 pb-1 px-sm-3 px-0' lg={6}>
                                <GenderDropdown
                                    data={professionData}
                                    defaultValue={formik?.values?.profession ? formik?.values?.profession : "accountCreatedSuccessfullyModal.profession"}
                                    value={formik?.values?.profession}
                                    handleFun={handleProfessionFun}
                                    formik={formik}
                                    readOnly={!editForm ? true : false}

                                />
                            </Col>
                            <Col className='ps-lg-0 pe-lg-1  pb-1 px-sm-3 px-0' lg={6}>

                                <hr className='mt-3 mb-4 ' />
                            </Col>

                            <Col className='ps-lg-0 pe-lg-1  pb-1 px-sm-3 px-0' lg={6}>
                                <EmailInput
                                    type={"email"}
                                    placeholder={"loginAndSignupModal.emailAddress"}
                                    value={formik?.values?.email}
                                    name={"email"}
                                    formik={formik}
                                    touchedName={formik.touched.email}
                                    errorName={formik.errors.email}
                                    readOnly={!editForm ? true : false}

                                />
                            </Col>

                            {
                                editForm && (
                                    <Col xs={12} className='px-0 d-flex justify-content-center'>
                                        <HomeBlueButton
                                            color={"#FFFFFF"}
                                            bg={"#3E63FF"}
                                            label={"accountSettingsPage.saveNow"}
                                            type={"submit"}
                                        />
                                    </Col>

                                )
                            }
                        </Row>
                    </form>
                )}

            </Formik>

        </div>
    )
}

export default AccountSettingsSection