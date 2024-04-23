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
import styles from "../../section/Ipo/style/ipo.module.scss"
import { filterData, ipoTableData, ipoTableHeading } from "@/section/Ipo/ipoData";
import SectorAutofillDropdown from "@/components/Module/Dropdown/SectorAutofillDropdown";
const ScreeenerHeadingCom = dynamic(() => import("@/components/Module/HeadingComponent/ScreenerHeadingCom"))
const ScreenerFilterAccrodian = dynamic(() => import("@/components/Module/Accrodian/ScreenerFilterAccrodian"))
const IpoTable = dynamic(() => import("@/section/Ipo/IpoTable"))

export default function CapsulePlusPage(props) {
    const { t } = useTranslation("common");
    const [coachValue, setCoachValue] = useState("")
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
                                heading={"ipoPage.ipoZone"}
                                para={"ipoPage.exploreTheLatest"}
                            />
                        </Col>

                        <Col lg={3} className='px-0 '>
                            <ScreenerFilterAccrodian
                                initialFilterData={filterData}
                            />

                        </Col>
                        <Col lg={9} className={clsx('px-0 ps-lg-4 mt-lg-0 mt-3 pb-5', styles.borderLeft)}>
                            <IpoTable
                                dataTable={ipoTableData}
                                dataTableHeading={ipoTableHeading} />
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
