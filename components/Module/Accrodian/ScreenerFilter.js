import { getScreenerIdData, setCompanyListCurrentPage, setCompanyListEmpty, setCompanyMarketCapGte, setCompanyMarketCapLte, setCompanyPeGte, setCompanyPeLte, setCompanyTypeId } from "@/store/slices/screenerIdSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SettingFilter from '@/components/svg/SettingFilter';
import Accordion from 'react-bootstrap/Accordion';
import clsx from 'clsx';
import styles from "./style/screenerFilterAccrodian.module.scss"
import dynamic from 'next/dynamic';
import { Trans, useTranslation } from 'next-i18next';
import BlueCheckbox from "@/components/svg/BlueCheckbox";


export const ScreenerFilter = ({ filters }) => {
    const [checkedState, setCheckedState] = useState({});
    const [filterData, setFilterData] = useState(filters);
    const [filterState, setFilterState] = useState({});
    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation("common")
    const { sortCompany } = useSelector((state) => ({
        sortCompany: state?.screenerIdSlice?.getScreenerIdDataObj?.sortCompany,
    }), shallowEqual)

    const applyFilters = async () => {
        const params = {
            page: 1,
            limit: 10,
            bucketSlug: router?.query?.id,
            sort: sortCompany || "",
        };
        const companyTypeFilter = filters?.find(filter => filter?.filterName === 'companyTypeId');
        const allCompanyTypeIds = companyTypeFilter ? companyTypeFilter?.detail?.map(option => option?.id?.toString()) : [];
        const peFilter = filters?.find(filter => filter?.filterName === 'pe');
        const allPeValues = peFilter ? peFilter?.detail?.map(option => option?.lte ? `${option?.lte}+lte` : `${option?.gte}+gte`) : [];
        const marketCapFilter = filters?.find(filter => filter?.filterName === 'marketCap');
        const allMarketCapValues = marketCapFilter ? marketCapFilter?.detail?.map(option => option?.lte ? `${option?.lte}+lte` : `${option?.gte}+gte`) : [];

        Object.entries(filterState).forEach(([key, value]) => {
            if (key === 'pe') {

                if (value?.length === allPeValues.length) {
                    params[`peLte`] = ''
                    params[`peGte`] = ''

                } else {
                    value.forEach(v => {
                        const [val, operator] = v.split('+');
                        params[`pe${operator.charAt(0).toUpperCase() + operator.slice(1)}`] = val;

                    });

                }
            } else if (key === 'marketCap') {

                if (value?.length === allMarketCapValues?.length) {
                    params[`marketCapLte`] = ''
                    params[`marketCapGte`] = ''

                } else {
                    value.forEach(v => {
                        const [val, operator] = v.split('+');
                        params[`marketCap${operator.charAt(0).toUpperCase() + operator.slice(1)}`] = val;
                    });
                }
            } else if (key === 'companyTypeId') {
                // Check if all possible companyTypeIds are selected
                params[key] = value;

            } else {
                params[key] = value;
            }
        });

        if (params?.companyTypeId) {
            dispatch(setCompanyTypeId(params?.companyTypeId));
        }

        if (params?.peLte) {
            dispatch(setCompanyPeLte(params?.peLte));
        }

        if (params?.peGte) {
            dispatch(setCompanyPeGte(params?.peGte));
        }

        if (params?.marketCapLte) {
            dispatch(setCompanyMarketCapLte(params?.marketCapLte));
        }
        if (params?.marketCapGte) {
            dispatch(setCompanyMarketCapGte(params?.marketCapGte));
        }

        dispatch(setCompanyListEmpty());
        await dispatch(getScreenerIdData(params));
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
                if (!newState[filterName]) {
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
        if (Object.keys(filterState).length > 0) {
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
                                    <Accordion.Header className={clsx("accrodianBtn", styles.btn)} >{t(el?.name)}</Accordion.Header>
                                    <Accordion.Body className={clsx(styles.body)}>
                                        {

                                            el?.detail?.map((option, typeIndex) => {
                                                return (

                                                    <div className="custom-checkbox-container" key={option.name + el?.filterName}>
                                                        <input
                                                            type="checkbox"
                                                            name={option.name}
                                                            id={option.name + el?.filterName}
                                                            value={option.id || (option.lte ? `${option.lte}+lte` : `${option.gte}+gte`)}
                                                            checked={checkedState[option.name] || false}
                                                            onChange={(e) => handleFilterChange(e, el?.filterName)}
                                                            className="custom-checkbox-input"
                                                        />
                                                        <label htmlFor={option.name + el?.filterName} className={clsx("custom-checkbox-label mb-2", styles.span, checkedState[option.name] && styles.medium)}>

                                                            <span className="custom-checkbox-icon">
                                                                {checkedState[option.name] && (
                                                                    <BlueCheckbox />
                                                                )}
                                                            </span>
                                                            {option.name}
                                                        </label>
                                                    </div>


                                                )
                                            })

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
