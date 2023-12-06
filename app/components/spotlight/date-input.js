import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function DateInput({ inputName, label, handleBlur, setFieldValue, value }) {
    const [error, setError] = React.useState(null);

    const handleChange = (selectedDate) => {
        // Convert the selectedDate to ISO format
        setFieldValue(inputName, selectedDate);
    };

    if (value) {
        value = dayjs(value)
    } else {
        value = null
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                id={inputName}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onError={(newError) => setError(newError)}
                slotProps={{
                    textField: {
                        helperText: error,
                    },
                }}
            />
        </LocalizationProvider>
    );
}

export default DateInput;
