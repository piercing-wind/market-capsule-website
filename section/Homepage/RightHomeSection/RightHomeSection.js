import React, { Suspense } from 'react'
import { Col } from 'react-bootstrap'
import LoderModule from '@/components/Module/LoaderModule'
import dynamic from 'next/dynamic'
const TrandingNewsCard = dynamic(() => import('./TrandingNewsCard'), { suspense: true })
const CapsulePlusCard = dynamic(() => import('./CapsulePlusCard'), { suspense: true })

import { caseStudyDataObj, trandingNewsDataObj } from '../homePageData';

const RightHomeSection = () => {
  return (

    <Col lg={3} className=' ps-2 pe-lg-0'>
      {/* tranding news div */}
      <TrandingNewsCard
        data={trandingNewsDataObj}
      />

      <CapsulePlusCard />
      <TrandingNewsCard
        data={caseStudyDataObj}
      />
    </Col>
  )
}

export default RightHomeSection