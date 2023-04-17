import 'date-fns';
import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import { makeStyles, Snackbar } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import { environment } from '../../../../enviroment/enviroment';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ButtonGroupDetailPause } from '../ButtonsGroup/ButtonGroupDetailPause';
import ActualizarRegistro from '../../../../services/ActualizarRegistro/ActualizarRegistro';
import ClienteProyecto from '../../../../services/ClienteProyecto/ClienteProyecto';
import LugarTrabajo from '../../../../services/LugarTrabajo/lugarTrabajo';
import PuedoIniciar from '../../../../services/PuedoIniciar/puedoIniciar';
import { TextBox } from '../../Inputs/TextBox/TextBox';
import { SelectDetails } from '../../Select/SelectDetails';
import { ButtonGroupDetail } from '../ButtonsGroup/ButtonGroupDetail';





interface data {
    inicio: Date;
    fin: Date;
    lugar: String;
    idRegistro: String;
    descripcionTXT: string;
    idClienteTemp: number;
    tipoHora: string;
    disableFin: boolean;
    nexo: boolean;
    setNexo: (value: boolean) => void;

}

const useStyles = makeStyles({
    combo: {
        float: 'left',
        paddingRight: '60px',
        height: '100%',
        paddingBottom: '20px'
    },
    buttons: {
        paddingTop: '2%',
    },
    description: {
        width: '100%'
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    }

})


export const TimerPicker = ({ inicio, fin, lugar, idRegistro, descripcionTXT, idClienteTemp, tipoHora, disableFin, nexo, setNexo }: data) => {

    const classes = useStyles();
    const [lugarTemp, setLugarTemp] = useState(0);
    const [inicioTemp, setInicioTemp] = useState(inicio);
    const [finTemp, setFinTemp] = useState(fin);
    const [lugarDeTrabajo, setLugarDeTrabajo] = useState(0);
    const [cliente, setCliente] = useState<any>([{id:0,nombre:"Error de carga"}]);
    const [descripcion, setDescripcion] = useState("");
    const [isDisableInicio, setIsDisableInicio] = useState(true);
    const [isDisableFin, setIsDisableFin] = useState(disableFin);
    const [isLoading, setIsLoading] = useState(true);
    const [lugarTrabajo, setLugarTrabajo] = useState<any>(null);
    const [clienteText, setClienteText] = useState('')
    const [idCliente, setIdCliente] = useState(0);
    const navigate = useNavigate()
    const [lugarTrabajoText, setLugarTrabajoText] = useState('');
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);

    useEffect(() => {
        async function lugarTrabajo() {

            try {

                const response: any = await LugarTrabajo()
                const response1: any = await ClienteProyecto(localStorage.getItem('user'))
    
                if (response.status === 200 && response1.status === 200) {
                    setLugarTrabajo(response.data.data);
                    if(response1.data.data==null){
                    
                    
                    }else{
                        setCliente(response1.data.data)
                    }
               
                    setIsLoading(false);
                    setDescripcion(descripcionTXT);
                    setIdCliente(idClienteTemp)
                   
                    response.data.data.map((item: any) => {
                        if (item.nombre == lugar) {
                            setLugarDeTrabajo(item.id);
                            setLugarTemp(item.id);
                        }
                    });
                } 
                else if (response.status === 403) {
                    localStorage.clear()
    
                    sessionStorage.clear();
                    navigate(environment.LOGIN);
                    window.location.replace('');
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


           
            
        }
        lugarTrabajo();
    }, []);

    const handleDateChangeInicio = (date: Date | null) => {

        try {
            if (date !== null) {
                if (date > inicio && date < fin) {
                    setInicioTemp(date)
                    setIsDisableFin(true);
                } else {
                    setInicioTemp(inicio);
                }
            }
        } catch {
            setInicioTemp(inicio);
        }

    };
    const handleDateChangeFin = (date: Date | null) => {
        try {
            if (date !== null) {
                if (date > inicio && date < fin) {

                    setFinTemp(date)
                    setIsDisableInicio(true);

                } else {
                    setFinTemp(fin);
                }
            }
        } catch {
            setFinTemp(fin);
        }

    };
    const handleClose = () => {
        setOpen(false);
        setOpenError(false);
    };
    const fecha = (fecha: any) => {
        const d = new Date(fecha);

        return (d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2))
    }
    async function Update() {
        try {
        
      
        let response: any = await ActualizarRegistro(inicioTemp, finTemp, lugarDeTrabajo, descripcion, idCliente, clienteText, tipoHora, idCliente, clienteText, idRegistro);
        let puedo: any = await PuedoIniciar()
        let fechatemp = puedo.data;

        if (response.data.info.code == '200') {
            setOpen(true);
            setNexo(!nexo);
            if (fecha(puedo.data) == fecha(new Date()) && fecha(fechatemp) != fecha(puedo.data)) {
                navigate(environment.LOGIN);
                window.location.replace('');
            }
        } 
        else if (response.status === 403) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace('');
        } 
        else {
            setOpenError(true)
        }
    } catch (error) {

        const err = error as AxiosError
        if(err.response?.status===403){
            setOpenError(true);
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
            navigate(environment.LOGIN);
        }
           
    }
    }
    function resteblecer() {
        setDescripcion("");
        setInicioTemp(inicio);
        setFinTemp(fin);
        setIsDisableFin(false);
        setIsDisableInicio(true);
        setLugarDeTrabajo(0);
        setIdCliente(0);
    }

    const areCampsCompleted = () => {
        if(( idCliente != null && idCliente != 0) &&(descripcion != null && descripcion != "") && (lugarDeTrabajo != null && lugarDeTrabajo != 0) && (clienteText != null && clienteText != "")){
            return false;
        }

        else{
            return true;
        }
    }

    
    const botones = () => {

        if (!isLoading) {
            if (tipoHora == "Productiva" || tipoHora == "Cambio" || tipoHora == "Finalizado") {
                return (
                    <Grid container className={classes.root}>
                        <div >

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container>
                                    <Grid item sm={4}>
                                        <KeyboardTimePicker
                                            disabled={isDisableInicio}
                                            margin="normal"
                                            id="Inicio"
                                            label='Inicio'
                                            value={inicioTemp}
                                            onChange={handleDateChangeInicio}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item sm={4}>
                                        <KeyboardTimePicker
                                            disabled={isDisableFin}
                                            margin="normal"
                                            id="Fin"
                                            label='Fin'
                                            value={finTemp}
                                            onChange={handleDateChangeFin}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6} sm={6} className={classes.combo}>

                                            <SelectDetails
                                                id={idCliente}
                                                setId={setIdCliente}
                                                setText={setClienteText}
                                                defaultValue={idCliente}
                                                text={''}
                                                isCompleted={areCampsCompleted()}
                                                subText={'Proyecto'}
                                                data={cliente}></SelectDetails>

                                        </Grid>
                                        <Grid item xs={6} sm={6} className={classes.combo}>

                                            <SelectDetails id={lugarDeTrabajo} setId={setLugarDeTrabajo}
                                                setText={setLugarTrabajoText}
                                                text={''}
                                                defaultValue={lugarDeTrabajo}
                                                subText={'Lugar de trabajo'}
                                                isCompleted={areCampsCompleted()}
                                                data={lugarTrabajo}></SelectDetails>

                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} sm={6}>

                                            <TextBox label='Descripcion de la actividad' defaultValue={descripcion} areCampsCompleted={areCampsCompleted} text={descripcion} setText={setDescripcion} />

                                        </Grid>

                                        <Grid item xs={12} className={classes.buttons}>

                                            <ButtonGroupDetail areCampsCompleted={areCampsCompleted} restablecer={resteblecer} guardar={Update}></ButtonGroupDetail>

                                        </Grid>
                                        <Grid item xs={5} sm={5} md={5}></Grid>
                                    </Grid>
                                </Grid>


                            </MuiPickersUtilsProvider>

                        </div>
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                Registro/s actualizados
                            </Alert>
                        </Snackbar>
                        <Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">
                                Error al actualizar
                            </Alert>
                        </Snackbar>
                    </Grid>)
            } else {
                return (
                    <Grid container className={classes.root}>
                        <div >

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                <Grid container>
                                    <Grid item sm={8} className={classes.description}>
                                        <TextBox label='Descripcion de la actividad' defaultValue={descripcion} areCampsCompleted={areCampsCompleted} text={descripcion} setText={setDescripcion} />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={2} sm={4} md={4}></Grid>
                                    <Grid item xs={2} sm={5} md={8} className={classes.buttons}>
                                        <ButtonGroupDetailPause isCompleted={descripcion != "" ? false : true} restablecer={resteblecer} guardar={Update}></ButtonGroupDetailPause>
                                    </Grid>
                                </Grid>

                            </MuiPickersUtilsProvider>

                        </div>
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                Registro/s actualizados
                            </Alert>
                        </Snackbar>
                        <Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">
                                Error al actualizar
                            </Alert>
                        </Snackbar>
                    </Grid>
                );

            };

        }
    }

    return (

        <>{botones()}</>
    );
}


