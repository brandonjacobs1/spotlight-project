import React from "react";

function DateInput({inputName, label, touched, errors, getFieldProps}) {

    return <div className={`form-row ${touched[inputName] && errors[inputName] ? 'input-error' : ''}`}>
        <label htmlFor={inputName}>{label}</label>
        <input
            type='date'
            id={inputName}
            {...getFieldProps(inputName)}
        />
        {touched[inputName] && errors[inputName] && <span className="error">{errors[inputName]}</span>}
    </div>
}

export default DateInput