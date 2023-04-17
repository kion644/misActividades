import { makeStyles } from '@material-ui/core/styles';
import Button         from '@material-ui/core/Button';
import { useContext, useState } from 'react';
import Context from '../../../../hooks/UseContext/Solicitudes';

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

export const ButtonPrimaryBitacora= ({text, id,estado,setOpen,setOpenError,setMessage}: textButton) => {
    
  
    const classes = useStyles();
    const temp= useContext(Context);
    const [solicitudes] = useState(temp);
    async function guardar() {
    
    //     const response: any = await aceptar(id,estado);
      
    //     if(response.data.info.code==="200"){
    //         setOpen(true);
    //       if(estado==="Aceptado"){
    //         solicitudes.solicitudes-=1
    //         localStorage.setItem("Solicitudes",solicitudes.solicitudes.toString())
    //         setMessage("Solicitud Aceptada")
    //     }else{
    //         setMessage("Solicitud Rechazada")
    //         }
            
    //     }else{
    //         setOpenError(true);
    //         setMessage("Error")
    //     }

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
