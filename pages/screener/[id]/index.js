import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Col, Container, Row } from "react-bootstrap";
import clsx from "clsx";
import LoderModule from "@/components/Module/LoaderModule";
import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../../../section/Screener/ScreenerDetailPage/style/screenerDetail.module.scss"
import { screenerDetailTableHeading } from "@/section/Screener/ScreenerDetailPage/screenerDetailPageData";
import { getFilterSectionList, getScreenerIdData, setCompanyList, setCompanyListCurrentPage, setCompanyListEmpty, setCompanyListTotalList } from "@/store/slices/screenerIdSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
const OneIdBreadcrumb = dynamic(() => import("@/components/Module/Breadcrumb/OneIdBreadcrumb"))
const ScreeenerHeadingCom = dynamic(() => import("@/components/Module/HeadingComponent/ScreenerHeadingCom"))
const ScreenerFilterAccrodian = dynamic(() => import("@/components/Module/Accrodian/ScreenerFilterAccrodian"))
const ScreenerDetailTable = dynamic(() => import("@/section/Screener/ScreenerDetailPage/ScreenerDetailTable"))



const DynamicFilter = ({ filters }) => {
    const [filterState, setFilterState] = useState({});
    const router = useRouter();
    const dispatch = useDispatch();
    const applyFilters = async () => {
        const params = {
            page: 1,
            limit: 10,
            slug: router?.query?.id,
            sort: "",
        };
        Object.entries(filterState).forEach(([key, value]) => {
            if (key === 'pe') {
                value.forEach(v => {
                    const [val, operator] = v.split('+');
                    params[`pe${operator.charAt(0).toUpperCase() + operator.slice(1)}`] = val;

                });
            } else if (key === 'marketCap') {
                value.forEach(v => {
                    const [val, operator] = v.split('+');
                    params[`marketCap${operator.charAt(0).toUpperCase() + operator.slice(1)}`] = val;
                });
            } else {
                params[key] = value[value?.length - 1] ? value[value?.length - 1] : "";
            }
        });
        console.log("params", params)
        dispatch(setCompanyListEmpty());
        await dispatch(getScreenerIdData(params));
        dispatch(setCompanyListCurrentPage(2));
    };

    const handleFilterChange = async (e, filterName) => {
        const { name, value, type, checked } = e.target;
        setFilterState(prevState => {
            const newState = { ...prevState };

            if (checked) {
                if (!newState[filterName]) {
                    newState[filterName] = [];
                }
                newState[filterName].push(value);
            } else {
                newState[filterName] = newState[filterName].filter(val => val !== value);
            }

            return newState;
        });
    };




    useEffect(() => {
        if (Object.keys(filterState).length > 0) {
            applyFilters()
        }
    }, [filterState])
    return (
        <div className="filter-container">
            {filters.map(filter => (
                <div className="form-group" key={filter.filterName}>
                    <label>{filter.name}</label>
                    {filter.detail.map(option => (
                        <div key={option.id || option.name}>
                            <input
                                type="checkbox"
                                name={option.name}
                                value={option.id || (option.lte ? + option.lte + '+lte' : option.gte + '+gte')}
                                onChange={(e) => handleFilterChange(e, filter.filterName)}
                                id={option.name + filter.filterName}
                            /> <label htmlFor={option.name + filter.filterName}>{option.name}</label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};


export default function Home(props) {
    const { t } = useTranslation("common");
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";
    const dispatch = useDispatch();
    const { getScreenerIdDataObj, getFilterSectionObj } = props;
    const { companyList, companyListCurrentPage } = useSelector((state) => ({
        companyList: state?.screenerIdSlice?.getScreenerIdDataObj?.companyList,
        companyListCurrentPage: state?.screenerIdSlice?.getScreenerIdDataObj?.companyListCurrentPage,

    }), shallowEqual)
    // console.log("getFilterSectionObj", getFilterSectionObj)
    //set server data to client side
    useEffect(() => {
        if (companyList?.length === 0 && getScreenerIdDataObj?.error === false) {
            dispatch(setCompanyList(getScreenerIdDataObj?.companyList))
            dispatch(setCompanyListTotalList(getScreenerIdDataObj?.companyTotalList))
            dispatch(setCompanyListCurrentPage(companyListCurrentPage + 1))
        } else if (getScreenerIdDataObj?.error) {
            toast.error(`something went wrong`)
        }
    }, [dispatch]);


    return (

        <Container fluid className={clsx(styles.containerPadding, "mt-4 pb-5 ")}>

            <OneIdBreadcrumb
                linkSlug={`/screener`}
                linkLable={t(`Screener`)}
                idLable={getScreenerIdDataObj?.screenerIdData?.name}
            />
            <Row className={clsx("mx-0 ", styles.row)}>
                {/* heading section */}
                <Col xs={12} className='px-0'>
                    <ScreeenerHeadingCom
                        heading={getScreenerIdDataObj?.screenerIdData?.name}
                        para={getScreenerIdDataObj?.screenerIdData?.description ? getScreenerIdDataObj?.screenerIdData?.description : "Curated selection of company data using our powerful screener, tailored to your specified criteria."}
                    />
                </Col>

                <Col lg={3} className='px-0 '>
                    {/* <ScreenerFilterAccrodian
                        initialFilterData={getFilterSectionObj?.filterSectionList}
                    /> */}

                    <DynamicFilter filters={getFilterSectionObj?.filterSectionList} />

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
        slug: slug,
        sort: "",
        companyTypeId: "",
        peGte: "",
        peLte: "",
        marketCapLte: "",
        marketCapGte: ""
    }
    await store.dispatch(getScreenerIdData(params));
    await store.dispatch(getFilterSectionList());

    const {
        screenerIdSlice: { getScreenerIdDataObj, getFilterSectionObj }
    } = store.getState();



    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            getScreenerIdDataObj,
            getFilterSectionObj,
            language: locale,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
