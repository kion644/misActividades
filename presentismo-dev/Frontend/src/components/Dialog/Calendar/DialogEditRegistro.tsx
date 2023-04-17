import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Grid, Snackbar } from '@material-ui/core';
import { stringify } from 'querystring';
import { Rowing, Update } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, DateTimePicker, TimePicker } from '@material-ui/pickers';
import { Alert } from '@mui/material';


import { Skeleton } from '@material-ui/lab';

import { AxiosError } from 'axios';
import { environment } from '../../../enviroment/enviroment';
import { fechaHora } from '../../../function/fechaHora';
import { formatoFecha } from '../../../function/formatoFecha';
import ActualizarRegistroCalendar from '../../../services/ActualizarRegistro/ActualizarRegistroCalendar';
import ClienteProyecto from '../../../services/ClienteProyecto/ClienteProyecto';
import LugarTrabajo from '../../../services/LugarTrabajo/lugarTrabajo';
import { ButtonGroupDetailCalendar } from '../../SmallerComponents/Buttons/ButtonsGroup/ButtonGroupDetailCalendar';
import { TextBox } from '../../SmallerComponents/Inputs/TextBox/TextBox';
import { SelectDetailsCalendar } from '../../SmallerComponents/Select/SelectDetailsCalendar';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root2: {
            fontFamily: '"Montserrat", sans-serif',
        },
        titulo: {
            backgroundColor: '#007DC4',
            color: '#FFFF',
            fontSize: '100%',
            textAlign: 'center',
            fontFamily: '"Montserrat", sans-serif',
        },
        center: {
            textAlign: 'center',
        },


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
        }

    })
);
const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            height: '100%'

        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
interface prop {
    setCerrar: (value: boolean) => void;
    setNexo: (value: boolean) => void;
    setOpenSnack: (value: boolean) => void;
    setOpenSnackError: (value: boolean) => void;
    setMessage: (value: string) => void;

    user: string;
    rh: any,
    id: number;
}

export default function DialogEditRegistro({ setCerrar, id, rh, setNexo, user, setOpenSnack, setOpenSnackError, setMessage }: prop) {

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);

    const [clienteText, setClienteText] = useState("");
    const [description, setDescription] = useState(rh.descripcion);
    const [lugarTrabajoText, setLugarTrabajoText] = useState('');

    const [lugarDeTrabajo, setLugarDeTrabajo] = useState(rh.lugarTrabajo != null ? rh.lugarTrabajo.id : 0);
    const [lugarTrabajo, setLugarTrabajo] = useState<any>([]);

    const [justificacionCalendario, setJustificacionCalendario] = useState(rh.justificacionCalendario);

    const [open, setOpen] = useState(false);

    const [openError, setOpenError] = useState(false);

    const [fin, setFin] = useState(fechaHora(rh.fin));
    const [inicio, setInicio] = useState(fechaHora(rh.inicio));

    const [alertText, setAlertText] = useState('');


    const navigate = useNavigate()



    const [cliente, setCliente] = useState<any>([{ id: 0, nombre: "Error de carga" }]);
    const [idCliente, setIdCliente] = useState(rh.fase != null ? rh.fase.id : 0);


    const [dateError, setDateError] = useState(false);



    const handleClose = () => {
        setOpen(false);
        setOpenError(false);
    };

    useEffect(() => {


        async function loadProyectos() {

            const response: any = await ClienteProyecto(user);
            const response2: any = await LugarTrabajo();

            if (response.status === 200) {
                setCliente(response.data.data);
                setLugarTrabajo(response2.data.data);
                setIsLoading(false);

            }

        }

        loadProyectos();




    }, []);




    const tipoDeHora = (tHora: any) => {

        if (tHora.tipo == "PRODUCTIVA") {
            if (tHora.nombre == "Productiva") {
                return (1);
            }
            else {
                return (5)
            }

        } else if (tHora.tipo === "FINALIZADO") {
            return (6)
        }
        else if (tHora.tipo === "PAUSA") {
            return (2)
        }
        else {
            return (6);
        }
    }

    const editarDetalle = () => {
        async function editDetail() {

            try {

                const editarRegistro: any = await ActualizarRegistroCalendar(lugarDeTrabajo, description, idCliente, clienteText, tipoDeHora(rh.tipoHora), idCliente, clienteText, rh.id, justificacionCalendario, fin);
                if (editarRegistro.status === 200) {
                    setOpen(false);
                    setCerrar(true);
                    setNexo(true);

                    setOpenSnack(true);
                    setMessage("¡Registro actualizado con éxito!")

                }
                else {

                }


            } catch (error) {

                const err = error as AxiosError;


                if (err.response?.status === 400) {
                    setAlertText('ERROR: No puede cambiar el fin del día, elija un horario previo');
                    setOpenError(true);
                }
                else if (err.response?.status === 500) {
                    setOpenSnackError(true);
                    setMessage("ERROR INTERNO: Vuelva a intentarlo.");
                }
                else if (err.response?.status === 403) {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.reload();
                    navigate(environment.LOGIN);
                }

            }


        }

        editDetail();
    }


    async function handleClickFinish() {
        setCerrar(true);
    };

    function resteblecer() {
        setDescription("");
        setLugarDeTrabajo(0);
        setIdCliente(0);
    };

    const areCampsCompleted = () => {
        if ((idCliente != null && idCliente != 0) && (description != null && description != "") && (lugarDeTrabajo != null && lugarDeTrabajo != 0) && (clienteText != null && clienteText != "") && (justificacionCalendario != null)) {
            return false;
        }

        else {
            return true;
        }
    }

    const areCampsCompletePause = () => {
        if ((description != null && description != "") && (justificacionCalendario != null && justificacionCalendario != "")) {
            return false;
        }
        else {
            return true;
        }
    }

    const handleDateChangeFin = (date: Date | null) => {
        try {
            let inicioParse = new Date(fechaHora(rh.inicio));
            let finParse = new Date(fechaHora(rh.fin));

            if (date !== null) {

                if (date.getTime() < inicioParse.getTime()) {
                    setAlertText("ERROR: No puede elegir un horario previo al inicio correspondiente");
                    setOpenError(true);
                    setDateError(true);
                    setFin(fechaHora(rh.fin));
                }

                else if (date.getTime() > finParse.getTime()) {
                    setAlertText("ERROR: No puede elegir un horario posterior al fin correspondiente");
                    setOpenError(true);
                    setDateError(true);
                    setFin(fechaHora(rh.fin));
                }

                else {
                    setOpenError(false);
                    setFin(fechaHora(date));
                    setDateError(false);
                }




            }
        } catch {
        }
    }



    const botones = () => {

        if (!isLoading) {
            return (
                <Grid container className={classes.root2}>
                    <div >

                        <Grid container>

                            <Grid item sm={2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="Inicio"
                                        label='Inicio'
                                        value={inicio}
                                        onChange={handleDateChangeFin}
                                        disabled={true}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>

                            </Grid>


                            <Grid item sm={4}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TimePicker
                                        margin="normal"
                                        id="Fin"
                                        ampm={false}
                                        label='Fin'
                                        value={fin}
                                        error={dateError}
                                        onChange={handleDateChangeFin}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>

                            {rh.tipoHora.tipo != "PAUSA" ?

                                <Grid container>
                                    <Grid item xs={6} sm={6} className={classes.combo}>

                                        <SelectDetailsCalendar
                                            id={idCliente}
                                            setId={setIdCliente}
                                            setText={setClienteText}
                                            defaultValue={rh.fase != null ? rh.fase.id : idCliente}
                                            text={''}
                                            isCompleted={areCampsCompleted()}
                                            subText={'Proyecto'}
                                            data={cliente}></SelectDetailsCalendar>

                                    </Grid>
                                    <Grid item xs={6} sm={6} className={classes.combo}>

                                        <SelectDetailsCalendar id={lugarDeTrabajo} setId={setLugarDeTrabajo}
                                            setText={setLugarTrabajoText}
                                            text={''}
                                            defaultValue={rh.lugarTrabajo != null ? rh.lugarTrabajo.id : lugarDeTrabajo}
                                            subText={'Lugar de trabajo'}
                                            isCompleted={areCampsCompleted()}
                                            data={lugarTrabajo}></SelectDetailsCalendar>

                                    </Grid>
                                </Grid>

                                :
                                null}
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <TextBox label='Descripción de la actividad' defaultValue={rh.descripcion != null ? rh.descripcion : ""} areCampsCompleted={areCampsCompleted} text={description} setText={setDescription} />

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextBox label='Justificación' defaultValue={rh.justificacionCalendario != null ? rh.justificacionCalendario : ""} areCampsCompleted={areCampsCompleted} text={justificacionCalendario} setText={setJustificacionCalendario} />

                                </Grid>
                                <Grid item xs={12} className={classes.buttons}>

                                    {rh.tipoHora.tipo != "PAUSA" ?
                                        <ButtonGroupDetailCalendar areCampsCompleted={areCampsCompleted} restablecer={resteblecer} guardar={editarDetalle}></ButtonGroupDetailCalendar>
                                        :
                                        <ButtonGroupDetailCalendar areCampsCompleted={areCampsCompletePause} restablecer={resteblecer} guardar={editarDetalle}></ButtonGroupDetailCalendar>
                                    }

                                </Grid>

                                <Grid item xs={5} sm={5} md={5}></Grid>
                            </Grid>
                        </Grid>



                    </div>

                </Grid>)


        }
    }


    return (


        <>

            <div className={classes.root2}>
                {isLoading ? (
                    <Dialog onClose={handleClickFinish} aria-labelledby="customized-dialog-title" open={true}
                        maxWidth='xl'>

                        <DialogContent dividers>

                            <CircularProgress></CircularProgress>

                        </DialogContent>
                    </Dialog>
                ) : (
                    <>
                        <Dialog onClose={handleClickFinish} aria-labelledby="customized-dialog-title" open={true}
                            maxWidth='xl'>
                            <div className={classes.titulo}>
                                <DialogTitle id="customized-dialog-title" onClose={handleClickFinish}  >
                                    Registro del {formatoFecha(rh.inicio)}
                                </DialogTitle>
                            </div>

                            <DialogContent dividers>

                                <div>
                                    {botones()}
                                </div>

                            </DialogContent>
                        </Dialog>

                    </>
                )}

                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Registro/s actualizados
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {alertText}
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
}