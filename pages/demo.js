import { useDispatch, useSelector, shallowEqual } from "react-redux";
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
import React, { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchTodos } from "@/store/slices/homePageSlice";


/**
 * Represents a Demo component.
 *
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The rendered Demo component.
 */
export default function Demo(props) {
    const { t } = useTranslation("common");
    const dispatch = useDispatch();
    const { isLoading, data, isError } = useSelector((state) => (
        {
            isLoading: state?.homePageSlice?.isLoading || props?.isLoading,
            data: state?.homePageSlice?.data || props?.data,
            isError: state?.homePageSlice?.isError,
        }
    ), shallowEqual)


    const router = useRouter();
    router.locale = props?.language
        ? props?.language
        : "en";

    router.defaultLocale = "en";
    // 
    //give simple sum function
    const sum = (a, b) => {
        return a + b;
    }
    //give optimize sum function
    const sumOptimize = (a, b) => a + b;
    //give more optimze sum function    

    return (
        <Suspense fallback={<LoderModule />}>
            <div className="px-3 py-3">
                {props?.isLoading ? (
                    <p>Loading...</p>
                ) : props?.data?.length > 0 ? (
                    props?.data.map((el, index) => (
                        <div key={index}>
                            <p>{el?.title}</p>
                            <p>{el?.completed}</p>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </Suspense>);
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res, locale }) => {

    let fileList = getFileLangList();
    secureHeader(req, res, locale);

    await store.dispatch(fetchTodos());

    const { homePageSlice: { isLoading, data, isError } } = store.getState();

    return {
        props: {
            data: data,
            isLoading,
            isError,
            language: locale,

            ...(await serverSideTranslations(locale, fileList)),
        },
    };

});
