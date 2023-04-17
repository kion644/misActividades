import { makeStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import AppBarCalendar from '../../AppBar/AppBarCalendar';

const useStyles = makeStyles({
    root: {
        alignItems: 'left',
        backgroundColor: "#fff",
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        height: '100%',
        fontFamily: '"Montserrat", sans-serif',
        marginTop: '0%',
        marginRight: '5%'
    },
});

export const CalendarScreen = () => {

    const classes = useStyles();

    return (

        <Grid container className={classes.root}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <AppBarCalendar></AppBarCalendar>
            </Grid>
        </Grid>
    )
}