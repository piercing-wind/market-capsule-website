import React from 'react';
import clsx from "clsx";
import styles from "./style/capsuleView.module.scss"
import dynamic from 'next/dynamic';
const HeadingCom = dynamic(() => import("@/components/Module/BannerSection/HeadingCom"))
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const CapsuleView = ({ headingLabel, capsuleViewData = [] }) => {
    return (
        <div className={clsx(styles.yelloBg)}>
            <HeadingCom
                label={headingLabel}
                capsuleViewHeadingColor={true}
            />
            {
                capsuleViewData?.length > 0 && (
                    <BlocksRenderer
                        blocks={{
                            list: ({ children }) => <ul className={clsx(styles.list)}>{children}</ul>
                        }}
                        content={capsuleViewData}
                    />
                )
            }
        </div>
    )
}

export default CapsuleView