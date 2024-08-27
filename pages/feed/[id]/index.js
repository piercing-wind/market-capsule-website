import { useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Suspense, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
const LoderModule = dynamic(() => import("@/components/Module/LoaderModule"))
const OneIdBreadcrumb = dynamic(() => import("@/components/Module/Breadcrumb/OneIdBreadcrumb"))
import styles from "../../../section/Feed/style/feed.module.scss"
import { getFeedDetailData } from "@/store/slices/feedDetailSlice";
import FeedBannerSection from "@/section/Feed/FeedBannerSection";
import Artical from "@/section/Feed/Artical";
export default function FeedDetails(props) {
    const { t } = useTranslation("common");
    const { getFeedDetailObj } = props;
    const { title, url, createdAt, updatedAt, description, slug, image } = getFeedDetailObj?.feedDetailData || {};
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";
    // basic detailsobj



    return (
        <>
            <Suspense fallback={<LoderModule />}>
                <Container className={clsx(styles.breadPading, "mt-4 containerPadding")}>
                    <OneIdBreadcrumb
                        linkSlug={`/`}
                        linkLable={t(`Home`)}
                        idLable={title}
                    />
                </Container>



                <Container className={clsx(styles.containerPadding, "containerPadding")}>
                    <Row className={clsx("mx-0")}>
                        <Col xs={12} className={clsx("px-0")} >
                            {
                                image?.length > 0 ? (
                                    <FeedBannerSection img={image[0]?.url ? image[0]?.url : ""} alt={image[0]?.alternativeText ? image[0]?.alternativeText : ""} />
                                ) : (
                                    <FeedBannerSection />

                                )
                            }
                        </Col>

                    </Row>
                    <Row className={clsx("mx-0", styles.row)}>
                        <Col xs={12} className={clsx("px-0")} >
                            <Artical id={slug} title={title} createdAt={updatedAt} capsuleViewData={description} />
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
    const id = query?.id;
    const params = {
        id: id,
    }
    await store.dispatch(getFeedDetailData(params));

    const {
        feedDetailSlice: { getFeedDetailObj, seoObj },

    } = store.getState();

    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            language: locale,
            getFeedDetailObj,
            seo: seoObj?.seo,
            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
