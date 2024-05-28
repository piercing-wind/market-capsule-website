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
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
import { getDisclaimerData, getScreenerCompanyData } from "@/store/slices/screenerSlugDetailSlice";
import { formatString } from "@/utils/constants";
const LoderModule = dynamic(() => import("@/components/Module/LoaderModule"))
const TwoIdBreadcrumb = dynamic(() => import("@/components/Module/Breadcrumb/TwoIdBreadcrumb"))
const ScreenerSlugBanner = dynamic(() => import("@/components/Module/BannerSection/ScreenerSlugBanner"))
const BasicDetailsSection = dynamic(() => import("@/components/Module/BannerSection/BasicDetailsSection"))
const AboutTheCompanySimple = dynamic(() => import("@/components/Module/BannerSection/AboutTheCompanySimple"))
const TimelineSection = dynamic(() => import("@/section/Screener/ScreenerSlugDetailPage/TimelineSection"))
const InDepthCard = dynamic(() => import("@/components/Module/UpgradeCard/InDepthCard"))

export default function CapsulePlusPage(props) {
    const { t } = useTranslation("common");
    const dispatch = useDispatch();
    const { getScreenerCompanyDetailObj, getDisclaimerDataObj } = props;
    const { prevClosePrice, marketCap, sectoralPERange, BSE, ttpmPE, peRemark, sector } = getScreenerCompanyDetailObj?.screenerCompanyDetailData?.company_share_detail || {}
    const { about, compnay_timelines } = getScreenerCompanyDetailObj?.screenerCompanyDetailData || {};
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
            value: `${prevClosePrice ? `₹${prevClosePrice}` : "N/A"}`,
            bg: true
        },
        {
            id: 2,
            label: "screenerSlugPage.sector",
            value: `${sector ? sector : "N/A"}`,
            bg: true
        },
        {
            id: 3,
            label: "screenerSlugPage.marketCap",
            value: `${marketCap ? `₹${marketCap}Cr` : "N/A"}`,
            bg: false
        },
        {
            id: 4,
            label: "screenerSlugPage.ttmPe",
            value: `${ttpmPE ? `${ttpmPE}x` : "N/A"}`,
            bg: false,
        },
        {
            id: 5,
            label: "screenerSlugPage.sectoralPeRange",
            value: `${sectoralPERange ? sectoralPERange : "N/A"}`,
            bg: true,
            updated: true,
        },
        {
            id: 6,
            label: "screenerSlugPage.peRemark",
            value: `${peRemark ? peRemark : "N/A"}`,
            bg: true
        },
        {
            id: 7,
            label: "screenerSlugPage.bse",
            value: `${BSE ? BSE : "N/A"}`,
            bg: false
        }
    ]
    console.log("getScreenerCompanyDetailObj", getScreenerCompanyDetailObj)
    return (
        <>

            <Suspense fallback={<LoderModule />}>
                <div className={clsx(styles.breadPading)}>
                    <TwoIdBreadcrumb
                        linkSlug1={`/screener`}
                        linkLable1={t(`screenerSlugPage.screener`)}
                        linkSlug2={`/screener/${router?.query?.id}`}
                        linkLable2={formatString(router?.query?.id)}
                        idLable={getScreenerCompanyDetailObj?.screenerCompanyDetailData?.name}
                    />

                </div>
                <Container fluid className={clsx(styles.containerPadding)}>
                    <Row className={clsx("mx-0", styles.row)}>
                        <Col xs={12} className={clsx("px-0")} >
                            <ScreenerSlugBanner
                                companyName={getScreenerCompanyDetailObj?.screenerCompanyDetailData?.name || ""}
                                sector={getScreenerCompanyDetailObj?.screenerCompanyDetailData?.sector?.name || ""}
                                url={getScreenerCompanyDetailObj?.screenerCompanyDetailData?.websiteUrl || ""}
                                companyLogo={getScreenerCompanyDetailObj?.screenerCompanyDetailData?.logo?.url || ""}
                                alt={getScreenerCompanyDetailObj?.screenerCompanyDetailData?.logo?.alternativeText || ""}
                                companyId={getScreenerCompanyDetailObj?.screenerCompanyDetailData?.id || ""}
                            />
                        </Col>
                        <Col xs={12} className={clsx(styles.paddingDetails)} >
                            <BasicDetailsSection
                                basicDetailArr={basicDetailArr}
                                headingLabel={`screenerSlugPage.basicDetails`}
                            />
                        </Col>
                        <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                            <AboutTheCompanySimple
                                aboutDescription={about}
                                headingLabel={`screenerSlugPage.aboutTheCompany`}
                            />
                        </Col>

                        <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                            <TimelineSection
                                compnayTimelineList={compnay_timelines}
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
                                heading={`screenerSlugPage.disclaimer `}
                                para={getDisclaimerDataObj?.
                                    description
                                    ?.attributes?.description || ""}

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

    const slug = query?.slug;
    const params = {
        slug: slug,
        pageName: "bucket-company-detail"
    }
    await store.dispatch(getScreenerCompanyData(params));
    await store.dispatch(getDisclaimerData(params));

    const {
        screenerSlugDetailSlice: { getScreenerCompanyDetailObj, getDisclaimerDataObj, seoObj }
    } = store.getState();

    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            language: locale,
            getScreenerCompanyDetailObj,
            getDisclaimerDataObj,
            seo: seoObj?.seo,
            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
