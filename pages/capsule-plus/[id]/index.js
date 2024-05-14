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
import styles from "../../../section/CapsulePlus/CapsulePlusDetail/style/capsulePlusDetail.module.scss"
import dynamic from "next/dynamic";
import { commaSeprater, numberToLocaleString } from "@/utils/constants";
import { capsulePluseDetailsData, companyDetailHeading, sensexChartBarData, sensexChartData } from "@/section/CapsulePlus/CapsulePlusDetail/capsulePlusDetailData";
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
    const { marketCap = null, prevClose = null, sector = null, ttmPe = null, sectoralPeRange = null, peRemark = null, bse = null } = capsulePluseDetailsData?.data?.company_share_detail
    const { aboutTheCompany, monthlyArr, yearArr, companyTypeDetails, capsuleHighlights } = capsulePluseDetailsData?.data;
    const { capsuleplus } = capsulePluseDetailsData

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
            value: `₹${commaSeprater(prevClose)}Cr.`,
            bg: true
        },
        {
            id: 2,
            label: "capsuleDetailPage.sector",
            value: sector,
            bg: true
        },
        {
            id: 3,
            label: "capsuleDetailPage.marketCap",
            value: `₹${marketCap}Cr.`,
            bg: false
        },
        {
            id: 4,
            label: "capsuleDetailPage.ttmPe",
            value: `${ttmPe}X`,
            bg: false,
        },
        {
            id: 5,
            label: "capsuleDetailPage.sectoralPeRange",
            value: `${sectoralPeRange}`,
            bg: true,
            updated: false,
        },
        {
            id: 6,
            label: "capsuleDetailPage.peRemark",
            value: `${commaSeprater(peRemark)}`,
            bg: true
        },
        {
            id: 7,
            label: "capsuleDetailPage.bse",
            value: `${bse}`,
            bg: false
        }

    ]

    //create custom structure for month table
    const monthGroupedData = monthlyArr.reduce((acc, item) => {
        if (!acc[item.title]) {
            acc[item.title] = [];
        }
        acc[item.title].push(item);
        return acc;
    }, {});
    const uniqueMonths = [...new Set(monthlyArr.map((item) => item.year))];

    //create custom structure for year  table
    const yearsData = yearArr.reduce((acc, item) => {
        if (!acc[item.title]) {
            acc[item.title] = [];
        }
        acc[item.title].push(item);
        return acc;
    }, {});
    const uniqueYears = [...new Set(yearArr.map((item) => item.year))];

    return (
        <>

            <Suspense fallback={<LoderModule />}>

                <div className={clsx(styles.breadPading, "mt-4")}>
                    <OneIdBreadcrumb
                        linkSlug={`/capsule-plus`}
                        linkLable={t(`capsuleDetailPage.capsulePlus`)}
                        idLable={`Phantom-digital-effects-limited`}
                    />

                </div>
                <Container fluid className={clsx(styles.containerPadding)}>
                    <Row className={clsx("mx-0", styles.row)}>
                        <Col xs={12} className={clsx("px-0")} >
                            <ScreenerSlugBanner
                                banner="capsulePlus"
                                companyName="PHANTOM DIGITAL EFFECTS LIMITED"
                                sector="VFX - Media"
                                url="www. phantomdigital.com"
                                companyLogo={`/assests/capsule-plus/company-logo.png`}
                                alt={`banner`}

                            />
                        </Col>

                        <Col xs={12} className={clsx(styles.paddingDetails)} >
                            <AboutTheCompany
                                aboutDescription={aboutTheCompany}
                                headingLabel={`capsuleDetailPage.businessOverview`}

                            />
                            <div className={clsx(styles.mainDiv)}>
                                {
                                    !capsuleplus && (
                                        <ExclusiveViewCard
                                            line={false}
                                        />

                                    )
                                }
                            </div>
                        </Col>

                        {
                            capsuleplus && (
                                <>


                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                                        <AboutTheCompany
                                            aboutDescription={aboutTheCompany}
                                            headingLabel={`capsuleDetailPage.financialReport`}
                                        />
                                    </Col>

                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                                        <AboutTheCompany
                                            aboutDescription={aboutTheCompany}
                                            headingLabel={`capsuleDetailPage.shareCapitalAndNumberOfEmployess`}
                                        />
                                    </Col>

                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                                        <SharePriceAndVolume
                                            headingLabel={`capsuleDetailPage.sharePriceAndVolume`}
                                        />
                                    </Col>

                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout, "pt-3")} >
                                        <VolumeTable
                                            dataTable={sensexChartData}
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

                                    <Col xs={12} className={clsx(styles.paddingDetailsAbout, "mt-5")} >
                                        <hr />
                                        <DisclamerCard
                                            heading={`DISCLAIMER: `}
                                            para={`: This document is created for educational and informational purposes only and should not be construed as a Buy/Sell recommendation, investment advice or a research report. Although the document accurately reflects the personal views of the authors,there may be manual/ human errors in the document. The authors may also have equity shares in the companies mentioned in this report. Investor is advised to consult his/her investment advisor and undertake further due diligence before making any investment decision in the companies mentioned. Authors are not liable for any financial gains or losses due to investments made as per the information written in this document.`}

                                        />
                                    </Col>
                                </>
                            )
                        }

                    </Row>
                </Container>

            </Suspense>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale }) => {

    let fileList = getFileLangList();
    secureHeader(req, res, locale);
    // Get the current date on the server
    const currentDate = new Date().toISOString();
    return {
        props: {
            data: "",
            language: locale,
            currentDate,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
