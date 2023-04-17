import { makeStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import AppBarLeader from '../../AppBar/AppBarLeader';

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

export const LeaderScreen = () => {

    const classes = useStyles();

    return (

        <Grid container className={classes.root}>
            <Grid item sm={12}>
                <AppBarLeader></AppBarLeader>
            </Grid>
        </Grid>
    )
}