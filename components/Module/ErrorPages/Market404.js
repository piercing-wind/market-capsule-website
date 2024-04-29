import React, { useReducer } from 'react';
import clsx from 'clsx';
import styles from "./style/market404.module.scss"
import Image from 'next/image';
import IconPayNowButton from '../Button/IconPayNowButton';
import { useRouter } from 'next/router';

const Market404 = () => {
    const router = useRouter()
    const backToHomeFun = () => {
        router.push("/")
    }
    return (
        <div className={clsx(styles.mainDiv)}>
            <div>
                <Image className='w-100 h-auto' src="/assests/404/404-image.png" alt="404 image" width="332" height="239" />
            </div>
            <div className={clsx(styles.secondDiv)}>
                <h5>Page Not Found
                </h5>
                <p>{`We're sorry, the page you requested could not be found . `}
                    <br />
                    Please go back to the homepage.
                </p>
                <div className='d-flex justify-content-center'>
                    <IconPayNowButton
                        label={"Back to Homepage"}
                        color={`#FFFFFF`}
                        fontSize={`16px`}
                        fontWeight={`400`}
                        borderRadius={`8px`}
                        pAll={`10px 20px`}
                        bg={`#3E63FF`}
                        border={"none"}
                        type={"button"}
                        handleFun={backToHomeFun}
                    />

                </div>
            </div>
        </div>
    )
}

export default Market404