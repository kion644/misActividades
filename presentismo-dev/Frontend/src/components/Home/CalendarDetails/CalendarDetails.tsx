import { makeStyles } from '@material-ui/core';
// import { Calendar   } from '../../atoms/Calendar/Calendar';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { Details } from './Details/Details';

const useStyles = makeStyles({
    root: {
        alignItems: 'left',
        backgroundColor: "#F4F4F4",
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        fontFamily: '"Montserrat", sans-serif',
        marginTop:'2.3%',
        marginRight:'5%',
        minWidth:'400px'
    },
    
    
});
interface props {
    nexo : boolean;
    setNexo : (value:boolean)=>void;
    xfecha : string;
    setXfecha : (value:string)=>void;
}
export const CalendarDetails = ({nexo,setNexo,xfecha,setXfecha}:props) => {

    const classes = useStyles();

    return (
       
        <Grid item xs={12} className={classes.root}>
            <Details nexo={nexo} setNexo={setNexo} xfecha={xfecha} setXfecha={setXfecha}></Details>
        </Grid>
    )
}
