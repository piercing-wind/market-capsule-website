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
import styles from "../../../section/Screener/ScreenerDetailPage/style/screenerDetail.module.scss"
import { screenerDetailTableHeading } from "@/section/Screener/ScreenerDetailPage/screenerDetailPageData";
import { getFilterSectionList, getScreenerCompanyData, getScreenerIdData, setCompanyList, setCompanyListCurrentPage, setCompanyListEmpty, setCompanyListTotalList } from "@/store/slices/screenerIdSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ScreenerFilter } from "@/components/Module/Accrodian/ScreenerFilter";
const OneIdBreadcrumb = dynamic(() => import("@/components/Module/Breadcrumb/OneIdBreadcrumb"))
const ScreeenerHeadingCom = dynamic(() => import("@/components/Module/HeadingComponent/ScreenerHeadingCom"))
const ScreenerDetailTable = dynamic(() => import("@/section/Screener/ScreenerDetailPage/ScreenerDetailTable"))

export default function Home(props) {
    const { t } = useTranslation("common");
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";
    const dispatch = useDispatch();
    const { getScreenerIdDataObj, getFilterSectionObj, getScreenerCompanyDataObj } = props;
    const { companyListCurrentPage } = useSelector((state) => ({
        companyListCurrentPage: state?.screenerIdSlice?.getScreenerIdDataObj?.companyListCurrentPage,
    }), shallowEqual)
    //set server data to client side
    useEffect(() => {
        if (getScreenerIdDataObj?.error === false) {
            dispatch(setCompanyListEmpty())
            dispatch(setCompanyList(getScreenerIdDataObj?.companyList))
            dispatch(setCompanyListTotalList(getScreenerIdDataObj?.companyTotalList))
            dispatch(setCompanyListCurrentPage(companyListCurrentPage + 1))
        } else if (getScreenerIdDataObj?.error) {
            toast.error(`something went wrong`)
        }
    }, [dispatch]);
    return (
        <Container className={clsx(styles.containerPadding, "mt-4 pb-5 containerPadding")}>
            <OneIdBreadcrumb
                linkSlug={`/screener`}
                linkLable={t(`Screener`)}
                idLable={getScreenerCompanyDataObj?.screenerIdData?.name}
            />
            <Row className={clsx("mx-0 ", styles.row)}>
                {/* heading section */}
                <Col xs={12} className='px-0'>
                    <ScreeenerHeadingCom
                        heading={getScreenerCompanyDataObj?.screenerIdData?.name}
                        para={getScreenerCompanyDataObj?.screenerIdData?.description ? getScreenerCompanyDataObj?.screenerIdData?.description : "Curated selection of company data using our powerful screener, tailored to your specified criteria."}
                    />
                </Col>

                <Col lg={3} className='px-0 '>
                    <ScreenerFilter filters={getFilterSectionObj?.filterSectionList} />
                </Col>
                <Col lg={9} className={clsx('px-0 ps-lg-4 mt-lg-0 mt-3 pb-5', styles.borderLeft)}>
                    <ScreenerDetailTable
                        dataTableHeading={screenerDetailTableHeading}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale, query }) => {
    const slug = query?.id;
    const params = {
        page: 1,
        limit: 10,
        bucketSlug: slug,
    }
    await store.dispatch(getScreenerIdData(params));
    await store.dispatch(getFilterSectionList());
    await store.dispatch(getScreenerCompanyData({
        slug: slug
    }));

    const {
        screenerIdSlice: { getScreenerIdDataObj, getFilterSectionObj, getScreenerCompanyDataObj }
    } = store.getState();

    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            getScreenerIdDataObj,
            getFilterSectionObj,
            getScreenerCompanyDataObj,
            language: locale,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
