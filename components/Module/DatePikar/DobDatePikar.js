import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./style/dobDatePikar.module.scss"
import clsx from "clsx";
import { Calender } from "@/components/svg/Calender";

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={clsx("w-100 d-flex justify-content-between align-items-center", styles.dobDiv)} onClick={onClick} ref={ref}>
        {value ? (
            <span>{value}</span>
        ) : (
            <span className={styles.placeholder}>Date of Birth</span>
        )}
        <Calender />
    </button>
));
ExampleCustomInput.displayName = 'ExampleCustomInput';
const DobDatePikar = () => {
    const [startDate, setStartDate] = useState();

    return (
        <div className={clsx("mb-2", styles.mainDiv)}
        >
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<ExampleCustomInput />}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                maxDate={new Date()} // Restrict future dates
            />

        </div>
    )
}

export default DobDatePikar