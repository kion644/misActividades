import { DialogContent, DialogTitle, makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react'
import UsuarioByToken from '../../../services/Usuarios/UsuarioByToken';
const useStyles = makeStyles({
    titulo: {
        backgroundColor: '#007DC4',
        color: '#FFFF',
        fontSize: '100%',
        textAlign: 'center',
        fontFamily: '"Montserrat", sans-serif',
    },
    PopUp: {
        display: 'column',
    }
});

export const AvatarInfoDeploy = () => {
    
    const classes = useStyles();
    const [user, setUser] = useState< any >();
    const [legajo, setLegajo] = useState<number>();
    const [rol, setRol] = useState<String>();
    const [lider,setLider] = useState<String>();
    const nombre = localStorage.getItem("nombre");


    const UsuarioToUser = async ()=>{
        setUser(await UsuarioByToken());  
    };
    useEffect(() => {
      UsuarioToUser();
    },[]);


    const VarsSetters = async ()=>{
        setLegajo(user.legajo);
        setRol(user.rol);
        setLider(user.lider.nombre + ' ' +user.lider.apellido)
    };
    useEffect(()=>{
        VarsSetters();
    },[user])

  return (
    
            <div >
                <div className={classes.titulo}>
                    <DialogTitle id="customized-dialog-title">
                        Información personal
                    </DialogTitle>
                </div>
                <DialogContent dividers>
                    <div className={classes.PopUp}>
                        <>
                        <h2 style={{display:'flex',padding:'10px'}}>Nombre: 
                        <h4>{nombre}</h4>
                        </h2>
                        <h2>Legajo: 
                        <h4>{legajo}</h4>
                        </h2>
                        </>
                    </div>
                </DialogContent>
            </div>
    
            
  )
}

 