import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Suspense } from "react";
import LoderModule from "@/components/Module/LoaderModule";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../section/Notifications/style/notifications.module.scss"
import clsx from "clsx";
import dynamic from "next/dynamic";
import { fetchCookie } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
import { getFetchAuth } from "@/store/slices/authSlice";
import { getNotificationList } from "@/store/slices/notificationSlice";
const LeftSidebar = dynamic(() => import("@/components/Module/Sidebar/LeftSidebar"))
const Notifications = dynamic(() => import("@/section/Notifications/Notifications"))

export default function ManageSubscriptionPage(props) {
    const { t } = useTranslation("common");
    const dispatch = useDispatch()
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";

    return (
        <>
            <Suspense fallback={<LoderModule />}>
                <Container className={clsx(styles.containerPadding, 'containerPadding')}>
                    <Row className={clsx("mx-0")}>
                        <Col className={clsx("px-0", styles.LeftSidebar)} lg={3} sm={12}>
                            <LeftSidebar userDetails={props?.userDetails} />
                        </Col>
                        <Col className="px-0" lg={9} sm={12}>
                            <Notifications
                                notificationListServer={props?.notificationListServer}
                                notificationTotalListServer={props?.notificationTotalListServer}
                                notificationError={props?.notificationError}
                            />
                        </Col>
                    </Row>
                </Container>
            </Suspense>
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
        limit: 10,
    }
    await store.dispatch(getNotificationList(params));

    const {
        authSlice: { userDetails },
        notificationSlice: { notificationList, notificationTotalList, loader, error }
    } = store.getState();
    secureHeader(req, res, locale);

    return {
        props: {
            data: "",
            language: locale,
            userDetails,
            notificationListServer: notificationList,
            notificationTotalListServer: notificationTotalList,
            notificationError: error,
            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
