import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { environment } from '../../../enviroment/enviroment';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Snackbar, Tooltip } from '@material-ui/core';
import { Alert } from '@mui/material';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { fechaHora } from '../../../function/fechaHora';
import FinalizarJornada from '../../../services/FinalizarDia/finalizarJornada';
import HorasTrabajadas from '../../../services/HorasTrabajadas/horasTrabajadas';
import ultimoRegistroDelDia from '../../../services/RegistroDeHoras/ultimoRegistroDelDia';
import { GroupButtonFinished } from '../../SmallerComponents/Buttons/Group/GroupButtonFinished';
import TableResumen from '../../Tables/ResumenFinDia/TableResumenFinDia';


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

    })
);
const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),

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
    abrir: boolean;
    setAbrir: (value: boolean) => void;
    setCambie: (value: boolean) => void;
    stop: () => void;
}

export default function DialogFinished({ abrir, setAbrir, setCambie, stop }: prop) {
    const [open, setOpen] = React.useState(abrir);
    const classes = useStyles();
    const [horas, setHoras] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const [lastRh, setLastRh] = useState<any>(null);

    const [horaFin, setHoraFin] = useState(fechaHora(new Date()));
    const [dateError, setDateError] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [openError, setOpenError] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setAbrir(false);
        setCambie(true);
    };

    const handleCerrar = () => {
        setOpenError(false);
    };
    useEffect(() => {
        async function estado() {
            try {

                const responseHorasTrabajadas: any = await HorasTrabajadas(new Date().toString());

                if (responseHorasTrabajadas.status === 200) {
                    setHoras(responseHorasTrabajadas.data.data);
                    setIsLoading(false);
                }
                else if (responseHorasTrabajadas.status === 403) {
                    localStorage.clear();
                    sessionStorage.clear();
                    navigate(environment.LOGIN);
                    window.location.replace('');
                }
                else {
                    setHoras(null);
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
        }
        async function ultimoRegDelDia() {
            try {
                const ultimoDelDia = await ultimoRegistroDelDia();
                setLastRh(fechaHora(ultimoDelDia.data.inicio));
            } catch (error) {

            }
        }
        estado();
        ultimoRegDelDia();
    }, []);


    async function handleClickFinish() {
        try {
            const response: any = await FinalizarJornada(horaFin);
            if (response.status == 200) {
                setOpen(false);
                setAbrir(false);
                setCambie(false);
                stop();
                window.location.reload();
            }
        } catch (error) {
            const err = error as AxiosError
            if (err.response?.status === 400) {
                setOpenError(true);
                setAlertText("ERROR INTERNO: Ha elegido un horario previo al inicio, por favor elija un horario correcto");
            }
            else if (err.response?.status === 403) {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
                navigate(environment.LOGIN);
            }
            else if (err.response?.status === 500) {
                setOpenError(true);
                setAlertText("ERROR INTERNO: Por favor, intente de nuevo. Si el error persiste comunicarse con servicio técnico");
            }
        }
    };

    const handleDateChangeFin = (date: Date | null) => {
        const now = new Date();
        const lastRhDate = new Date(fechaHora(lastRh));
        if (date !== null) {

            if (date.getTime() > now.getTime()) {
                setHoraFin(fechaHora(new Date()));
                setDateError(true);
                setOpenError(true);
                setAlertText("ERROR: No puede elegir un horario posterior al actual");
            }
            else if(date.getTime() < lastRhDate.getTime()){
                setHoraFin(fechaHora(new Date()));
                setDateError(true);
                setOpenError(true);
                setAlertText("ERROR: No puede elegir un horario previo al inicio");
            }
            else {
                setHoraFin(fechaHora(date));
                setOpenError(false);
                setDateError(false);
            }
        }
    }
    return (

        <div className={classes.root2}>
            {isLoading ? (
                null
            ) : (
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
                    maxWidth='xl'>
                    <div className={classes.titulo}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}  >
                            Resumen
                        </DialogTitle>
                    </div>
                    <DialogContent dividers>
                        <div className={classes.titulo}>
                            <Typography gutterBottom variant='h6'>
                                Horas trabajadas: {horas.hours} Horas y {horas.minutes} Minutos


                            </Typography>

                        </div>

                        <div style={{display: 'flex', alignItems: 'end'}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >

                                <TimePicker
                                    margin="normal"
                                    id="Inicio"
                                    ampm={false}
                                    label='Inicio del último registro'
                                    value={lastRh}
                                    onChange={handleDateChangeFin}
                                    disabled={true}
                                />

                                <TimePicker
                                    margin="normal"
                                    id="Fin"
                                    ampm={false}
                                    label='Fin del último registro'
                                    variant='dialog'
                                    value={horaFin}
                                    error={dateError}
                                    onChange={handleDateChangeFin}
                                />
                            </MuiPickersUtilsProvider>
                            <Tooltip title="Elegir hora de fin del día" placement='right-start' arrow>
                                <IconButton>
                                    <QuestionMarkIcon sx={{color: '#007DC4', }} />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </DialogContent>
                    <DialogContent dividers>
                        <TableResumen></TableResumen>
                    </DialogContent>
                    <DialogActions >
                        <GroupButtonFinished
                            cancelDisable={false}
                            finishDisable={false}
                            handleClickCancel={handleClose}
                            handleClickFinish={handleClickFinish}
                        ></GroupButtonFinished>
                    </DialogActions>
                </Dialog>

            )}

            <Snackbar open={openError} autoHideDuration={4000} onClose={handleCerrar}>
                <Alert onClose={handleClose} severity="error">
                    {alertText}
                </Alert>
            </Snackbar>
        </div>
    );
}