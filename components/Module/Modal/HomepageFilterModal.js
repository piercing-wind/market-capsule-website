import React, { Children, useState } from 'react';
import clsx from "clsx";
import styles from "./style/homePageFilterModal.module.scss"
import CrossCircle from '@/components/svg/CrossCircle';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import IconPayNowButton from '../Button/IconPayNowButton';
import { Trans, useTranslation } from 'next-i18next';
// import { setShowFilterModalForm } from '@/store/slices/homePageSlice';
import { homePageFilterModalArr } from '@/section/Homepage/homePageData';
import { setShowFilterModalForm } from '@/store/slices/homePageSlice';
// import { setShowFilterModalForm } from '@/store/slices/homePageSlice';
const HomepageFilterModal = ({ filterActiveState, setFilterActiveState }) => {
    const { t } = useTranslation("common")
    const dispatch = useDispatch()
    const { showFilterModalForm } = useSelector((state) => (
        {
            showFilterModalForm: state?.homePageSlice?.showFilterModal?.showFilterModalForm,
        }
    ), shallowEqual)

    const handleFilterBasedOnType = (type) => {
        setFilterActiveState(type)
    }

    const handleSubmit = () => {
        console.log("handle submit fun")
    }


    return (
        <div className={clsx(styles.floatMainDiv)}>

            {
                showFilterModalForm ? (
                    <>
                        <div

                            className={clsx(styles.fGOverlay)}
                        />

                        <div>

                            <div className={clsx(styles.feedbackGForm)} id="f_form_open" >
                                <div className={clsx("getintouchPage box", styles.getintouchPageUpdate)}>
                                    <div
                                        onClick={() => {
                                            dispatch(setShowFilterModalForm(false))
                                        }}

                                        onTouchEnd={() => {
                                            dispatch(setShowFilterModalForm(false))
                                        }}

                                        className={clsx(styles.crossIcon)}>
                                        <CrossCircle />
                                    </div>
                                    <Row className={clsx("d-flex justify-content-center mx-0", styles.formRow)}>
                                        <Col className={clsx(styles.formCol)} >
                                            <h5>
                                                <Trans i18nKey={`homepage.filterBtnModal.selectCategory`}>
                                                    Select Category
                                                </Trans>
                                            </h5>
                                            <p>
                                                <Trans i18nKey={`homepage.filterBtnModal.selectAnyOne`}>
                                                    Select any one the category
                                                </Trans>
                                            </p>
                                            <div className={clsx("pt-3 mx-sm-3 mx-0 d-flex gap-1 flex-wrap ")}>
                                                {
                                                    homePageFilterModalArr?.map((el, index) => {
                                                        return (
                                                            <button key={index}
                                                                onClick={() => {
                                                                    handleFilterBasedOnType(el?.attributes?.slug)
                                                                }}
                                                                style={{
                                                                    color: el?.attributes?.slug === filterActiveState ? "white" : "black",
                                                                    background: el?.attributes?.slug === filterActiveState ? "black" : el?.attributes?.tag?.data?.attributes?.name
                                                                }}

                                                                className={clsx(styles.btn)}>{t(el?.attributes?.name)}</button>
                                                        )
                                                    })
                                                }

                                            </div>

                                            <div className={clsx('d-flex justify-content-center', styles.marginBtn)}>
                                                <IconPayNowButton
                                                    label={"homepage.filterBtnModal.submit"}
                                                    color={`#FFFFFF`}
                                                    fontSize={`16px`}
                                                    fontWeight={`400`}
                                                    borderRadius={`8px`}
                                                    pAll={`10px 20px`}
                                                    bg={`#000000`}
                                                    border={"none"}
                                                    type={"button"}
                                                    handleFun={handleSubmit}
                                                />

                                            </div>
                                        </Col>
                                    </Row>

                                </div>


                            </div>



                        </div>


                    </>
                ) : null
            }

        </div>

    )
}

export default HomepageFilterModal