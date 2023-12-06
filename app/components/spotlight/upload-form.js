'use client'
import React from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import {useRouter} from "next/navigation";
import axios from "axios";
import DateInput from "@/app/components/spotlight/date-input";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {FormControl, FormLabel, Radio, RadioGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import {statusArray} from "@/app/util/status";
import Button from "@mui/material/Button";
import UploadButton from "@/app/components/spotlight/upload-button";

const UploadForm = ({initialValues}) => {
    const router = useRouter()
    const MAX_SIZE = 10000000

    let schema = yup.object().shape({
        last_name: yup.string()
            .required("Last name is required")
            .max(20, 'Last name cannot be longer than 20 characters'),
        first_name_husband: yup.string()
            .required("Husband's first name is required")
            .max(20, 'Wife\'s first name cannot be longer than 20 characters'),
        first_name_wife: yup.string()
            .required("Wife's first name is required")
            .max(20, 'Husband\'s first name cannot be longer than 20 characters'),
        bio: yup.string(),
        member_type: yup.string()
            .max(1, 'Member type should be at most 1 character'), // Select Element
        status: yup.string()
            .max(2, 'Status should be at most 2 characters'),
        date_asked: yup.date().nullable(),
        date_ready: yup.date().nullable(),
        date_planned: yup.date().nullable(),
        date_slacked: yup.date().nullable(),
        date_joined: yup.date().nullable(),
        image: yup.mixed()
            .when(['last_name', 'first_name_husband', 'first_name_wife'], {
                is: (last_name, first_name_husband, first_name_wife) => (!last_name || !first_name_husband || !first_name_wife),
                then: () => yup.mixed().required('Image is required when last name and both first names are incomplete'),
                otherwise: () => yup.mixed()
            })
            .test('is file right size and type', 'Max file size is 10Mb', (value) => {
                return !value || (value.size <= MAX_SIZE);
            }),

    })

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => submit(values),
        validationSchema: schema
    })

    const submit = async (values) => {
        console.log(`Form data: ${JSON.stringify(values)}`);
        let filePath
        if (values.image && values.image.lastModified && values.last_name && values.first_name_husband && values.first_name_wife) {
            // get image
            console.log('in image function')
            let type = values.image.type
            const index = type.lastIndexOf('/')
            type = type.substring(index + 1)
            filePath = `images/${values.last_name}_${values.first_name_husband}_${values.first_name_wife}.${type}`
            const {data} = await axios.post('/api/create-spotlight', {filePath, values})
            // upload image
            if (data.url) {
                const res = await axios.put(data.url, values.image)
                if (res.status === 200) return router.push('/spotlights')
            } else {
                console.log(`Error in form submit with image: ${JSON.stringify(data.error)}`)
            }
        } else{
            try {
                console.log('in no image function')

                const res = await axios.post('/api/create-spotlight', {values})
                if (res.status === 200) return router.push('/spotlights')
            } catch (e) {
                console.log(`Error in form submit no image: ${e}`)
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

    const {
        getFieldProps,
        handleSubmit,
        dirty,
        isValid,
        touched,
        errors,
        handleBlur,
        setFieldValue,
        values
    } = formik

    return (
        <Box component='form' onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
                margin="normal"
                required
                fullWidth
                id={"last_name"}
                label={"Last Name"}
                {...getFieldProps("last_name")}
                error={touched.last_name && errors.last_name ? true : null}
                helperText={touched.last_name && errors.last_name ? errors.last_name : null}
            />

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <TextField
                            margin="normal"
                            required

                            id={"first_name_husband"}
                            label={"Husband's First Name"}
                            {...getFieldProps("first_name_husband")}
                            error={touched.first_name_husband && errors.first_name_husband ? true : null}
                            helperText={touched.first_name_husband && errors.first_name_husband ? errors.first_name_husband : null}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id={"first_name_wife"}
                            label={"Wife's First Name"}
                            {...getFieldProps("first_name_wife")}
                            error={touched.first_name_wife && errors.first_name_wife ? true : null}
                            helperText={touched.first_name_wife && errors.first_name_wife ? errors.first_name_wife : null}
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <FormControl fullWidth>
                <TextField
                    multiline
                    minRows={3}
                    margin="normal"
                    fullWidth
                    maxRows={10}
                    id={'bio'}
                    label={'Bio'}
                    {...getFieldProps('bio')}
                    error={touched.bio && errors.bio ? 'error' : null}
                    helperText={touched.bio && errors.bio ? errors.bio : null}
                />
            </FormControl>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <FormLabel id={'member_type'}>Membership</FormLabel>
                        <RadioGroup
                            row
                            id={'member_type'}
                            {...getFieldProps('member_type')}
                        >
                            {memberTypes.map(type => {
                                return <FormControlLabel key={type.value} control={<Radio />} label={type.label} value={type.value}></FormControlLabel>
                            })}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <FormControl fullWidth>
                        <FormLabel id={'date_joined'}>&nbsp;</FormLabel>
                            <DateInput
                                label={'Date Joined'}
                                inputName={'date_joined'}
                                value={values.date_joined}
                                setFieldValue={setFieldValue}
                                handleBlur={handleBlur}
                            ></DateInput>
                    </FormControl>
                </Grid>
            </Grid>

            <FormControl fullWidth>
                <FormLabel id={'status'}>Status</FormLabel>
                <RadioGroup
                    row
                    id={'status'}
                    {...getFieldProps('status')}
                >
                    {statusArray.map(status => {
                        return <FormControlLabel key={status.value} control={<Radio />} label={status.label} value={status.value}></FormControlLabel>
                    })}
                </RadioGroup>
            </FormControl>

            <FormControl fullWidth>
                {DateWidgets[values.status] ? <>
                    <FormLabel id={'date_joined'}>&nbsp;</FormLabel>
                    <DateInput label={DateWidgets[values.status].label}
                               inputName={DateWidgets[values.status].key}
                               value={values[DateWidgets[values.status].key]}
                               setFieldValue={setFieldValue}
                               handleBlur={handleBlur}
                    >
                    </DateInput> </> : null}
            </FormControl>

            <FormControl style={{top: '15px'}}>
                <UploadButton value={values.image} id={'image'} setFieldValue={setFieldValue}></UploadButton>
            </FormControl>

            <Button
                fullWidth
                variant={'contained'}
                type="submit"
                disabled={!(dirty && isValid)}
            >
                Save
            </Button>
        </Box>

    )
}

export default UploadForm