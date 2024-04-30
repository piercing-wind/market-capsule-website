import { useDispatch } from "react-redux";
import { useTranslation, Trans } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Suspense } from "react";
import LoderModule from "@/components/Module/LoaderModule";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../section/Subscription/style/subscription.module.scss"
import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import { setShowForm } from "@/store/slices/subscriptionSlice";
const PlanCard = dynamic(() => import("@/section/Subscription/PlanCard"))
const OrderSummaryCard = dynamic(() => import("@/section/Subscription/OrderSummaryCard"))
const PromoCodeModal = dynamic(() => import("@/components/Module/Modal/PromoCodeModal"))


export default function SubscriptionPage(props) {
    const { t } = useTranslation("common");

    const dispatch = useDispatch()
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";

    const addPromoCodeFun = () => {
        console.log('coli')
        dispatch(setShowForm(true))

    }
    return (
        <>

            <Suspense fallback={<LoderModule />}>
                <Container fluid className={clsx(styles.containerPadding)}>
                    <Row className={clsx("mx-0 ")}>
                        <Col className={clsx("px-0 pe-md-3 ", styles.colDiv)} md={7} sm={12}>
                            <p>
                                <Trans i18nKey={"subscriptionPage.plan"}>
                                    PLAN
                                </Trans>
                            </p>
                            <hr />
                            <PlanCard />
                            <div style={{ marginTop: "20px" }}>
                                <Image className="w-100 h-auto" src="/assests/subscription/payment-logo.png" alt="payment-image" width="390" height="32" />
                            </div>
                        </Col>

                        <Col className={clsx("px-0 mt-md-0 mt-4", styles.colDiv)} md={5} sm={12}>
                            <p className="d-flex justify-content-between">
                                <span>
                                    <Trans i18nKey={"subscriptionPage.orderSummary"}>

                                        ORDER SUMMARY
                                    </Trans>
                                </span>
                                <button className={clsx(styles.addPromoCode)} onClick={addPromoCodeFun}>
                                    <Trans i18nKey={"subscriptionPage.addPromoCode"}>

                                        + Add Promo Code
                                    </Trans>
                                </button>
                            </p>
                            <hr />
                            <OrderSummaryCard />
                        </Col>

                    </Row>
                </Container>
                {/* promo code modal */}
                <PromoCodeModal />

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
