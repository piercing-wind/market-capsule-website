import React, { useEffect, useState, useTransition } from 'react';
import clsx from "clsx";
import styles from "../style/articalAndCaseStudyCard.module.scss";
import { midleSectionArr } from '../homePageData';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { CapsulePlus } from '@/components/svg/CapsulePlus';
import dynamic from 'next/dynamic';
import { getScreenWidth, truncateText } from '@/utils/constants';
const HomeBlueButton = dynamic(() => import('@/components/Module/Button/HomeBlueButton'))

const ArticalAndCaseStudyCard = () => {
    const [screenWidth, setScreenWidth] = useState(getScreenWidth());
    const { t } = useTranslation("common");
    const [itemPerPage, setItemPerPage] = useState(5)
    //READ NOW FUNCTION
    const readNowFun = () => {
        console.log("read now")
    }

    //CASE STUdY FUNCTION
    const upgradeNowFunction = () => {
        console.log("upgrade function")
    }

    //show cssbased on type

    const articalAndCaseStudyCardCss = (type) => {
        if (type === "artical") {
            return true
        } else {
            return false
        }
    }

    //load more btn 
    const loadMoreFun = () => {
        console.log("load more fun")
        setItemPerPage(itemPerPage + 2)
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
            <div className=' mt-3 px12'>
                {
                    midleSectionArr?.length ? (
                        midleSectionArr?.slice(0, itemPerPage)?.map((el, index) => {
                            //  0  5
                            // first 5 

                            return (
                                <div key={index} className={clsx("  column-gap-3 d-flex  mb-2", styles.midleDiv, articalAndCaseStudyCardCss(el?.type) ? styles.grayBackground : styles.orangeBackground)}>
                                    <div className='d-flex align-items-center'>
                                        <Image priority={false} className={clsx(" h-100", styles.imgWidth)} src={el?.img} alt="artical img" width="197" height="158" />
                                    </div>
                                    <div className={clsx("pe-1 d-flex flex-column justify-content-evenly")}>
                                        <div>
                                            <p className={clsx("d-flex column-gap-1 align-items-center ", styles.statusPara)}>
                                                <span className={clsx(articalAndCaseStudyCardCss(el?.type) ? styles.greenDot : styles.orangeDot)} ></span>
                                                <span>{articalAndCaseStudyCardCss(el?.type) ? t("homepage.midleSection.article") : t("homepage.midleSection.caseStudy")}</span>
                                            </p>
                                            <p className={clsx(styles.textPara)}>{truncateText(el?.para, screenWidth < 768 ? 5 : 13)}</p>
                                        </div>
                                        <div className={clsx("d-flex align-items-center column-gap-2 flex-wrap-reverse row-gap-2", styles.btnDiv)}>
                                            {
                                                el?.capsulePlus
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
                                                            handlerFun={readNowFun}
                                                            label={"homepage.midleSection.readNow"}
                                                        />
                                                    )
                                            }
                                            {
                                                el?.capsulePlus && (
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

                <button className={clsx(styles.loadMoreBtn, "mt-3")} onClick={loadMoreFun}>
                    <span>
                        {t("homepage.midleSection.loadMorePlus")}

                    </span>
                </button>
            </div>
        </>
    )
}

export default ArticalAndCaseStudyCard