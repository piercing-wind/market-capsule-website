import React, { useReducer, useState } from 'react';
import styles from "./style/screenerSlugBanner.module.scss";
import clsx from "clsx";
import Image from 'next/image';
import IconPayNowButton from '../Button/IconPayNowButton';
import ArrowUpRight from '@/components/svg/ArrowUpRight';
import Bookmark from '@/components/svg/Bookmark';
import { useTranslation, Trans } from 'next-i18next';
import { useRouter } from 'next/router';
import { addToWatchList } from '@/store/slices/watchListSlice';
import toast from 'react-hot-toast';


const ScreenerSlugBanner = ({ banner = "screener", companyName, sector, url, companyLogo, alt, companyId }) => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const [loder, setLoader] = useState(false)

    const handleAddToWatchlist = async () => {
        const submitData = {
            companyId: companyId
        }
        setLoader(true)

        await addToWatchList(submitData,
            (res) => {
                if (res?.success) {
                    toast.success(t(res?.message));
                    setLoader(false)

                } else {
                    toast.error(res?.message);
                    setLoader(false);
                }
            },
            (err) => {
                if (!err?.success) {
                    toast.error(err?.message);
                    setLoader(false)
                }
            }
        );
    }
    const goToUrlFun = () => {
        if (url) {
            window.open(url, '_blank');
        }
    }
    return (
        <div className={clsx("d-flex flex-md-row gap-3 flex-column justify-content-md-between justify-content-center align-items-center", styles.bannerDiv, banner === "ipo" ? styles.ipoBanner : banner === "capsulePlus" ? styles.capsulePlusBanner : "")}>
            {/* left div */}
            <div className={clsx("d-flex flex-sm-row flex-column justify-content-sm-start justify-content-center  column-gap-3 row-gap-2 align-items-center")}>
                <div className={clsx(styles.image)}>
                    <Image className='borderRadius8' src={companyLogo} alt={alt} width="116" height="116" />
                </div>
                <div className={clsx(styles.leftDiv)}>
                    <h5>{companyName}</h5>
                    <div className={clsx("d-flex flex-sm-row flex-column column-gap-1 row-gap-2")}>
                        <button style={{ cursor: "unset" }}>{sector}</button>
                        <button style={{ cursor: url ? "cursor" : "not-allowed" }} disabled={!url ? true : false} onClick={goToUrlFun}>{url} &nbsp;<ArrowUpRight /></button>

                    </div>
                </div>

            </div>
            {/* right div */}
            {
                banner === "screener" && (
                    <div className={clsx(styles.rightDiv)}>
                        <IconPayNowButton
                            label={`screenerSlugPage.addToWatchlist`}
                            color={"#FFFFFF"}
                            fontSize={"16px"}
                            fontWeight={"400"}
                            borderRadius={"8px"}
                            pAll={"10px 20px"}
                            bg={"#000000"}
                            border={"none"}
                            type={"button"}
                            handleFun={handleAddToWatchlist}
                            icon={<Bookmark
                                width='15'
                                height='15'
                            />
                            }
                            disabled={loder ? true : false}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default ScreenerSlugBanner