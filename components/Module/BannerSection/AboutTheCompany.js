import React from 'react';
import clsx from 'clsx';
import styles from "./style/aboutTheCompany.module.scss"
import dynamic from 'next/dynamic';
import { Col, Row } from 'react-bootstrap';
const HeadingCom = dynamic(() => import("@/components/Module/BannerSection/HeadingCom"))
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
const AboutTheCompany = ({ aboutDescription = [], headingLabel = "" }) => {


    return (
        <div >
            <HeadingCom
                label={headingLabel}
            />
            {
                aboutDescription && aboutDescription?.length > 0 && (
                    <BlocksRenderer
                        blocks={{
                            paragraph: ({ children }) => <p className={clsx(styles.para)}>{children}</p>,
                            image: ({ image }) => (
                                <div className={clsx(styles.scrollContainer)}>
                                    <img
                                        src={image?.url}
                                        alt={image?.alternativeText || 'Company image'}
                                        className={clsx(styles.imgStyle)}
                                        width={image?.width}
                                        height={image?.height}
                                    />
                                    {image.caption && (
                                        <p className={clsx(styles.caption)}>{image?.caption}</p>
                                    )}
                                </div>
                            ),
                        }}
                        content={aboutDescription}
                    />

                )
            }

        </div>
    )
}

export default AboutTheCompany