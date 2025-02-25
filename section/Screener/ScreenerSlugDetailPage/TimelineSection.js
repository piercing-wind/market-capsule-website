import React from 'react';
import clsx from 'clsx';
import styles from "./style/timelineSection.module.scss"
import HeadingCom from '@/components/Module/BannerSection/HeadingCom';
import moment from 'moment';
const TimelineSection = ({ headingLabel, compnayTimelineList }) => {
    const findFirstCircle = (visibleData, index) => {
        if (0 === index) {
            return styles.circle2
        }
    }

    const findLastCircle = (visibleData, index) => {
        if (visibleData?.length - 1 === index) {
            return true
        }
    }


    return (
        <div>
            <HeadingCom
                label={headingLabel}
                updated={compnayTimelineList?.length > 0 ? compnayTimelineList[compnayTimelineList?.length - 1]?.updatedAt : false}
            />
            {/* timelinesection */}
            <div className={styles.verticalStepper}>
                {compnayTimelineList?.map((el, index) => (
                    <div key={index} className={styles.step}>
                        <div className=" d-flex flex-column align-items-center">
                            <div className={clsx(styles.circle, findFirstCircle(compnayTimelineList, index))}
                            >
                            </div>
                            {index < compnayTimelineList?.length - 1 && <div className={styles.line} />}
                        </div>
                        <div className={clsx(styles.stepContent, findLastCircle(compnayTimelineList, index)) && styles.stepLastContent}>
                            <h5 className={styles.heading}>{
                                moment(el?.date)?.format("MMM DD, YYYY")
                            }</h5>
                            <p className={clsx(styles.para, findLastCircle(compnayTimelineList, index) && styles.lastPara)}>{el?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TimelineSection