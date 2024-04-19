import React, { useCallback, useState } from 'react';
import clsx from "clsx";
import styles from "./style/manageSubscription.module.scss";
import dynamic from 'next/dynamic';
import { Trans, useTranslation } from "next-i18next";
import { genderData } from '@/components/Module/Modal/loginFormData';
import { Col, Row } from 'react-bootstrap';
import { manageSubscriptionTable, manageSubscriptionTableHeading } from './manageSubscriptionData';
const ChangeDropdown = dynamic(() => import('@/components/Module/Dropdown/ChangeDropdown'))
const ManageSubscriptionTable = dynamic(() => import('@/components/Module/Table/ManageSubscriptionTable'))


const ManageSubscription = () => {
    const [changeValue, setChangeValue] = useState("")

    //handle change dropdown
    const handleChangeFun = (value) => {
        setChangeValue(value)
    }
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
                        <span className={clsx(styles.mediumFont)}>21 Jul, 2025</span>

                    </p>
                    <ChangeDropdown
                        defaultValue={"manageSubscription.change"}
                        data={genderData}
                        value={changeValue}
                        handleFun={handleChangeFun}
                    />
                </div>


            </div>
            <Row className='mx-0'>
                <Col xs={12} className='px-0 '>
                    <ManageSubscriptionTable
                        dataTable={manageSubscriptionTable}
                        dataTableHeading={manageSubscriptionTableHeading} />
                </Col>

            </Row>
        </div>
    )
}

export default ManageSubscription