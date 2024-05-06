import React from 'react';
import clsx from "clsx";
import styles from "./style/capsuleView.module.scss"
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Col, Row } from 'react-bootstrap';
const HeadingCom = dynamic(() => import("@/components/Module/BannerSection/HeadingCom"))
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const CapsuleView = ({ headingLabel, capsuleViewData = [] }) => {
    return (
        <div className={clsx(styles.yelloBg)}>
            <HeadingCom
                label={headingLabel}
            />
            <BlocksRenderer
                blocks={{
                    list: ({ children }) => <ul className={clsx(styles.list)}>{children}</ul>
                }}
                content={capsuleViewData}
            />


        </div>
    )
}

export default CapsuleView