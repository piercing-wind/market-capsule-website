import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Container, Row } from "react-bootstrap";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./style/refundPolicy.module.scss"
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { MdKeyboardBackspace } from "react-icons/md";
import Link from "next/link";
import BackButton from "@/components/Module/Button/BackButton";
import { getAboutUs } from "@/store/slices/aboutUsSlice";

export default function Home(props) {
    const { t } = useTranslation("common");
    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";
    const { getAboutUsObj } = props;
    return (
        <Container className={clsx(styles.containerPadding, "mt-3 pb-5 containerPadding")}>
            <Row className="mx-0 app">
                <BackButton />

                <h1 className="text-center mt-lg-5 mb-5">About Us</h1>

                <BlocksRenderer
                    blocks={{
                        paragraph: ({ children }) => <p className={clsx(styles.para)}>{children}</p>,
                        list: ({ children }) => <ul className={clsx(styles.list)}>{children}</ul>

                    }}
                    content={getAboutUsObj?.aboutUs?.attributes?.
                        description || []
                    }
                />
            </Row>

        </Container>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale }) => {
    await store.dispatch(getAboutUs());
    const {
        aboutUsSlice: { getAboutUsObj }
    } = store.getState();
    let fileList = getFileLangList();
    secureHeader(req, res, locale);
    return {
        props: {
            data: "",
            language: locale,
            getAboutUsObj,
            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
