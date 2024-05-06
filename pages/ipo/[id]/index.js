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
    const { marketCap = null, peRatio = null, rociPercent = null, roePercent = null, currentPrice = null, deRatio = null, cwip = null, cashConversionCycle = null, pegRatio = null } = ipoDetailsData?.data?.company_share_detail
    const { capsuleView, aboutTheCompany, business_segments, keyHighlights, industry, share_holdings, financial_highlights } = ipoDetailsData?.data;
    const { capsuleplus } = ipoDetailsData

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
            value: `₹${commaSeprater(marketCap)}Cr.`,
            bg: true
        },
        {
            id: 2,
            label: "ipoDetailPage.currentPrice",
            value: `₹${commaSeprater(currentPrice)}`,
            bg: true
        },
        {
            id: 3,
            label: "ipoDetailPage.peRatio",
            value: `${peRatio}`,
            bg: false
        },
        {
            id: 4,
            label: "ipoDetailPage.deRatio",
            value: `${deRatio}`,
            bg: false,
        },
        {
            id: 5,
            label: "ipoDetailPage.roce",
            value: `${15}%`,
            bg: true,
            updated: false,
        },
        {
            id: 6,
            label: "ipoDetailPage.cwip",
            value: `₹${commaSeprater(cwip)}Cr.`,
            bg: true
        },
        {
            id: 7,
            label: "ipoDetailPage.roic",
            value: `${rociPercent}%`,
            bg: false
        },
        {
            id: 8,
            label: "ipoDetailPage.cashConversionCycle",
            value: `${cashConversionCycle} day`,
            bg: false
        },
        {
            id: 9,
            label: "ipoDetailPage.roe",
            value: `${roePercent}%`,
            bg: true
        },
        {
            id: 10,
            label: "ipoDetailPage.pegRatio",
            value: `${pegRatio}`,

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
    const uniqueYears = [...new Set(financial_highlights.map((item) => item.year))];

    //create custom structure for share holding  table
    const shareHoldingData = share_holdings.reduce((acc, item) => {
        if (!acc[item.title]) {
            acc[item.title] = [];
        }
        acc[item.title].push(item);
        return acc;
    }, {});
    const shareHoldingUniqueYears = [...new Set(share_holdings.map((item) => item.year))];


    return (
        <>

            <Suspense fallback={<LoderModule />}>

                <div className={clsx(styles.breadPading, "mt-4")}>
                    <OneIdBreadcrumb
                        linkSlug={`/ipo`}
                        linkLable={t(`ipoDetailPage.ipoZone`)}
                        idLable={`Aegis Logistics Ltd.`}
                    />

                </div>
                <Container fluid className={clsx(styles.containerPadding)}>
                    <Row className={clsx("mx-0", styles.row)}>
                        <Col xs={12} className={clsx("px-0")} >
                            <ScreenerSlugBanner
                                banner="ipo"
                                companyName="Aegis Logistics Ltd."
                                sector="Trading-Gas"
                                url="www. aegislogistics.com"
                                companyLogo={`/assests/screener/logo.png`}
                                alt={`banner`}

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
                                capsuleplus={capsuleplus}
                            />
                        </Col>

                        {/* capsulePluse */}
                        {
                            capsuleplus ? (
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

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale }) => {

    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            language: locale,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
