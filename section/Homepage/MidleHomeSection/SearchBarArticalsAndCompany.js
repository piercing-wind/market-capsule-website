import React, { useEffect, useState } from 'react';
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
  const [selectedItem, setSelectedItem] = useState(-1);
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

  // handle key down
  const KeyDownFun = (e, setSelectedItem, selectedItem, globalSearchListLength) => {
    if (!e?.target?.value) return
    if (e?.key === 'Enter') {
      if (selectedItem >= 0) {
        // Navigate to the selected item
        router.push(`/search-results/${globalSearchList[selectedItem]?.name}`);
      } else if (selectedItem === -1) {
        if (e?.target?.value === "") return
        router.push(`/search-results/${e?.target?.value}`)
      }
    } else if (e.key === 'ArrowDown') {
      setSelectedItem(prevState => {
        const nextItem = Math.min(prevState + 1, globalSearchList?.length - 1);
        document.getElementById(`item-${nextItem}`)?.scrollIntoView({ block: 'nearest' });
        return nextItem;
      });
    } else if (e.key === 'ArrowUp') {
      setSelectedItem(prevState => {
        const prevItem = Math.max(prevState - 1, -1);
        document.getElementById(`item-${prevItem}`)?.scrollIntoView({ block: 'nearest' });
        return prevItem;
      });
    }
  }

  useEffect(() => {
    if (value) {
      searchTypeFun()
    }
  }, [value])
  return (
    <div className={clsx("p-3", styles.searchBarSection)}>
      <div className={clsx(styles.inputBlock, styles.typeahead)}>
        <div className={clsx("d-flex align-items-center column-gap-2 px-2 ", styles.searchBar, styles.div1)}>
          <Search />
          <input
            value={text}
            type={"text"}
            className={clsx(styles.typeaheadInput)}
            placeholder={t("homepage.midleSection.searchForArticlesAndCompanies")}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={(e) => {

              KeyDownFun(e, setSelectedItem, selectedItem, globalSearchList?.length)

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
          className={clsx(styles.inputSearchBox,)}
          style={{
            display: value ? "block" : "none",
          }}
        >
          {globalSearchList?.length > 0
            ? globalSearchList

              ?.map((elId, typeIndex) => (
                <div
                  key={typeIndex}
                  id={`item-${typeIndex}`}
                  className={clsx(styles.linkDiv, 'px-2', selectedItem === typeIndex ? styles.selected : null)}
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