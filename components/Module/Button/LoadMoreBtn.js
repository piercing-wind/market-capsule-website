import React from 'react'
import { Trans, useTranslation } from 'next-i18next';
import clsx from 'clsx';
import styles from "./style/loadMoreBtn.module.scss"

const LoadMoreBtn = ({ data, itemPerPage, loadMoreFun }) => {
    const { t } = useTranslation("common")

    return (
        <button className={clsx(styles.loadMoreBtn, "mt-3 ")} onClick={loadMoreFun}>
            <span >
                {
                    data?.length < itemPerPage ? (
                        t("homepage.midleSection.noMoreData")
                    ) : (
                        t("homepage.midleSection.loadMorePlus")
                    )
                }
            </span>



        </button>
    )
}

export default LoadMoreBtn