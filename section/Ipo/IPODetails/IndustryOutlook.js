import React from 'react';
import clsx from "clsx";
import styles from "./style/industryOutlook.module.scss"
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Col, Row } from 'react-bootstrap';
const HeadingCom = dynamic(() => import("@/components/Module/BannerSection/HeadingCom"))
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const IndustryOutlook = ({ headingLabel, industryOutlookData = [] }) => {
    return (
        <div>
            <HeadingCom
                label={headingLabel}
            />
            <BlocksRenderer
                blocks={{
                    list: ({ children }) => <ul className={clsx(styles.list)}>{children}</ul>
                }}
                content={industryOutlookData}
            />


        </div>
    )
}

export default IndustryOutlook