import React from 'react';
import clsx from "clsx";
import styles from "./style/screenerHeadingCom.module.scss"
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const ScreeenerHeadingCom = ({ heading, para }) => {
  const { t } = useTranslation("common");
  const router = useRouter()
  console.log("roture", router)
  return (
    <div className={clsx(router?.pathname === "/screener" ? "px-xl-5" : "px-xl-4", " py-xl-4 px-3 py-3", styles.screeenerDiv)}>
      <h4>{t(heading)}</h4>
      <p className='mb-0'>{para}</p>
    </div>
  )
}

export default ScreeenerHeadingCom