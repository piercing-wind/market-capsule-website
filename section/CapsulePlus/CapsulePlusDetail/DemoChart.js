import React, { useEffect, useState } from 'react';
// import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';
import dynamic from 'next/dynamic';
import { getStocksBetween } from './StocksUtility';
IgrFinancialChartModule.register();
const IgrFinancialChart = dynamic(
    () => import('igniteui-react-charts').then(mod => mod.IgrFinancialChart),
    { ssr: false }
)

const SharePriceVolumeChart = () => {
    const [data, setData] = useState([]);

    const initData = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const dateEnd = new Date(year, month, 1);
        const dateStart = new Date(year - 1, month, 1);
        console.log("today", today)
        console.log("year", year)
        console.log("month", month)
        console.log("dateEnd", dateEnd)
        console.log("dateStart", dateStart)

        const stockData = getStocksBetween(dateStart, dateEnd);
        setData(stockData);
    };
    useEffect(() => {
        initData();
    }, []);
    return (
        <div>
            <div className="container sample" >
                <div className="container">
                    {
                        data?.length > 0 && (
                            <IgrFinancialChart
                                width="100%"
                                height="100%"
                                chartType="Candle"
                                zoomSliderType="Candle"
                                volumeType="Area"
                                overlayBrushes="rgba(5, 138, 0, 0.17)"
                                overlayOutlines="rgba(5, 138, 0, 0.4)"
                                overlayThickness={1}
                                dataSource={data} />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(SharePriceVolumeChart), {
    ssr: false
});