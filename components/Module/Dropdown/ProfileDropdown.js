import React, { useState } from 'react';
import clsx from "clsx";
import styles from "./style/profileDropdown.module.scss"
import { Dropdown } from 'react-bootstrap';
import { userProfileNavData, userProfileNavData400 } from '../Navbar/navigationData';
import Image from 'next/image';
import { Trans, useTranslation } from 'next-i18next';
import { DownArrow } from '@/components/svg/DownArrow';
import Signout from '@/components/svg/Signout';
import Link from 'next/link';
import DefaultProfile from '../ProfileImage/DefaultProfile';
import { useRouter } from 'next/router';

const ProfileDropdown = () => {
    const { t } = useTranslation("common")
    const router = useRouter("")
    const [profileURL, setProfileUrl] = useState("/assests/user-profile/user-img.png")

    let userName = "John"

    //logout fun
    const logoutFun = () => {
        console.log("logout fun")
    }
    return (
        <div className={clsx('mb-2', styles.genderDropdown)}>
            <Dropdown className={clsx("threeDotDropdown")}>
                <Dropdown.Toggle >
                    <DefaultProfile firstCharHeight={"40px"} firstCharWidth={"40px"} userName={`John Doe`} src={profileURL} width={40} height={40} />

                    <DownArrow />
                </Dropdown.Toggle>

                <Dropdown.Menu className={clsx("w-100", styles.menu)}>
                    <Dropdown.Item >
                        <h5 className={clsx(styles.hi)}>
                            <Trans i18nKey={"userProfileDropdown.hi"}>Hi!</Trans>{" "}
                            {userName}

                        </h5>
                    </Dropdown.Item>
                    <Dropdown.Divider className={clsx(styles.divider)} />
                    {
                        router?.pathname !== "/404" ? (

                            userProfileNavData?.map((el, index) => {
                                return (

                                    <Dropdown.Item href={el?.slug} className={styles.slugStyle} key={index} >
                                        {t(el?.label)}

                                    </Dropdown.Item>

                                )
                            })


                        ) : (

                            userProfileNavData400?.map((el, index) => {
                                return (

                                    <Dropdown.Item href={el?.slug} className={styles.slugStyle} key={index} >
                                        {t(el?.label)}

                                    </Dropdown.Item>

                                )
                            })

                        )
                    }
                    <Dropdown.Divider className='pb-3' />
                    <Dropdown.Item className='pt-0 pe-3'>
                        <button onClick={logoutFun} className={clsx('d-flex w-100 justify-content-between align-items-center', styles.logoutBtn)}>
                            <span>
                                <Trans i18nKey={"userProfileDropdown.logout"}>
                                    Logout

                                </Trans>

                            </span>
                            <Signout />
                        </button>
                    </Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>


        </div>

    )
}

export default ProfileDropdown