import { makeStyles } from '@material-ui/core';
import { ButtonPrimaryLicenciasAtencion } from '../Primary/ButtonPrimaryLicenciasAtencion';

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


export const ButtonGroupLicenciasAtencion = ({ id,setOpen,setOpenError,setMessage}: props) => {
    const classes = useStyles();

    return (
        <div className={classes.aling}>
            <ButtonPrimaryLicenciasAtencion
                text= "Asignarse"
                id={id}
                estado={'Pendiente_Atencion'}
                setOpen={setOpen}
                setOpenError={setOpenError}
                setMessage={setMessage}
            /> 
        </div>
    )
}