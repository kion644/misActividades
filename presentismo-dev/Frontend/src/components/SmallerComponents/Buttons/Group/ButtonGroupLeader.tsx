import { makeStyles } from '@material-ui/core';
import { ButtonPrimaryLeader } from '../Primary/ButtonPrimaryLeader';

interface props {
  
    id:string;
    setOpen:(value:boolean)=> void;
    setOpenError:(value:boolean)=> void;
    setMessage:(value:string)=> void;

}

const useStyles = makeStyles({
    aling: {
       display:'flex',
       paddingBottom: '0.7rem'

    },
    button: {
        padding:'2px'

    },
});


export const ButtonGroupLeader = ({ id,setOpen,setOpenError,setMessage}: props) => {
    const classes = useStyles();

    return (
        <div className={classes.aling}>
            <ButtonPrimaryLeader 
                text= "Aceptar"    
                id={id}
                estado={'Aceptado'}
                setOpen={setOpen}
                setOpenError={setOpenError}
                setMessage={setMessage}
              
              
            /> 
            <ButtonPrimaryLeader 
                text="Rechazar"  
                id={id}
                estado={"Rechazado"}
                setOpen={setOpen}
                setOpenError={setOpenError}
                setMessage={setMessage}
              
            /> 
        </div>
    )
}