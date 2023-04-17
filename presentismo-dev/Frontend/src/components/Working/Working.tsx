import { Grid, makeStyles } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import { environment } from '../../enviroment/enviroment';


const useStyles = makeStyles({
    bodyDiv: {
        fontFamily: '"Montserrat", sans-serif',
        width: '100%',
        height: '100%',

    },
});
const containerStyle = {
    backgroundImage:
      "url(http://construyendogeografia20.com.uy/wp-content/uploads/2017/09/Web-en-Construccion.png)",
    width: "1200px",
    height: "800px",
  };


export const Working = () => {

    const classes = useStyles();

    return (<>
        {localStorage.getItem('user') != undefined ? (

            <Grid container>
                <Grid container>

                    <Grid container className={classes.bodyDiv}>
                        <Grid item md={12}>
                            {/* <LicensesScreen ></LicensesScreen> */}
                            <div style={containerStyle}  ></div>;
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