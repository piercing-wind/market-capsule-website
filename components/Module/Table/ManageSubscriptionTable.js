
import clsx from 'clsx';
import Table from 'react-bootstrap/Table';
import styles from "./style/manageSubscriptionTable.module.scss"
import { Trans, useTranslation } from 'next-i18next';
import { LuDownload } from "react-icons/lu";
import dynamic from 'next/dynamic';
import { useState } from 'react';
const LoadMoreBtn = dynamic(() => import("../Button/LoadMoreBtn"))

function ManageSubscriptionTable(props) {
    const [itemPerPage, setItemPerPage] = useState(5)

    const { dataTable, dataTableHeading } = props;
    const { t } = useTranslation("common")

    //load more btn 
    const loadMoreFun = () => {
        console.log("load more fun")
        if (dataTable?.length > itemPerPage) {

            setItemPerPage(itemPerPage + 3)
        }
    }

    //download invoice
    const downloadInvoice = async () => {

        console.log("downloadInvoice")
    };
    return (
        <>
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
                        dataTable?.length > 0 ? (
                            dataTable?.slice(0, itemPerPage)?.map((el, index) => {
                                return (
                                    <tr key={index} className={clsx(styles.trTable, index % 2 === 0 ? styles.skyBlueBgColor : styles.whiteBgColor)}>
                                        <td >{el?.date}</td>
                                        <td className='text-center'>
                                            {el?.orderId}
                                        </td>
                                        <td className='text-center'>{el?.plan}</td>
                                        <td className='text-center'>{`₹${el?.amount}`}</td>
                                        <td className='text-center'>
                                            <button
                                                onClick={downloadInvoice}
                                                className={clsx("d-flex align-items-center column-gap-2", styles.btn)}>
                                                <LuDownload />
                                                {t("manageSubscription.downloadInvoice")}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : null
                    }

                </tbody>
            </Table>
            {
                dataTable?.length > 5 && (
                    <LoadMoreBtn data={dataTable} itemPerpage={itemPerPage} loadMoreFun={loadMoreFun} />
                )
            }
        </>
    );
}

export default ManageSubscriptionTable;