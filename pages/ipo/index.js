import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Col, Container, Row } from "react-bootstrap";
import clsx from "clsx";
import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../../section/Ipo/style/ipo.module.scss"
import { ipoTableHeading } from "@/section/Ipo/ipoData";
import { getFilterSectionList, getIpoCompanyData, getIpoCompanyHeadingData, setCompanyList, setCompanyListCurrentPage, setCompanyListEmpty, setCompanyListTotalList } from "@/store/slices/ipoSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
const ScreeenerHeadingCom = dynamic(() => import("@/components/Module/HeadingComponent/ScreenerHeadingCom"))
const IpoTable = dynamic(() => import("@/section/Ipo/IpoTable"))
const IpoFilter = dynamic(() => import("@/components/Module/Accrodian/IpoFilter"))

export default function CapsulePlusPage(props) {
    const { getIpoCompanyDataObj, getFilterSectionObj, getIpoCompanyHeadingObj } = props;
    const { t } = useTranslation("common");
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";
    const dispatch = useDispatch();
    const { companyListCurrentPage } = useSelector((state) => ({
        companyListCurrentPage: state?.ipoSlice?.getIpoCompanyDataObj?.companyListCurrentPage,
    }), shallowEqual)

    //set server data to client side
    useEffect(() => {
        if (getIpoCompanyDataObj?.error === false) {
            dispatch(setCompanyListEmpty())
            dispatch(setCompanyList(getIpoCompanyDataObj?.companyList))
            dispatch(setCompanyListTotalList(getIpoCompanyDataObj?.companyTotalList))
            dispatch(setCompanyListCurrentPage(companyListCurrentPage + 1))
        } else if (getIpoCompanyDataObj?.error) {
            toast.error(`something went wrong`)
        }
    }, [dispatch]);


    return (
        <>
            <Container className={clsx(styles.containerPadding, "mt-4 pb-5 containerPadding")}>
                <Row className={clsx("mx-0 ", styles.row)}>
                    {/* heading section */}
                    <Col xs={12} className='px-0'>
                        <ScreeenerHeadingCom
                            heading={getIpoCompanyHeadingObj?.ipoHeadingData?.attributes?.title || "ipoPage.ipoZone"}
                            para={getIpoCompanyHeadingObj?.ipoHeadingData?.attributes?.description || "ipoPage.exploreTheLatest"}
                        />
                    </Col>

                    <Col lg={3} className='px-0 '>
                        <IpoFilter filters={getFilterSectionObj?.filterSectionList} />
                    </Col>
                    <Col lg={9} className={clsx('px-0 ps-lg-4 mt-lg-0 mt-3 pb-5', styles.borderLeft)}>
                        <IpoTable
                            dataTableHeading={ipoTableHeading} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale }) => {
    let userActive = fetchCookie("_jwt", req.headers);
    setAuthorizationToken(userActive);

    const params = {
        page: 1,
        limit: 10,
    }
    await store.dispatch(getIpoCompanyData(params));
    await store.dispatch(getFilterSectionList());
    await store.dispatch(getIpoCompanyHeadingData());

    const {
        ipoSlice: { getIpoCompanyDataObj, getFilterSectionObj, getIpoCompanyHeadingObj, seoObj }
    } = store.getState();

    let fileList = getFileLangList();
    secureHeader(req, res, locale);
    return {
        props: {
            data: "",
            getIpoCompanyDataObj,
            getFilterSectionObj,
            getIpoCompanyHeadingObj,
            seo: seoObj?.seo,
            language: locale,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
