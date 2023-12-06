'use client'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UploadForm from "@/app/components/spotlight/upload-form";



export default function Page() {
    const initialValues = {
        last_name: '',
        first_name_husband: '',
        first_name_wife: '',
        bio: '',
        member_type: '',
        status: 'NS',
        date_asked: null,
        date_ready: null,
        date_planned: null,
        date_slacked: null,
        date_joined: null,
        image: undefined,
    }

    return (

        <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/*<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>*/}
                        {/*    <AddIcon />*/}
                        {/*</Avatar>*/}
                        <Typography component="h1" variant="h5">
                            New Spotlight
                        </Typography>
                        <UploadForm initialValues={initialValues}></UploadForm>
                    </Box>
                </Grid>
            </Grid>
    );
}