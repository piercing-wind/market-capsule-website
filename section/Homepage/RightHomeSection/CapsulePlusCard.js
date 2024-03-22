import React from 'react';
import Image from 'next/image';
import clsx from "clsx";
import styles from '../style/capsulePlusCard.module.scss'
import dynamic from 'next/dynamic';
const HomeBlueButton = dynamic(() => import('@/components/Module/Button/HomeBlueButton'), { suspense: true })


const CapsulePlusCard = () => {

    const upgradeNowFun = () => {
        console.log("upgrade now ")
    }
    return (
        <div className={clsx("p-2", styles.trandingDiv)}>
            {/* news heading div */}
            <Image className={clsx("w-100 h-auto")} src="/assests/homepage/capsule-img.png" alt="capsule+ img" width={278} height={203} />
            <div className={clsx("my-4", styles.paraDiv)}>
                <p>Upgrade to <span>Capsule+</span> now to unlock exclusive content!</p>

                <HomeBlueButton
                    color={"#FFFFFF"}
                    bg={"#0F0F0F"}
                    handlerFun={upgradeNowFun}
                    label={"Upgrade Now"}
                />

            </div>


        </div>
    )
}

export default CapsulePlusCard