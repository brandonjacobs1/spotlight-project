'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {statusMap} from '../../util/status'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function AdminCard({spotlight}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const formatDate = (date) => {
        if (!date) {
            return 'Unknown'; // or any default value you prefer
        }
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    const displayMemberInfo = (short, date) => {
        const memberMap = {
            'N': 'New',
            'O': 'Old'
        }
        return `${memberMap[short]} member, joined on ${formatDate(date)}`
    }


    const getStatusAndDate = (spotlight) => {


        const status = statusMap[spotlight.status] || 'Unknown';
        let date = spotlight[`date_${status.toLowerCase()}`] ?? null
        if (date) {
            date = formatDate(date)
        }

        return `${status} on ${date}`
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="last-name">
                        {spotlight.last_name.substring(0,1)}
                    </Avatar>
                }
                // action={
                //     <IconButton aria-label="settings">
                //         <MoreVertIcon />
                //     </IconButton>
                // }
                title={`${spotlight.first_name_husband} and ${spotlight.first_name_wife} ${spotlight.last_name}`}
                subheader={getStatusAndDate(spotlight)}
            />
            <CardMedia
                component="img"
                // style={{ objectPosition: 'top' }}
                height="250"
                image={spotlight.imageUrl}
                alt={`The ${spotlight.last_name}'s`}
            />
            <CardContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 2
                    }}
                >
                    {spotlight.bio}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="edit" href={`/editSpotlight/${spotlight.id}`}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteForeverIcon/>
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="h6" align="center" paragraph>Full Bio</Typography>
                    <Typography paragraph>
                        {spotlight.bio}
                    </Typography>

                    {['N', 'O'].includes(spotlight.member_type) ? (
                        <>
                            <Typography variant="h6" align="center" paragraph>
                                Membership
                            </Typography>
                            <Typography paragraph>{displayMemberInfo(spotlight.member_type, spotlight.date_joined)}</Typography>
                        </>
                    ) : null}

                    <Typography variant="h6" align="center" paragraph>Dates</Typography>
                    <Typography paragraph>
                        Date Asked: {formatDate(spotlight.date_asked)}
                        <br />
                        Date Ready: {formatDate(spotlight.date_ready)}
                        <br />
                        Date Planned: {formatDate(spotlight.date_planned)}
                        <br />
                        Date Slacked: {formatDate(spotlight.date_slacked)}
                    </Typography>



                </CardContent>
            </Collapse>
        </Card>
    );
}
export default AdminCard;
