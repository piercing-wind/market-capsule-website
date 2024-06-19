import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Container, Row } from "react-bootstrap";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./style/privacyPolicy.module.scss"
import { getPrivacyPolicy } from "@/store/slices/privacyPolicySlice";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default function Home(props) {
    const { t } = useTranslation("common");
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";
    const { getPrivacyPolicyObj } = props;
    return (
        <Container className={clsx(styles.containerPadding, "mt-3 pb-5 containerPadding")}>
            <Row className="mx-0 app">
                <h1 className="text-center mt-5 mb-5">Privacy Policy</h1>

                <BlocksRenderer
                    blocks={{
                        paragraph: ({ children }) => <p className={clsx(styles.para)}>{children}</p>,
                        list: ({ children }) => <ul className={clsx(styles.list)}>{children}</ul>

                    }}
                    content={getPrivacyPolicyObj?.privacyAndPolicy?.attributes?.
                        description || []
                    }
                />
            </Row>

        </Container>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale }) => {
    await store.dispatch(getPrivacyPolicy());
    const {
        privacyPolicySlice: { getPrivacyPolicyObj }
    } = store.getState();
    let fileList = getFileLangList();
    secureHeader(req, res, locale);
    return {
        props: {
            data: "",
            language: locale,
            getPrivacyPolicyObj,
            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
