import React from 'react';
import clsx from "clsx";
import styles from "../style/searchBarArticalsAndCompany.module.scss"
import Search from '@/components/svg/Search';
import { useTranslation } from 'next-i18next';

const SearchBarArticalsAndCompany = () => {
  const { t } = useTranslation("common");

  //handle onchange 
  const handleOnChangeSearch = (e) => {
    console.log("handle  onChange search", e.target.value)

  }

  //handle search based on search button
  const handleSearch = (e) => {
    console.log("handle search")
  }

  return (
    <div className={clsx("p-3", styles.searchBarSection)}>
      <div className={clsx("d-flex align-items-center column-gap-2 px-2 ")}>
        <button className='' onClick={handleSearch}>
          <Search />
        </button>
        <input type='text' placeholder={t("homepage.midleSection.searchForArticlesAndCompanies")} onChange={handleOnChangeSearch} />
      </div>
    </div>
  )
}

export default SearchBarArticalsAndCompany