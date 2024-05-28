import { useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Suspense, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import clsx from "clsx";
import styles from "../../../section/Ipo/IPODetails/style/ipoDetails.module.scss"
import dynamic from "next/dynamic";
import { ipoDetailsData } from "@/section/Ipo/IPODetails/ipoDetailsData";
import { commaSeprater, numberToLocaleString } from "@/utils/constants";
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
import { getIpoCompanyDetailData } from "@/store/slices/ipoDetailSlice";
const LoderModule = dynamic(() => import("@/components/Module/LoaderModule"))
const OneIdBreadcrumb = dynamic(() => import("@/components/Module/Breadcrumb/OneIdBreadcrumb"))
const ScreenerSlugBanner = dynamic(() => import("@/components/Module/BannerSection/ScreenerSlugBanner"))
const BasicDetailsSection = dynamic(() => import("@/components/Module/BannerSection/BasicDetailsSection"))
const AboutTheCompany = dynamic(() => import("@/components/Module/BannerSection/AboutTheCompany"))
const BussinessSegment = dynamic(() => import("@/section/Ipo/IPODetails/BussinessSegment"))
const KeyHighlightsAndManagementGuidance = dynamic(() => import("@/section/Ipo/IPODetails/KeyHighlightsAndManagementGuidance"))
const IndustryOutlook = dynamic(() => import("@/section/Ipo/IPODetails/IndustryOutlook"))
const CapsuleView = dynamic(() => import("@/section/Ipo/IPODetails/CapsuleView"))
const FinacialHighlightTable = dynamic(() => import("@/section/Ipo/IPODetails/FinacialHighlightTable"))
const HeadingCom = dynamic(() => import("@/components/Module/BannerSection/HeadingCom"))


export default function IpoDetails(props) {
    const { t } = useTranslation("common");
    const { getIpoCompanyDetailObj } = props;
    const { rocePercent = null, marketCap = null, peRatio = null, roicPercent = null, roePercent = null, currentPrice = null, deRatio = null, cwip = null, cashConversionCycle = null, pegRatio = null } = getIpoCompanyDetailObj?.ipoCompanyDetailData?.company_share_detail || {}
    const { capsuleView, aboutTheCompany, business_segments, keyHighlights, industry, share_holdings, financial_highlights } = getIpoCompanyDetailObj?.ipoCompanyDetailData || {};
    const { capsulePlus } = getIpoCompanyDetailObj

    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";

    // basic detailsobj
    const basicDetailArr = [
        {
            id: 1,
            label: "ipoDetailPage.marketCap",
            value: `${marketCap ? `₹${commaSeprater(marketCap)}Cr.` : "N/A"}`,
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
            value: `${cwip ? `₹${commaSeprater(cwip)}Cr.` : "N/A"}`,
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
    const uniqueYears = [...new Set(financial_highlights.map((item) => ({ month: item?.month, year: item?.year })))];

    //create custom structure for share holding  table
    const shareHoldingData = share_holdings.reduce((acc, item) => {
        if (!acc[item.title]) {
            acc[item.title] = [];
        }
        acc[item.title].push(item);
        return acc;
    }, {});
    const shareHoldingUniqueYears = [...new Set(share_holdings.map((item) => ({ month: item?.month, year: item?.year })))];


    return (
        <>

            <Suspense fallback={<LoderModule />}>

                <div className={clsx(styles.breadPading, "mt-4")}>
                    <OneIdBreadcrumb
                        linkSlug={`/ipo`}
                        linkLable={t(`ipoDetailPage.ipoZone`)}
                        idLable={getIpoCompanyDetailObj?.ipoCompanyDetailData?.name}
                    />

                </div>
                <Container fluid className={clsx(styles.containerPadding)}>
                    <Row className={clsx("mx-0", styles.row)}>
                        <Col xs={12} className={clsx("px-0")} >
                            <ScreenerSlugBanner
                                banner="ipo"
                                companyName={getIpoCompanyDetailObj?.ipoCompanyDetailData?.name}
                                sector={getIpoCompanyDetailObj?.ipoCompanyDetailData?.industry?.name}
                                url={getIpoCompanyDetailObj?.ipoCompanyDetailData?.websiteUrl}
                                companyLogo={getIpoCompanyDetailObj?.ipoCompanyDetailData?.logo?.url}
                                alt={getIpoCompanyDetailObj?.ipoCompanyDetailData?.logo?.alternativeText}

                            />
                        </Col>
                        <Col xs={12} className={clsx(styles.paddingDetails)} >
                            <BasicDetailsSection
                                basicDetailArr={basicDetailArr}
                                headingLabel={`ipoDetailPage.keyMetrics`}
                            />
                        </Col>

                        <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                            <AboutTheCompany
                                aboutDescription={aboutTheCompany}
                                headingLabel={`screenerSlugPage.aboutTheCompany`}
                            />
                        </Col>

                        <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                            <BussinessSegment
                                headingLabel={`ipoDetailPage.bussinessSegment`}
                                bussinessSegmentData={business_segments}
                                capsuleplus={capsulePlus}
                            />
                        </Col>

                        {/* capsulePluse */}
                        {
                            !capsulePlus ? (
                                <>
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

                                    <Col lg={6} className={clsx(styles.finacialHightlightPadding)}  >
                                        <HeadingCom
                                            label={`ipoDetailPage.financialHighlights`}
                                        />
                                        <FinacialHighlightTable
                                            uniqueYears={uniqueYears}
                                            finacialHightlightGroupedData={finacialHightlightGroupedData}
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

                                </>
                            ) : (
                                <></>
                                // <ExclusiveViewCard />
                            )
                        }



                        <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                            <CapsuleView
                                headingLabel={`ipoDetailPage.capsuleView`}
                                capsuleViewData={capsuleView}
                            />
                        </Col>


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
        pageName: "ipo-company-detail"
    }
    await store.dispatch(getIpoCompanyDetailData(params));
    const {
        ipoDetailSlice: { getIpoCompanyDetailObj, seoObj }
    } = store.getState();

    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            language: locale,
            getIpoCompanyDetailObj,
            seo: seoObj?.seo,
            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
