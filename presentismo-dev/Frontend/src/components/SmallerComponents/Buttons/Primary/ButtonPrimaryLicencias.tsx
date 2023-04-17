import { makeStyles } from '@material-ui/core/styles';
import Button         from '@material-ui/core/Button';
import { useContext, useState } from 'react';
import Context from '../../../../hooks/UseContext/Solicitudes';
import accionesLicencias from '../../../../services/Licencias/accionesLicencias';
import accionesLicenciasAdministrativa from '../../../../services/Licencias/accionesLicenciasAdministrativa';
import {roles} from '../../../../enviroment/roles'

interface textButton {
    text     : string;
    id      :number;
    estado:string;
    setOpen:(value:boolean)=>void;
    setOpenError:(value:boolean)=>void;
    setMessage:(value:string)=>void;

}

const useStyles = makeStyles({
    buttonPrimary: {
        color: '#FFFF',
        fontSize: '16px',
        marginTop: '1rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        textTransform: 'none',
        width: '70%',
        padding:'10px',
        margin:'2px',
        backgroundColor:'#007DC4',
        '&:hover':{
            backgroundColor:'#F6921E'
        }

    },    
}); 

export const ButtonPrimaryLicencias = ({text, id,estado,setOpen,setOpenError,setMessage}: textButton) => {
    
  
    const classes = useStyles();
    const temp= useContext(Context);
    const [solicitudes] = useState(temp);
    async function guardar() {
    if (localStorage.getItem('301')===roles.ROLLIDER){

        const response: any = await accionesLicencias(id,estado);
      
        if(response.status===200){
            setOpen(true);
          if(estado==="Aceptado"){
           
            setMessage("Solicitud Aceptada")
        }else{
            setMessage("Solicitud Rechazada")
            }
            
        }else{
            setOpenError(true);
            setMessage("Error")
        }
    }else if(localStorage.getItem('301')===roles.ROLATENCION){
       
        const response: any = await accionesLicenciasAdministrativa(id,estado);
      
        if(response.status===200){
            setOpen(true);
          if(estado==="Aceptado"){
        
            setMessage("Solicitud Aceptada")
        }else{
            setMessage("Solicitud Rechazada")
            }
            
        }else{
            setOpenError(true);
            setMessage("Error")
        } 
    }

    }
    ;
    return (
        <Button  
            
            onClick=    { guardar}
            className=  { classes.buttonPrimary}
            variant=    "contained" 
        >
            { text }
        </Button>
    )
}
