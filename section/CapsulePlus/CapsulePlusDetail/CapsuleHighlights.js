import React from 'react';
import clsx from 'clsx';
import styles from "./style/companyHighlights.module.scss"
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
const CapsuleHightlights = ({ aboutDescription = [], headingLabel = "" }) => {
    return (
        <div className={clsx("px-3", styles.hightLightDiv)}>

            <BlocksRenderer
                blocks={{
                    paragraph: ({ children }) => <p className={clsx(styles.para)}>{children}</p>,
                }}
                content={aboutDescription}
            />

        </div>
    )
}

export default CapsuleHightlights