import React from 'react';
import Image from "next/image";
import clsx from "clsx";
import styles from './style/emptyWatchlistCard.module.scss';
import dynamic from 'next/dynamic';
const HomeBlueButton = dynamic(() => import('@/components/Module/Button/HomeBlueButton'))
const Bookmark = dynamic(() => import('@/components/svg/Bookmark'))
import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';


const EmptyWatchlistCard = () => {
    const router = useRouter()

    const addStockFun = () => {
        router.push("/screener")
    }
    return (
        <div className={clsx("d-flex column-gap-4 justify-content-center", styles.mainDiv)}>
            <div className={clsx(styles.bookmarkDiv)}>
                <Bookmark />
            </div>
            <div className={clsx(styles.rightDiv)} >
                <h5><Trans i18nKey={"watchlist.youAreNoteWatching"}>
                    You are not watching anything yet.                                </Trans></h5>
                <p><Trans i18nKey={"watchlist.beginMonitoring"}>
                    Begin monitoring your selected stocks by adding them to your Watchlist.                                </Trans></p>
                <HomeBlueButton
                    color={"#FFFFFF"}
                    bg={"#3E63FF"}
                    handlerFun={addStockFun}
                    label={"watchlist.addStock"}
                />            </div>
        </div>
    )
}

export default EmptyWatchlistCard