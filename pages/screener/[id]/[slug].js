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
import styles from "../../../section/Screener/ScreenerSlugDetailPage/style/screenerSlug.module.scss"
import dynamic from "next/dynamic";
import { basicDetailsData } from "@/section/Screener/ScreenerSlugDetailPage/screenerSlugDetailData";
import DisclamerCard from "@/components/Module/BannerSection/DisclamerCard";
const LoderModule = dynamic(() => import("@/components/Module/LoaderModule"))
const TwoIdBreadcrumb = dynamic(() => import("@/components/Module/Breadcrumb/TwoIdBreadcrumb"))
const ScreenerSlugBanner = dynamic(() => import("@/components/Module/BannerSection/ScreenerSlugBanner"))
const BasicDetailsSection = dynamic(() => import("@/components/Module/BannerSection/BasicDetailsSection"))
const AboutTheCompany = dynamic(() => import("@/components/Module/BannerSection/AboutTheCompany"))
const TimelineSection = dynamic(() => import("@/section/Screener/ScreenerSlugDetailPage/TimelineSection"))
const InDepthCard = dynamic(() => import("@/components/Module/UpgradeCard/InDepthCard"))

export default function CapsulePlusPage(props) {
    const { t } = useTranslation("common");
    const { prevClosePrice, marketCap, sectoralPERange, BSE, ttpmPE, peRemark, sector } = basicDetailsData?.data?.company_share_detail
    const { about, compnay_timeline } = basicDetailsData?.data;
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";



    // basic detailsobj
    const basicDetailArr = [
        {
            id: 1,
            label: "screenerSlugPage.prevClose",
            value: `₹${prevClosePrice}`,
            bg: true
        },
        {
            id: 2,
            label: "screenerSlugPage.sector",
            value: `${sector}`,
            bg: true
        },
        {
            id: 3,
            label: "screenerSlugPage.marketCap",
            value: `₹${marketCap}Cr`,
            bg: false
        },
        {
            id: 4,
            label: "screenerSlugPage.ttmPe",
            value: `${ttpmPE}x`,
            bg: false,
        },
        {
            id: 5,
            label: "screenerSlugPage.sectoralPeRange",
            value: `${sectoralPERange}`,
            bg: true,
            updated: true,
        },
        {
            id: 6,
            label: "screenerSlugPage.peRemark",
            value: `${peRemark}`,
            bg: true
        },
        {
            id: 7,
            label: "screenerSlugPage.bse",
            value: `${BSE}`,
            bg: false
        }
    ]

    return (
        <>

            <Suspense fallback={<LoderModule />}>
                <div className={clsx(styles.breadPading)}>
                    <TwoIdBreadcrumb
                        linkSlug1={`/screener`}
                        linkLable1={t(`screenerSlugPage.screener`)}
                        linkSlug2={`/screener/${router?.query?.id}`}
                        linkLable2={t(`Capacity Expansions & New Product Launches`)}
                        idLable={basicDetailsData?.data?.name}
                    />

                </div>
                <Container fluid className={clsx(styles.containerPadding)}>
                    <Row className={clsx("mx-0", styles.row)}>
                        <Col xs={12} className={clsx("px-0")} >
                            <ScreenerSlugBanner
                            />
                        </Col>
                        <Col xs={12} className={clsx(styles.paddingDetails)} >
                            <BasicDetailsSection
                                basicDetailArr={basicDetailArr}
                                headingLabel={`screenerSlugPage.basicDetails`}
                            />
                        </Col>
                        <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                            <AboutTheCompany
                                aboutDescription={about}
                                headingLabel={`screenerSlugPage.aboutTheCompany`}
                            />
                        </Col>

                        <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                            <TimelineSection
                                compnayTimelineList={compnay_timeline}
                                headingLabel={`screenerSlugPage.timeline`}
                            />
                        </Col>
                        <Col xs={12} className={clsx(styles.paddingDetailsInDefth)} >
                            <InDepthCard />
                        </Col>

                        <Col xs={12} className={clsx(styles.line)} >
                            <hr />
                        </Col>

                        <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                            <DisclamerCard
                                heading={`screenerSlugPage.disclaimer`}
                                para={`: This document is created for educational and informational purposes only and should not be construed as a Buy/Sell recommendation, investment advice or a research report. Although the document accurately reflects the personal views of the authors,there may be manual/ human errors in the document. The authors may also have equity shares in the companies mentioned in this report. Investor is advised to consult his/her investment advisor and undertake further due diligence before making any investment decision in the companies mentioned. Authors are not liable for any financial gains or losses due to investments made as per the information written in this document.`}

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
