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
import styles from "../../section/CapsulePlus/style/capsulePlus.module.scss"
import LoadMoreBtn from "@/components/Module/Button/LoadMoreBtn";
import UpgradeCard from "@/components/Module/UpgradeCard/UpgradeCard";
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
import { getCapsulePlusCompanyData, getCapsulePlusHeadingData, getFilterSectionList, setCompanyList, setCompanyListCurrentPage, setCompanyListEmpty, setCompanyListTotalList } from "@/store/slices/capsulePlusSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getSharePriceAndVolume } from "@/store/slices/capsuleDetailSlice";
const ScreeenerHeadingCom = dynamic(() => import("@/components/Module/HeadingComponent/ScreenerHeadingCom"))
const CapsulePlusFilter = dynamic(() => import("@/components/Module/Accrodian/CapsulePlusFilter"))
const CapsulePlusCompanyCard = dynamic(() => import("@/components/Module/ScreenerCard/CapsulePlusCompanyCard"))

export default function CapsulePlusPage(props) {
    const { t } = useTranslation("common");
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";
    const { getCapsulePlusCompanyDataObj, getFilterSectionObj, getCapsulePlusCompanyHeadingObj } = props;
    const { capsulePlus } = getCapsulePlusCompanyDataObj;
    const { capsulePlusHeadingData } = getCapsulePlusCompanyHeadingObj;
    console.log("getCapsulePlusCompanyDataObj", getCapsulePlusCompanyDataObj)
    console.log("getFilterSectionObj", getFilterSectionObj)

    const dispatch = useDispatch();
    const { loading, userDetails, companyTypeId, sectorId, industryId, companyName, companyList, companyListCurrentPage, companyTotalList } = useSelector((state) => ({
        companyList: state?.capsulePlusSlice?.getCapsulePlusCompanyDataObj?.companyList,
        companyListCurrentPage: state?.capsulePlusSlice?.getCapsulePlusCompanyDataObj?.companyListCurrentPage,
        companyTotalList: state?.capsulePlusSlice?.getCapsulePlusCompanyDataObj?.companyTotalList,
        loading: state?.capsulePlusSlice?.getCapsulePlusCompanyDataObj?.loading,
        companyTypeId: state?.capsulePlusSlice?.getCapsulePlusCompanyDataObj?.companyTypeId,
        sectorId: state?.capsulePlusSlice?.getCapsulePlusCompanyDataObj?.sectorId,
        industryId: state?.capsulePlusSlice?.getCapsulePlusCompanyDataObj?.industryId,
        companyName: state?.capsulePlusSlice?.getCapsulePlusCompanyDataObj?.companyName,
        userDetails: state?.authSlice?.userDetails

    }), shallowEqual)




    //load more btn 
    const loadMoreFun = async () => {
        const params = {
            page: companyListCurrentPage,
            limit: 9,
            capsuleplus: true,

            companyTypeId: companyTypeId || '',
            sectorId: sectorId || "",
            industryId: industryId || "",
            companyName: companyName || "",

        }
        await dispatch(getCapsulePlusCompanyData(params))
        dispatch(setCompanyListCurrentPage(companyListCurrentPage + 1))
    }

    //set server data to client side
    useEffect(() => {
        if (getCapsulePlusCompanyDataObj?.error === false) {
            dispatch(setCompanyListEmpty())
            dispatch(setCompanyList(getCapsulePlusCompanyDataObj?.companyList))
            dispatch(setCompanyListTotalList(getCapsulePlusCompanyDataObj?.companyTotalList))
            dispatch(setCompanyListCurrentPage(companyListCurrentPage + 1))
        } else if (getCapsulePlusCompanyDataObj?.error) {
            toast.error(`something went wrong`)
        }
    }, [dispatch]);


    return (
        <>


            <Container fluid className={clsx(styles.containerPadding, "mt-4 pb-5 ")}>

                <Row className={clsx("mx-0 ", styles.row)}>
                    {/* heading section */}
                    <Col xs={12} className='px-0'>
                        <ScreeenerHeadingCom
                            icon={true}
                            heading={capsulePlus ? capsulePlusHeadingData?.attributes?.title : `Hi! ${userDetails?.fullName}`}
                            para={capsulePlusHeadingData?.attributes?.description || `capsulePlusPage.discover`}
                        />
                    </Col>

                    <Col lg={3} className='px-0 '>
                        <CapsulePlusFilter
                            filters={getFilterSectionObj?.filterSectionList}
                        />

                    </Col>


                    <Col lg={9} className={clsx('px-0 ', styles.borderLeft)}>
                        <Row className={clsx("mx-0", styles.rowDiv)}>

                            <Col xs={12}
                                className={clsx("px-0", styles.cardSection)}
                            >
                                <Row className={clsx("mx-0")}>
                                    {
                                        companyList?.length > 0 ? (
                                            companyList?.map((el, index) => {
                                                return (
                                                    <Col
                                                        key={index}
                                                        lg={4} md={6}
                                                        className={clsx('ps-md-2 ps-0 pe-0 pe-md-2  pb-0 ')}

                                                    >
                                                        <CapsulePlusCompanyCard
                                                            dataObj={el}
                                                        />

                                                    </Col>
                                                )
                                            })

                                        ) : null
                                    }

                                    {
                                        companyList?.length > 9 && (
                                            <LoadMoreBtn
                                                totalList={companyTotalList}
                                                loading={loading}
                                                data={companyList}
                                                loadMoreFun={loadMoreFun}
                                            />
                                        )
                                    }

                                </Row>
                            </Col>
                        </Row>

                    </Col>

                </Row>

            </Container>
            {
                capsulePlus && (
                    <UpgradeCard />
                )
            }
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale }) => {
    let userActive = fetchCookie("_jwt", req.headers);
    setAuthorizationToken(userActive);
    const params = {
        page: 1,
        limit: 9,
        capsuleplus: true
    }


    await store.dispatch(getCapsulePlusCompanyData(params));
    await store.dispatch(getFilterSectionList());
    await store.dispatch(getCapsulePlusHeadingData());

    const {
        capsulePlusSlice: { getCapsulePlusCompanyDataObj, getFilterSectionObj, getCapsulePlusCompanyHeadingObj, seoObj }
    } = store.getState();

    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            language: locale,
            getCapsulePlusCompanyDataObj,
            getFilterSectionObj,
            getCapsulePlusCompanyHeadingObj,
            seo: seoObj?.seo,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
