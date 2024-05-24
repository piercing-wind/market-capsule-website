import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SettingFilter from '@/components/svg/SettingFilter';
import Accordion from 'react-bootstrap/Accordion';
import clsx from 'clsx';
import styles from "./style/screenerFilterAccrodian.module.scss"
import dynamic from 'next/dynamic';
import { Trans, useTranslation } from 'next-i18next';
const SectorAutofillDropdown = dynamic(() => import("../Dropdown/SectorAutofillDropdown"))
import * as Icon from "react-icons/fi";
import BlueCheckbox from "@/components/svg/BlueCheckbox";
import { getCapsulePlusCompanyData, setCompanyIndustryId, setCompanyListCurrentPage, setCompanyListEmpty, setCompanyName, setCompanySectorId, setCompanyTypeId } from "@/store/slices/capsulePlusSlice";


const CapsulePlusFilter = ({ filters }) => {
    const [checkedState, setCheckedState] = useState({});
    const [filterData, setFilterData] = useState(filters);
    const [filterState, setFilterState] = useState({});
    const router = useRouter();
    const dispatch = useDispatch();
    const [sector, setSector] = useState("");
    const [industry, setIndustry] = useState("");
    const [company, setCompany] = useState("");
    const { t } = useTranslation("common")

    const applyFilters = async () => {
        const params = {
            page: 1,
            limit: 9,
            capsuleplus: true

        };

        Object?.entries(filterState)?.forEach(([key, value]) => {
            params[key] = value;
        });

        if (params?.companyTypeId) {
            dispatch(setCompanyTypeId(params?.companyTypeId));
        }

        if (params?.sectorId) {
            dispatch(setCompanySectorId(params?.sectorId));
        }

        if (params?.industryId) {
            dispatch(setCompanyIndustryId(params?.industryId));
        }

        if (params?.companyName) {
            dispatch(setCompanyName(params?.companyName));
        }

        dispatch(setCompanyListEmpty());
        await dispatch(getCapsulePlusCompanyData(params));
        dispatch(setCompanyListCurrentPage(2));
    };

    const handleFilterChange = async (e, filterName) => {
        const { name, value, type, checked } = e.target;

        setCheckedState((prevState) => ({
            ...prevState,
            [name]: checked,
        }));

        setFilterState(prevState => {
            const newState = { ...prevState };

            if (checked) {
                if (!Array.isArray(newState[filterName])) {
                    newState[filterName] = [];
                }
                newState[filterName] = [...newState[filterName], value];

            } else {
                newState[filterName] = newState[filterName]?.filter(val => val !== value);
            }

            return newState;
        });
    };




    useEffect(() => {
        if (Object?.keys(filterState)?.length > 0) {
            applyFilters()
        }
    }, [filterState])
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
                                    <Accordion.Header className={clsx("accrodianBtn", styles.btn)} >{t(el?.filterName)}</Accordion.Header>
                                    <Accordion.Body className={clsx(styles.body)}>
                                        {
                                            el?.filterName === "sectorId" ? (
                                                <SectorAutofillDropdown
                                                    name={el?.name}
                                                    placeholder={t("ipoPage.searchSector")}
                                                    value={sector}
                                                    onChange={(value) => {
                                                        setSector(value)
                                                    }}
                                                    sectorArr={el?.detail}
                                                    filterIndex={filterIndex}
                                                    handleFilterChange={handleFilterChange}
                                                    el={el}
                                                    checkedState={checkedState}
                                                />

                                            ) : el?.filterName === "industryId" ? (
                                                <SectorAutofillDropdown
                                                    name={"industry"}
                                                    placeholder={t("ipoPage.searchIndustry")}
                                                    value={industry}
                                                    onChange={(value) => {
                                                        setIndustry(value)
                                                    }}
                                                    sectorArr={el?.detail}
                                                    filterIndex={filterIndex}
                                                    handleFilterChange={handleFilterChange}
                                                    el={el}
                                                    checkedState={checkedState}
                                                />
                                            ) : el?.filterName === "companyName" ? (

                                                <SectorAutofillDropdown
                                                    name={"companyName"}
                                                    placeholder={t("ipoPage.searchCompany")}
                                                    value={company}
                                                    onChange={(value) => {
                                                        setCompany(value)
                                                    }}
                                                    sectorArr={el?.detail}
                                                    filterIndex={filterIndex}
                                                    handleFilterChange={handleFilterChange}
                                                    el={el}
                                                    checkedState={checkedState}
                                                />
                                            ) : (
                                                el?.detail?.map((option, typeIndex) => {
                                                    return (

                                                        <div className="custom-checkbox-container" key={option?.name + el?.filterName}>
                                                            <input
                                                                type="checkbox"
                                                                name={option?.name}
                                                                id={option?.name + el?.filterName}
                                                                value={option?.id || option?.name}
                                                                checked={checkedState[option?.name] || false}
                                                                onChange={(e) => handleFilterChange(e, el?.filterName)}
                                                                className="custom-checkbox-input"
                                                            />
                                                            <label htmlFor={option?.name + el?.filterName} className={clsx("custom-checkbox-label mb-2", styles.span, checkedState[option?.name] && styles.medium)}>

                                                                <span className="custom-checkbox-icon">
                                                                    {checkedState[option?.name] && (
                                                                        <BlueCheckbox />
                                                                    )}
                                                                </span>
                                                                {option?.name}
                                                            </label>
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

    );
};

export default CapsulePlusFilter