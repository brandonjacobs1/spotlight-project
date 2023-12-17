import React from 'react';
import {getAllSpotlights} from '@/lib/db/get-all-spotlights'
import getImageUrl from "@/lib/s3/get-image";
import AdminCard from "@/app/components/spotlight/admin-card";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from "@mui/material/CssBaseline";

async function loadData() {
    let spotlights = await getAllSpotlights()

    let promises = spotlights.map(s => {
        if (s.image) return getImageUrl(`${s.image}`)
    })
    const imageUrls = await Promise.all(promises);

    spotlights.forEach((spotlight, index) => {
        spotlight.imageUrl = imageUrls[index];
    });
    spotlights =  filterByStatus(spotlights)
    return spotlights
}

function filterByStatus(spotlights) {
    return spotlights.reduce((sorted, s) => {
        sorted[s.status] = [...(sorted[s.status] || []), s];
        return sorted;
    }, {});
}

export default async function SpotlightList() {
    let spotlights
    try {
        spotlights = await loadData();
    }catch (e) {
        console.log(e)
        return null
    }

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
                            <AdminCard key={s.id} spotlight={s} />
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
                            <AdminCard key={s.id} spotlight={s} />
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
                            <AdminCard key={s.id} spotlight={s} />
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
                            <AdminCard key={s.id} spotlight={s} />
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
