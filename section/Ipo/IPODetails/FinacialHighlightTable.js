import React from 'react';
import clsx from "clsx";
import styles from "./style/finacialHightlight.module.scss";
import Table from 'react-bootstrap/Table';
import { Trans, useTranslation } from 'next-i18next';

const FinacialHighlightTable = ({ uniqueYears, finacialHightlightGroupedData, paricular = "" }) => {
    const { t } = useTranslation("common")
    return (
        <div className={clsx("tableScroll")}>
            <Table responsive>
                <thead>
                    <tr>
                        <th className={clsx(styles.heading1)}>
                            {paricular && t(paricular)}
                        </th>
                        {
                            uniqueYears?.length > 0 ? (
                                uniqueYears?.map((el, index) => {
                                    return (
                                        <th key={index} className={clsx(styles.heading)} >
                                            <div className={clsx('d-flex column-gap-2 align-items-center justify-content-center ', index !== 0 && "justify-content-center")}>
                                                <span className='text-center'>
                                                    {`${el?.month}-${el?.year}`}

                                                </span>
                                            </div>
                                        </th>
                                    )
                                })
                            ) : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {Object?.keys(finacialHightlightGroupedData)?.map((title, index) => (
                        <tr key={title} className={clsx(styles.trTable, index % 2 === 0 ? styles.skyBlueBgColor : styles.whiteBgColor)}>
                            <td>{title}</td>
                            {uniqueYears?.map((el, index) => {
                                const item = finacialHightlightGroupedData[title]?.find(
                                    (dataItem) => dataItem?.year === el?.year
                                );
                                return <td key={index} className={clsx('text-center', styles.regular)}>{item ? item?.value : ""}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default FinacialHighlightTable