import { useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Suspense, use, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import clsx from "clsx";
import styles from "../../../section/CapsulePlus/CapsulePlusDetail/style/capsulePlusDetail.module.scss"
import dynamic from "next/dynamic";
import { commaSeprater } from "@/utils/constants";
import { companyDetailHeading } from "@/section/CapsulePlus/CapsulePlusDetail/capsulePlusDetailData";
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
import { getCapsuleCompanyDetailData, getOperationDetailQuetarly, getOperationDetailYearly, getPriceAndVolume, getSharePriceAndVolume } from "@/store/slices/capsuleDetailSlice";
import { getDisclaimerData } from "@/store/slices/screenerSlugDetailSlice";
import { getSubscriptionBtnData } from "@/store/slices/subscriptionSlice";
import { useDispatch } from "react-redux";
import BussinessSegment from "@/section/Ipo/IPODetails/BussinessSegment";
import KeyHighlightsAndManagementGuidance from "@/section/Ipo/IPODetails/KeyHighlightsAndManagementGuidance";
import IndustryOutlook from "@/section/Ipo/IPODetails/IndustryOutlook";
import HeadingCom from "@/components/Module/BannerSection/HeadingCom";
import CapsuleView from "@/section/Ipo/IPODetails/CapsuleView";
const LoderModule = dynamic(() => import("@/components/Module/LoaderModule"))
const OneIdBreadcrumb = dynamic(() => import("@/components/Module/Breadcrumb/OneIdBreadcrumb"))
const ScreenerSlugBanner = dynamic(() => import("@/components/Module/BannerSection/ScreenerSlugBanner"))
const AboutTheCompany = dynamic(() => import("@/components/Module/BannerSection/AboutTheCompany"))
const BasicDetailsSection = dynamic(() => import("@/components/Module/BannerSection/BasicDetailsSection"))
const FinacialHighlightTable = dynamic(() => import("@/section/Ipo/IPODetails/FinacialHighlightTable"))
const DisclamerCard = dynamic(() => import("@/components/Module/BannerSection/DisclamerCard"))
const ExclusiveViewCard = dynamic(() => import("@/components/Module/UpgradeCard/ExclusiveViewCard"))
const SharePriceAndVolume = dynamic(() => import("@/section/CapsulePlus/CapsulePlusDetail/SharePriceAndVolume"))
const CompanyTypeDetail = dynamic(() => import("@/section/CapsulePlus/CapsulePlusDetail/CompanyTypeDetails"))
const CapsuleHightlights = dynamic(() => import("@/section/CapsulePlus/CapsulePlusDetail/CapsuleHighlights"))
const VolumeTable = dynamic(() => import("@/section/CapsulePlus/CapsulePlusDetail/VolumeTable"))

export default function IpoDetails(props) {
    const { t } = useTranslation("common");
    const dispatch = useDispatch();
    const { getCapsuleCompanyDetailObj, getDisclaimerDataObj, getOperationDetailQuetarlyObj, getOperationDetailYearlyObj, getSharePriceAndVolumeObj, getPriceAndVolumeObj, getSubscriptionBtnObj } = props;
    const { capsulePlus } = getCapsuleCompanyDetailObj;
    const { rocePercent = null, marketCap = null, peRatio = null, roicPercent = null, roePercent = null, currentPrice = null, deRatio = null, cwip = null, cashConversionCycle = null, pegRatio = null, prevClosePrice = null, sector = null, ttpmPE = null, sectoralPERange = null, peRemark = null, BSE = null } = getCapsuleCompanyDetailObj?.capsuleCompanyDetailData?.company_share_detail || {}
    const {
        capsuleView, aboutTheCompany, business_segments, keyHighlights, share_holdings, financial_highlights,
        businessOverview, financialReport, shareCapitalAndEmployees,
        companyTypeDetails, capsuleHighlights, name, logo, industry, websiteUrl } = getCapsuleCompanyDetailObj?.capsuleCompanyDetailData || {};
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";

    // basic detailsobj
    const basicDetailArr = [
        {
            id: 1,
            label: "capsuleDetailPage.prevClose",
            value: `${prevClosePrice ? `₹${commaSeprater(prevClosePrice)} Cr.` : "N/A"}`,
            bg: true
        },
        {
            id: 2,
            label: "capsuleDetailPage.sector",
            value: sector ? sector : "N/A",
            bg: true
        },
        {
            id: 3,
            label: "capsuleDetailPage.marketCap",
            value: `${marketCap ? `₹${marketCap} Cr.` : "N/A"}`,
            bg: false
        },
        {
            id: 4,
            label: "capsuleDetailPage.ttmPe",
            value: `${ttpmPE ? `${ttpmPE}x` : "N/A"}`,
            bg: false,
        },
        {
            id: 5,
            label: "capsuleDetailPage.sectoralPeRange",
            value: `${sectoralPERange ? sectoralPERange : "N/A"}`,
            bg: true,
            updated: false,
        },
        {
            id: 6,
            label: "capsuleDetailPage.peRemark",
            value: `${peRemark ? commaSeprater(peRemark) : "N/A"}`,
            bg: true
        },
        {
            id: 7,
            label: "capsuleDetailPage.bse",
            value: `${BSE ? BSE : "N/A"}`,
            bg: false
        }

    ]

    //create custom structure for month table
    const monthGroupedData = getOperationDetailQuetarlyObj?.quetarlyData?.reduce((acc, item) => {
        if (!acc[item.title]) {
            acc[item.title] = [];
        }
        acc[item.title].push(item);
        return acc;
    }, {});
    const uniqueMonths = getOperationDetailQuetarlyObj?.quetarlyData?.reduce((unique, item) => {
        if (unique.findIndex(x => x.month === item.month && x.year === item.year) === -1) {
            unique.push(item);
        }
        return unique;
    }, []);

    //create custom structure for year  table
    const yearsData = getOperationDetailYearlyObj?.yearlyData?.reduce((acc, item) => {
        if (!acc[item.title]) {
            acc[item.title] = [];
        }
        acc[item.title].push(item);
        return acc;
    }, {});
    const uniqueYears = getOperationDetailYearlyObj?.yearlyData?.reduce((unique, item) => {
        if (unique.findIndex(x => x.month === item.month && x.year === item.year) === -1) {
            unique.push(item);
        }
        return unique;
    }, []);

    // key metrics
    const basicDetailArr2 = [
        {
            id: 1,
            label: "ipoDetailPage.marketCap",
            value: `${marketCap ? `₹${commaSeprater(marketCap)} Cr.` : "N/A"}`,
            bg: true
        },
        {
            id: 2,
            label: "ipoDetailPage.currentPrice",
            value: `${currentPrice ? `₹${commaSeprater(currentPrice)}` : "N/A"}`,
            bg: true
        },
        {
            id: 3,
            label: "ipoDetailPage.peRatio",
            value: `${peRatio || "N/A"}`,
            bg: false
        },
        {
            id: 4,
            label: "ipoDetailPage.deRatio",
            value: `${deRatio || "N/A"}`,
            bg: false,
        },
        {
            id: 5,
            label: "ipoDetailPage.roce",
            value: `${rocePercent ? `${rocePercent}%` : "N/A"}`,
            bg: true,
            updated: false,
        },
        {
            id: 6,
            label: "ipoDetailPage.cwip",
            value: `${cwip ? `₹${commaSeprater(cwip)} Cr.` : "N/A"}`,
            bg: true
        },
        {
            id: 7,
            label: "ipoDetailPage.roic",
            value: `${roicPercent ? `${roicPercent}%` : "N/A"}`,
            bg: false
        },
        {
            id: 8,
            label: "ipoDetailPage.cashConversionCycle",
            value: `${cashConversionCycle ? `${cashConversionCycle} day` : "N/A"}`,
            bg: false
        },
        {
            id: 9,
            label: "ipoDetailPage.roe",
            value: `${roePercent ? `${roePercent}%` : "N/A"}`,
            bg: true
        },
        {
            id: 10,
            label: "ipoDetailPage.pegRatio",
            value: `${pegRatio || "N/A"}`,
            bg: true
        }
    ]

    //create custom structure for financial highlights table
    const finacialHightlightGroupedData = financial_highlights.reduce((acc, item) => {
        if (!acc[item.title]) {
            acc[item.title] = [];
        }
        acc[item.title].push(item);
        return acc;
    }, {});
    const uniqueYears2 = financial_highlights?.reduce((unique, item) => {
        if (unique.findIndex(x => x.year === item.year) === -1) {
            let obj = {
                month: item?.month ? item?.month : "",
                year: item?.year
            }
            unique.push(obj);
        }
        return unique;
    }, []);

    //create custom structure for share holding  table
    const shareHoldingData = share_holdings.reduce((acc, item) => {
        if (!acc[item.title]) {
            acc[item.title] = [];
        }
        acc[item.title].push(item);
        return acc;
    }, {});
    const shareHoldingUniqueYears = share_holdings?.reduce((unique, item) => {
        if (unique.findIndex(x => x.year === item.year) === -1) {
            let obj = {
                month: item?.month ? item?.month : "",
                year: item?.year
            }
            unique.push(obj);
        }
        return unique;
    }, []);

    return (
        <>
            <Suspense fallback={<LoderModule />}>
                <Container className={clsx(styles.breadPading, "mt-4 containerPadding",)}>
                    <OneIdBreadcrumb
                        linkSlug={`/capsule-plus`}
                        linkLable={t(`capsuleDetailPage.capsulePlus`)}
                        idLable={name}
                    />
                </Container>
                <Container className={clsx(styles.containerPadding)}>
                    <Row className={clsx("mx-0", styles.row)}>
                        <Col xs={12} className={clsx("px-0")} >
                            <ScreenerSlugBanner
                                banner="capsulePlus"
                                companyName={name}
                                sector={industry?.name}
                                url={websiteUrl}
                                companyLogo={logo?.url || `/assests/capsule-plus/company-logo.png`}
                                alt={logo?.alternativeText || "company logo"}
                            />
                        </Col>

                        <Col xs={12} className={clsx(styles.paddingDetailsAbout, "mt-5")} >
                            <AboutTheCompany
                                aboutDescription={aboutTheCompany}
                                headingLabel={`screenerSlugPage.aboutTheCompany`}
                            />
                        </Col>


                        <Col xs={12} className={clsx(styles.paddingDetails)} >
                            <AboutTheCompany
                                aboutDescription={businessOverview}
                                headingLabel={`capsuleDetailPage.businessOverview`}
                            />
                            {/* <div className={clsx(styles.mainDiv)}>
                                {
                                    capsulePlus && (
                                        <ExclusiveViewCard
                                            line={false}
                                            getSubscriptionBtnObj={getSubscriptionBtnObj}

                                        />
                                    )
                                }
                            </div> */}
                        </Col>

            {/* Temporary remove exclusive */}
                        {
                            // !capsulePlus && (
                                <>
                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                                        <AboutTheCompany
                                            aboutDescription={financialReport}
                                            headingLabel={`capsuleDetailPage.financialReport`}
                                        />
                                    </Col>
                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                                        <AboutTheCompany
                                            aboutDescription={shareCapitalAndEmployees}
                                            headingLabel={`capsuleDetailPage.shareCapitalAndNumberOfEmployess`}
                                        />
                                    </Col>
                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                                        <SharePriceAndVolume
                                            headingLabel={`capsuleDetailPage.sharePriceAndVolume`}
                                            prices={getSharePriceAndVolumeObj?.sharePriceAndVolume || []}
                                        />
                                    </Col>
                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout, "pt-3")} >
                                        <VolumeTable
                                            dataTable={getPriceAndVolumeObj?.priceAndVolumeData || []}
                                            currentDate={props?.currentDate}
                                        />
                                    </Col>
                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout, "pt-3")} >
                                        <CapsuleHightlights
                                            aboutDescription={capsuleHighlights}
                                        />
                                    </Col>
                                    <Col xs={12} className={clsx(styles.paddingDetails)} >
                                        <BasicDetailsSection
                                            basicDetailArr={basicDetailArr}
                                            headingLabel={`ipoDetailPage.keyMetrics`}
                                            heading={false}
                                        />
                                    </Col>
                                    <Col lg={12} className={clsx(styles.shareHoldingPadding)} style={{ paddingBottom: "60px" }}>
                                        <CompanyTypeDetail
                                            dataTable={companyTypeDetails}
                                            dataTableHeading={companyDetailHeading}
                                        />
                                    </Col>
                                    <Col lg={12} className={clsx(styles.shareHoldingPadding, "pb-3")} >
                                        <FinacialHighlightTable
                                            uniqueYears={uniqueMonths}
                                            finacialHightlightGroupedData={monthGroupedData}
                                            paricular={`capsuleDetailPage.inINRCR`}
                                        />
                                    </Col>
                                    <Col lg={12} className={clsx(styles.shareHoldingPadding)} >
                                        <FinacialHighlightTable
                                            uniqueYears={uniqueYears}
                                            finacialHightlightGroupedData={yearsData}
                                            paricular={`capsuleDetailPage.inINRCR`}
                                        />
                                    </Col>

                                    {/* new section */}
                                    <Col xs={12} className={clsx(styles.paddingDetails)} >
                                        <BasicDetailsSection
                                            basicDetailArr={basicDetailArr2}
                                            headingLabel={`ipoDetailPage.keyMetrics`}
                                        />
                                    </Col>



                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                                        <BussinessSegment
                                            headingLabel={`ipoDetailPage.bussinessSegment`}
                                            bussinessSegmentData={business_segments}
        //removed  exclusive from here      // capsuleplus={capsulePlus}  // Date : 1 feb 2025
                                            getSubscriptionBtnObj={getSubscriptionBtnObj}
                                        />
                                    </Col>

                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                                        <KeyHighlightsAndManagementGuidance
                                            headingLabel={`ipoDetailPage.keyHighlightsAndManagement`}
                                            keyHightlightData={keyHighlights}
                                        />
                                    </Col>

                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                                        <IndustryOutlook
                                            headingLabel={`ipoDetailPage.industrialOutlook`}
                                            industryOutlookData={industry?.industrialOutlook}
                                        />
                                    </Col>
                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >

                                        <Row className="mx-0">

                                            <Col lg={6} className={clsx(styles.finacialHightlightPadding)}  >
                                                <HeadingCom
                                                    label={`ipoDetailPage.financialHighlights`}
                                                />
                                                <FinacialHighlightTable
                                                    uniqueYears={uniqueYears2}
                                                    finacialHightlightGroupedData={finacialHightlightGroupedData}
                                                    paricular={"PARTICULARS"}
                                                />
                                            </Col>

                                            <Col lg={6} className={clsx(styles.shareHoldingPadding)} >
                                                <HeadingCom
                                                    label={`ipoDetailPage.shareholdingPattern`}
                                                />
                                                <FinacialHighlightTable
                                                    uniqueYears={shareHoldingUniqueYears}
                                                    finacialHightlightGroupedData={shareHoldingData}
                                                    paricular={false}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>


                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                                        <CapsuleView
                                            headingLabel={`ipoDetailPage.capsuleView`}
                                            capsuleViewData={capsuleView}
                                        />
                                    </Col>

                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout, "mt-5")} >
                                        <hr />
                                        <DisclamerCard
                                            heading={`DISCLAIMER: `}
                                            para={getDisclaimerDataObj?.
                                                description
                                                ?.attributes?.description || ""}
                                        />
                                    </Col>
                                </>
                            // )
                        }

                    </Row>
                </Container>

            </Suspense>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale, query }) => {
    let userActive = fetchCookie("_jwt", req.headers);
    setAuthorizationToken(userActive);

    const slug = query?.id;
    const params = {
        slug: slug,
        pageName: "capsuleplus-company-detail"
    }
    const shareParams = {
        companySlug: slug,
    }
    const quetarlySlug = {
        companySlug: slug,
        duration: "quarterly"
    }
    const yearlySlug = {
        companySlug: slug,
        duration: "yearly"
    }
    await store.dispatch(getCapsuleCompanyDetailData(params));
    await store.dispatch(getDisclaimerData());
    await store.dispatch(getSharePriceAndVolume(shareParams));
    await store.dispatch(getOperationDetailQuetarly(quetarlySlug));
    await store.dispatch(getOperationDetailYearly(yearlySlug));
    await store.dispatch(getPriceAndVolume(shareParams));
    await store.dispatch(getSubscriptionBtnData());

    const {
        capsuleDetailSlice: { getCapsuleCompanyDetailObj, seoObj, getOperationDetailQuetarlyObj, getOperationDetailYearlyObj, getSharePriceAndVolumeObj, getPriceAndVolumeObj },
        screenerSlugDetailSlice: { getDisclaimerDataObj },
        subscriptionSlice: { getSubscriptionBtnObj }

    } = store.getState();

    let fileList = getFileLangList();
    secureHeader(req, res, locale);
    // Get the current date on the server
    const currentDate = new Date().toISOString();
    return {
        props: {
            data: "",
            language: locale,
            currentDate,
            getCapsuleCompanyDetailObj,
            getDisclaimerDataObj,
            seo: seoObj?.seo,
            getOperationDetailQuetarlyObj,
            getOperationDetailYearlyObj,
            getSharePriceAndVolumeObj,
            getPriceAndVolumeObj,
            getSubscriptionBtnObj,
            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
