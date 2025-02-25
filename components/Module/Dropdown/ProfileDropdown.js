import React, { useState } from 'react';
import clsx from "clsx";
import styles from "./style/profileDropdown.module.scss"
import { Dropdown } from 'react-bootstrap';
import { userProfileNavData, userProfileNavData400 } from '../Navbar/navigationData';
import { Trans, useTranslation } from 'next-i18next';
import { DownArrow } from '@/components/svg/DownArrow';
import Signout from '@/components/svg/Signout';
import DefaultProfile from '../ProfileImage/DefaultProfile';
import { useRouter } from 'next/router';
import { setCookiesStorage } from '@/utils/storageService';
import { setResetSlice } from '@/store/slices/authSlice';
import { setAuthorizationToken } from '@/utils/apiServices';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const ProfileDropdown = () => {
    const { t } = useTranslation("common")
    const router = useRouter("")
    const dispatch = useDispatch()
    const { userDetails } = useSelector((state) => (
        {
            userDetails: state?.authSlice?.userDetails
        }
    ), shallowEqual)
    //logout fun
    const logoutFun = () => {
        setCookiesStorage('_jwt', "");
        dispatch(setResetSlice());
        setAuthorizationToken("");
        router.push("/")
        window.location.reload();
    }
    return (
        <div className={clsx('mb-2', styles.genderDropdown)}>
            <Dropdown className={clsx("threeDotDropdown")}>
                <Dropdown.Toggle >
                    <DefaultProfile firstCharHeight={"40px"} firstCharWidth={"40px"} userName={userDetails?.fullName} src={userDetails?.image ? userDetails?.image : ""} width={40} height={40} />

                    <DownArrow />
                </Dropdown.Toggle>

                <Dropdown.Menu className={clsx("w-100", styles.menu)}>
                    <Dropdown.Item >
                        <h5 className={clsx(styles.hi)}>
                            <Trans i18nKey={"userProfileDropdown.hi"}>Hi!</Trans>{" "}
                            {userDetails?.fullName}

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