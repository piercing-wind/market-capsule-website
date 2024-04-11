import React from 'react';
import clsx from "clsx";
import styles from "./style/screenerHeadingCom.module.scss"
import { useTranslation } from 'next-i18next';

const ScreeenerHeadingCom = ({ heading, para }) => {
  const { t } = useTranslation("common");

  return (
    <div className={clsx("px-xl-5 py-xl-4 px-3 py-3", styles.screeenerDiv)}>
      <h4>{t(heading)}</h4>
      <p className='mb-0'>{para}</p>
    </div>
  )
}

export default ScreeenerHeadingCom