import LeftArrow from '@/components/svg/LeftArrow';
import Link from 'next/link';
import React from 'react';
import styles from "./style/backToHomeLink.module.scss";
import clsx from "clsx";
import { Trans } from 'next-i18next';

const BackToHomeLink = () => {
    return (
        <Link href="/" className={clsx(`d-flex align-items-center  column-gap-2`, styles.link)}>
            <LeftArrow />
            <Trans i18nKey={`searchResultPage.backToHomepage`} >

                Back to Homepage
            </Trans>
        </Link>

    )
}

export default BackToHomeLink