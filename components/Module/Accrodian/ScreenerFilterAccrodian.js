import SettingFilter from '@/components/svg/SettingFilter';
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import clsx from 'clsx';
import styles from "./style/screenerFilterAccrodian.module.scss"
import dynamic from 'next/dynamic';
import { Trans, useTranslation } from 'next-i18next';
const FilterCheckbox = dynamic(() => import("../Checkbox/filterCheckbox"))
const SectorAutofillDropdown = dynamic(() => import("../Dropdown/SectorAutofillDropdown"))

const ScreenerFilterAccrodian = ({ initialFilterData }) => {
    const [filterData, setFilterData] = useState(initialFilterData);
    const [sector, setSector] = useState("");
    const [industry, setIndustry] = useState("");
    const [company, setCompany] = useState("");
    const { t } = useTranslation("common")

    const handleCheckbox = (status, filterDataIndex, typeIndex) => {
        const updatedFilterData = [...filterData];
        updatedFilterData[filterDataIndex].typesArr[typeIndex].status = !status;
        setFilterData(updatedFilterData);
    };
    return (
        <div>

            {/* filter icon */}
            <div className={clsx('d-flex align-items-center column-gap-2', styles.div)}>
                <SettingFilter />
                <p className='mb-0'>
                    <Trans i18nKey={"screenerIdPage.filters"}>

                        FILTERS
                    </Trans>
                </p>
            </div>

            <Accordion defaultActiveKey="0" className={clsx(styles.accrodian, "accrodian")} alwaysOpen>
                {
                    filterData?.length > 0 ? (
                        filterData?.map((el, filterIndex) => {
                            return (
                                <Accordion.Item eventKey={`${filterIndex}`} key={filterIndex}>
                                    <Accordion.Header className={clsx("accrodianBtn", styles.btn)} >{t(el?.heading)}</Accordion.Header>
                                    <Accordion.Body className={clsx(styles.body)}>
                                        {
                                            el?.typeValue === "sector" ? (
                                                <SectorAutofillDropdown
                                                    name={"sector"}
                                                    placeholder={t("ipoPage.searchSector")}
                                                    value={sector}
                                                    onChange={(value) => {
                                                        setSector(value)
                                                    }}
                                                    sectorArr={el?.typesArr}
                                                    filterIndex={filterIndex}
                                                    handleCheckbox={handleCheckbox}
                                                />

                                            ) : el?.typeValue === "industry" ? (
                                                <SectorAutofillDropdown
                                                    name={"industry"}
                                                    placeholder={t("ipoPage.searchIndustry")}
                                                    value={industry}
                                                    onChange={(value) => {
                                                        setIndustry(value)
                                                    }}
                                                    sectorArr={el?.typesArr}
                                                    filterIndex={filterIndex}
                                                    handleCheckbox={handleCheckbox}
                                                />
                                            ) : el?.typeValue === "companyName" ? (
                                                <SectorAutofillDropdown
                                                    name={"companyName"}
                                                    placeholder={t("ipoPage.searchCompany")}
                                                    value={company}
                                                    onChange={(value) => {
                                                        setCompany(value)
                                                    }}
                                                    sectorArr={el?.typesArr}
                                                    filterIndex={filterIndex}
                                                    handleCheckbox={handleCheckbox}
                                                />
                                            ) : (
                                                el?.typesArr?.map((elId, typeIndex) => {
                                                    return (
                                                        <div
                                                            key={typeIndex}
                                                            className={clsx("d-flex align-items-center column-gap-2 mb-2", styles.checkDiv)}
                                                            onClick={(type, status) => handleCheckbox(elId?.status, filterIndex, typeIndex)}
                                                            value={elId?.type}
                                                        >
                                                            <FilterCheckbox
                                                                status={elId?.status}
                                                                type={elId?.type}
                                                            />
                                                            <span className={clsx(elId?.status && styles.medium)}>{t(elId?.label)}</span>
                                                        </div>

                                                    )
                                                })
                                            )
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>

                            )
                        })
                    ) : null
                }

            </Accordion>
        </div>
    )
}

export default ScreenerFilterAccrodian