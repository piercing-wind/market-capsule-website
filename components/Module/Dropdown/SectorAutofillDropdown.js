import * as React from "react";
import FilterCheckbox from "../Checkbox/filterCheckbox";
import clsx from "clsx";
import styles from "./style/sectorAutofillDropdown.module.scss"
import { Trans, useTranslation } from 'next-i18next';
import Search from "@/components/svg/Search";
import BlueCheckbox from "@/components/svg/BlueCheckbox";
const SectorAutofillDropdown = ({
    name,
    value,
    placeholder,
    onChange,
    sectorArr,
    handleFilterChange,
    el,
    checkedState
}) => {

    const [list, setList] = React.useState(sectorArr);
    const { t } = useTranslation("common")


    return (
        <>
            <div className="col-xl-12 col-12">
                <div id="companyCityInput" className={clsx(styles.inputBlock, styles.typeahead)}>
                    <div className={clsx(styles.searchBar)}>
                        <Search
                            width="14"
                            height="14"
                        />
                        <input
                            className={styles.typeaheadInput}
                            value={value}
                            placeholder={placeholder}
                            name={name}
                            type={"text"}
                            onChange={(e) => onChange(e.target.value)}
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </div>


                    <div
                        className={styles.inputSearchBox}
                        style={{
                            display: "block",
                        }}
                    >
                        {list?.length
                            ? list
                                ?.filter((elId) => {
                                    return value
                                        ? elId?.name?.toLowerCase()?.includes(value?.toLowerCase())
                                        : elId;
                                })
                                ?.map((option, typeIndex) => (
                                    <div className="custom-checkbox-container" key={typeIndex}>
                                        <input
                                            type="checkbox"
                                            name={option?.name}
                                            id={option?.name + el?.filterName}
                                            value={el?.filterName !== "companyName" ? option?.id : option?.name}
                                            checked={checkedState[option?.name] || false}
                                            onChange={(e) => handleFilterChange(e, el?.filterName)}
                                            className="custom-checkbox-input"
                                        />
                                        <label htmlFor={option.name + el?.filterName} className={clsx("custom-checkbox-label mb-2", styles.span, checkedState[option?.name] && styles.medium)}>

                                            <span className="custom-checkbox-icon">
                                                {checkedState[option?.name] && (
                                                    <BlueCheckbox />
                                                )}
                                            </span>
                                            {option?.name}
                                        </label>
                                    </div>


                                ))
                            : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SectorAutofillDropdown;
