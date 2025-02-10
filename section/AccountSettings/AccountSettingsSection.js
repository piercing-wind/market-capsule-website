import React, { useCallback, useEffect, useState } from 'react';
import clsx from "clsx";
import styles from "./style/accountSettings.module.scss";
import PenCircle from '@/components/svg/PenCircle';
import { Col, Row } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { genderData } from '@/components/Module/Modal/loginFormData';
import { Formik } from 'formik';
const NameInput = dynamic(() => import('@/components/Module/Input/NameInput'))
const GenderDropdown = dynamic(() => import('@/components/Module/Dropdown/GenderDropdown'))
const DobDatePikar = dynamic(() => import('@/components/Module/DatePikar/DobDatePikar'))
const EmailInput = dynamic(() => import('@/components/Module/Input/EmailInput'))
const HomeBlueButton = dynamic(() => import('@/components/Module/Button/HomeBlueButton'))
const DefaultProfile = dynamic(() => import('@/components/Module/ProfileImage/DefaultProfile'))
import * as Yup from "yup";
import { useDropzone } from 'react-dropzone';
import CrossCircle from '@/components/svg/CrossCircle';
import { Trans, useTranslation } from "next-i18next";
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { getProfessionList } from '@/store/slices/authSlice';
import { postMethod, putMethod, updateMutipart } from '@/utils/apiServices';
import { apiEndPoints } from '@/utils/apiEndPoints';
import LoderModule from '@/components/Module/LoaderModule';
import moment from 'moment';
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("* This field is mandatory"),
    name: Yup.string().required("* This field is mandatory"),

});
const AccountSettingsSection = ({ userDetails }) => {
    const dispatch = useDispatch();
    const [editForm, setEditForm] = useState(false);
    const [loader, setLoader] = useState(false);
    const { professionData } = useSelector((state) => (
        {
            professionData: state?.authSlice?.professionDataObj?.professionData
        }
    ), shallowEqual)
    const [profile, setProfile] = useState(userDetails?.image);
    const onDrop = useCallback(async (acceptedFiles, fileRejections) => {
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
            setLoader(true);
            const formData = new FormData();
            formData.append('files', acceptedFiles[0]);
            updateMutipart(true)
            await postMethod("upload", formData).then((response) => {
                if (response?.error?.status && response?.error?.message) {
                    toast.error(response?.error?.message)
                    setLoader(false)
                } else {
                    if (response?.length) {
                        setProfile(response[0]?.url)
                        setLoader(false)
                    } else {
                        toast.error("Failed to Upload Image")
                        setLoader(false)
                    }

                }
            })

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
        profile: profile ? profile : "",
        name: userDetails?.fullName ? userDetails?.fullName : '',
        gender: userDetails?.gender ? userDetails?.gender : '',
        dob: userDetails?.dob ? new Date(userDetails?.dob) : new Date(),
        profession: userDetails?.profession ? userDetails?.profession : '',
        email: userDetails?.email ? userDetails?.email : '',

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
    const removeProfileImage = async () => {
        setProfile("")
        const submitData = ({
            image: '',

        })
        await putMethod(`${apiEndPoints?.updateUserDetail}`, submitData).then((response) => {
            if (response?.error?.status && response?.error?.message) {
                toast.error(response?.error?.message)
                setLoader(false)
            } else {
                if (response?.success) {
                    toast.success(response?.message)
                    window.location.reload();

                } else {
                    setLoader(false)
                }
            }
        })
    }

    //update profile function
    const updateProfileFun = async (values) => {
        const { name, gender, dob, profession, } = values;

        const submitData = ({
            fullName: name ? name : '',
            gender: gender ? gender : '',
            dob: dob ? moment(dob).format('YYYY-MM-DD') : '',
            profession: profession ? profession : '',
            image: profile ? profile : '',

        })
        await putMethod(`${apiEndPoints?.updateUserDetail}`, submitData).then((response) => {
            if (response?.error?.status && response?.error?.message) {
                toast.error(response?.error?.message)
                setLoader(false)
            } else {
                if (response?.success) {
                    toast.success(response?.message, {
                        duration: 3000,
                    })
                    setEditForm(false)
                    // window.location.reload();
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);

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
        <div className={clsx(styles.leftSidebarMaindDiv, "px-sm-4 px-3")}>
            {/* heading section */}
            <div className={clsx("d-flex align-items-center column-gap-3", styles.upperDiv)}>
                <h4 className='mb-0'>
                    <Trans i18nKey={"accountSettingsPage.accountSetting"}>
                        Account Settings
                    </Trans>
                </h4>
                <button onClick={handleEditForm} className='d-flex align-items-center column-gap-1'>
                    <span>
                        <Trans i18nKey={"accountSettingsPage.edit"}>
                            Edit
                        </Trans>
                    </span>
                    <PenCircle />
                </button>
            </div>
            <Formik
                initialValues={editProfileFormData}
                validationSchema={() => {
                    return validationSchema;
                }}
                enableReinitialize={true}
                onSubmit={updateProfileFun}
            >

                {formik => (
                    <form onSubmit={formik?.handleSubmit}>
                        <div className="d-flex align-items-start  column-gap-1">
                            <div className={clsx(styles.userImage)} {...(editForm ? getRootProps() : {})}>
                                {editForm && (
                                    <input
                                        type="file"
                                        multiple={false}
                                        {...getInputProps()}
                                    />
                                )}
                                <DefaultProfile firstCharHeight={"75px"} firstCharWidth={"75px"} userName={formik?.values?.name} src={profile ? profile : ""} width={75} height={75} />
                            </div>
                            {
                                profile && (
                                    <button type="button" style={{ cursor: editForm ? "pointer" : "not-allowed" }} className={clsx(styles.crossBtn)} onClick={() => {
                                        if (editForm) {
                                            removeProfileImage()
                                        }
                                    }}>
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
                                    data={professionData?.data}
                                    defaultValue={formik?.values?.profession ? formik?.values?.profession : "accountCreatedSuccessfullyModal.profession"}
                                    value={formik?.values?.profession}
                                    handleFun={handleProfessionFun}
                                    formik={formik}
                                    readOnly={!editForm ? true : false}
                                />
                            </Col>
                            <Col className='ps-lg-0 pe-lg-1  pb-1 px-sm-3 px-0' lg={12}>
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
                                    readOnly={true}
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
                        {
                            loader && (
                                <LoderModule />
                            )
                        }
                    </form>
                )}

            </Formik>

        </div>
    )
}

export default AccountSettingsSection