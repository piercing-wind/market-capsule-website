import { useDispatch, useSelector, shallowEqual } from "react-redux";
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
import { fetchTodos } from "@/store/slices/homePageSlice";
import { getFetchAuth, getProfessionList, getProfile } from "@/store/slices/authSlice";
import { fetchCookie, getCookiesStorage } from "@/utils/storageService";
import { setAuthorizationToken } from "@/utils/apiServices";
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
                            <LeftSidebar userDetails={props?.userDetails} />

                        </Col>
                        <Col className="px-0" md={9} sm={8}>
                            <AccountSettingsSection userDetails={props?.userDetails} />
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
    const { authSlice: { userDetails } } = store.getState();
    secureHeader(req, res, locale);
    return {
        props: {
            data: "",
            language: locale,
            userDetails,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
