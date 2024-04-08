import React, { Suspense } from 'react'
import { Col } from 'react-bootstrap'
import dynamic from 'next/dynamic'
const TrandingNewsCard = dynamic(() => import('./TrandingNewsCard'), { suspense: true })
const CapsulePlusCard = dynamic(() => import('./CapsulePlusCard'), { suspense: true })

import { caseStudyDataObj, trandingNewsDataObj } from '../homePageData';

const RightHomeSection = ({ sidebarTransform, sidebarPosition }) => {
  return (

    <Col lg={3} className=' ps-2 pe-lg-0 sidebar' >
      {/* tranding news div */}
      <div className="content-wrapper">

        <TrandingNewsCard
          data={trandingNewsDataObj}
        />

        <CapsulePlusCard />
        <TrandingNewsCard
          data={caseStudyDataObj}
        />
      </div>
    </Col>
  )
}

export default RightHomeSection