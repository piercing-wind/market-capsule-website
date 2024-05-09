import React from 'react';
import clsx from "clsx";
import styles from "./style/sharePriceAndVolumne.module.scss";
import dynamic from 'next/dynamic';
import NseLineChart from './NseLineChart';
import VloumeBarChart from './VolumeBarChart';
const HeadingCom = dynamic(() => import("@/components/Module/BannerSection/HeadingCom"))
const TradingViewWidget = dynamic(() => import("./TradingViewWidget"))

const SharePriceAndVolume = ({ headingLabel = "" }) => {
    return (
        <div >
            <HeadingCom
                label={headingLabel}
            />
            {/* <TradingViewWidget /> */}
            <NseLineChart />
            <VloumeBarChart />

        </div>

    )
}

export default SharePriceAndVolume