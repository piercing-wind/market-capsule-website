import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Suspense, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import clsx from "clsx";
import styles from "../../section/Screener/style/screener.module.scss"
import dynamic from "next/dynamic";
import { cardData, filterButtonData } from "@/section/Screener/screenerData";
const LoderModule = dynamic(() => import("@/components/Module/LoaderModule"))
const ScreeenerHeadingCom = dynamic(() => import("@/components/Module/HeadingComponent/ScreenerHeadingCom"))
const FilterButton = dynamic(() => import("@/components/Module/Button/FilterButton"))
const CompanyCard = dynamic(() => import("@/components/Module/ScreenerCard/CompanyCard"))




export default function CapsulePlusPage(props) {
    const { t } = useTranslation("common");
    const [screenerFilter, setScreenerFilter] = useState("functional")
    const [itemPerPage, setItemPerPage] = useState(9)

    const dispatch = useDispatch()
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";

    //filter based on type and section
    const functionalSectorialBucketsFilter = (type) => {
        if (type === "functional") {
            setScreenerFilter("functional")
        } else if (type === "sectoral") {
            setScreenerFilter("sectoral")
        } else {
            setScreenerFilter("importantBuckets")
        }

    }

    //load more btn 
    const loadMoreFun = () => {
        console.log("load more fun")
        if (cardData?.length > itemPerPage) {

            setItemPerPage(itemPerPage + 3)
        }
    }
    console.log("cardData?.length", cardData?.length)

    console.log("itemPerPage", itemPerPage)

    return (
        <>

            <Suspense fallback={<LoderModule />}>
                <Container fluid className={clsx(styles.containerPadding, "mt-4  ")}>
                    <Row className={clsx("mx-0 app")}>
                        {/* heading section */}
                        <Col xs={12} className='px-0'>
                            <ScreeenerHeadingCom
                                heading={"screener.screener"}
                                para={"Curated selection of company data using our powerful screener, tailored to your specified criteria."}
                            />
                        </Col>
                        {/* filter button  */}
                        <Col xs={12} className='px-xl-5 pt-4 pb-3 px-3'>
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

                        <Col xs={12} className={clsx(styles.cardSection)} >
                            <Row className={clsx("mx-0")}>
                                {
                                    cardData?.length > 0 ? (
                                        cardData?.slice(0, itemPerPage)?.map((el, index) => {
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

                                <button className={clsx(styles.loadMoreBtn, "mt-3 ")} onClick={loadMoreFun}>
                                    <span >
                                        {
                                            cardData?.length < itemPerPage ? (
                                                t("homepage.midleSection.noMoreData")
                                            ) : (
                                                t("homepage.midleSection.loadMorePlus")
                                            )
                                        }
                                    </span>



                                </button>
                            </Row>
                        </Col>

                    </Row>



                </Container>

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
