import React, { useEffect, useState, useTransition } from 'react';
import clsx from "clsx";
import styles from "../style/articalAndCaseStudyCard.module.scss";
import { midleSectionArr } from '../homePageData';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { CapsulePlus } from '@/components/svg/CapsulePlus';
import dynamic from 'next/dynamic';
import { getScreenWidth, truncateText } from '@/utils/constants';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import LoadMoreBtn from '@/components/Module/Button/LoadMoreBtn';
import { getFeedList, setFeedCurrentPage } from '@/store/slices/homePageSlice';
import LoderModule from '@/components/Module/LoaderModule';
import { setShowForm, setUpgradeNow } from '@/store/slices/authSlice';
const HomeBlueButton = dynamic(() => import('@/components/Module/Button/HomeBlueButton'))

const ArticalAndCaseStudyCard = () => {
    const [screenWidth, setScreenWidth] = useState(getScreenWidth());
    const router = useRouter();
    const dispatch = useDispatch()
    const { jwt, feedList, feedTotalList, feedLoading, feedCurrentPage, industryId } = useSelector((state) => ({
        feedLoading: state?.homePageSlice?.feedListObj?.loading,
        feedList: state?.homePageSlice?.feedListObj?.feedList,
        feedTotalList: state?.homePageSlice?.feedListObj?.feedTotalList,
        feedCurrentPage: state?.homePageSlice?.feedListObj?.feedCurrentPage,
        industryId: state?.homePageSlice?.industriesObj?.industryId,
        jwt: state?.authSlice?.jwt,


    }), shallowEqual)

    const { t } = useTranslation("common");
    //READ NOW FUNCTION
    const readNowFun = (url) => {
        if (url) {
            router.push(url)
        } else {
            toast.error("Url not found")
        }
    }

    //CASE STUdY FUNCTION
    const upgradeNowFunction = () => {
        if (!jwt) {
            dispatch(setShowForm(true))
            dispatch(setUpgradeNow(true))

        } else {
            router.push("/subscription")
        }
    }

    //show cssbased on type

    const articalAndCaseStudyCardCss = (type) => {
        if (type === "CAPSULE+") {
            return true
        } else {
            return false
        }
    }


    //load more btn 
    const loadMoreFun = async () => {
        const feedListParams = {
            page: feedCurrentPage,
            limit: 1,
            industryId: industryId !== 0 ? industryId : ""
        }
        await dispatch(getFeedList(feedListParams))
        dispatch(setFeedCurrentPage(feedCurrentPage + 1))
    }

    useEffect(() => {
        function handleResize() {
            setScreenWidth(getScreenWidth());
        }

        const resizeListener = () => handleResize();

        window.addEventListener("resize", resizeListener);

        return () => {
            window.removeEventListener("resize", resizeListener);
        };
    }, []);

    return (
        <>

            {
                feedLoading ? (
                    <LoderModule isAbsolute={true} />

                ) : (

                    <div className=' mt-3 px12'>
                        {
                            feedList?.length > 0 ? (
                                feedList?.map((el, index) => {
                                    return (
                                        <div key={index} className={clsx("  column-gap-3 d-flex  mb-2", styles.midleDiv, articalAndCaseStudyCardCss(el?.type) ? styles.orangeBackground : styles.grayBackground)}>
                                            <div className='d-flex align-items-center'>
                                                <Image priority={false} className={clsx(" h-100", styles.imgWidth)} src={el?.featuredImage?.url} alt={el?.featuredImage?.alternativeText ? el?.featuredImage?.alternativeText : "feed list"} width="197" height="158" />
                                            </div>
                                            <div className={clsx("pe-1 d-flex flex-column justify-content-evenly")}>
                                                <div>
                                                    <p className={clsx("d-flex column-gap-1 align-items-center ", styles.statusPara)}>
                                                        <span className={clsx(styles.dot)} style={{ background: el?.tag?.colorHash ? el?.tag?.colorHash : "#00F3BB" }} ></span>
                                                        <span>{el?.type}</span>
                                                    </p>
                                                    <p className={clsx(styles.textPara)}>{truncateText(el?.title, screenWidth < 768 ? 5 : 13)}</p>
                                                </div>
                                                <div className={clsx("d-flex align-items-center column-gap-2 flex-wrap-reverse row-gap-2", styles.btnDiv)}>
                                                    {
                                                        el?.isPremium
                                                            ? (
                                                                <HomeBlueButton
                                                                    color={"#FFFFFF"}
                                                                    bg={"#0F0F0F"}
                                                                    handlerFun={upgradeNowFunction}
                                                                    label={"homepage.midleSection.upgradeNow"}
                                                                />

                                                            ) : (
                                                                <HomeBlueButton
                                                                    color={"#FFFFFF"}
                                                                    bg={"#3E63FF"}
                                                                    handlerFun={() => { readNowFun(el?.url) }}
                                                                    label={"homepage.midleSection.readNow"}
                                                                    disable={!el?.url ? true : false}
                                                                />
                                                            )
                                                    }
                                                    {
                                                        el?.isPremium && (
                                                            <div className={clsx("d-flex flex-column column-gap-2 ", styles.exclusiveDiv)}>
                                                                <p className='mb-0'>{t("homepage.midleSection.exclusiveFor")}</p>
                                                                <CapsulePlus />
                                                            </div>

                                                        )
                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    )
                                })
                            ) : null
                        }
                        <div className={clsx(styles.loadMoreBtn, "mt-3")} >
                            <LoadMoreBtn
                                totalList={feedTotalList}
                                loading={feedLoading}
                                data={feedList}
                                loadMoreFun={loadMoreFun} />
                        </div>


                    </div>
                )
            }
        </>
    )
}

export default ArticalAndCaseStudyCard