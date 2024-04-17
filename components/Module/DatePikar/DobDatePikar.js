import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./style/dobDatePikar.module.scss"
import clsx from "clsx";
import { Calender } from "@/components/svg/Calender";

const ExampleCustomInput = forwardRef(({ value, onClick, readOnly = false }, ref) => (

    <button type={"button"} disabled={readOnly ? true : false} className={clsx("w-100 d-flex justify-content-between align-items-center", styles.dobDiv, readOnly && styles.dobColor)} onClick={onClick} ref={ref}>
        {value ? (
            <span>{value}</span>
        ) : (
            <span className={styles.placeholder}>Date of Birth</span>
        )}
        <Calender />
    </button>
));
ExampleCustomInput.displayName = 'ExampleCustomInput';
const DobDatePikar = ({ startDate, setStartDate, formik, readOnly }) => {

    return (
        <div className={clsx("mb-2", styles.mainDiv)}
        >
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(formik, date)}
                customInput={<ExampleCustomInput />}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                maxDate={new Date()} // Restrict future dates
                readOnly={readOnly}
            />

        </div>
    )
}

export default DobDatePikar