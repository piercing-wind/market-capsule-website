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
                <Container fluid className={clsx(styles.containerPadding)}>
                    <Row className={clsx("mx-0")}>

                        <Col className={clsx("px-0", styles.LeftSidebar)} lg={3} sm={12}>
                            <LeftSidebar />
                        </Col>
                        <Col className="px-0" lg={9} sm={12}>
                            <Notifications />
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
