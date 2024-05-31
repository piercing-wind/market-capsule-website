import React from 'react';
import clsx from "clsx";
import styles from "./style/keyHighlightsAndManagement.module.scss"
import dynamic from 'next/dynamic';
const HeadingCom = dynamic(() => import("@/components/Module/BannerSection/HeadingCom"))
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const KeyHighlightsAndManagementGuidance = ({ headingLabel, keyHightlightData = [] }) => {
    return (
        <div>
            <HeadingCom
                label={headingLabel}
            />
            {
                keyHightlightData?.length > 0 && (
                    <BlocksRenderer
                        blocks={{
                            list: ({ children }) => <ul className={clsx(styles.list)}>{children}</ul>
                        }}
                        content={keyHightlightData}
                    />

                )
            }
        </div>
    )
}

export default KeyHighlightsAndManagementGuidance