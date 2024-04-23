import * as React from "react";
import FilterCheckbox from "../Checkbox/filterCheckbox";
import clsx from "clsx";
import styles from "./style/sectorAutofillDropdown.module.scss"
import { Trans, useTranslation } from 'next-i18next';
import Search from "@/components/svg/Search";
const SectorAutofillDropdown = ({
    name,
    value,
    placeholder,
    onChange,
    sectorArr,
    filterIndex,
    handleCheckbox
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
                                        ? elId?.label?.toLowerCase()?.includes(value?.toLowerCase())
                                        : elId;
                                })
                                ?.map((elId, typeIndex) => (
                                    <div
                                        value={elId?.id}
                                        key={typeIndex}

                                    >

                                        <div key={typeIndex}
                                            onClick={(type, status) => handleCheckbox(elId.status, filterIndex, typeIndex)}
                                            className={clsx("d-flex align-items-center column-gap-2 mb-2", styles.checkDiv)}
                                        >
                                            <FilterCheckbox
                                                value={elId?.type}
                                                status={elId.status}
                                                type={elId.type}
                                                handleCheckbox={(type, status) => handleCheckbox(status, filterIndex, typeIndex)}
                                            />
                                            <span className={clsx(elId?.status && styles.medium)}>{t(elId?.label)}</span>
                                        </div>

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
