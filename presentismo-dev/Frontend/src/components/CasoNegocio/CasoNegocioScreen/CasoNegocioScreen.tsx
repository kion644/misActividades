import { Grid, makeStyles } from "@material-ui/core"
import AppBarCasoNegocio from "../../AppBar/AppBarCasoNegocio";

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


export const CasoNegocioScreen = () => {

    const classes = useStyles();


  return (
    <Grid container className={classes.root}>
            <Grid item sm={12}>
                <AppBarCasoNegocio />
            </Grid>
        </Grid>
  )
}