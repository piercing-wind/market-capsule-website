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
import React, { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { companyData, companyTableHeading } from "@/section/Watchlist/watchlistData";
import { getWatchListData, getWatchListHeader, setError, setWatchList, setWatchListCurrentPage, setWatchListTotalList } from "@/store/slices/watchListSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
const ScreeenerHeadingCom = dynamic(() => import("@/components/Module/HeadingComponent/ScreenerHeadingCom"))
const WatchlistTable = dynamic(() => import("@/components/Module/Table/WatchlistTable"))
const EmptyWatchlistCard = dynamic(() => import("@/section/Watchlist/EmptyWatchlistCard"))

export default function WatchlistPage(props) {
    const { t } = useTranslation("common");
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";
    const dispatch = useDispatch();
    const { getWatchListObj, getWatchListHeaderObj } = props;
    const { watchList, watchListError, watchListCurrentPage } = useSelector((state) => ({
        watchList: state?.watchListSlice?.getWatchListObj?.watchList,
        watchListError: state?.watchListSlice?.getWatchListObj?.error,
        watchListCurrentPage: state?.watchListSlice?.getWatchListObj?.watchListCurrentPage,

    }), shallowEqual)


    //set server data to client side
    useEffect(() => {
        if (watchList?.length === 0 && getWatchListObj?.error === false) {
            dispatch(setWatchList(getWatchListObj?.watchList))
            dispatch(setWatchListTotalList(getWatchListObj?.watchListTotalList))
            dispatch(setWatchListCurrentPage(watchListCurrentPage + 1))
        } else if (getWatchListObj?.error) {
            toast.error(`something went wrong`)
        }
    }, [dispatch]);


    return (
        <>
            <Container fluid className={clsx(styles.containerPadding, "mt-4  ")}>
                <Row className="mx-0 app">
                    {/* heading section */}
                    <Col xs={12} className='px-0'>
                        <ScreeenerHeadingCom
                            heading={getWatchListHeaderObj?.watchListHeading ? getWatchListHeaderObj?.watchListHeading : "watchlist.myWatchlist"}
                            para={getWatchListHeaderObj?.watchListHeading ? getWatchListHeaderObj?.watchListDescription : "Monitor stocks by adding them to your Watchlist"}
                        />
                    </Col>
                    {
                        watchList?.length > 0 ? (
                            <Col xs={12} className='ps-4 pe-0 '>
                                <WatchlistTable companyData={companyData} companyTableHeading={companyTableHeading} />

                            </Col>

                        ) : (
                            <Col xs={12} className='px-xl-4 px-4 '>
                                <EmptyWatchlistCard />
                            </Col>
                        )
                    }

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
        sort: "highLowDayLow",
    }
    await store.dispatch(getWatchListHeader());
    await store.dispatch(getWatchListData(params));
    const {
        watchListSlice: { getWatchListObj, getWatchListHeaderObj }
    } = store.getState();

    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            getWatchListObj,
            getWatchListHeaderObj,
            language: locale,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
