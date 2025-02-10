import React, { useEffect } from 'react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { Col } from 'react-bootstrap'
import { setFeedCurrentPage, setFeedList, setFeedListEmpty, setFeedTotalList, setIndustryList } from '@/store/slices/homePageSlice'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
const SearchBarArticalsAndCompany = dynamic(() => import('./SearchBarArticalsAndCompany'))
const ArticalAndCaseStudyCard = dynamic(() => import('./ArticalAndCaseStudyCard'))
const FilterButton = dynamic(() => import('./FilterButton'))

const MidleHomeSection = ({ industriesObj, feedListObj }) => {
  const dispatch = useDispatch()
  const { industryList, feedCurrentPage } = useSelector((state) => ({
    industryList: state?.homePageSlice?.industriesObj?.industryList,
    feedCurrentPage: state?.homePageSlice?.feedListObj?.feedCurrentPage,
  }), shallowEqual)

  //set server data to client side
  useEffect(() => {
    if (industryList?.length === 1) {
      dispatch(setIndustryList(industriesObj?.industryList))
    }
    dispatch(setFeedListEmpty())
    dispatch(setFeedList(feedListObj?.feedList))
    dispatch(setFeedTotalList(feedListObj?.feedTotalList))
    dispatch(setFeedCurrentPage(feedCurrentPage + 1))
  }, [dispatch]);
  return (
    <Col lg={6} className='order-lg-1 order-0  px-0 col-lg'>
      <div className={clsx('gray-border trandingDiv')}>
        <SearchBarArticalsAndCompany />
        <FilterButton />
        <ArticalAndCaseStudyCard />
      </div>
    </Col>
  )
}

export default MidleHomeSection