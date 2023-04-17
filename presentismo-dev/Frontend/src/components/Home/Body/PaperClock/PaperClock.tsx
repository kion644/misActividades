import { useContext, useState, useEffect } from 'react';
import { Card, CardHeader, CircularProgress, Divider, Grid, makeStyles, Snackbar, SnackbarOrigin, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { Alert } from '@material-ui/lab';

import { environment } from '../../../../enviroment/enviroment';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Watch } from './Watch/Watch';
import { RadContext } from '../../../../hooks/UseContext/RadContext';
import { ValueContext } from '../../../../hooks/UseContext/ValueContext';
import CambioTarea from '../../../../services/CambioTarea/CambioTarea';
import EstadoActual from '../../../../services/EstadoActual/estadoActual';
import FinalizarDia from '../../../../services/FinalizarDia/finalizarDia';
import HorasTrabajadas from '../../../../services/HorasTrabajadas/horasTrabajadas';
import IniciarDia from '../../../../services/IniciarDia/iniciarDia';
import PausarDia from '../../../../services/PausarDia/pausarDia';
import PuedoIniciar from '../../../../services/PuedoIniciar/puedoIniciar';
import Reiniciar from '../../../../services/Reiniciar/reiniciar';
import theme from '../../../../theme/themeConfig';
import { ButtonPrimary } from '../../../SmallerComponents/Buttons/Primary/ButtonPrimary';
import { RadioButtonsGroup } from '../../../SmallerComponents/Buttons/RadioButtonsGroup/RadioButtonsGroup';
import DialogFinished from '../../../Dialog/FinishDay/DialogFinished';




const useStyles = makeStyles({
    skeleton: {

        backgroundColor: '#fff',
        marginBottom: '15%',
        marginTop: '7%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginLeft: '5%',
        marginRight: '5%',
        fontFamily: '"Montserrat", sans-serif',

    },
    card: {
        width: '95%',
        marginTop: '5%',
        marginLeft: '3%',
        position: 'relative',
        minWidth: '600px',
        minHeight: '603px',
        height: '650px',
    },
    cardHeader: {
        backgroundColor: '#007DC4',
        color: '#FFFF',
        fontSize: '100%',
        textAlign: 'center',
        fontFamily: '"Montserrat", sans-serif',
    },
    subTitulo: {
        height: '51px',
        backgroundColor: '#F6921E',
        display: 'flex',


    },
    buttons: {
        display: 'flex',
        marginBottom: '1.5%',
        alignItems: 'center',
        fontFamily: '"Montserrat", sans-serif',
        marginLeft: '3%',

    },
    buttonFinish: {
        display: 'flex',
        marginBottom: '1.5rem',
        alignItems: 'center',
        fontFamily: '"Montserrat", sans-serif',
        marginLeft: '11%',
        marginRight: '0.9%',
        minWidth: '350px'
    },
    suTituloText: {
        fontSize: theme.typography.pxToRem(18),
        backgroundColor: '#F6921E',
        color: "#fff",
        fontFamily: '"Montserrat", sans-serif',
        alignItems: 'center',
        display: 'flex',
        margin: 'auto'
    },

    alert: {
        alignItems: "center",
        fontFamily: '"Montserrat", sans-serif',
        textAlign: 'center',
        marginLeft: '50px',
        marginRight: '50px'
    }

});
interface props {

    nexo: boolean;

    setNexo: (value: boolean) => void;

    xfecha: string;

    setXfecha: (value: string) => void;

}

export const PaperClock = ({ setNexo, nexo, xfecha, setXfecha }: props) => {

    // Texto de los botones

    const INICIO = "Iniciar actividades";

    const FINALIZAR = "Finalizar día";

    const PAUSAR = "Pausar actividades";

    const REANUDAR = "Reanudar actividades";

    const CAMBIAR = "Finalizar actividad actual";

    // Estados del dia

    const INICIADO = "INICIADO";

    const SIN_INICIAR = "SIN_INICIAR";

    const PAUSADO = "PAUSADO";

    const FINALIZADO = "FINALIZADO";

    const CAMBIO = "CAMBIO";

    const classes = useStyles();

    const [visible, setVisible] = useState(false);

    const [text, setText] = useState(INICIO);

    const [valueFinish, setValueFinish] = useState(true);

    const [valuePrimaryButton, setValuePrimaryButton] = useState(false);

    const navigate = useNavigate()

    const { valuesRadio } = useContext(ValueContext);

    const [valueLugar, setValueLugar] = useState<string>('');

    const [cambie, setCambie] = useState(false);

    //Prueba de estado de radioButtons

    const { valuesRadioContext } = useContext(RadContext);

    const [disableRadio, setDisableRadio] = useState(valuesRadioContext);

    // API DE ESTADO ACTUAL

    const [estadoActual, setEstadoActual] = useState<any>(null);

    const [isLoading, setLoading] = useState(true);

    //Estructura de Watch

    const [time, setTime] = useState<any>({ ms: 0, s: 0, m: 0, h: 0 });

    const [interv, setInterv] = useState<any>();

    const [horasTrabajadas, setHorasTrabajadas] = useState<any>(null);

    const [cambioTarea, setCambioTarea] = useState(true);

    const [openError, setOpenError] = useState(false);

    const [open, setOpen] = useState(false);

    const [mensaje, setMensaje] = useState('');

    const [popUp, setPopUp] = useState(false);

    const [fechaDeTrabajao, setFechaDeTrabajo] = useState('')

    const [iniciarTrue, setIniciarTrue] = useState(false);

    const [rueda, setRueda] = useState(false);

    const [botonCambio, setBotonCambio] = useState(true);

    const navegate = useNavigate();

    const [snack,setSnack]= useState<SnackbarOrigin>({
        vertical: 'top',
        horizontal: 'center',
      })

    const fechax = (xfecha: string) => {

        const hoy = new Date(xfecha)

        const fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);

        return fecha;

    };

    const fechaxd = (xfecha: Date) => {

        const hoy = new Date(xfecha)

        const fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);

      

        return new Date(fecha);

    };

    const fechaxx = (xfecha: Date) => {

        const hoy = new Date(xfecha)

        const fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);

        return fecha

    };

    useEffect(() => {
        async function estado() {
            try {
                const puedoiniciar: any = await PuedoIniciar();
                if (puedoiniciar.status === 200) {
                    setFechaDeTrabajo(new Date(puedoiniciar.data) == fechaxd(new Date()) ? new Date().toString() : puedoiniciar.data);
                    setIniciarTrue( fechax(puedoiniciar.data) == fechaxx(new Date()) ? true : false );
                    const response: any = await EstadoActual(puedoiniciar.data);
                    const responseHorasTrabajadas: any = await HorasTrabajadas(puedoiniciar.data);

                    if (response.status === 200 && responseHorasTrabajadas.status === 200) {
                        setEstadoActual(response.data.data);
                        setHorasTrabajadas(responseHorasTrabajadas.data.data);
                        setTime({ ms: 0, s: 0, m: responseHorasTrabajadas.data.data.minutes, h: responseHorasTrabajadas.data.data.hours });
                        setLoading(false);
                        setCambie(!cambie);
                    }
                    else {
                        setEstadoActual(null);
                        setLoading(false);
                    }
                } 
                else if (puedoiniciar.status === 403) {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.reload();
                    navigate(environment.LOGIN);
                    window.location.replace('');
                }
            }
             catch (error) {

                const err = error as AxiosError
                

                if(err.response?.status===500){
                    setMensaje('ERROR: No se han podido recopilar datos para iniciar el día. Si el problema persiste por favor comuníquese con servicio técnico.');
                    setOpenError(true);
                    setLoading(false);
                }
                else if(err.response?.status===403){
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.reload();
                    navigate(environment.LOGIN);
                }
                
            }
        }

        estado();

    }, [nexo]);


    useEffect(() => {
        function changeText() {

            if (isLoading === false) {

                if (estadoActual.estado === SIN_INICIAR) {
                    setValueFinish(true);
                }
                if (estadoActual.estado === INICIADO) {
                    setText(PAUSAR);
                    setValueLugar(estadoActual.lugarTrabajo)
                    setDisableRadio(valuesRadio);
                    setValuePrimaryButton(!valuePrimaryButton);
                    setValueFinish(false);
                    setBotonCambio(false);
                    updatedMs = time.ms
                    updatedS = time.s;
                    updatedM = time.m;
                    updatedH = time.h;
                    start();
                }

                else if (estadoActual.estado === PAUSADO) {
                    setText(REANUDAR);
                    setValueFinish(true);
                    setValuePrimaryButton(!valuesRadio);
                    setBotonCambio(true);
                }

                else if (estadoActual.estado === CAMBIO) {
                    setText(REANUDAR);
                    setValueFinish(true);
                    setValuePrimaryButton(false);
                    setText(INICIO);
                    setBotonCambio(true);
                } else if (estadoActual.estado === FINALIZADO) {
                    setText(INICIO);
                    setValuePrimaryButton(false);
                    setValueFinish(true);
                    setDisableRadio(true);
                    setBotonCambio(true);
                }

            }

        }

        changeText();

    }, [isLoading, cambioTarea]);

    const start = () => {

        setInterv(setInterval(run, 10));

        run();

    };

    var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

    const run = () => {

        if (updatedM === 60) {

            updatedH++;

            updatedM = 0;

        }

        if (updatedS === 60) {

            updatedM++;

            updatedS = 0;

        }

        if (updatedMs === 100) {

            updatedS++;

            updatedMs = 0;

        }

        updatedMs++;

        return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });

    };

    const stop = () => {

        clearInterval(interv);

    };

    const resume = () => start();

    async function handleClickStart() {

        try {

            if (text === INICIO) {

                setRueda(true)

                const response: any = await IniciarDia(valueLugar);

                if (response.data.info.code == '200') {

                    setRueda(false);

                    start();

                    setText(PAUSAR);

                    setDisableRadio(!disableRadio);

                    setValueFinish(false);

                    setBotonCambio(false);

                    setMensaje('Inicio de actividades exitoso')

                    setOpen(true);

                    setNexo(!nexo)

                    if (localStorage.getItem('Inicio') == 'False') {

                        localStorage.setItem('Inicio', 'True');

                    } else if (localStorage.getItem('Inicio') == 'False') {

                        localStorage.setItem('Inicio', 'True');

                    } else { localStorage.setItem('Inicio', 'True'); }

                } 
                else if (response.data.info.code == '409') {

                    window.location.reload();
                   

                } 
                else if (response.status === 403) {
                    localStorage.clear()
                    sessionStorage.clear();
                    window.location.reload();
                    navegate(environment.LOGIN);
                    window.location.replace('');
                }

            }

            else if (text === PAUSAR) {

                setRueda(true)

                const response: any = await PausarDia(valueLugar);

                if (response.data.info.code == '200') {

                    stop();

                    setText(REANUDAR);

                    setRueda(false);

                    setDisableRadio(!disableRadio);

                    setValuePrimaryButton(!valuePrimaryButton);

                    setValueFinish(true);

                    setMensaje('Se Pauso la Actividad');

                    setOpen(true);

                    setNexo(!nexo);

                    setBotonCambio(true);

                } 
                else if (response.status === 403) {
                    localStorage.clear()
                    sessionStorage.clear();
                    window.location.reload();
                    navegate(environment.LOGIN);
                    window.location.replace('');
                }
                else if (response.status === 409) {

                    window.location.reload();

                }  
                else {

                    setMensaje('Error al pausar');

                    setOpenError(true);

                    setRueda(false);

                }

            }

            else if (text === REANUDAR) {

                setRueda(true)

                const response: any = await Reiniciar(valueLugar);

                if (response.data.info.code == '200') {

                    resume();

                    setText(PAUSAR);

                    setRueda(false);

                    setValueFinish(false)

                    setDisableRadio(!disableRadio);

                    setMensaje('Se reanudó la actividad');

                    setOpen(true);

                    setNexo(!nexo);

                    setBotonCambio(false);

                } 
                else if (response.status === 403) {

                    localStorage.clear()
                    sessionStorage.clear();
                    window.location.reload();
                    navegate(environment.LOGIN);
                    window.location.replace('');
                }
                else if (response.status === 409) {

                    window.location.reload();

                }   
                else {

                    setMensaje('Error al reanudar la actividad');

                    setOpenError(true);

                    setRueda(false);

                }

            }

        } catch (error) {
            setMensaje('ERROR: No se ha podido iniciar el día. Si el problema persiste por favor comuníquese con servicio técnico.');
            setOpenError(true);
            setRueda(false);
           // window.location.reload();

            const err = error as AxiosError
            if (err.response?.status === 403) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
            navigate(environment.LOGIN);
            }
            if (err.response?.status === 409) {
         
                window.location.reload();
    
            }
        }

    };

    const handleClose = () => {

        setOpen(false);

        setOpenError(false);

        setSnack({
            vertical: 'bottom',
            horizontal: 'center',
          })

    };

    async function handleClickCHANGE() {


        try {

            setRueda(true)

            const response: any = await CambioTarea();
    
            if (response.data.info.code == '200') {
    
                setText(INICIO);
    
                stop();
    
                setValueFinish(true);
    
                setValuePrimaryButton(!valuePrimaryButton);
    
                setDisableRadio(!disableRadio);
    
                setMensaje('Actividad finalizada, iniciar otra actividad');
    
                setOpen(true);
    
                setNexo(!nexo);
    
                setBotonCambio(true);
    
                setRueda(false);
    
            }
            
            else if (response.status === 409) {
    
                window.location.reload();
    
            }  
            
            else {
    
                setMensaje('Error al cambiar la actividad');
    
                setOpenError(true);
    
                setRueda(false);
    
            }
            
        } catch (error) {

            const err = error as AxiosError
                if(err.response?.status===403){
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.reload();
                    navigate(environment.LOGIN);
                }
            
        }

       

    };

    async function handleClickFinish() {

        try {

            const response: any = await FinalizarDia();

        setRueda(true)

        if (response.data.info.code == '200') {

            setText(INICIO);

            stop();

            setValueFinish(true);

            setValuePrimaryButton(valuePrimaryButton);

            setDisableRadio(true);

            setMensaje('Se finalizó la actividad');

            setOpen(true);

            setNexo(!nexo);

            setRueda(false);

        } 
        else if (response.status === 403) {
            localStorage.clear()
            sessionStorage.clear();
            window.location.reload();
            navigate(environment.LOGIN);
            window.location.replace('');
        }


        else {

            setMensaje('Error al finalizar la actividad');

            setOpenError(true);

            setRueda(false);

        }
            
        } catch (error) {
            const err = error as AxiosError
            if (err.response?.status === 403) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
            navigate(environment.LOGIN);
            }
        }

        

    };


    const popUpF = () => {

        if (popUp === true) {

            return (

                <DialogFinished abrir={popUp} setAbrir={setPopUp} setCambie={setCambioTarea} stop={stop}></DialogFinished>

            )

        }

    }

    const buttonsBeginEnd = () => {

        if (isLoading === false) {

            if (estadoActual.estado === SIN_INICIAR) {

                return (

                    <>

                        <Grid container className={classes.buttons}>

                            <Grid item xs={1}>

                            </Grid>

                            <Grid item xs={5}>

                                {rueda ? (<CircularProgress disableShrink />) : (<ButtonPrimary

                                    text={text}

                                    disabled={false}

                                    onClick={() => handleClickStart()}

                                />)}

                            </Grid>

                            <Grid item xs={5}>

                                <ButtonPrimary

                                    text={CAMBIAR}

                                    disabled={true}

                                    onClick={() => handleClickFinish()}

                                />

                            </Grid>

                            <Grid item xs={1}>

                            </Grid>

                        </Grid>

                        <Divider variant="middle" />

                        <Grid container >

                            <Grid item xs={12} className={classes.buttonFinish}>

                                <ButtonPrimary

                                    text={FINALIZAR}

                                    disabled={true}

                                    onClick={() => (setPopUp(true))}

                                />

                            </Grid>

                        </Grid>

                    </>

                )

            }

            if (estadoActual.estado === INICIADO) {

                return (<>

                    <Grid container className={classes.buttons}>

                        <Grid item xs={1}>

                        </Grid>

                        <Grid item xs={5}>

                            {rueda ? (<CircularProgress disableShrink />) : (<ButtonPrimary

                                text={text}

                                disabled={false}

                                onClick={() => handleClickStart()}

                            ></ButtonPrimary>)}

                        </Grid>

                        <Grid item xs={5}>

                            {rueda ? (<CircularProgress disableShrink />) : (<ButtonPrimary

                                text={CAMBIAR}

                                disabled={false}

                                onClick={() => handleClickCHANGE()}

                            />)}

                        </Grid>

                        <Grid item xs={1}>

                        </Grid>

                    </Grid>

                    <Divider variant="middle" />

                    <Grid container >

                        <Grid item xs={12} className={classes.buttonFinish}>

                            <ButtonPrimary

                                text={FINALIZAR}

                                disabled={false}

                                onClick={() => (setPopUp(true))}

                            />

                        </Grid>

                    </Grid>

                </>

                )

            }

            if (estadoActual.estado === PAUSADO) {

                return (

                    <>

                        <Grid container className={classes.buttons}>

                            <Grid item xs={1}>

                            </Grid>

                            <Grid item xs={5}>

                                {rueda ? (<CircularProgress disableShrink />) : (<ButtonPrimary

                                    text={text}

                                    disabled={false}

                                    onClick={() => handleClickStart()}

                                />)}</Grid>

                            <Grid item xs={5}>

                                <ButtonPrimary

                                    text={CAMBIAR}

                                    disabled={true}

                                    onClick={() => handleClickCHANGE()}

                                />

                            </Grid>

                            <Grid item xs={1}>

                            </Grid>

                        </Grid>

                        <Divider variant="middle" />

                        <Grid container >

                            <Grid item xs={12} className={classes.buttonFinish}>

                                <ButtonPrimary

                                    text={FINALIZAR}

                                    disabled={true}

                                    onClick={() => (setPopUp(true))}

                                />

                            </Grid>

                        </Grid>

                    </>

                )

            }

            if (estadoActual.estado === CAMBIO) {

                return (

                    <>

                        <Grid container className={classes.buttons}>

                            <Grid item xs={1}>

                            </Grid>

                            <Grid item xs={5}>

                                <ButtonPrimary

                                    text={text}

                                    disabled={false}

                                    onClick={() => handleClickStart()}

                                /></Grid>

                            <Grid item xs={5}>

                                <ButtonPrimary

                                    text={CAMBIAR}

                                    disabled={true}

                                    onClick={() => handleClickCHANGE()}

                                />

                            </Grid>

                            <Grid item xs={1}>

                            </Grid>

                        </Grid>

                        <Divider variant="middle" />

                        <Grid container >

                            <Grid item xs={12} className={classes.buttonFinish}>

                                <ButtonPrimary

                                    text={FINALIZAR}

                                    disabled={true}

                                    onClick={() => (setPopUp(true))}


                                />

                            </Grid>

                        </Grid>

                    </>

                )
            }

            if (estadoActual.estado === FINALIZADO) {

                return (

                    <>

                        <Grid container className={classes.buttons}>

                            <Grid item xs={1}>

                            </Grid>

                            <Grid item xs={5}>

                                <ButtonPrimary

                                    text={text}

                                    disabled={true}

                                    onClick={() => handleClickStart()}

                                />

                            </Grid>

                            <Grid item xs={5}>

                                <ButtonPrimary

                                    text={CAMBIAR}

                                    disabled={true}

                                    onClick={() => handleClickFinish()}

                                />

                            </Grid>

                            <Grid item xs={1}>

                            </Grid>

                        </Grid>

                        <Divider variant="middle" />

                        <Grid container >

                            <Grid item xs={12} className={classes.buttonFinish}>

                                <ButtonPrimary

                                    text={FINALIZAR}

                                    disabled={true}

                                    onClick={() => (setPopUp(true))}

                                />

                            </Grid>

                        </Grid>

                    </>

                )

            }

        }

    }

    const muestra = () => {

        if (iniciarTrue == true) {

            return (<>

                <RadioButtonsGroup value={valueLugar}

                    setValue={setValueLugar}

                    disableRadio={!disableRadio}

                    cambie={cambie}

                    setCambie={setCambie}

                    SetPrimary={setValuePrimaryButton}

                    valuePrimaryButton={valuePrimaryButton}

                    title={'Lugar de trabajo'} />

                {buttonsBeginEnd()}

            </>

            )

        } else {

            return (

                <Grid container>

                    <Grid item xs={12}>

                        <Alert severity="error" className={classes.alert}>No puede iniciar la actividad de hoy hasta que  no complete este día </Alert>

                    </Grid>

                </Grid>

            )

        }

    }

    const fecha = (date: string) => {

        const hoy = new Date(date);

        return hoy.toLocaleDateString("es-ES", { weekday: 'long', day: 'numeric', month: 'long' });

    };

    return (

        <div >

            {isLoading ? (


                <div className={classes.skeleton}>

                    <Skeleton variant="text" />

                    <Skeleton variant="text" />

                    <Skeleton variant="text" />

                    <Skeleton variant="rect" width={620} height={500} />                    

                </div>

            ) : (

                <Card className={classes.card}>

                    <Grid container>

                        <Grid item xs={12}>

                            <CardHeader

                                className={classes.cardHeader}

                                disableTypography

                                title={fecha(fechaDeTrabajao)}

                            />

                        </Grid>

                    </Grid>

                    <Grid container>

                        <Grid item xs={12} className={classes.subTitulo}>

                            <Typography className={classes.suTituloText} gutterBottom>

                                Horas transcurridas desde el inicio de actividades

                            </Typography>

                        </Grid>

                    </Grid>

                    <Grid container>

                        <Grid item xs={12}>

                            <Watch time={time} setTime={setTime} loadign={isLoading} />

                        </Grid>

                    </Grid>

                    {/* <Grid container>
                        <Grid item xs={12}>
                            No puede iniciar
                        </Grid>
                    </Grid> */}
                    {/* <RadioButtonsGroup value={valueLugar}
                        setValue={setValueLugar}
                        disableRadio={!disableRadio}
                        cambie={cambie}
                        setCambie={setCambie}
                        SetPrimary={setValuePrimaryButton}
                        valuePrimaryButton={valuePrimaryButton}
                        title={'Lugar de trabajo'} />
                        {buttonsBeginEnd()} */}

                    {muestra()}

                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={snack}>

                        <Alert onClose={handleClose} severity="success" >

                            {mensaje}

                        </Alert>

                    </Snackbar>

                    <Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>

                        <Alert onClose={handleClose} severity="error">

                            {mensaje}

                        </Alert>

                    </Snackbar>

                    {popUpF()}

                </Card>

            )}

        </div>

    )

}
