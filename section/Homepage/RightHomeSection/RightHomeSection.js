import React, { Suspense } from 'react'
import { Col } from 'react-bootstrap'
import dynamic from 'next/dynamic'
const TrandingNewsCard = dynamic(() => import('./TrandingNewsCard'), { suspense: true })
const CapsulePlusCard = dynamic(() => import('./CapsulePlusCard'), { suspense: true })
const WhatsNewCard = dynamic(() => import('./WhatsNewCard'))

import NewsPaperOpen from '@/components/svg/NewsPaperOpen'
import Bulb from '@/components/svg/Bulb'
import { shallowEqual, useSelector } from 'react-redux'

const RightHomeSection = ({ trandingNewsObj, whatsNewInCapsulePlusObj }) => {
  const { userDetails } = useSelector((state) => ({
    userDetails: state?.authSlice?.userDetails,
  }), shallowEqual)

  return (
    <Col lg={3} className='order-2 ps-2 pe-2 pe-lg-0' >
      {/* tranding news div */}
      <div className="positionSticky">
        <TrandingNewsCard
          data={trandingNewsObj?.trandingNewsList}
          logo={<NewsPaperOpen />}
          headingLabel={`homepage.rightSection.trandingNewsHeading`}
        />
        <WhatsNewCard
          data={whatsNewInCapsulePlusObj?.whatsNewInCapsulePlusList}
          logo={<Bulb />}
          headingLabel={`homepage.rightSection.whatNewInCapsulePlus`}
        />
        {
          !userDetails?.capsuleplus && (
            <CapsulePlusCard />
          )
        }
      </div>
    </Col>
  )
}

export default RightHomeSection