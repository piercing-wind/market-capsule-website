import React from 'react';
import clsx from "clsx";
import styles from "./style/industryOutlook.module.scss"
import dynamic from 'next/dynamic';
const HeadingCom = dynamic(() => import("@/components/Module/BannerSection/HeadingCom"))
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const IndustryOutlook = ({ headingLabel, industryOutlookData = [] }) => {
    return (
        <div>
            <HeadingCom
                label={headingLabel}
            />
            {
                industryOutlookData?.length > 0 && (
                    <BlocksRenderer
                        blocks={{
                            list: ({ children }) => <ul className={clsx(styles.list)}>{children}</ul>
                        }}
                        content={industryOutlookData}
                    />
                )
            }
        </div>
    )
}

export default IndustryOutlook