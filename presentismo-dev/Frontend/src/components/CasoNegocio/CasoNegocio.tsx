import { makeStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import { Navigate } from 'react-router-dom';
import { environment } from '../../enviroment/enviroment';
import { CasoNegocioScreen } from './CasoNegocioScreen/CasoNegocioScreen';


const useStyles = makeStyles({
    bodyDiv: {
        fontFamily: '"Montserrat", sans-serif',
        width: '100%',
        height: '100%',
  
    },
  });

export const CasoNegocio = () => {

    const classes = useStyles();

  return (
  <>
    {localStorage.getItem('user') != undefined ? (

        <Grid container>
            <Grid container>

                <Grid container className={classes.bodyDiv}>
                    <Grid item md={12}>
                        <CasoNegocioScreen />
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