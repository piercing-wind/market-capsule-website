import React from 'react';
import clsx from "clsx";
import styles from "./style/nav.module.scss";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { navLinkData } from './navigationData';
import Bolt from '@/components/svg/Bolt';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { setShowForm } from '@/store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
const LoginModal = dynamic(() => import('../Modal/LoginModal'))
const LoginForm = dynamic(() => import('../Modal/LoginForm'))
const HomeBlueButton = dynamic(() => import('@/components/Module/Button/HomeBlueButton'))
const ProfileDropdown = dynamic(() => import('../Dropdown/ProfileDropdown'))
const AccountCreatedSuccessForm = dynamic(() => import('../Modal/AccountCreatedSuccessForm'))
const OtpForm = dynamic(() => import('../Modal/OtpForm'))
const SignupForm = dynamic(() => import('../Modal/SignupForm'))




const NavbarLayout = () => {
    const router = useRouter()
    const { t } = useTranslation("common");
    const dispatch = useDispatch()
    const { authType } = useSelector((state) => (
        {
            authType: state?.authSlice?.loginModal?.authType,
        }
    ))


    //create an account fun
    const createAnAccountFun = () => {
        console.log("create an account function")
        dispatch(setShowForm(true))
    }

    //handle active route
    const handleActiveNavFun = (slug, routerPathname) => {
        if (slug === routerPathname) {
            return true
        } else {
            return false
        }

    }

    return (
        <>
            <Navbar sticky="top" expand="lg" className={clsx("white", styles.navBar)}>
                <Container fluid className={clsx(styles.navContainer)}>
                    <Link className="navbar-brand d-lg-none d-block" href="/">
                        <Image priority={true} src="/assests/homepage/market-capsule-logo.svg" alt="market capsule logo" width="150" height="40" />
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto  w-100">
                            <div className='d-flex flex-lg-row flex-column   w-100 justify-content-lg-between align-items-lg-center align-items-start row-gap-2 px-lg-0 px-2' >
                                <Link className="navbar-brand d-lg-block d-none" href="/">
                                    <Image priority={true} src="/assests/homepage/market-capsule-logo.svg" alt="market capsule logo" width="150" height="40" />
                                </Link>
                                <ul className={clsx("d-flex flex-lg-row flex-column row-gap-2 ", styles.ulLink)}>
                                    {
                                        navLinkData?.map((el, index) => {
                                            return (
                                                <Link className={clsx(styles.grayColor, handleActiveNavFun(el?.slug, router?.pathname) ? styles.blackColor : "")} href={el?.slug} key={index} >
                                                    <li className='d-flex align-items-center column-gap-1'>
                                                        {el?.slug === "/capsule-plus" && <Bolt />}{t(el?.label)}

                                                    </li>
                                                    {
                                                        handleActiveNavFun(el?.slug, router?.pathname)
                                                        && (
                                                            <div className={clsx(styles.greenDiv)}>
                                                                <span>{t(el?.label)}</span>
                                                            </div>
                                                        )

                                                    }
                                                </Link>
                                            )
                                        })
                                    }

                                </ul>

                                {
                                    true ? (
                                        <ProfileDropdown

                                        />
                                    ) : (

                                        <HomeBlueButton
                                            color={"#FFFFFF"}
                                            bg={"#3E63FF"}
                                            label={t("navbar.createAnAccount")}
                                            handlerFun={createAnAccountFun}
                                        />
                                    )

                                }
                            </div>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            {/* login flow modal */}
            <LoginModal>
                {
                    authType === "login" ? (
                        <LoginForm />

                    ) : authType === "signup" ? (
                        <SignupForm />

                    ) : authType === "otp" ? (
                        <OtpForm />
                    ) : (
                        <AccountCreatedSuccessForm />
                    )
                }
            </LoginModal>
        </>
    )
}

export default NavbarLayout