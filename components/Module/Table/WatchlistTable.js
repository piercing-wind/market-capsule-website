import Sort from '@/components/svg/Sort';
import clsx from 'clsx';
import Table from 'react-bootstrap/Table';
import styles from "./style/watchlistTable.module.scss"
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTranslation } from 'next-i18next';

function WatchlistTable(props) {
    const { companyData, companyTableHeading } = props;
    const { t } = useTranslation("common")
    //sort by filter
    const soringFun = () => {
        console.log("sort fun")
    }
    return (
        <Table responsive>
            <thead>
                <tr>
                    {
                        companyTableHeading?.length > 0 ? (
                            companyTableHeading?.map((el, index) => {
                                return (
                                    <th key={index} className={clsx(styles.heading)} >
                                        <div className={clsx('d-flex column-gap-2 align-items-center ', index !== 0 && "justify-content-center")}>
                                            <span  >
                                                {t(el?.heading)}

                                            </span>
                                            {
                                                index !== 0 && index !== companyTableHeading?.length - 1 && (
                                                    <button className={clsx(styles.sortBtn)} onClick={soringFun}>
                                                        <Sort />

                                                    </button>
                                                )
                                            }

                                        </div>

                                    </th>
                                )
                            })
                        ) : null
                    }
                    <th style={{ visibility: "hidden" }} className={clsx(styles.heading)}>{`...`}</th>

                </tr>
            </thead>
            <tbody>
                {
                    companyData?.length > 0 ? (
                        companyData?.map((el, index) => {

                            return (
                                <tr key={index} className={clsx(styles.trTable, index % 2 === 0 ? styles.skyBlueBgColor : styles.whiteBgColor)}>
                                    <td >{el?.companyName}</td>
                                    <td className='text-center'>
                                        {el?.ltp}
                                    </td>
                                    <td className='text-center'>{el?.prevClose}</td>
                                    <td className='text-center' >{el?.change}</td>
                                    <td className='text-center'>{el?.changePercent}</td>
                                    <td className='text-center'>{`${el?.daysLow}-${el?.daysHigh}`}</td>
                                    <td >
                                        <Dropdown className={clsx("threeDotDropdown")}>
                                            <Dropdown.Toggle id="dropdown-basic" className={clsx(styles.threeDot)}>
                                                <BsThreeDotsVertical />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                    </td>
                                </tr>
                            )
                        })
                    ) : null
                }


            </tbody>
        </Table>
    );
}

export default WatchlistTable;