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
import styles from "../../section/AccountSettings/style/accountSettings.module.scss"
import clsx from "clsx";
import dynamic from "next/dynamic";
const LeftSidebar = dynamic(() => import("@/components/Module/Sidebar/LeftSidebar"))
const AccountSettingsSection = dynamic(() => import("@/section/AccountSettings/AccountSettingsSection"))


export default function AccountSettingsPage(props) {
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

                        <Col className="px-0" md={3} sm={4}>
                            <LeftSidebar />

                        </Col>
                        <Col className="px-0" md={9} sm={8}>
                            <AccountSettingsSection />
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
