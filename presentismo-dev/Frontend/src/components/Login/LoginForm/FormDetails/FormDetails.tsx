import { CircularProgress, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import cdaLogo from "../../../SmallerComponents/Logos/cdaLogo.png";

import { useNavigate } from 'react-router-dom';
import { environment } from '../../../../enviroment/enviroment';
import { AxiosError } from 'axios';
import Logins from '../../../../services/Logins/iniciarSesion';
import { ButtonPrimary } from '../../../SmallerComponents/Buttons/Primary/ButtonPrimary';
import { InputPassword } from '../../../SmallerComponents/Inputs/Password/InputPassword';
import { InputUsers } from '../../../SmallerComponents/Inputs/Users/InputUsers';




const useStyles = makeStyles({
    section1: {
        alignItems: 'center',
        display: ' grid',
        height: ' 100%',
        flexDirection: 'column',
    },
    img: {
        maxWidth: '100%',
        maxHeight: '100vh',
        margin: 'auto',
        marginBottom: ' 26px',
    },
    section2: {
        marginBottom: '1rem',
        color: '#767D7D',
        marginTop: '1%',
        marginLeft: '5%',
        flexDirection: 'column',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '2.5rem',
        alignItems: 'center',
        paddingtop: '9rem',
    },
});
interface prop {

    setOpen: (value: boolean) => void;
    setOpenError: (value: boolean) => void;
    setMessage: (value: string) => void;
    setAlert: (value: {
        type: string | null;
        request: string | null;
        message: string | null;
        open: boolean;
    }) => void;

}

export const FormDetails = ({ setAlert, setOpen, setOpenError, setMessage }: prop) => {

    const text = "Iniciar sesión";
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorUser, setErrorUser] = useState(false);
    const [boton, setBoton] = useState(false)
    const navigate = useNavigate();
    const classes = useStyles();
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleClick = async () => {
        try {
            if ((password == "" || usuario == "")) {

                setError(true);
                setErrorUser(true);
                setOpenError(true);
                setBoton(false);
                setMessage('Campos incompletos');
                setBoton(false);
            } else {
                setError(false);
                setErrorUser(false)
                setBoton(true)

                Logins(usuario, password)
                    .then((response: any) => {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("301", response.data.roles);
                        localStorage.setItem("user", usuario.trim().replace("@cdainfo.com", ""));
                        localStorage.setItem("nombre", response.data.nombre);
                        localStorage.setItem("apellido", response.data.apellido);
                        localStorage.setItem("Solicitudes", "0");
                        
                        setAlert({
                            type: "Éxito",
                            request: "Autenticación",
                            message: "Bienvenido a Mis Actividades",
                            open: true,
                        })
                        setTimeout(() => {
                            window.location.replace('');
                            navigate(environment.HOME);
                        }, 4000)
                       
                    })
                   
                    .catch((error: any) => {
                        const mensaje = error.response.data.mensaje;
                        const estado = error.response.data.estado;
                        if(estado == "FORBIDDEN"){
                            setAlert({
                                type: "Error",
                                request: "Autenticación",
                                message: "Credenciales inválidas",
                                open: true,
                            });
                        }
                        else 
                        setAlert({
                            type: "Error",
                            request: "Autenticación",
                            message: mensaje,
                            open: true,
                        });
                        setError(true);
                        setErrorUser(true);
                        setOpenError(true);
                        setBoton(false);

                    }
                    )

            }
        } catch (error) {
            const err = error as AxiosError
            if (err.response?.status === 403) {
                setError(true);
                setErrorUser(true);
                setOpenError(true);
                setMessage('Credenciales incorrectas');
                setBoton(false);
            } else {
                setError(true);
                setErrorUser(true);
                setOpenError(true);
                setMessage('Error inesperado, comuníquese con el centro de atención');
                setBoton(false);
            }

        }

    }
    const ir = async () => {


    }


    return (
        <>
            <div >
                <section className={classes.section1} >
                    <img
                        src={cdaLogo}
                        className={classes.img}
                        alt="Logo CDA"
                    />
                </section>


                <div className={classes.section1} >
                    <section className={classes.section2}>
                        <InputUsers usuario={usuario} setUsuario={setUsuario} error={errorUser} onKeyPress={handleClick}></InputUsers>
                    </section>

                    <section className={classes.section2}>
                        <InputPassword password={password} setPassword={setPassword} error={error} onClick={handleClick} />
                    </section>

                    <div className={classes.buttons}>{boton ? (
                        <CircularProgress disableShrink />
                    ) : (
                        <ButtonPrimary
                            text={text}
                            disabled={boton}
                            onClick={handleClick}
                        />
                    )}

                    </div>


                </div>

            </div>

        </>
    )
}




