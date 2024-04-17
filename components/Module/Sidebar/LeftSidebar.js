import React, { useState } from 'react';
import clsx from "clsx";
import styles from "./style/leftSidebar.module.scss";
import Image from 'next/image';
import Bolt from '@/components/svg/Bolt';
import Link from 'next/link';
import RightArrow from '@/components/svg/RightArrow';
import { userProfileNavData } from '../Navbar/navigationData';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import DefaultProfile from '../ProfileImage/DefaultProfile';


const LeftSidebar = () => {
    const { t } = useTranslation("common");
    const router = useRouter()
    const [profileURL, setProfileUrl] = useState("/assests/user-profile/user-img.png")

    return (
        <div className={clsx(styles.leftSidebarMaindDiv, "px-3 ")}>
            {/* upper div */}
            <div className={clsx(styles.upperDiv, "d-flex  column-gap-2  ")}>
                <DefaultProfile firstCharHeight={"52px"} firstCharWidth={"52px"} userName={`John Doe`} src={profileURL} width={52} height={52} />

                <div>
                    <span>John Doe</span>
                    <p className={"mb-0 d-flex align-items-center column-gap-1 "}>
                        <Bolt />
                        <span>capsule+</span>
                    </p>
                </div>
            </div>
            {/* lower div */}
            <div className={clsx(styles.lowerDiv)}>
                <ul className='ps-0'>
                    {
                        userProfileNavData?.map((el, index) => {
                            return (

                                <li key={index} className='pe-1'>
                                    <Link href={el?.slug} className={clsx('d-flex justify-content-between align-items-center', router?.pathname === el?.slug && styles.active)} >
                                        {t(el?.label)}
                                        {
                                            router?.pathname === el?.slug && (
                                                <RightArrow />
                                            )
                                        }
                                    </Link>

                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default LeftSidebar