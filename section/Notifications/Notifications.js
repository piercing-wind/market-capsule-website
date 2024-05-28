import React, { useCallback, useEffect, useState } from 'react';
import clsx from "clsx";
import styles from "./style/notifications.module.scss";
import dynamic from 'next/dynamic';
import { Trans, useTranslation } from "next-i18next";
import { Col, Row } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getNotificationList, setNotificationCurrentPage, setNotificationList, setNotificationListEmpty, setNotificationTotalList } from '@/store/slices/notificationSlice';
import moment from 'moment';
import toast from 'react-hot-toast';
const LoadMoreBtn = dynamic(() => import("@/components/Module/Button/LoadMoreBtn"))

const Notifications = ({ notificationListServer, notificationTotalListServer, notificationError }) => {
    const { t } = useTranslation("common")
    const dispatch = useDispatch();
    const { notificationListClient, notificationLoading, notificationCurrentPage, notificationTotalList } = useSelector((state) => ({
        notificationLoading: state?.notificationSlice?.loader,
        notificationListClient: state?.notificationSlice?.notificationList,
        notificationCurrentPage: state?.notificationSlice?.notificationCurrentPage,
        notificationTotalList: state?.notificationSlice?.notificationTotalList,

    }), shallowEqual)
    // load more btn 
    const loadMoreFun = async () => {
        let params = {
            page: notificationCurrentPage,
            limit: 10
        }
        await dispatch(getNotificationList(params))
        dispatch(setNotificationCurrentPage(notificationCurrentPage + 1))

    }

    useEffect(() => {


        if (!notificationError) {
            dispatch(setNotificationListEmpty());
            dispatch(setNotificationList(notificationListServer));
            dispatch(setNotificationTotalList(notificationTotalListServer));
            dispatch(setNotificationCurrentPage(notificationCurrentPage + 1))
        } else if (notificationError) {
            toast.error("Something went wrong!")
            return
        }
    }, []);

    return (
        <div className={clsx(styles.leftSidebarMaindDiv)}>
            {/* heading section */}
            <div className={clsx("d-flex align-items-center gap-3 justify-content-between flex-wrap px-sm-4 px-3", styles.upperDiv)}>
                <h4 className='mb-0'>
                    <Trans i18nKey={"notifications.notifications"}>
                        Notifications
                    </Trans>
                </h4>
            </div>
            <Row className='mx-0'>
                {
                    notificationListClient?.map((el, index) => {
                        return (

                            <Col key={index} xs={12} className={clsx('px-sm-4 px-3  py-3', index === 0 && styles.blueBg)}>
                                <div className={clsx("d-flex align-items-center justify-content-between column-gap-sm-5 column-gap-3", styles.notifcationDiv)}>
                                    <div>
                                        <h6 className={clsx(index === 0 && styles.blueColor)}>{el?.title}</h6>
                                        <p className='mb-2'>{el?.message}</p>
                                        <span>
                                            {
                                                moment().isSame(moment(el?.createdAt), 'day')
                                                    ? 'TODAY'
                                                    : moment(el?.createdAt).format('DD, MMM YYYY')
                                            }
                                        </span>

                                    </div>
                                    <div className={clsx(index === 0 && styles.blueDot)}>
                                        <span></span>
                                    </div>
                                </div>

                            </Col>
                        )
                    })

                }
                <LoadMoreBtn
                    totalList={notificationTotalList}
                    loading={notificationLoading}
                    data={notificationListClient}
                    loadMoreFun={loadMoreFun} />

            </Row>
        </div>
    )
}

export default Notifications