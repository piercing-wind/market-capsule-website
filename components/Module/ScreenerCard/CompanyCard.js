import React from 'react';
import clsx from "clsx";
import styles from "./style/companyCard.module.scss"
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Trans, useTranslation } from 'next-i18next';
import Link from 'next/link';
import Bolt from '@/components/svg/Bolt';
import { truncateText } from '@/utils/constants';
import { setShowForm, setUpgradeNow } from '@/store/slices/authSlice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const RightArrow = dynamic(() => import('@/components/svg/RightArrow'))
const HomeBlueButton = dynamic(() => import('@/components/Module/Button/HomeBlueButton'))

const CompanyCard = (props) => {
    const { dataObj } = props;
    const {
        id, name, slug, capsuleplus, description, image, count } = dataObj;
    const { t } = useTranslation("common");
    const { jwt, userDetails } = useSelector((state) => ({
        jwt: state?.authSlice?.jwt,
        userDetails: state?.authSlice?.userDetails,

    }), shallowEqual)
    const dispatch = useDispatch()
    const router = useRouter()
    //CASE STUdY FUNCTION
    const upgradeNowFunction = () => {
        if (!jwt) {
            dispatch(setShowForm(true))
            dispatch(setUpgradeNow(true))
        } else {
            router.push("/subscription")
        }
    }

    return (
        <div className={clsx("px-2 pt-2 pb-4", styles.trandingDiv)}>
            {/* news heading div */}
            <div className={clsx(styles.imageDiv)}>
                <Image className={clsx("w-100 h-auto borderRadius8")} src={image?.url} alt={image?.alternativeText ? image?.alternativeText : name} width={278} height={146} />

                {
                    capsuleplus && (
                        <div className={clsx("d-flex column-gap-1 align-items-center justify-content-center", styles.capsulePlusDiv)}>
                            <Bolt /><span>
                                <Trans i18nKey={"screener.capsulePlus"}>
                                    capsule+
                                </Trans>
                            </span>
                        </div>

                    )
                }
            </div>

            <div className={clsx("mt-3 d-flex column-gap-1 flex-wrap row-gap-1", styles.labelDiv)}>
                {
                    !capsuleplus && (
                        <span className={clsx("px-2 py-1", styles.greenBgColor)}>{`Free`}</span>
                    )
                }
                <span className={clsx("px-2 py-1", styles.skyBgColor)}>{`${count} Companies`}</span>
                <span className={clsx("px-2 py-1", styles.lightYellowBgColor)}>{`Recently updated`}</span>
            </div>
            <h5 className='mt-2 mb-1'>{truncateText(name, 7)}</h5>
            <p>{truncateText(description, 9)}</p>
            {
                capsuleplus && !userDetails?.capsuleplus ? (
                    <div className={clsx(styles.btn)}>
                        <HomeBlueButton
                            color={"#000000"}
                            bg={"transparent"}
                            handlerFun={upgradeNowFunction}
                            label={`Know More`}
                        />
                        <RightArrow />
                    </div>
                ) : (
                    <Link className={clsx(styles.readNow)} href={`/screener/${slug}`}>
                        <Trans i18nKey={""}>
                            Know More
                        </Trans>  <RightArrow />
                    </Link>

                )
            }
        </div>
    )
}

export default CompanyCard