import React from 'react';
import clsx from "clsx";
import styles from "./style/bussinessSegment.module.scss"
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Col, Row } from 'react-bootstrap';
import ExclusiveViewCard from '@/components/Module/UpgradeCard/ExclusiveViewCard';
const HeadingCom = dynamic(() => import("@/components/Module/BannerSection/HeadingCom"))

const BussinessSegment = ({ headingLabel, bussinessSegmentData = [], capsuleplus }) => {
    return (
        <div className={clsx(styles.mainDiv)}>
            <HeadingCom
                label={headingLabel}
            />

            {
                bussinessSegmentData?.map((el, index) => {
                    return (
                        <Row key={index} className="mx-0 mb-3">
                            <Col md={4} lg={3} className='p-0'>
                                <div className='d-flex justify-content-md-start justify-content-center'  >
                                    <Image className={clsx("w-100", styles.imageWidth)} src={el?.image?.url} alt={el?.image?.alternativeText} width="278" height="146" />
                                </div>

                            </Col>
                            <Col md={8} lg={9} className='p-0 ps-md-3 pt-md-0 pt-3'>

                                <div className={clsx(styles.rightDiv, "d-flex text-md-start text-center flex-column align-items-md-start align-items-center justify-content-md-start justify-content-center")}>
                                    <h5>{el?.title}</h5>
                                    <p>{el?.description}</p>
                                </div>
                            </Col>
                        </Row>

                    )
                })
            }
            {
                capsuleplus && (
                    <ExclusiveViewCard />

                )
            }
        </div>
    )
}

export default BussinessSegment