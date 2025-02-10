import React from 'react';
import clsx from "clsx";
import styles from "./style/oneIdBreadcrumb.module.scss"
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const OneIdBreadcrumb = ({ linkSlug, linkLable, idLable }) => {
    const { t } = useTranslation("common")
    return (
        <div className={clsx("mb-3 px-sm-0 px-3", styles.linkDiv)}>
            <Link href={linkSlug}>{t(linkLable)}</Link><span>{idLable && ` / ${idLable}`}</span>
        </div>
    )
}

export default OneIdBreadcrumb