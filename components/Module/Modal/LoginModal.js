import React, { Children } from 'react';
import clsx from "clsx";
import styles from "./style/loginModal.module.scss"
import CrossCircle from '@/components/svg/CrossCircle';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setShowForm } from '@/store/slices/authSlice';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';

const LoginModal = ({ children }) => {
    const dispatch = useDispatch()
    const { showForm, } = useSelector((state) => (
        {
            showForm: state?.authSlice?.loginModal?.showForm,
        }
    ), shallowEqual)


    return (
        <div className={clsx(styles.floatMainDiv)}>

            {
                showForm ? (
                    <>
                        <div

                            className={clsx(styles.fGOverlay)}
                        />

                        <div>

                            <div className={clsx(styles.feedbackGForm)} id="f_form_open" >
                                <div className={clsx("getintouchPage box", styles.getintouchPageUpdate)}>
                                    <div
                                        onClick={() => {
                                            dispatch(setShowForm(false))
                                        }}

                                        onTouchEnd={() => {
                                            dispatch(setShowForm(false))
                                        }}

                                        className={clsx(styles.crossIcon)}>
                                        <CrossCircle />
                                    </div>
                                    <Row className={clsx("d-flex justify-content-center mx-0", styles.formRow)}>
                                        <Col md={7} className={clsx(styles.formCol,)} >
                                            {children}
                                        </Col>

                                        <Col md={5} className={clsx("px-0 d-md-block d-none")} >
                                            <div className={clsx(styles.sideBanner, 'w-100 h-100')}>
                                                <Image
                                                    src="/assests/auth-flow/capsule-logo.svg" alt="right-form-banner" width="192" height="40" />
                                                <p className={clsx(styles.para)}>
                                                    Discover premium capsule+ insights for expert stock guidance, enhancing your decision-making prowess.
                                                </p>
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

export default LoginModal