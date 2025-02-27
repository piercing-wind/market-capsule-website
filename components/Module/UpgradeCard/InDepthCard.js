import React from 'react';
import clsx from "clsx";
import { Trans, useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const IconPayNowButton = dynamic(() => import("../Button/IconPayNowButton"));
import styles from "./style/indepthCard.module.scss"
import { CapsulePlus } from '@/components/svg/CapsulePlus';
import MarketCapsule from '@/components/svg/MarketCapsule'  ;
import { ArrowUpRight } from 'lucide-react';

const InDepthCard = () => {
    const { t } = useTranslation("common");
    const router = useRouter()
    const handleUpgradeNowFun = () => {
        router.push("/capsule-plus")
    }

    return (
        <div className={clsx('d-flex', styles.card)}>
            <div className={clsx("px-lg-4 py-lg-4 p-3 d-flex flex-md-row flex-column row-gap-2 column-xl-gap-0 column-gap-3 justify-content-between align-items-center", styles.planDiv)}>
                <div className={clsx("", styles.leftPara)}>
                    <h5 className={clsx(styles.heading)}>
                        <Trans i18nKey={"screenerSlugPage.discover"}>
                            Discover In-depth Insights About the Company
                        </Trans>
                    </h5>
                    <p className={clsx("mb-0", styles.para)}>
                        <Trans i18nKey={"screenerSlugPage.discoverSlug"}>
                            {`Explore detailed information regarding the company's share capital, exclusive statistics, insights, and much more.`}
                        </Trans>
                    </p>
                </div>

                <div className={clsx("d-flex column-gap-3 align-items-center", styles.rightDiv)}>
                    <p className='mb-0'>
                        <span className={clsx(styles.offerPrice)}>
                            <Trans i18nKey={"screenerSlugPage.exclusiveFor"}>
                                EXCLUSIVE FOR
                            </Trans>
                        </span>
                        <MarketCapsule />
                    </p>
                    <IconPayNowButton
                        label={"screenerSlugPage.readNow"}
                        color={"#FFFFFF"}
                        fontSize={"16px"}
                        fontWeight={"400"}
                        borderRadius={"8px"}
                        pAll={"10px 20px"}
                        bg={"transparent linear-gradient(106deg, #3E63FF 0%, #2EDC90 100%) 0% 0% no-repeat padding-box"}
                        border={"none"}
                        type={"button"}
                        handleFun={handleUpgradeNowFun}
                        gradient={true}

                    />
                </div>
            </div>

        </div>
    )
}

export const TemporaryCard =()=>{
    const router = useRouter()
    const currentUrl = router.asPath.split("/").pop();
    
    const handleUpgradeNowFun = () => {
        router.push(`/capsule-plus/${currentUrl} `)
    }

    return (
        <div className={clsx('d-flex', styles.card)}>
            <div className={clsx("px-lg-4 py-lg-4 p-3 d-flex flex-md-row flex-column row-gap-2 column-xl-gap-0 column-gap-3 justify-content-between align-items-center", styles.planDiv)}>
                <div onClick={()=>handleUpgradeNowFun()} className="flex items-center justify-center w-full h-full cursor-pointer">
                    <h5 className="flex items-center gap-4 justify-center font-semibold">Read More <ArrowUpRight size={32}/></h5>

                </div>
            </div>
        </div>
    )
}

export default InDepthCard