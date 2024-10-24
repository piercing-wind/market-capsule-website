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
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
import { getIpoCompanyDetailData } from "@/store/slices/ipoDetailSlice";
import { getSubscriptionBtnData } from "@/store/slices/subscriptionSlice";
const LoderModule = dynamic(() => import("@/components/Module/LoaderModule"))
const OneIdBreadcrumb = dynamic(() => import("@/components/Module/Breadcrumb/OneIdBreadcrumb"))
const ScreenerSlugBanner = dynamic(() => import("@/components/Module/BannerSection/ScreenerSlugBanner"))
const AboutTheCompany = dynamic(() => import("@/components/Module/BannerSection/AboutTheCompany"))
const IndustryOutlook = dynamic(() => import("@/section/Ipo/IPODetails/IndustryOutlook"))
const CapsuleView = dynamic(() => import("@/section/Ipo/IPODetails/CapsuleView"))

export default function IpoDetails(props) {
    const { t } = useTranslation("common");
    const { getIpoCompanyDetailObj } = props;
    const { capsuleView, aboutTheCompany, industry } = getIpoCompanyDetailObj?.ipoCompanyDetailData || {};
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";


    return (
        <>
            <Suspense fallback={<LoderModule />}>
                <Container className={clsx(styles.breadPading, "mt-4 containerPadding")}>
                    <OneIdBreadcrumb
                        linkSlug={`/ipo`}
                        linkLable={t(`ipoDetailPage.ipoZone`)}
                        idLable={getIpoCompanyDetailObj?.ipoCompanyDetailData?.company?.name}
                    />
                </Container>
                <Container className={clsx(styles.containerPadding, "containerPadding")}>
                    <Row className={clsx("mx-0", styles.row)}>
                        <Col xs={12} className={clsx("px-0")} >
                            <ScreenerSlugBanner
                                banner="ipo"
                                companyName={getIpoCompanyDetailObj?.ipoCompanyDetailData?.company?.name}
                                sector={getIpoCompanyDetailObj?.ipoCompanyDetailData?.industry?.name}
                                url={getIpoCompanyDetailObj?.ipoCompanyDetailData?.websiteUrl}
                                companyLogo={getIpoCompanyDetailObj?.ipoCompanyDetailData?.logo?.url}
                                alt={getIpoCompanyDetailObj?.ipoCompanyDetailData?.logo?.alternativeText}
                            />
                        </Col>

                        <Col xs={12} className={clsx(styles.paddingDetailsAbout, "mt-5")} >
                            <AboutTheCompany
                                aboutDescription={aboutTheCompany}
                                headingLabel={`screenerSlugPage.aboutTheCompany`}
                            />
                        </Col>


                        {/* capsulePluse */}
                        <Col xs={12} className={clsx(styles.paddingDetailsAbout)} >
                            <IndustryOutlook
                                headingLabel={`ipoDetailPage.industrialOutlook`}
                                industryOutlookData={industry?.industrialOutlook}
                            />
                        </Col>
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
    }

    await store.dispatch(getIpoCompanyDetailData(params));
    await store.dispatch(getSubscriptionBtnData());

    const {
        ipoDetailSlice: { getIpoCompanyDetailObj, seoObj },
        subscriptionSlice: { getSubscriptionBtnObj }

    } = store.getState();

    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            language: locale,
            getIpoCompanyDetailObj,
            seo: seoObj?.seo,
            getSubscriptionBtnObj,
            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
