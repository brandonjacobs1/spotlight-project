'use client'
import React, {useEffect, useState} from 'react';
import AdminCard from "@/app/components/spotlight/admin-card";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";



export default function SpotlightList() {
    const [spotlights, setSpotlights] = useState(null);

    useEffect(() => {
        axios.get('/api/get-spotlights')
            .then(response => {
                setSpotlights(response.data.spotlights);
            })
            .catch(error => {
                console.error('Error fetching spotlights:', error);
            });
    }, []);

    if (!spotlights) {
        return null; // You may render a loading indicator here
    }
    console.log('Spotlights: ', spotlights)

    return (
        <Grid component={'main'}>
            <CssBaseline />
            {spotlights.NS ? (
                <div>
                    <Typography variant="h2">
                        Not Started
                    </Typography>
                    <Grid container spacing={2}>
                        {spotlights.NS.map(s => (
                            <Grid item key={s.id} xs={12} sm={4} md={3} lg={3}>
                                <AdminCard  spotlight={s} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : null}

            {spotlights.A ? (
                <div>
                    <Typography variant="h2">
                        Asked
                    </Typography>
                    <Grid container spacing={2}>
                        {spotlights.A.map(s => (
                            <Grid item key={s.id} xs={12} sm={4} md={3} lg={3}>
                                <AdminCard  spotlight={s} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : null}

            {spotlights.R ? (
                <div>
                    <Typography variant="h2">
                        Ready
                    </Typography>
                    <Grid container spacing={2}>
                        {spotlights.R.map(s => (
                            <Grid item key={s.id} xs={12} sm={4} md={3} lg={3}>
                                <AdminCard  spotlight={s} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : null}

            {spotlights.P ? (
                <div>
                    <Typography variant="h2">
                        Planned
                    </Typography>
                    <Grid container spacing={2}>
                        {spotlights.P.map(s => (
                            <Grid item key={s.id} xs={12} sm={4} md={3} lg={3}>
                                <AdminCard  spotlight={s} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : null}

            {spotlights.S ? (
                <div>
                    <Typography variant="h2">
                        Slacked
                    </Typography>
                    <Grid container spacing={{xs: 2, md: 3}}>
                        {spotlights.S.map(s => (
                            <Grid item key={s.id} xs={12} sm={4} md={3} lg={3}>
                                <AdminCard  spotlight={s} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : null}
        </Grid>
    );
}
