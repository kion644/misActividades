import { Button, Grid, makeStyles } from '@material-ui/core';
import { useContext, useEffect} from 'react';
import Context from '../../../hooks/UseContext/Solicitudes';
import { TreeBar } from '../TreeBar/TreeBar';
import cdaLogo from "../../SmallerComponents/Logos/cdaLogo.png";
import { Navigate, useNavigate } from 'react-router-dom';
import { environment } from '../../../enviroment/enviroment';
import { mensaje } from '../../../models/Mensaje';
import CantidadSolicitudesBita from '../../../services/Solicitudes/CantidadSolicitudesBita';
import { AvatarProfile } from '../../SmallerComponents/Avatar/AvatarProfile';
import { NameHeader } from '../../SmallerComponents/Typography/NameHeader/NameHeader';



const useStyles = makeStyles({
    root: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',
        marginLeft: '0%',
        width: '100%',
        minWidth: '200px',
        backgroundColor: '#fff'

    },

    section2: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '3.5rem',
        width: '100%',
    },
    img: {
        width: '110px',
        cursor: 'pointer',
        '&:hover':{
            backgroundColor: '#F4F4F4'
        },
    },
});



export const ItemsHeader = () => {
    const classes = useStyles();
    var userName: string = 'Buenos días ' + localStorage.getItem("nombre");
    var avatarText: string | null = localStorage.getItem("user");
    const solicitudes = useContext(Context);
    


    const navigate = useNavigate();


    useEffect(()=>{
         async function CantidadBitas(){
          const response: any = await CantidadSolicitudesBita();
          if(response.status===200){
    
            localStorage.setItem("Bitas", response.data);
          }
         }
         CantidadBitas();
     },[])

    const saludo = () => {

        const hoy = new Date();

        const nombre = localStorage.getItem("nombre");

        if (hoy.getHours() < 12) {

            userName = 'Buenos días ' + nombre
        } else if (hoy.getHours() >= 12 && hoy.getHours() < 20) {
            userName = 'Buenas tardes ' + nombre
        } else {
            userName = 'Buenas noches ' + nombre
        }


        return userName;

    }

    const avatar = () => {
        if (avatarText === null) {
            return (
                ""
            )
        } else {
            return (
                avatarText.substring(0, 2).toUpperCase()
            )
        }
    }

    const handeClickHome = () =>{
        navigate(environment.HOME);
        window.location.reload();
       
    }

    return (
        <>
            {localStorage.getItem('user') != undefined ? (
                <Grid container className={classes.root}
                    direction='row'
                    justifyContent='center'
                    alignItems='center'>
                    <Grid item xs={1} md={1} lg={1} >
                        
                        <TreeBar></TreeBar>
                        
                    </Grid>
                    <Grid item xs={1} md={1} lg={6}>
                        
                        <img
                            src={cdaLogo}
                            className={classes.img}
                            alt="Logo CDA"
                            onClick={handeClickHome}
                            
                        />
                       
                    </Grid>
                    <Grid item xs={3} md={3} lg={3} alignItems={'center'} className={classes.section2}>
                        <NameHeader name={saludo()} />
                        <AvatarProfile text={avatar()} />
                    </Grid>
                    


                </Grid>
            ) : (
                <Navigate to={environment.LOGIN} replace={true}></Navigate>
            )}
        </>

    )
}
