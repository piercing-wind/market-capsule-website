import React, { useCallback, useState } from 'react';
import clsx from "clsx";
import styles from "./style/manageSubscription.module.scss";
import dynamic from 'next/dynamic';
import { Trans, useTranslation } from "next-i18next";
import { Col, Row } from 'react-bootstrap';
import { manageSubscriptionTableHeading } from './manageSubscriptionData';
import { shallowEqual, useSelector } from 'react-redux';
import moment from 'moment';
const ManageSubscriptionTable = dynamic(() => import('@/components/Module/Table/ManageSubscriptionTable'))


const ManageSubscription = () => {
    const { nextBillingDate } = useSelector((state) => ({
        nextBillingDate: state?.manageSubscriptionSlice?.getSubscriptionObj?.nextBillingDate,

    }), shallowEqual)


    return (
        <div className={clsx(styles.leftSidebarMaindDiv, "px-sm-4 px-3")}>
            {/* heading section */}
            <div className={clsx("d-flex align-items-center gap-3 justify-content-between flex-wrap", styles.upperDiv)}>
                <h4 className='mb-0'>
                    <Trans i18nKey={"manageSubscription.manageSubscription"}>
                        Manage Subscription
                    </Trans>
                </h4>

                <div className={clsx("d-flex align-items-center flex-wrap", styles.nextBillingDiv)}>
                    <p className={clsx("mb-0")}>
                        <span>
                            <Trans i18nKey={"manageSubscription.nextBillingOn"}>
                                Next billing on:
                            </Trans>
                        </span>
                        <span className={clsx(styles.mediumFont)}>{nextBillingDate ? moment(nextBillingDate).format('MMMM D, YYYY') : nextBillingDate}</span>

                    </p>

                </div>


            </div>
            <Row className='mx-0'>
                <Col xs={12} className='px-0 '>
                    <ManageSubscriptionTable
                        dataTableHeading={manageSubscriptionTableHeading} />
                </Col>

            </Row>
        </div>
    )
}

export default ManageSubscription