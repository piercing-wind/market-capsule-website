import { useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Container, Row, Col } from "react-bootstrap";
import clsx from "clsx";
import styles from "../../section/Watchlist/style/watchlist.module.scss"
import LoderModule from "@/components/Module/LoaderModule";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import WatchlistTable from "@/components/Module/Table/WatchlistTable";
import { companyData, companyTableHeading } from "@/section/Watchlist/watchlistData";
const ScreeenerHeadingCom = dynamic(() => import("@/components/Module/HeadingComponent/ScreenerHeadingCom"))



export default function WatchlistPage(props) {
    const { t } = useTranslation("common");

    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";

    return (
        <Suspense fallback={<LoderModule />}>
            <Container fluid className={clsx(styles.containerPadding, "mt-4  ")}>
                <Row className="mx-0 app">
                    {/* heading section */}
                    <Col xs={12} className='px-0'>
                        <ScreeenerHeadingCom
                            heading={"watchlist.myWatchlist"}
                            para={"Add Stocks to your Watchlist to start tracking them here."}
                        />
                    </Col>
                    <Col xs={12} className='ps-4 pe-0 '>
                        <WatchlistTable companyData={companyData} companyTableHeading={companyTableHeading} />
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
