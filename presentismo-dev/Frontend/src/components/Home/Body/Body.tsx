import {  useState     } from 'react';
import { Grid, makeStyles   } from '@material-ui/core';
import { ValueContext } from '../../../hooks/UseContext/ValueContext';
import { PaperClock } from './PaperClock/PaperClock';

const useStyles = makeStyles({
    root: {
        alignItems: 'left',
        backgroundColor: "#F4F4F4",
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        height: '100%',
        marginTop:'1.35%',
        fontFamily: '"Montserrat", sans-serif',
        minWidth:'600px'
    },
});

interface props {
    nexo:boolean;
    setNexo : (value:boolean) => void;
    xfecha:string;
    setXfecha: (value:string) => void;
}

export const Body = ({setNexo,nexo,xfecha,setXfecha}:props) => {

    const classes = useStyles();
    const [valuesRadio, setValuesRadio] = useState( true );
  
    return (
        <ValueContext.Provider value={{ 
            valuesRadio, 
            setValuesRadio 
        }}> <Grid item xs={12}
        className={classes.root}
        >
                <PaperClock setNexo={setNexo} nexo={nexo} xfecha={xfecha} setXfecha={setXfecha}/>
            </Grid> 
        </ValueContext.Provider>
         
    )
}
