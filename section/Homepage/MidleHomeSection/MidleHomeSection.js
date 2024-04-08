import React from 'react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { Col } from 'react-bootstrap'
const SearchBarArticalsAndCompany = dynamic(() => import('./SearchBarArticalsAndCompany'))
const ArticalAndCaseStudyCard = dynamic(() => import('./ArticalAndCaseStudyCard'))
const FilterButton = dynamic(() => import('./FilterButton'))

const MidleHomeSection = () => {
  return (
    <Col lg={6} className=' px-2'>
      <div className={clsx('gray-border trandingDiv')}>
        <SearchBarArticalsAndCompany />
        <FilterButton />
        <ArticalAndCaseStudyCard />

      </div>
    </Col>
  )
}

export default MidleHomeSection