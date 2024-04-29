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
    const [screenerFilter, setScreenerFilter] = useState("functional")
    const { prevClosePrice, marketCap, sectoralPERange, BSE, ttpmPE, peRemark, sector } = basicDetailsData?.data?.company_share_detail
    const { about, compnay_timeline } = basicDetailsData?.data;
    const dispatch = useDispatch()
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";

    //filter based on type and section
    const functionalSectorialBucketsFilter = (type) => {
        if (type === "functional") {
            setScreenerFilter("functional")
        } else if (type === "sectoral") {
            setScreenerFilter("sectoral")
        } else {
            setScreenerFilter("importantBuckets")
        }

    }

    // basic detailsobj
    const basicDetailArr = [
        {
            id: 1,
            label: "Prev Close",
            value: `₹${prevClosePrice}`,
            bg: true
        },
        {
            id: 2,
            label: "Sector",
            value: `${sector}`,
            bg: true
        },
        {
            id: 3,
            label: "Market Cap",
            value: `₹${marketCap}Cr`,
            bg: false
        },
        {
            id: 4,
            label: "TTM PE",
            value: `${ttpmPE}x`,
            bg: false,
        },
        {
            id: 5,
            label: "Sectoral PE Range",
            value: `${sectoralPERange}`,
            bg: true,
            updated: true,
        },
        {
            id: 6,
            label: "PE Remark",
            value: `${peRemark}`,
            bg: true
        },
        {
            id: 7,
            label: "BSE",
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
                        linkLable1={t(`Screener`)}
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
                                headingLabel={`Basic Details`}
                            />
                        </Col>
                        <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                            <AboutTheCompany
                                aboutDescription={about}
                                headingLabel={`About the Company`}
                            />
                        </Col>

                        <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                            <TimelineSection
                                compnayTimelineList={compnay_timeline}
                                headingLabel={`Timeline`}
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
                                heading={`DISCLAIMER`}
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
