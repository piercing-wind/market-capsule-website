import { useDispatch } from "react-redux";
import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { Container, Row } from "react-bootstrap";
import clsx from "clsx";
import styles from "../section/Homepage/style/home.module.scss"
import LoderModule from "@/components/Module/LoaderModule";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
const LeftHomeSection = dynamic(() => import('@/section/Homepage/LeftHomeSection/LeftHomeSection'), { suspense: true, loading: () => <LoderModule /> })
const MidleHomeSection = dynamic(() => import('@/section/Homepage/MidleHomeSection/MidleHomeSection'), { suspense: true, loading: () => <LoderModule /> })
const RightHomeSection = dynamic(() => import('@/section/Homepage/RightHomeSection/RightHomeSection'), { suspense: true, loading: () => <LoderModule /> })


export default function Home(props) {
  const { t } = useTranslation("common");

  const router = useRouter();
  router.locale = props?.language
    ? props?.language
    : "en";

  router.defaultLocale = "en";

  return (
    <Suspense fallback={<LoderModule />}>
      <Container fluid className={clsx(styles.containerPadding, "mt-3 pb-5 ")}>
        <Row className="mx-0 app">
          <LeftHomeSection />
          <MidleHomeSection />
          <RightHomeSection />
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
