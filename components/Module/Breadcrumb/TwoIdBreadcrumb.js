import React from 'react';
import clsx from "clsx";
import styles from "./style/oneIdBreadcrumb.module.scss"
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const TwoIdBreadcrumb = ({ linkSlug1, linkLable1, linkSlug2, linkLable2, idLable }) => {
    const { t } = useTranslation("common")
    return (
        <div className={clsx("mb-3 mt-4 px-sm-0 px-3", styles.linkDiv)}>
            <Link href={linkSlug1} >{t(linkLable1)}</Link>&nbsp;/&nbsp;
            <Link href={linkSlug2}>{t(linkLable2)}</Link>
            <span>{idLable && `/ ${idLable}`}</span>
        </div>
    )
}

export default TwoIdBreadcrumb