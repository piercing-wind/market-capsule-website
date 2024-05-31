import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Suspense, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import clsx from "clsx";
import styles from "../../section/Screener/style/screener.module.scss"
import dynamic from "next/dynamic";
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
import { getBucketList, getFilterList, getScreenerHeading, setBucketCurrentPage, setBucketList, setBucketListEmpty, setBucketTotalList } from "@/store/slices/screenerSlice";
import LoadMoreBtn from "@/components/Module/Button/LoadMoreBtn";
const ScreeenerHeadingCom = dynamic(() => import("@/components/Module/HeadingComponent/ScreenerHeadingCom"))
const FilterButton = dynamic(() => import("@/components/Module/Button/FilterButton"))
const CompanyCard = dynamic(() => import("@/components/Module/ScreenerCard/CompanyCard"))

export default function CapsulePlusPage(props) {
    const { t } = useTranslation("common");
    const [screenerFilter, setScreenerFilter] = useState(0)
    const dispatch = useDispatch();
    const {
        bucketObj,
        getFilterObj,
        getScreenerHeadingObj } = props;

    const { bucketLoading, bucketList, bucketCurrentPage, bucketTotalList } = useSelector((state) => ({
        bucketList: state?.screenerSlice?.bucketObj?.bucketList,
        bucketCurrentPage: state?.screenerSlice?.bucketObj?.bucketCurrentPage,
        bucketTotalList: state?.screenerSlice?.bucketObj?.bucketTotalList,
        bucketLoading: state?.screenerSlice?.bucketObj?.loading,
    }), shallowEqual)


    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";

    //filter based on type and section
    const functionalSectorialBucketsFilter = async (type) => {
        setScreenerFilter(type)
        dispatch(setBucketListEmpty())
        const bucketParams = {
            page: 1,
            limit: 9,
            categoryId: type !== 0 ? type : ""
        }

        dispatch(setBucketCurrentPage(2))
        await dispatch(getBucketList(bucketParams))
    }

    //load more btn 
    const loadMoreFun = async () => {
        const bucketParams = {
            page: bucketCurrentPage,
            limit: 9,
            categoryId: screenerFilter !== 0 ? screenerFilter : ""
        }

        await dispatch(getBucketList(bucketParams))
        dispatch(setBucketCurrentPage(bucketCurrentPage + 1))
    }

    //set server data to client side
    useEffect(() => {

        if (bucketList?.length === 0) {
            dispatch(setBucketList(bucketObj?.bucketList))
            dispatch(setBucketTotalList(bucketObj?.bucketTotalList))
            dispatch(setBucketCurrentPage(bucketCurrentPage + 1))

        }
    }, [dispatch]);

    return (
        <>
            <Container fluid className={clsx(styles.containerPadding, "mt-4  ")}>
                <Row className={clsx("mx-0 app")}>
                    {/* heading section */}
                    <Col xs={12} className='px-0'>
                        <ScreeenerHeadingCom
                            heading={getScreenerHeadingObj?.screenerHeadingData?.attributes?.Title}
                            para={getScreenerHeadingObj?.screenerHeadingData?.attributes?.description}
                        />
                    </Col>
                    {/* filter button  */}
                    <Col xs={12} className='px-xl-5 pt-4 pb-3 px-3'>
                        <div className={clsx('d-flex column-gap-1  row-gap-2', styles.filterButtonDiv)}>
                            {
                                getFilterObj?.filterList?.length > 0 && (
                                    getFilterObj?.filterList?.map((el, index) => {
                                        return (
                                            <FilterButton
                                                key={index}
                                                color={screenerFilter === el?.id ? "#FFFFFF" : "#606F7B"}
                                                bg={screenerFilter === el?.id ? "#000000" : "#DFE2E4"}
                                                handlerFun={(type) => {
                                                    if (el?.id !== screenerFilter) {
                                                        functionalSectorialBucketsFilter(type)
                                                    }
                                                }}
                                                label={el?.attributes?.name}
                                                type={el?.id}
                                                pLeft={"16px"}
                                                pRight={"16px"}
                                                disable={screenerFilter === el?.id ? true : false}
                                            />
                                        )
                                    })
                                )
                            }
                        </div>
                    </Col>

                    <Col xs={12} className={clsx(styles.cardSection)} >
                        <Row className={clsx("mx-0")}>
                            {
                                bucketList?.length > 0 ? (
                                    bucketList?.map((el, index) => {
                                        return (
                                            <Col
                                                key={index}
                                                lg={4} md={6}
                                                className={clsx('ps-md-2 ps-0 pe-0 pe-md-2  pb-3 ')}
                                            >
                                                <CompanyCard
                                                    dataObj={el}
                                                />
                                            </Col>
                                        )
                                    })
                                ) : null
                            }

                            <div className={clsx(styles.loadMoreBtn, "mt-3")} >
                                {bucketList?.length > 8 && (
                                    <LoadMoreBtn
                                        totalList={bucketTotalList}
                                        loading={bucketLoading}
                                        data={bucketList}
                                        loadMoreFun={loadMoreFun} />
                                )
                                }
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale }) => {
    let userActive = fetchCookie("_jwt", req.headers);
    setAuthorizationToken(userActive);

    const filterParams = {
        page: 1,
        limit: 9,
        sort: "createdAt:desc",
    }
    const bucketParams = {
        page: 1,
        limit: 9,
        categoryId: ``
    }
    await store.dispatch(getScreenerHeading());
    await store.dispatch(getFilterList(filterParams));
    await store.dispatch(getBucketList(bucketParams));

    const {
        screenerSlice: { getScreenerHeadingObj, getFilterObj, bucketObj, seoObj },
    } = store.getState();
    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            bucketObj,
            getScreenerHeadingObj,
            getFilterObj,
            language: locale,
            seo: seoObj?.seo,
            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
