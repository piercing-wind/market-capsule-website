import React, { useCallback, useState } from 'react';
import clsx from "clsx";
import styles from "./style/notifications.module.scss";
import dynamic from 'next/dynamic';
import { Trans, useTranslation } from "next-i18next";
import { Col, Row } from 'react-bootstrap';
import { notificationsData } from './notificationsData';
const LoadMoreBtn = dynamic(() => import("@/components/Module/Button/LoadMoreBtn"))


const Notifications = () => {
    const [itemPerPage, setItemPerPage] = useState(10);
    const { t } = useTranslation("common")
    //load more btn 
    const loadMoreFun = () => {
        console.log("load more fun")
        if (notificationsData?.length > itemPerPage) {

            setItemPerPage(itemPerPage + 3)
        }
    }

    // notificationsData
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
                    notificationsData?.slice(0, itemPerPage)?.map((el, index) => {
                        return (

                            <Col key={index} xs={12} className={clsx('px-sm-4 px-3  py-3', index === 0 && styles.blueBg)}>
                                <div className={clsx("d-flex align-items-center column-gap-sm-5 column-gap-3", styles.notifcationDiv)}>
                                    <div>
                                        <h6 className={clsx(index === 0 && styles.blueColor)}>{t(el?.heading)}</h6>
                                        <p className='mb-2'>{el?.para}</p>
                                        <span>{el?.date}</span>

                                    </div>
                                    <div className={clsx(index === 0 && styles.blueDot)}>
                                        <span></span>
                                    </div>
                                </div>

                            </Col>
                        )
                    })

                }

                {
                    notificationsData?.length > 10 && (
                        <LoadMoreBtn data={notificationsData} itemPerpage={itemPerPage} loadMoreFun={loadMoreFun} />
                    )
                }

            </Row>
        </div>
    )
}

export default Notifications