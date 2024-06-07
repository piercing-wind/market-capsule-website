import React from 'react';
import dynamic from 'next/dynamic';
import NseLineChart from './NseLineChart';
import VolumeBarChart from './VolumeBarChart';
// import SharePriceVolumeChart from './DemoChart';
const HeadingCom = dynamic(() => import("@/components/Module/BannerSection/HeadingCom"))
const SharePriceVolumeChart = dynamic(() => import("./DemoChart"))

const SharePriceAndVolume = ({ headingLabel = "", prices = [] }) => {
    return (
        <div >
            <HeadingCom
                label={headingLabel}
            />
            <NseLineChart prices={prices} />
            <VolumeBarChart prices={prices} />
        </div>
    )
}

export default SharePriceAndVolume