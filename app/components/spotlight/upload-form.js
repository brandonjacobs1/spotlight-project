'use client'
import React from "react";
import { Formik } from "formik";
import * as yup from 'yup';
import {useRouter} from "next/navigation";
import axios from "axios";
import DateInput from "@/app/components/spotlight/date-input";
const UploadForm = () => {
    const router = useRouter()
    const MAX_SIZE = 10000000

    const submit = async (values) => {
        console.log(`Form data: ${JSON.stringify(values)}`)
        let filePath
        if (values.image && values.last_name && values.husband_first_name && values.wife_first_name) {
            // get image
            let type = values.image.type
            const index = type.lastIndexOf('/')
            type = type.substring(index + 1)
            filePath = `images/${values.last_name}_${values.husband_first_name}_${values.wife_first_name}.${type}`
            const { data } = await axios.post('api/create-spotlight', {filePath, values})
            // upload image
            if (data.url) {
                const res = await axios.put(data.url, values.image)
                if (res.status === 200) return router.push('/spotlights')
            } else {
                console.log(`Error form submit: ${JSON.stringify(data.error)}`)
            }
        }
    }

    const memberTypes = [
        {label: 'New', value: 'N'},
        {label: 'Old', value: 'O'},
    ]

    const DateWidgets = {
        A: {key: 'date_asked', label: 'Date Asked'},
        R: {key: 'date_ready', label: 'Date Ready'},
        P: {key: 'date_planned', label: 'Date Planned'},
        S: {key: 'date_slacked', label: 'Date Slacked'},
    }

    const initialValues = {
        last_name: '',
        husband_first_name: '',
        wife_first_name: '',
        bio: '',
        member_type: '',
        status: '',
        date_asked: '',
        date_ready: '',
        date_planned: '',
        date_slacked: '',
        date_joined: '',
        image: undefined,
    }


    let schema = yup.object().shape({
        last_name: yup.string()
            .required("Last name is required")
            .max(20, 'Last name cannot be longer than 20 characters'),
        husband_first_name: yup.string()
            .required("Husband's first name is required")
            .max(20, 'Wife\'s first name cannot be longer than 20 characters'),
        wife_first_name: yup.string()
            .required("Wife's first name is required")
            .max(20, 'Husband\'s first name cannot be longer than 20 characters'),
        bio: yup.string(),
        member_type: yup.string()
            .max(1, 'Member type should be at most 1 character'), // Select Element
        status: yup.string()
            .max(2, 'Status should be at most 2 characters'),
        date_asked: yup.date(),
        date_ready: yup.date(),
        date_planned: yup.date(),
        date_slacked: yup.date(),
        date_joined: yup.date(),
        image: yup.mixed()
            .when(['last_name', 'husband_first_name', 'wife_first_name'], {
                is: (last_name, husband_first_name, wife_first_name) => (!last_name || !husband_first_name || !wife_first_name),
                then: () => yup.mixed().required('Image is required when last name and both first names are incomplete')
                // otherwise: yup.mixed(),
            })
            .test('is file right size and type', 'Max file size is 10Mb', (value) => {
                return !value || (value.size <= MAX_SIZE);
            }),

    })

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={schema}
        >
            {(formik) => {
                const { getFieldProps, handleSubmit, dirty, isValid, touched, errors, handleChange, handleBlur, setFieldValue } = formik
                return (
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className={`form-row ${touched.last_name && errors.last_name ? 'input-error' : ''}`}>
                            <label htmlFor={'last_name'}>Last Name</label>
                            <input
                                type="text"
                                id="last_name"
                                {...getFieldProps("last_name")}
                            />
                            {touched.last_name && errors.last_name && <span className="error">{errors.last_name}</span>}
                        </div>

                        <div className={`form-row ${touched.husband_first_name && errors.husband_first_name ? 'input-error' : ''}`}>
                            <label htmlFor={'husband_first_name'}>{'Husband\'s First Name'}</label>
                            <input
                                type="text"
                                id="husband_first_name"
                                {...getFieldProps("husband_first_name")}
                            />
                            {touched.husband_first_name && errors.husband_first_name && <span className="error">{errors.husband_first_name}</span>}
                        </div>

                        <div className={`form-row ${touched.wife_first_name && errors.wife_first_name ? 'input-error' : ''}`}>
                            <label htmlFor={'wife_first_name'}>{'Wife\'s First Name'}</label>
                            <input
                                type="text"
                                id="wife_first_name"
                                {...getFieldProps("wife_first_name")}
                            />
                            {touched.wife_first_name && errors.wife_first_name && <span className="error">{errors.wife_first_name}</span>}
                        </div>

                        <div className={`form-row ${touched.bio && errors.bio ? 'input-error' : ''}`}>
                            <label htmlFor={'bio'}>{'Bio'}</label>
                            <textarea
                                id="bio"
                                {...getFieldProps("bio")}
                            />
                            {touched.bio && errors.bio && <span className="error">{errors.bio}</span>}
                        </div>

                        <div className={`form-row ${touched.member_type && errors.member_type ? 'input-error' : ''}`}>
                            <p>Membership</p>
                            {memberTypes.map((option) => (
                                <div className="" key={option.value}>
                                <input
                                    type="radio"
                                    id={option.value}
                                    className=""
                                    name="member_type"
                                    value={option.value}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <label
                                    className=""
                                    htmlFor={option.value}
                                >
                                    {option.label}
                                </label>
                        </div>
                        ))}
                            {touched.member_type && errors.member_type && <span className="error">{errors.member_type}</span>}
                        </div>

                        <DateInput label='Date Joined'
                                   inputName='date_joined'
                                   touched={touched}
                                   errors={errors}
                                   getFieldProps={getFieldProps}>
                        </DateInput>

                        <div className={`form-row ${touched.status && errors.status ? 'input-error' : ''}`}>
                            <label htmlFor={'status'}>{'Status'}</label>
                            <select
                                id="status"
                                {...getFieldProps("status")}
                            >
                                <option value={'NS'}>Not Started</option>
                                <option value={'A'}>Asked</option>
                                <option value={'R'}>Ready</option>
                                <option value={'P'}>Planned</option>
                                <option value={'S'}>Slacked</option>
                            </select>

                            {touched.status && errors.status && <span className="error">{errors.status}</span>}
                        </div>
                        {formik.values.status || formik.values.status === 'NS' ?
                        <DateInput label={DateWidgets[formik.values.status].label}
                                   inputName={DateWidgets[formik.values.status].key}
                                   touched={touched} errors={errors}
                                   getFieldProps={getFieldProps}>
                        </DateInput> : null}
                        <div>
                            <input
                                type='file'
                                name='image'
                                id='image'
                                accept="image/*, .svg"
                                onChange={async (e) => {
                                    if (e.currentTarget.files) {
                                        await setFieldValue('image', e.currentTarget.files[0]);
                                    }
                                }}
                            />
                            {/*{errors.image && touched.image && <span className="error">{errors.image}</span>}*/}

                        </div>
                        <button
                            type="submit"
                            className={dirty && isValid ? "" : "disabled-btn"}
                            disabled={!(dirty && isValid)}
                        >
                            Submit
                        </button>
                    </form>
            )}}
        </Formik>
    );
};

export default UploadForm;
