import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "next-i18next";
import { getFileLangList } from "@/middleware/getProps";
import { secureHeader } from "@/middleware/securityHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Link from "next/link";
import { wrapper } from "@/store";


export default function Home(props) {
  const { t } = useTranslation("common");

  const dispatch = useDispatch()
  const router = useRouter();
  router.locale = props?.language
    ? props?.language
    : "en";

  router.defaultLocale = "en";


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >

        {/* {
          router?.locale === "ar" ? (
            <Link href={router?.asPath} passHref locale={"en"}> English</Link>
          ) : (

            <Link href={router?.asPath} passHref locale={"ar"}> العربية</Link>

          )
        } */}

      </main>
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
