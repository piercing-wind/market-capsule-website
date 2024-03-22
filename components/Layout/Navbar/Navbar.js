import React from 'react';
import clsx from "clsx";
import styles from "./style/nav.module.scss";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import HomeBlueButton from '@/components/Module/Button/HomeBlueButton';
import { navLinkData } from './navigationData';
import Bolt from '@/components/svg/Bolt';
import { useRouter } from 'next/router';


const NavbarLayout = () => {
    const router = useRouter()

    //create an account fun
    const createAnAccountFun = () => {
        console.log("create an account function")
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
        <Navbar expand="lg" className={clsx("white", styles.navBar)}>
            <Container fluid className={clsx(styles.navContainer)}>
                <Link className="navbar-brand d-lg-none d-block" href="#">
                    <Image priority={true} src="/assests/homepage/market-capsule-logo.svg" alt="market capsule logo" width="150" height="40" />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto  w-100">
                        <div className='d-flex flex-lg-row flex-column   w-100 justify-content-lg-between align-items-lg-center align-items-start row-gap-2 px-lg-0 px-2' >
                            <Link className="navbar-brand d-lg-block d-none" href="#">
                                <Image priority={true} src="/assests/homepage/market-capsule-logo.svg" alt="market capsule logo" width="150" height="40" />
                            </Link>
                            <ul className={clsx("d-flex flex-lg-row flex-column row-gap-2 ", styles.ulLink)}>
                                {
                                    navLinkData?.map((el, index) => {
                                        return (
                                            <Link className={clsx(styles.grayColor, handleActiveNavFun(el?.slug, router?.pathname) ? styles.blackColor : "")} href={el?.slug} key={index} >
                                                <li className='d-flex align-items-center column-gap-1'>
                                                    {el?.slug === "/capsule-plus" && <Bolt />}{el?.label}

                                                </li>
                                                {
                                                    handleActiveNavFun(el?.slug, router?.pathname)
                                                    && (
                                                        <div className={clsx(styles.greenDiv)}>
                                                            <span>{el?.label}</span>
                                                        </div>
                                                    )

                                                }
                                            </Link>
                                        )
                                    })
                                }

                            </ul>

                            <HomeBlueButton
                                color={"#FFFFFF"}
                                bg={"#3E63FF"}
                                label={"Create an Account"}
                                handlerFun={createAnAccountFun}
                            />
                        </div>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarLayout