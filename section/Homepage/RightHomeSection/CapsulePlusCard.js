import React from 'react';
import Image from 'next/image';
import clsx from "clsx";
import styles from '../style/capsulePlusCard.module.scss'
import dynamic from 'next/dynamic';
const HomeBlueButton = dynamic(() => import('@/components/Module/Button/HomeBlueButton'), { suspense: true })
import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setShowForm, setUpgradeNow } from '@/store/slices/authSlice';

const CapsulePlusCard = () => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const dispatch = useDispatch();
    const { jwt } = useSelector((state) => ({
        jwt: state?.authSlice?.jwt,
    }), shallowEqual)

    const upgradeNowFun = () => {
        if (!jwt) {
            dispatch(setShowForm(true))
            dispatch(setUpgradeNow(true))
        } else {
            router.push("/subscription")
        }
    }

    return (
        <div className={clsx("p-2", styles.trandingDiv)}>
            {/* news heading div */}
            <Image className={clsx("w-100 h-auto")} src="/assests/homepage/capsule-img.png" alt="capsule+ img" width={278} height={203} />
            <div className={clsx("my-4", styles.paraDiv)}>
                <p>
                    <Trans i18nKey={"homepage.rightSection.upgradeToCapsulePlus"} >Upgrade to</Trans>
                    <span> <Trans i18nKey={"homepage.rightSection.capsulePlus"}>Capsule+</Trans>&nbsp;</span>
                    <Trans i18nKey={"homepage.rightSection.nowToUnlock"}>now to unlock exclusive content!</Trans>
                </p>

                <HomeBlueButton
                    color={"#FFFFFF"}
                    bg={"#0F0F0F"}
                    handlerFun={upgradeNowFun}
                    label={t("homepage.rightSection.upgradeNow")}
                />
            </div>
        </div>
    )
}

export default CapsulePlusCard