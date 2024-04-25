import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Col, Container, Row } from "react-bootstrap";
import clsx from "clsx";
import LoderModule from "@/components/Module/LoaderModule";
import React, { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../../section/CapsulePlus/style/capsulePlus.module.scss"
import FilterButton from "@/components/Module/Button/FilterButton";
import LoadMoreBtn from "@/components/Module/Button/LoadMoreBtn";
import { capsulePlusCompanyCard, filterButtonData, filterData } from "@/section/CapsulePlus/capsulePlusData";
import UpgradeCard from "@/components/Module/UpgradeCard/UpgradeCard";
const ScreeenerHeadingCom = dynamic(() => import("@/components/Module/HeadingComponent/ScreenerHeadingCom"))
const ScreenerFilterAccrodian = dynamic(() => import("@/components/Module/Accrodian/ScreenerFilterAccrodian"))
const CapsulePlusCompanyCard = dynamic(() => import("@/components/Module/ScreenerCard/CapsulePlusCompanyCard"))

export default function CapsulePlusPage(props) {
    const { t } = useTranslation("common");
    const [screenerFilter, setScreenerFilter] = useState("primeArticles")
    const [itemPerPage, setItemPerPage] = useState(9)
    const [upgradeNow, setUpgradeNow] = useState(true)
    //filter based on type and section
    const functionalSectorialBucketsFilter = (type) => {
        if (type === "primeArticles") {
            setScreenerFilter("primeArticles")
        } else {
            setScreenerFilter("promoterInterview")
        }

    }

    //load more btn 
    const loadMoreFun = () => {
        console.log("load more fun")
        if (capsulePlusCompanyCard?.length > itemPerPage) {

            setItemPerPage(itemPerPage + 3)
        }
    }

    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";


    return (
        <>

            <Suspense fallback={<LoderModule />}>
                <Container fluid className={clsx(styles.containerPadding, "mt-4 pb-5 ")}>

                    <Row className={clsx("mx-0 ", styles.row)}>
                        {/* heading section */}
                        <Col xs={12} className='px-0'>
                            <ScreeenerHeadingCom
                                icon={true}
                                heading={`capsulePlusPage.capsulePlus`}
                                para={`capsulePlusPage.discover`}
                            />
                        </Col>

                        <Col lg={3} className='px-0 '>
                            <ScreenerFilterAccrodian
                                initialFilterData={filterData}
                            />

                        </Col>


                        <Col lg={9} className={clsx('px-0 ', styles.borderLeft)}>
                            <Row className={clsx("mx-0", styles.rowDiv)}>
                                {/* filter button  */}
                                <Col xs={12} className='px-0 mb-3'>
                                    <div className={clsx('d-flex column-gap-1  row-gap-2', styles.filterButtonDiv)}>
                                        {
                                            filterButtonData?.map((el, index) => {
                                                return (

                                                    <FilterButton
                                                        key={index}
                                                        color={screenerFilter === el?.type ? "#FFFFFF" : "#606F7B"}
                                                        bg={screenerFilter === el?.type ? "#000000" : "#DFE2E4"}
                                                        handlerFun={functionalSectorialBucketsFilter}
                                                        label={el?.label}
                                                        type={el?.type}
                                                        pLeft={"16px"}
                                                        pRight={"16px"}
                                                    />

                                                )
                                            })
                                        }

                                    </div>

                                </Col>

                                <Col xs={12}
                                    className={clsx("px-0", styles.cardSection)}
                                >
                                    <Row className={clsx("mx-0")}>
                                        {
                                            capsulePlusCompanyCard?.length > 0 ? (
                                                capsulePlusCompanyCard?.slice(0, itemPerPage)?.map((el, index) => {
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
                                            capsulePlusCompanyCard?.length > 10 && (
                                                <LoadMoreBtn data={capsulePlusCompanyCard} itemPerpage={itemPerPage} loadMoreFun={loadMoreFun} />
                                            )
                                        }

                                    </Row>
                                </Col>
                            </Row>

                        </Col>

                    </Row>

                </Container>
                {
                    upgradeNow && (
                        <UpgradeCard />
                    )
                }
            </Suspense>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale }) => {

    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            language: locale,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
