import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Col, Container, Row } from "react-bootstrap";
import clsx from "clsx";
import LoderModule from "@/components/Module/LoaderModule";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "../../section/Screener/ScreenerDetailPage/style/screenerDetail.module.scss"
import { filterData, screenerDetailTableData, screenerDetailTableHeading } from "@/section/Screener/ScreenerDetailPage/screenerDetailPageData";
const OneIdBreadcrumb = dynamic(() => import("@/components/Module/Breadcrumb/OneIdBreadcrumb"))
const ScreeenerHeadingCom = dynamic(() => import("@/components/Module/HeadingComponent/ScreenerHeadingCom"))
const ScreenerFilterAccrodian = dynamic(() => import("@/components/Module/Accrodian/ScreenerFilterAccrodian"))
const ScreenerDetailTable = dynamic(() => import("@/section/Screener/ScreenerDetailPage/ScreenerDetailTable"))


export default function Home(props) {
    const { t } = useTranslation("common");
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";
    return (

        <Suspense fallback={<LoderModule />}>
            <Container fluid className={clsx(styles.containerPadding, "mt-4 pb-5 ")}>

                <OneIdBreadcrumb
                    linkSlug={`/screener`}
                    linkLable={t(`Screener`)}
                    idLable={`Capacity Expansions & New Product Launches`}
                />
                <Row className={clsx("mx-0 ", styles.row)}>
                    {/* heading section */}
                    <Col xs={12} className='px-0'>
                        <ScreeenerHeadingCom
                            heading={"Capacity Expansions & New Product Launches"}
                            para={"Curated selection of company data using our powerful screener, tailored to your specified criteria."}
                        />
                    </Col>

                    <Col lg={3} className='px-0 '>
                        <ScreenerFilterAccrodian
                            initialFilterData={filterData}
                        />

                    </Col>
                    <Col lg={9} className={clsx('px-0 ps-lg-4 mt-lg-0 mt-3 pb-5', styles.borderLeft)}>
                        <ScreenerDetailTable
                            dataTable={screenerDetailTableData}
                            dataTableHeading={screenerDetailTableHeading} />
                    </Col>

                </Row>

            </Container>

        </Suspense>
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
