import { Grid, makeStyles } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import { environment } from '../../enviroment/enviroment'
import { LeaderScreen } from './LeaderScreen/LeaderScreen';

const useStyles = makeStyles({
    bodyDiv: {
        fontFamily: '"Montserrat", sans-serif',
        width: '100%',
        height: '100%',

    },
});

export const HomeLeader = () => {

    const classes = useStyles();
    const usuario = localStorage.getItem('user');
    return (<>
        { usuario != undefined ? (

            <Grid container>
                <Grid container>
                    <Grid container className={classes.bodyDiv}>
                        <Grid item md={12}>
                            <LeaderScreen></LeaderScreen>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        ) : (
            <Navigate to={environment.LOGIN} replace={true}></Navigate>
        )
    }
        </>
    )
}
