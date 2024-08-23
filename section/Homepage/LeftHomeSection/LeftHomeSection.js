import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap';
import styles from "../style/leftHomeSection.module.scss"
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { CaretDownRed } from '@/components/svg/CaretDownRed';
const FilterButton = dynamic(() => import('@/components/Module/Button/FilterButton'))
const TopGainersChart = dynamic(() => import('./TopGainersChart'))
const TopLosersChart = dynamic(() => import('./TopLosersChart'))
const LineChart = dynamic(() => import('./LineChart'))
const DateBarChart = dynamic(() => import('./DateBarChart'))
import { Trans, useTranslation } from 'next-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getSansexAndNiftyData, getTopGainerList, getTopLosersList, setSensexAndNifty, setTopGainerList, setTopGainerTotalList, setTopLosersList, setTopLosersTotalList } from '@/store/slices/homePageSlice';
import { getUpdatedDate } from '@/utils/constants';

/**
 * LeftHomeSection component displays the left section of the homepage.
 *
 * @component
 * @param {Object} topGainerObj - The top gainer object.
 * @param {Object} topLosersObj - The top losers object.
 * @returns {JSX.Element} The JSX element representing the LeftHomeSection component.
 */
const LeftHomeSection = ({ topGainerObj, topLosersObj, sensexAndNiftyObj }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch()
  const [bse, setBse] = useState("bse")
  const [sensex, setSensex] = useState("sensex")
  const [lastUpdatedOn, setLastUpdatedOn] = useState("")
  const { sensexAndNiftyData } = useSelector((state) => ({
    sensexAndNiftyData: state?.homePageSlice?.sensexAndNiftyObj?.sensexAndNiftyData,
  }), shallowEqual)

  //topgainers and losers filter btn fun 
  const bseAndNseButtonFun = async (type) => {
    const params = {
      filter: type === "bse" ? "BSE" : "NSE",
      page: 1,
      limit: 10,
      sort: `createdAt:desc`,
      populate: `name`

    }
    if (type === "bse") {
      if (bse !== type) {
        await dispatch(getTopGainerList(params))
        await dispatch(getTopLosersList(params))
      }
      setBse("bse")

    } else {
      if (bse !== type) {
        await dispatch(getTopGainerList(params))
        await dispatch(getTopLosersList(params))
      }
      setBse("nse")
    }
  }

  //sensex and nifty filter btn fun 
  const sensexAndNiftyFun = async (type) => {
    const params = {
      indexType: type === "sensex" ? `Sensex` : "Nifty"
    }
    if (type === "sensex") {
      if (sensex !== type) {
        await dispatch(getSansexAndNiftyData(params))
      }
      setSensex("sensex")
    } else {
      if (sensex !== type) {
        await dispatch(getSansexAndNiftyData(params))
      }
      setSensex("nifty")
    }
  }

  useEffect(() => {
    if (topGainerObj?.topGainerList?.length > 0) {
      dispatch(setTopGainerList(topGainerObj?.topGainerList))
      dispatch(setTopGainerTotalList(topGainerObj?.topGainerTotalList))
    }
    if (topLosersObj?.topLosersList?.length > 0) {
      dispatch(setTopLosersList(topLosersObj?.topLosersList))
      dispatch(setTopLosersTotalList(topLosersObj?.topLosersTotalList))
    }

    if (sensexAndNiftyObj?.sensexAndNiftyData?.indexes?.length > 0) {
      dispatch(setSensexAndNifty(sensexAndNiftyObj?.sensexAndNiftyData))
    }

    if (topLosersObj?.topLosersList?.length > 0) {
      let data = [...topLosersObj?.topLosersList]?.sort((a, b) => new Date(b?.attributes?.updatedAt) - new Date(a?.attributes?.updatedAt));
      // Get the updatedAt value of the first element (the latest date)
      const latestUpdateDate = data[0]?.attributes?.updatedAt;
      setLastUpdatedOn(latestUpdateDate);
    }
  }, [dispatch]);

  console.log("sensexAndNiftyData", sensexAndNiftyData)
  return (
    <Col lg={3} className=' px-sm-2 px-0 order-lg-0 order-1'>
      <div className='positionSticky'>
        {/* gainer and loser div */}
        <div className={clsx("left2 px-sm-2 px-3 pb-3", styles.trandingDiv)}>
          {/* filter button div */}
          <div className='me-1 py-3 d-flex column-gap-1 borderBottomGray'>
            <FilterButton
              color={sensex === "sensex" ? "#FFFFFF" : "#606F7B"}
              bg={sensex === "sensex" ? "#000000" : "#DFE2E4"}
              handlerFun={sensexAndNiftyFun}
              label={t("homepage.leftSection.sensex")}
              type={"sensex"}
              disable={sensex === "sensex" ? true : false}
            />
            <FilterButton
              color={sensex === "nifty" ? "#FFFFFF" : "#606F7B"}
              bg={sensex === "nifty" ? "#000000" : "#DFE2E4"}
              handlerFun={sensexAndNiftyFun}
              label={t("homepage.leftSection.nifty")}
              type={"nifty"}
              disable={sensex === "nifty" ? true : false}
            />
          </div>
          <div className={clsx("d-flex column-gap-2 mt-2", styles.numberDiv)}>
            <p className='mb-0 '>{sensexAndNiftyData?.currentPrice}</p>
            {
              sensexAndNiftyData?.changeInprice < 0 ? (
                <p className={clsx(" d-flex align-items-center column-gap-1  mb-0", styles.redColor)}>{sensexAndNiftyData?.changeInprice}{"  "}<CaretDownRed /></p>

              ) : (
                <p className={clsx("d-flex align-items-center column-gap-1  mb-0", styles.greenColor)}>{"+"}{sensexAndNiftyData?.changeInprice}{"  "}<CaretDownRed transform={"true"} fill={"green"} /></p>
              )
            }
          </div>
          <LineChart />
          {/* <DateBarChart /> */}

          {/* refresh button */}
          <div className={clsx("mt-3 d-flex justify-content-between align-items-center", styles.refreshDiv)}>
            <p className='mb-0 '>
              <span>{t("homepage.leftSection.lastUpdatedOn")}{" "}</span>
              <span className={clsx(styles.semiboldSpan)}>{getUpdatedDate(sensexAndNiftyData?.lastUpdated)}</span>
            </p>
          </div>
        </div>

        <div className={clsx("left2 px-sm-2 px-3 pb-3", styles.trandingDiv)}>
          {/* filter button div */}
          <div className={clsx('me-1 py-3 d-flex column-gap-1 borderBottomGray', styles.fii)}>
            <p>FII Cash</p>
          </div>
          <div className={clsx("d-flex column-gap-2 mt-2", styles.numberDiv)}>
            {/* <p className='mb-0 '>{sensexAndNiftyData?.currentFIICash}</p> */}
            {
              sensexAndNiftyData?.currentFIICash < 0 ? (
                <p className={clsx(" d-flex align-items-center column-gap-1  mb-0", styles.redColor)}>{sensexAndNiftyData?.currentFIICash}{" Cr  "}<CaretDownRed /></p>

              ) : (
                <p className={clsx("d-flex align-items-center column-gap-1  mb-0", styles.greenColor)}>{sensexAndNiftyData?.currentFIICash}{" Cr  "}<CaretDownRed transform={"true"} fill={"green"} /></p>
              )
            }
          </div>
          <DateBarChart />

          {/* refresh button */}
          <div className={clsx("mt-3 d-flex justify-content-between align-items-center", styles.refreshDiv)}>
            <p className='mb-0 '>
              <span>{t("homepage.leftSection.lastUpdatedOn")}{" "}</span>
              <span className={clsx(styles.semiboldSpan)}>{getUpdatedDate(sensexAndNiftyData?.lastUpdated)}</span>
            </p>
          </div>
        </div>
        {/* gainer and loser div */}
        <div className={clsx("left2 px-sm-2 px-3 pb-3", styles.trandingDiv)}>
          {/* filter button div */}
          <div className='me-1 py-3 d-flex column-gap-1 borderBottomGray'>
            <FilterButton
              color={bse === "bse" ? "#FFFFFF" : "#606F7B"}
              bg={bse === "bse" ? "#000000" : "#DFE2E4"}
              handlerFun={bseAndNseButtonFun}
              label={t("homepage.leftSection.bse")}
              type={"bse"}
              disable={bse === "bse" ? true : false}
            />
            <FilterButton
              color={bse === "nse" ? "#FFFFFF" : "#606F7B"}
              bg={bse === "nse" ? "#000000" : "#DFE2E4"}
              handlerFun={bseAndNseButtonFun}
              label={t("homepage.leftSection.nse")}
              type={"nse"}
              disable={bse === "nse" ? true : false}
            />
          </div>
          <TopGainersChart />
          <TopLosersChart />
          {/* refresh button */}
          <div className={clsx("mt-3 d-flex justify-content-between align-items-center", styles.refreshDiv)}>
            <p className='mb-0'>
              <span>{t("homepage.leftSection.lastUpdatedOn")}{" "}</span>
              <span className={clsx(styles.semiboldSpan)}>{getUpdatedDate(lastUpdatedOn)}</span>
            </p>
          </div>
        </div>
      </div>
    </Col>
  )
}

export default LeftHomeSection