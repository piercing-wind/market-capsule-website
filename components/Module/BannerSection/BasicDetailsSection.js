import React from 'react';
import clsx from 'clsx';
import styles from "./style/basicDetailsSection.module.scss"
import dynamic from 'next/dynamic';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
const HeadingCom = dynamic(() => import("@/components/Module/BannerSection/HeadingCom"))

const BasicDetailsSection = ({ basicDetailArr, headingLabel }) => {
    const { t } = useTranslation("common")

    return (
        <div>
            <HeadingCom
                label={headingLabel}
            />

            <Row className={clsx("mx-0")}>
                {
                    basicDetailArr?.map((el, index) => {
                        return (
                            <Col key={index} md={6} className={clsx(styles.basicDiv, index % 2 === 0 && styles.grayBorder, el?.bg ? styles.skyBlueBgColor : styles.white)}>
                                <div className={clsx("d-flex align-items-center column-gap-3 justify-content-between", styles.div)}>
                                    <h6 className='mb-0'>
                                        {t(el?.label)}

                                    </h6>
                                    <p className={clsx("mb-0 ")}>
                                        <span>
                                            {
                                                el?.value
                                            }
                                        </span>
                                        {
                                            el?.updated && (
                                                <span className={clsx(styles.updated)}>
                                                    Updated
                                                </span>

                                            )
                                        }
                                    </p>
                                </div>
                            </Col>

                        )
                    })
                }
            </Row>

        </div>
    )
}

export default BasicDetailsSection