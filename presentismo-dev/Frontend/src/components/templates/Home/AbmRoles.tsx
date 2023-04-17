import { Navigate } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core'
import { environment } from '../../../enviroment/enviroment';
import { AbmRolesScreen } from '../../organisms/LeaderScreen/AbmRolesScreen';


const useStyles = makeStyles({
  bodyDiv: {
      fontFamily: '"Montserrat", sans-serif',
      width: '100%',
      height: '100%',

  },
});

export const AbmRoles = () => {

  const classes = useStyles();

  return (
  <>
    {localStorage.getItem('user') != undefined ? (

        <Grid container>
            <Grid container>

                <Grid container className={classes.bodyDiv}>
                    <Grid item md={12}>
                        <AbmRolesScreen />
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