'use client'
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from "@mui/material/Typography";
import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
export default function UploadButton({value, id, setFieldValue}) {
    return (
        <>
        <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            component="label"

        >
            Upload
            <input
                style={{ display: 'none' }}
                type='file'
                id={id}
                accept="image/*, .svg"
                onChange={async (e) => {
                    if (e.currentTarget.files) {
                        await setFieldValue(id, e.currentTarget.files[0]);
                    }
                }}
            />
            <TextField type={"hidden"}></TextField>
        </Button>
        <Typography paragraph>
            {value ? value.name : "No file selected"}
        </Typography>
        </>
    )
}
