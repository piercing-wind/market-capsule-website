import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Col, Container, Row } from "react-bootstrap";
import clsx from "clsx";
import LoderModule from "@/components/Module/LoaderModule";
import React, { Suspense, } from "react";
import dynamic from "next/dynamic";
import styles from "../../../section/Screener/ScreenerDetailPage/style/screenerDetail.module.scss"
import BackToHomeLink from "@/components/Module/Button/BackToHomeLink";
import { getGlobalSearchList } from "@/store/slices/searchResultsSlice";
const OneIdBreadcrumb = dynamic(() => import("@/components/Module/Breadcrumb/OneIdBreadcrumb"))
const ScreeenerHeadingCom = dynamic(() => import("@/components/Module/HeadingComponent/ScreenerHeadingCom"))
const IpoZoneSlider = dynamic(() => import("@/components/Module/Slider/IpoZoneSlider"))

export default function SearchResults(props) {
    const { t } = useTranslation("common");
    const { getGlobalSearchObj, search } = props;
    const { globalSearchList, globalSearchTotalList } = getGlobalSearchObj;
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";

    return (
        <Suspense fallback={<LoderModule />}>
            <Container fluid className={clsx(styles.containerPadding, "mt-4 pb-5 ")}>
                <OneIdBreadcrumb
                    linkSlug={`/`}
                    linkLable={t(`navbar.home`)}
                    idLable={t(`searchResultPage.searchResult`)}
                />
                <Row className={clsx("mx-0 ", styles.row)}>
                    {/* heading section */}
                    <Col xs={12} className='px-0'>
                        <ScreeenerHeadingCom
                            heading={`${t(`searchResultPage.showingResultFor`)} '${search}'`}
                            para={`${globalSearchTotalList} ${t(`searchResultPage.searchResultFound`)}`}
                            backToHome={true}
                        />
                    </Col>
                    {
                        globalSearchList?.capsuleplus?.length > 0 && (
                            <Col xs={12} className='px-xl-4 py-xl-4 px-3 py-3 '>
                                <IpoZoneSlider
                                    heading={`searchResultPage.capsulePlus`}
                                    sliderData={globalSearchList?.capsuleplus
                                    }
                                    url={`capsule-plus`}
                                />
                            </Col>

                        )
                    }
                    {
                        globalSearchList?.ipoZone?.length > 0 && (
                            <Col xs={12} className='px-xl-4 py-xl-4 px-3 py-3 '>
                                <IpoZoneSlider
                                    heading={`searchResultPage.ipoZone`}
                                    sliderData={globalSearchList?.ipoZone}
                                    url={`ipo`}
                                />
                            </Col>
                        )
                    }

                    {
                        globalSearchList?.screener?.length > 0 && (
                            <Col xs={12} className='px-xl-4 py-xl-4 px-3 py-3 '>
                                <IpoZoneSlider
                                    heading={`searchResultPage.screener`}
                                    sliderData={globalSearchList?.screener}
                                    url={`screener`}
                                />
                            </Col>
                        )
                    }

                    {
                        !globalSearchList?.screener?.length && !globalSearchList?.ipoZone?.length && !globalSearchList?.capsuleplus?.length && (
                            <Col xs={12} className='px-xl-4 py-xl-4 px-3 py-3 '>
                                <div className={clsx(styles.noResult)} >
                                    <p className="mb-0">{t("No Result Found")}</p>
                                </div>

                            </Col>

                        )

                    }
                    <Col xs={12} className='px-xl-4 py-xl-4 px-3 py-3 mb-5 '>
                        <BackToHomeLink />
                    </Col>
                </Row>
            </Container>
        </Suspense>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale, query }) => {
    const search = query?.id;
    const params = {
        search: search
    }
    await store.dispatch(getGlobalSearchList(params));

    const {
        searchResultsSlice: { getGlobalSearchObj }
    } = store.getState();

    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            language: locale,
            getGlobalSearchObj,
            search,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
