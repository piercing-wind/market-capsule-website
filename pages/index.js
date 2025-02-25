import { useDispatch } from "react-redux";
import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Container, Row } from "react-bootstrap";
import clsx from "clsx";
import styles from "../section/Homepage/style/home.module.scss"
import LoderModule from "@/components/Module/LoaderModule";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { getFeedList, getHomePageMetaData, getIndustriesList, getSansexAndNiftyData, getTopGainerList, getTopLosersList, getTrandingNewsList, getWhatsNewInCapsulePlusList } from "@/store/slices/homePageSlice";
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
import Image from "next/image";
const LeftHomeSection = dynamic(() => import('@/section/Homepage/LeftHomeSection/LeftHomeSection'), { suspense: true, loading: () => <LoderModule /> })
const MidleHomeSection = dynamic(() => import('@/section/Homepage/MidleHomeSection/MidleHomeSection'), { suspense: true, loading: () => <LoderModule /> })
const RightHomeSection = dynamic(() => import('@/section/Homepage/RightHomeSection/RightHomeSection'), { suspense: true, loading: () => <LoderModule /> })


export default function Home(props) {
    const { t } = useTranslation("common");
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";

    return (
        <Container className={clsx(styles.containerPadding, "mt-sm-3 mt-0 pb-5 ")}>
            <div className="ml-4 w-full text-white py-4 bg-[#3e63ff] shadow-md mb-3 sm:rounded-xl mt-3 sm:mt-0 mx-auto p-2 px-4 flex flex-col lg:flex-row items-center justify-between">
                <h6 className=" text-xl text-center sm:text-2xl font-bold sm:text-nowrap">Microcap Investing Summit - 20 Experts - 20 Ideas</h6>
                
                <button onClick={()=>router.push("/summit")}  className=" px-8 py-2 relative bg-gradient-to-r from-blue-500 to-green-600 text-white font-semibold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                  Register Now
                </button>
            </div>
            <Row className="mx-0 app">
                <LeftHomeSection
                    topGainerObj={props?.topGainerObj}
                    topLosersObj={props?.topLosersObj}
                    sensexAndNiftyObj={props?.sensexAndNiftyObj}
                />
                <MidleHomeSection
                    industriesObj={props?.industriesObj}
                    feedListObj={props?.feedListObj}
                />

                <RightHomeSection
                    trandingNewsObj={props?.trandingNewsObj}
                    whatsNewInCapsulePlusObj={props?.whatsNewInCapsulePlusObj}
                />
            </Row>

        </Container>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale }) => {
    let userActive = fetchCookie("_jwt", req.headers);
    setAuthorizationToken(userActive);

    const params = {
        filter: "BSE",
        page: 1,
        limit: 10,
        sort: `createdAt:desc`,
        populate: `name`

    }
    const trandingNewsParams = {
        page: 1,
        limit: 5,
        title: "title",
        url: `url`,
        source: `source`,
        image: `url`,
        sort: `createdAt:desc`,
        alternativeText: `alternativeText`,
    }
    const whatsNewParams = {
        page: 1,
        limit: 5,
        title: "title",
        url: `url`,
        source: `source`,
        image: `url`,
        sort: `createdAt:desc`,
        alternativeText: `alternativeText`,
        slug: `slug`,
    }
    const industryParams = {
        industryName: `name`,
        industrySlug: `slug`,
        industryTag: `name`,
        industryColorHash: `colorHash`,
    }

    const feedListParams = {
        page: 1,
        limit: 5,
        industryId: ``
    }
    const indexParams = {
        indexType: `Sensex`
    }
    await store.dispatch(getHomePageMetaData());
    // await store.dispatch(getTopGainerList(params));
    await store.dispatch(getTopGainerList(params));
    await store.dispatch(getTopLosersList(params));
    await store.dispatch(getTrandingNewsList(trandingNewsParams));
    await store.dispatch(getWhatsNewInCapsulePlusList(whatsNewParams));
    await store.dispatch(getIndustriesList(industryParams));
    await store.dispatch(getFeedList(feedListParams));
    await store.dispatch(getSansexAndNiftyData(indexParams));

    const {
        homePageSlice: { seoObj, topGainerObj, topLosersObj, trandingNewsObj, whatsNewInCapsulePlusObj, industriesObj, feedListObj, sensexAndNiftyObj }
    } = store.getState();
    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            topGainerObj,
            topLosersObj,
            trandingNewsObj,
            whatsNewInCapsulePlusObj,
            industriesObj,
            feedListObj,
            sensexAndNiftyObj,
            seo: seoObj?.seo,
            language: locale,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
