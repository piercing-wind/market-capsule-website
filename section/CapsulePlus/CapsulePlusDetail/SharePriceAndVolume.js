import React from 'react';
import clsx from "clsx";
import styles from "./style/sharePriceAndVolumne.module.scss";
import dynamic from 'next/dynamic';
import NseLineChart from './NseLineChart';
import VolumeBarChart from './VolumeBarChart';
const HeadingCom = dynamic(() => import("@/components/Module/BannerSection/HeadingCom"))
// const TradingViewWidget = dynamic(() => import("./TradingViewWidget"))

const SharePriceAndVolume = ({ headingLabel = "", prices = [] }) => {
    return (
        <div >
            <HeadingCom
                label={headingLabel}
            />
            {/* <TradingViewWidget /> */}
            <NseLineChart prices={prices} />
            <VolumeBarChart prices={prices} />

        </div>

    )
}

export default SharePriceAndVolume