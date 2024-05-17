import React, { use, useEffect, useState } from 'react';
import clsx from "clsx";
import styles from "../style/searchBarArticalsAndCompany.module.scss"
import Search from '@/components/svg/Search';
import { useTranslation } from 'next-i18next';
import IconPayNowButton from '@/components/Module/Button/IconPayNowButton';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getGlobalSearchList } from '@/store/slices/homePageSlice';
import { useRouter } from 'next/router';

const SearchBarArticalsAndCompany = () => {
  const { t } = useTranslation("common");
  const [text, setText] = useState('');
  const [value] = useDebounce(text, 1000);
  const dispatch = useDispatch();
  const router = useRouter()
  const { globalSearchList } = useSelector((state) => ({
    globalSearchList: state?.homePageSlice?.getGlobalSearchObj?.globalSearchList,

  }), shallowEqual)
  //handle search based on search button
  const searchFun = async () => {
    if (value === "") return
    router.push(`/search-results/${value}`)
  }

  const searchTypeFun = async () => {
    const params = {
      search: value
    }
    await dispatch(getGlobalSearchList(params))


  }
  useEffect(() => {
    if (value) {
      searchTypeFun()
    }
  }, [value])
  console.log("value", value)

  console.log("globalSearchList", globalSearchList)
  // console.log("globalSearchTotalList", globalSearchTotalList)

  return (
    <div className={clsx("p-3", styles.searchBarSection)}>
      <div className={clsx(styles.inputBlock, styles.typeahead)}>

        <div className={clsx("d-flex align-items-center column-gap-2 px-2 ", styles.searchBar, styles.div1)}>
          <button >
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
              disabled={value === "" ? true : false}

            />
          </div>
        </div>
        {/* input search box*/}
        <div
          className={clsx(styles.inputSearchBox, 'px-2')}
          style={{
            display: value ? "block" : "none",
          }}
        >
          {globalSearchList?.length > 0
            ? globalSearchList
              ?.filter((elId) => {
                return value
                  ? elId?.name?.toLowerCase()?.includes(value?.toLowerCase())
                  : null;
              })
              ?.map((elId, typeIndex) => (
                <div
                  // value={elId?.id}
                  key={typeIndex}
                  className={clsx(styles.linkDiv)}
                >

                  <Link href={`/search-results/${elId?.name}`}>
                    <p className={clsx(styles.label)}>{t(elId?.name)}</p>
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