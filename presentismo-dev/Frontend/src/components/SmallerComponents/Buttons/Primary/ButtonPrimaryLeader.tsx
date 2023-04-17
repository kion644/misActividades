import { makeStyles } from '@material-ui/core/styles';
import Button         from '@material-ui/core/Button';
import aceptar from '../../../../services/AceptarSolicitudes/aceptar';
import { useContext, useState } from 'react';
import Context from '../../../../hooks/UseContext/Solicitudes';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { environment } from '../../../../enviroment/enviroment';

interface textButton {
    text     : string;
    id      :string;
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

export const ButtonPrimaryLeader = ({text, id,estado,setOpen,setOpenError,setMessage}: textButton) => {
    
    const navigate = useNavigate()
    const classes = useStyles();
    const temp= useContext(Context);
    const [solicitudes] = useState(temp);
    async function guardar() {
    try {

        
        const response: any = await aceptar(id,estado);
      
        if(response.data.info.code==="200"){
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
        
    } catch (error) {
        const err = error as AxiosError
        if(err.response?.status===403){
            setOpenError(true);
            setMessage("Sesión expirada, por favor inicie sesión de nuevo");
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
            navigate(environment.LOGIN);
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
