import React from 'react';
import clsx from "clsx";
import styles from "./style/screenerHeadingCom.module.scss"
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ScreeenerHeadingCom = ({ heading, para, icon = false }) => {
  const { t } = useTranslation("common");
  const router = useRouter()
  return (
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
  )
}

export default ScreeenerHeadingCom