import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AppBarAvailability from '../../../AppBar/AppBarAvailability';

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
    },
});

export const AvailabilityScreen = () => {

    const classes = useStyles();

    return (

        <Grid container className={classes.root}>
            <Grid item sm={12}>
                <AppBarAvailability></AppBarAvailability>
            </Grid>
        </Grid>
    )
}