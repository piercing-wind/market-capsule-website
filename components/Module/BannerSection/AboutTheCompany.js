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
            <BlocksRenderer
                blocks={{
                    paragraph: ({ children }) => <p className={clsx(styles.para)}>{children}</p>,
                }}
                content={aboutDescription}
            />

        </div>
    )
}

export default AboutTheCompany