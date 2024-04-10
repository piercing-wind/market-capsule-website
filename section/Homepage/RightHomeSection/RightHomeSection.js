import React, { Suspense } from 'react'
import { Col } from 'react-bootstrap'
import dynamic from 'next/dynamic'
const TrandingNewsCard = dynamic(() => import('./TrandingNewsCard'), { suspense: true })
const CapsulePlusCard = dynamic(() => import('./CapsulePlusCard'), { suspense: true })

import { caseStudyDataObj, trandingNewsDataObj } from '../homePageData';

const RightHomeSection = () => {
  return (

    <Col lg={3} className=' ps-2 pe-lg-0' >
      {/* tranding news div */}
      <div className="positionSticky">

        <TrandingNewsCard
          data={trandingNewsDataObj}
        />
        <TrandingNewsCard
          data={caseStudyDataObj}
        />

        <CapsulePlusCard />
      </div>
    </Col>
  )
}

export default RightHomeSection