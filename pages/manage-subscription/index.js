import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Suspense, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../section/ManageSubscription/style/manageSubscription.module.scss"
import clsx from "clsx";
import dynamic from "next/dynamic";
import { getFetchAuth } from "@/store/slices/authSlice";
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
import { getSubscriptionList, setSubscriptionList, setSubscriptionListCurrentPage, setSubscriptionListTotalList } from "@/store/slices/manageSubscriptionSlice";
import toast from "react-hot-toast";
const LeftSidebar = dynamic(() => import("@/components/Module/Sidebar/LeftSidebar"))
const ManageSubscription = dynamic(() => import("@/section/ManageSubscription/ManageSubscription"))


export default function ManageSubscriptionPage(props) {
    const { t } = useTranslation("common");

    const dispatch = useDispatch()
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";
    const { getSubscriptionObj } = props;
    const { subscriptionList, subscriptionListCurrentPage } = useSelector((state) => ({
        subscriptionList: state?.manageSubscriptionSlice?.getSubscriptionObj?.subscriptionList,
        subscriptionListCurrentPage: state?.manageSubscriptionSlice?.getSubscriptionObj?.subscriptionListCurrentPage,

    }), shallowEqual)

    //set server data to client side
    useEffect(() => {
        if (subscriptionList?.length === 0 && getSubscriptionObj?.error === false) {
            dispatch(setSubscriptionList(getSubscriptionObj?.subscriptionList))
            dispatch(setSubscriptionListTotalList(getSubscriptionObj?.subscriptionTotalList))
            dispatch(setSubscriptionListCurrentPage(subscriptionListCurrentPage + 1))
        } else if (getSubscriptionObj?.error) {
            toast.error(`something went wrong`)

        }
    }, [dispatch]);


    return (
        <>
            <Container fluid className={clsx(styles.containerPadding)}>
                <Row className={clsx("mx-0")}>

                    <Col className={clsx("px-0", styles.LeftSidebar)} lg={3} sm={12}>
                        <LeftSidebar userDetails={props?.userDetails} />
                    </Col>
                    <Col className="px-0" lg={9} sm={12}>
                        <ManageSubscription />
                    </Col>

                </Row>
            </Container>

        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale }) => {
    let userActive = fetchCookie("_jwt", req.headers);
    setAuthorizationToken(userActive);
    let fileList = getFileLangList();
    await store.dispatch(getFetchAuth());
    const params = {
        page: 1,
        limit: 5,
    }
    await store.dispatch(getSubscriptionList(params));

    const {
        authSlice: { userDetails },
        manageSubscriptionSlice: { getSubscriptionObj }
    } = store.getState();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            language: locale,
            userDetails,
            getSubscriptionObj,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
