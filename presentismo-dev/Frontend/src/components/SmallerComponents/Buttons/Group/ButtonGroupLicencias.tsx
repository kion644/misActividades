import { makeStyles } from '@material-ui/core';
import { ButtonPrimaryLicencias } from '../Primary/ButtonPrimaryLicencias';

interface props {
  
    id:number;
    setOpen:(value:boolean)=> void;
    setOpenError:(value:boolean)=> void;
    setMessage:(value:string)=> void;

}

const useStyles = makeStyles({
    aling: {
       display:'flex',
       paddingBottom: '0.7rem'

    },
  
});


export const ButtonGroupLicencias = ({ id,setOpen,setOpenError,setMessage}: props) => {
    const classes = useStyles();

    return (
        <div className={classes.aling}>
            <ButtonPrimaryLicencias
                text= "Aceptar"    
                id={id}
                estado={'Aceptado'}
                setOpen={setOpen}
                setOpenError={setOpenError}
                setMessage={setMessage}
            /> 
            <ButtonPrimaryLicencias 
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