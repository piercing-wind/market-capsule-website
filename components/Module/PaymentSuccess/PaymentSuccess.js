import React from 'react';
import clsx from "clsx";
import styles from "./style/paymentSuccess.module.scss";
import Image from 'next/image';
import IconPayNowButton from '../Button/IconPayNowButton';
import { useRouter } from 'next/router';
import PaymentSuccessRight from '@/components/svg/PaymentSuccessRight';
import { useTranslation } from 'next-i18next';

const PaymentSuccess = ({ icon, heading, description }) => {
    const { t } = useTranslation("common");

    const router = useRouter()
    const backToHomeFun = () => {
        window.open("/", "_self");

    }
    return (
        <div className={clsx(styles.mainDiv)}>
            <div>
                {icon}
            </div>
            <div className={clsx("d-flex flex-column align-items-center", styles.secondDiv)}>
                <h5>{t(heading)}</h5>

                <p >
                    {t(description)}
                </p>
                <div className='d-flex justify-content-center'>
                    <IconPayNowButton
                        label={"searchResultPage.backToHomepage"}
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

export default PaymentSuccess