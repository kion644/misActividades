import { makeStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import { Navigate } from 'react-router-dom';
import { environment } from '../../enviroment/enviroment';
import { AbmMonedaScreen } from './AbmMonedaScreen/AbmMonedaScreen';


const useStyles = makeStyles({
    bodyDiv: {
        fontFamily: '"Montserrat", sans-serif',
        width: '100%',
        height: '100%',
  
    },
  });

export const AbmMoneda = () => {

    const classes = useStyles();

  return (
  <>
    {localStorage.getItem('user') != undefined ? (

        <Grid container>
            <Grid container>

                <Grid container className={classes.bodyDiv}>
                    <Grid item md={12}>
                        <AbmMonedaScreen />
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