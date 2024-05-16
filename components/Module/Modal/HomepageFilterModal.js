import React, { Children, useState } from 'react';
import clsx from "clsx";
import styles from "./style/homePageFilterModal.module.scss"
import CrossCircle from '@/components/svg/CrossCircle';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import IconPayNowButton from '../Button/IconPayNowButton';
import { Trans, useTranslation } from 'next-i18next';
import { getFeedList, setIndustryId, setShowFilterModalForm } from '@/store/slices/homePageSlice';

const HomepageFilterModal = ({ filterActiveState, setFilterActiveState }) => {
    const { t } = useTranslation("common")
    const dispatch = useDispatch()

    const { showFilterModalForm, industryList } = useSelector((state) => (
        {
            showFilterModalForm: state?.homePageSlice?.showFilterModal?.showFilterModalForm,
            industryList: state?.homePageSlice?.industriesObj?.industryList,

        }
    ), shallowEqual)

    const handleFilterBasedOnType = async (industryId) => {
        setFilterActiveState(industryId)
        dispatch(setIndustryId(industryId))
        dispatch(setFeedListEmpty())

        const feedListParams = {
            page: 1,
            limit: 5,
            industryId: industryId !== 0 ? industryId : ""
        }
        dispatch(setFeedCurrentPage(2))
        await dispatch(getFeedList(feedListParams))

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
                                            <div className={clsx("pt-3 mx-sm-3 mx-0 d-flex gap-1 flex-wrap justify-content-center ")}>
                                                {
                                                    industryList?.map((el, index) => {
                                                        return (
                                                            <button key={index}
                                                                onClick={() => {
                                                                    if (el?.id !== filterActiveState) {
                                                                        handleFilterBasedOnType(el?.id)
                                                                    }
                                                                }}
                                                                style={{
                                                                    color: el?.id === filterActiveState ? "white" : "black",
                                                                    background: el?.id === filterActiveState ? "black" : el?.attributes?.tag?.data?.attributes?.colorHash,
                                                                    cursor: el?.id === filterActiveState ? "not-allowed" : "pointer"

                                                                }}

                                                                className={clsx(styles.btn)}>{t(el?.attributes?.name)}</button>
                                                        )
                                                    })
                                                }

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