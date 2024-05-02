import React from 'react';
import clsx from "clsx";
import styles from "./style/screenerHeadingCom.module.scss"
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import LeftArrow from '@/components/svg/LeftArrow';
import Link from 'next/link';

const ScreeenerHeadingCom = ({ heading, para, icon = false, backToHome = false }) => {
  const { t } = useTranslation("common");
  const router = useRouter()
  return (
    <div className={clsx(backToHome && 'd-flex align-items-center justify-content-between flex-wrap', backToHome && styles.paddingRight, styles.grayBorder)}>

      <div className={clsx(router?.pathname === "/screener" ? "px-xl-5" : "px-xl-4", " py-xl-4 px-3 py-3", styles.screeenerDiv)}>
        <h4 className='d-flex column-gap-1 align-items-center'>
          {
            icon && <Image src="/assests/capsule-plus/bolt.svg" alt="bolt" width="19" height="26" />
          }
          {t(heading)}</h4>
        <p className='mb-0 '>

          {
            t(para)
          }
        </p>
      </div>

      {/* back to home */}
      {
        backToHome && (
          <Link href="/" className={clsx(`d-flex align-items-center justify-content-between column-gap-2`, styles.link)}>
            <LeftArrow />
            Back to Homepage
          </Link>

        )
      }

    </div>
  )
}

export default ScreeenerHeadingCom