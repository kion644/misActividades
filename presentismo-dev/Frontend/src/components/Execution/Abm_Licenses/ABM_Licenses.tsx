import { Grid, makeStyles } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import { environment } from '../../../enviroment/enviroment';
import { AbmLicensesScreen } from './Abm_LicensesScreen/Abm_LicensesScreen';


const useStyles = makeStyles({
    bodyDiv: {
        fontFamily: '"Montserrat", sans-serif',
        width: '100%',
        height: '100%',

    },
});



export const Abm_Licenses = () => {

    const classes = useStyles();

    return (<>
        {localStorage.getItem('user') != undefined ? (

            <Grid container>
                <Grid container>

                    <Grid container className={classes.bodyDiv}>
                        <Grid item md={12}>
                            <AbmLicensesScreen ></AbmLicensesScreen>
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