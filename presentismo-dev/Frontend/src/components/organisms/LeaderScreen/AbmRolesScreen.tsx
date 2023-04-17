import { Grid, makeStyles } from "@material-ui/core"
import { AppBarAbmRoles } from "../../AppBar/AppBarAbmRoles";

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


export const AbmRolesScreen = () => {

    const classes = useStyles();


  return (
    <Grid container className={classes.root}>
            <Grid item sm={12}>
                <AppBarAbmRoles />
            </Grid>
        </Grid>
  )
}