
import clsx from 'clsx';
import Table from 'react-bootstrap/Table';
import styles from "./style/manageSubscriptionTable.module.scss"
import { Trans, useTranslation } from 'next-i18next';
import { LuDownload } from "react-icons/lu";
import dynamic from 'next/dynamic';
import LoderModule from '../LoaderModule';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getSubscriptionList, setSubscriptionListCurrentPage } from '@/store/slices/manageSubscriptionSlice';
import toast from 'react-hot-toast';
import moment from 'moment';
import SeeMore from './SeeMore';
const LoadMoreBtn = dynamic(() => import("../Button/LoadMoreBtn"))

function ManageSubscriptionTable(props) {
    const dispatch = useDispatch()
    const { dataTableHeading } = props;
    const { t } = useTranslation("common")
    const { loading, subscriptionList, subscriptionListCurrentPage, subscriptionTotalList } = useSelector((state) => ({
        subscriptionList: state?.manageSubscriptionSlice?.getSubscriptionObj?.subscriptionList,
        subscriptionListCurrentPage: state?.manageSubscriptionSlice?.getSubscriptionObj?.subscriptionListCurrentPage,
        subscriptionTotalList: state?.manageSubscriptionSlice?.getSubscriptionObj?.subscriptionTotalList,
        loading: state?.manageSubscriptionSlice?.getSubscriptionObj?.loading,
        error: state?.manageSubscriptionSlice?.getSubscriptionObj?.error,

    }), shallowEqual)

    //load more btn 
    const loadMoreFun = async () => {
        const params = {
            page: subscriptionListCurrentPage,
            limit: 5,
        }
        await dispatch(getSubscriptionList(params))
        dispatch(setSubscriptionListCurrentPage(subscriptionListCurrentPage + 1))
    }

    //download invoice
    const downloadInvoice = async (url) => {
        try {
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'invoice.pdf'; // This is the file name that will be used for the downloaded file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Failed to fetch invoice:', error);
        }


    };

    return (

        <>
            <div className={clsx("tableScroll")}>

                <Table responsive>
                    <thead>
                        <tr>
                            {
                                dataTableHeading?.length > 0 ? (
                                    dataTableHeading?.map((el, index) => {
                                        return (
                                            <th key={index} className={clsx(styles.heading)} >
                                                <div className={clsx('d-flex column-gap-2 align-items-center ', index !== 0 && "justify-content-center")}>
                                                    <span  >
                                                        {t(el?.heading)}
                                                    </span>
                                                </div>
                                            </th>
                                        )
                                    })
                                ) : null
                            }
                            <th className={clsx(styles.heading)}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subscriptionList?.length > 0 ? (
                                subscriptionList?.map((el, index) => {
                                    return (
                                        <tr key={index} className={clsx(styles.trTable, index % 2 === 0 ? styles.skyBlueBgColor : styles.whiteBgColor)}>
                                            <td className={clsx(styles.createdAt)}>

                                                {el?.createdAt ? moment(el?.createdAt).format('MMMM D, YYYY') : "-"}
                                            </td>
                                            <td className='text-center'>
                                                {el?.orderId ? el?.orderId : "-"}
                                            </td>
                                            <td className='text-center'>{`${el?.plan?.name} (${el?.plan?.planType})`}</td>
                                            <td className='text-center'>{`₹${el?.amount ? el?.amount : "-"}`}</td>
                                            <td className={clsx('text-center', styles.invoice)}>
                                                {
                                                    el?.invoiceUrl && (
                                                        <a style={{ textDecoration: "none" }} href={el?.invoiceUrl} target="_blank" rel="noreferrer" >
                                                            <button
                                                                style={{ cursor: el?.invoiceUrl ? "pointer" : "not-allowed" }}
                                                                className={clsx("d-flex align-items-center column-gap-2", styles.btn)}>
                                                                <LuDownload />
                                                                {t("manageSubscription.downloadInvoice")}
                                                            </button>
                                                        </a>

                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : null
                        }

                    </tbody>
                </Table>
                <SeeMore />

            </div>
            {
                subscriptionList?.length > 4

                && (
                    <LoadMoreBtn
                        totalList={subscriptionTotalList}
                        loading={loading}
                        data={subscriptionList}
                        loadMoreFun={loadMoreFun}

                    />
                )
            }
        </>

    );
}

export default ManageSubscriptionTable;