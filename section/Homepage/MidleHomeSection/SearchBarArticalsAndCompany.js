import React, { useState } from 'react';
import clsx from "clsx";
import styles from "../style/searchBarArticalsAndCompany.module.scss"
import Search from '@/components/svg/Search';
import { useTranslation } from 'next-i18next';
import IconPayNowButton from '@/components/Module/Button/IconPayNowButton';
import { searchBarCompanyList } from '../homePageData';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';

const SearchBarArticalsAndCompany = () => {
  const { t } = useTranslation("common");
  const [text, setText] = useState('');
  const [value] = useDebounce(text, 1000);

  //handle search based on search button
  const handleSearch = (e) => {
    console.log("handle search")
  }

  const searchFun = () => {
    console.log("search")
  }

  return (
    <div className={clsx("p-3", styles.searchBarSection)}>
      <div className={clsx(styles.inputBlock, styles.typeahead)}>

        <div className={clsx("d-flex align-items-center column-gap-2 px-2 ", styles.searchBar, styles.div1)}>
          <button className='' onClick={handleSearch}>
            <Search />
          </button>
          <input
            value={text}
            type={"text"}
            className={clsx(styles.typeaheadInput)}
            placeholder={t("homepage.midleSection.searchForArticlesAndCompanies")}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />


          <div className={clsx(styles.searchBtn)}>
            <IconPayNowButton
              label={`homepage.midleSection.search`}
              color={"#FFFFFF"}
              fontSize={"12px"}
              fontWeight={"500"}
              borderRadius={"17px"}
              pAll={"8px 16px"}
              bg={"#007AF3"}
              border={"none"}
              type={"button"}
              handleFun={searchFun}

            />
          </div>
        </div>
        {/* input search box*/}
        <div
          className={clsx(styles.inputSearchBox, 'px-2')}
          style={{
            display: "block",
          }}
        >
          {searchBarCompanyList?.length
            ? searchBarCompanyList
              ?.filter((elId) => {
                return value
                  ? elId?.companyName?.toLowerCase()?.includes(value?.toLowerCase())
                  : null;
              })
              ?.map((elId, typeIndex) => (
                <div
                  value={elId?.id}
                  key={typeIndex}
                  className={clsx(styles.linkDiv)}

                >

                  <Link href={`/search-results/${elId?.id}`}>
                    <p className={clsx(styles.label)}>{t(elId?.companyName)}</p>
                  </Link>

                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}




export default SearchBarArticalsAndCompany