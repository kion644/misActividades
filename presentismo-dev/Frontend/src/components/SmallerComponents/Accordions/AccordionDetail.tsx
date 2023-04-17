import {
    makeStyles,
    Theme,
    createStyles
} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Grid, Tooltip } from '@material-ui/core';
import { useState } from 'react';
import { TimerPicker } from '../Buttons/Pickers/TimerPicker';


interface data {
    id: string;
    inicio: string;
    fin: string;
    lugarTrabajo: string;
    tipoHora: string;
    estado: string;
    clienteText: string;
    idCliente: number;
    descripcion: string;
    horas: string;
    estadoGeneral: string;
    nexo: boolean;
    setNexo: (value: boolean) => void;
    setXFecha: (value: string) => void;

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconW: {
            marginLeft: '45%',
            marginTop: 'auto',
            color: '#F6921E'
        },
        iconE: {
            marginLeft: '45%',
            marginTop: 'auto',
            color: '#ff0000'
        },
        iconA: {
            marginLeft: '45%',
            marginTop: 'auto',
            color: '#54cf00'
        },
        root: {
            fontFamily: '"Montserrat", sans-serif',
            width: '95%',
            minWidth: '400px',
        },
        icon: {
            color: '#00aa11',
            fontSize: '15px',
            marginTop: 'auto',
            marginBottom: 'auto',
            fontFamily: '"Montserrat", sans-serif',
            padding: '4px'
        },
        iconPausa: {
            color: '#f94a4a',
            fontSize: '15px',
            marginTop: 'auto',
            marginBottom: 'auto',
            fontFamily: '"Montserrat", sans-serif',
            padding: '4px'
        },
        heading: {
            marginTop: '0%',
            fontSize: theme.typography.pxToRem(14),
            flexBasis: '25%',
            flexShrink: 0,
            fontFamily: '"Montserrat", sans-serif',

        },
        headingComplete: {
            fontSize: theme.typography.pxToRem(14),
            flexShrink: 0,
            fontFamily: '"Montserrat", sans-serif',
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(14),
            width: '95%',
            color: theme.palette.text.secondary,
            fontFamily: '"Montserrat", sans-serif',

        },
        nonCompletedText : {
            fontSize: theme.typography.pxToRem(14),
            width: '95%',
            color: 'red',
            fontFamily: '"Montserrat", sans-serif',
        },
        detailsNull: {
            color: '#F6921E',
            marginLeft: '2rem',
            fontFamily: '"Montserrat", sans-serif',
            alignItems: 'center',
            width: '95%',

        },
        pausa: {
            backgroundColor: '#c9c9c9',

        },
        flecha: {
            color: "#007DC4",
        }
    }),
);

export const AccordionDetail = ({ id, inicio, fin, lugarTrabajo, tipoHora, estado, clienteText, idCliente, descripcion, horas, estadoGeneral, nexo, setNexo, setXFecha }: data) => {

    const fechas = (fecha: any) => {

        const d = new Date(fecha);

        return ('0' + (d.getHours())).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2)
    }
    const classes = useStyles();
    const [toolTipss, setToolTips] = useState('');

    const inicioFin = () => {

        if (fin === null) {

            return (
                <><Grid container>
                    <Typography className={classes.heading} align='left'>
                        {fechas(inicio)} -
                    </Typography>
                </Grid>
                </>
            )
        }
        else {

            return (
                <><Grid container>
                    <Typography className={classes.headingComplete} align='left'>
                        {fechas(inicio) + " - " + fechas(fin)}
                    </Typography>
                    <Typography className={classes.flecha} align='left'>
                        < ArrowRightAltIcon />
                    </Typography>
                    <Typography className={classes.headingComplete} align='left'>
                        {horas}
                    </Typography>
                </Grid>
                </>

            )
        }

    }
    const botton = () => {

        if (fin !== null) {
            return (
                <div>
                    <TimerPicker
                        inicio={new Date(inicio)}
                        fin={new Date(fin)}
                        lugar={lugarTrabajo}
                        idRegistro={id}
                        descripcionTXT={descripcion}
                        idClienteTemp={idCliente}
                        tipoHora={tipoHora}
                        disableFin={false}
                        nexo={nexo}
                        setNexo={setNexo}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    Registro no finalizado
                </div>
            )
        }
    }



    const pendiente = () => {
        if (estado == 'Pendiente') {
            return (<>
                <Tooltip title={"Aprobación de cambio de inicio pendiente"} placement='right'>
                    <WarningIcon className={classes.iconW} ></WarningIcon>
                </Tooltip>
            </>
            );
        } else if (estado == 'Aceptado') {
            return (<>
                <Tooltip title={"Aprobación de cambio de inicio aceptada"} placement='right'>
                    <CheckCircleIcon className={classes.iconA} ></CheckCircleIcon>
                </Tooltip>
            </>
            );
        } else if (estado == 'Rechazado') {
            return (<>
                <Tooltip title={"Aprobación de cambio de inicio rechazada"} placement='right'>
                    <ErrorIcon className={classes.iconE} ></ErrorIcon>
                </Tooltip>
            </>
            );
        }
    }
    const estadoR = () => {
        if (estadoGeneral != "Abierto") {

            return (
                <Tooltip title={"Registro cerrado correctamente"} placement='right'>
                    <CheckCircleIcon className={classes.icon} />
                </Tooltip>
            )
        } else {
            if (fin === null) {

                return (
                    <Tooltip title={"Registro activo"} placement='right'>
                        <AccessAlarmIcon className={classes.icon} />
                    </Tooltip>
                )
            } else {

                return (
                    <Tooltip title={"Faltan datos para cerrar el registro"} placement='right'>
                        <AccessAlarmIcon className={classes.icon} />
                    </Tooltip>
                )
            }

        }
    }



    const estadoRP = () => {
        if (estadoGeneral != "Abierto") {

            return (
                <Tooltip title={"Registro cerrado correctamente"} placement='right'>
                    <CheckCircleIcon className={classes.iconPausa} />
                </Tooltip>
            )
        } else {
            if (fin === null) {
                return (
                    <Tooltip title={"Registro activo"} placement='right'>
                        <PauseCircleOutlineIcon className={classes.iconPausa} />
                    </Tooltip>
                )
            } else {
                return (
                    <Tooltip title={"Falta la descripción de la actividad"} placement='right'>
                        <PauseCircleOutlineIcon className={classes.iconPausa} />
                    </Tooltip>
                )
            }

        }
    }

    const completitudDelRegistro = () => {

        if (tipoHora === "Productiva" || tipoHora == "Cambio" || tipoHora == "Finalizado") {
            if ((idCliente == null || descripcion == null || lugarTrabajo == null) && fin != null) {
                return "!Registro incompleto!"
            }
        } else {
            if (descripcion == null && fin != null) {
                return "¡Registro incompleto!"
            }
        }


    }


    const detalleInicio = () => {
        if (tipoHora === "Productiva" || tipoHora == "Cambio" || tipoHora == "Finalizado") {

            return (

                <div >
                    <Accordion >

                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.root}
                        >
                            <Grid container>
                                <Grid item sm={1}>
                                    {estadoR()}
                                </Grid>
                                <Grid item sm={4}>
                                    {inicioFin()}
                                </Grid>
                                <Grid item sm={6}>
                                    <Typography className={classes.secondaryHeading} align='center'>
                                        {clienteText} / {lugarTrabajo}

                                    </Typography >

                                </Grid>
                                <Typography className={classes.nonCompletedText} align='left'>
                                    {completitudDelRegistro()}
                                </Typography>

                                <Grid item sm={1}>
                                    {pendiente()}
                                </Grid>
                            </Grid>
                        </AccordionSummary>

                        <AccordionDetails className={classes.detailsNull}>

                            {botton()}

                        </AccordionDetails>
                    </Accordion>
                </div>

            )
        } else {
            return (

                <div >

                    <Accordion className={classes.pausa}>

                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.root}
                        >
                            <Grid container>
                                <Grid item sm={1}>
                                    {estadoRP()}
                                </Grid>
                                <Grid item sm={11}>
                                    {inicioFin()}
                                </Grid>
                                <Typography className={classes.nonCompletedText} align='left'>
                                    {completitudDelRegistro()}
                                </Typography>
                            </Grid>

                        </AccordionSummary>

                        <AccordionDetails className={classes.detailsNull}>

                            <Typography className={classes.secondaryHeading}>
                                {botton()}
                            </Typography>



                        </AccordionDetails>

                    </Accordion>

                </div >

            )
        }
    }

    return (
        <>
            {detalleInicio()}
        </>
    )
}


