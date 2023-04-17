import { Grid, makeStyles } from '@material-ui/core';

import { Navigate } from 'react-router-dom';
import { environment } from '../../enviroment/enviroment';
import { LicensesScreen } from './LicensesScreen/LicensesScreen';

const useStyles = makeStyles({
    bodyDiv: {
        fontFamily: '"Montserrat", sans-serif',
        width: '100%',
        height: '100%',

    },
});


export const Licenses = () => {

    const classes = useStyles();

    return (<>
        {localStorage.getItem('user') != undefined ? (

            <Grid container>
                <Grid container>

                    <Grid container className={classes.bodyDiv}>
                        <Grid item md={12}>
                            <LicensesScreen ></LicensesScreen>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        ) : (
            <Navigate to={environment.LOGIN} replace={true}></Navigate>
        )}
    </>

    )
}
