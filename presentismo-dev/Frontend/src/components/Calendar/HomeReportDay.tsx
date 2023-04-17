import { Grid, makeStyles } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import { environment } from '../../enviroment/enviroment'
import { CalendarScreen } from './CalendarScreen/CalendarScreen';

const useStyles = makeStyles({
    body: {
        fontFamily: '"Montserrat", sans-serif',
        width: '100%',
        height: '100%',

    },
});

export const HomeReportDay = () => {

    const classes = useStyles();

    return (<>
        {localStorage.getItem('user') != undefined ? (
            <Grid>
                <Grid container>

                    <Grid container className={classes.body} id={'leader'} >
                        <Grid item xs={12}>
                            <CalendarScreen></CalendarScreen>
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
