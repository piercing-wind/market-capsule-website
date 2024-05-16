import React from 'react'
import { Trans, useTranslation } from 'next-i18next';
import clsx from 'clsx';
import styles from "./style/loadMoreBtn.module.scss"

const LoadMoreBtn = ({ data, totalList, loading, loadMoreFun }) => {
    const { t } = useTranslation("common")
    return (
        <div className={clsx("d-flex justify-content-center align-items-center mb-3 mt-3", styles.loadMoreBtn, "mt-3 ")} >
            {
                data?.length < totalList ? (
                    <>
                        {
                            !loading ? (
                                <button onClick={loadMoreFun}>Load More +</button>

                            ) : (
                                <button className={clsx(styles.notClick)}>Loading...</button>

                            )

                        }

                    </>

                ) : (
                    <span>
                        No more data
                    </span>
                )
            }



        </div>
    )
}

export default LoadMoreBtn