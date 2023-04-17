import {
    makeStyles,
    Theme,
    createStyles
} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { useEffect, useState } from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import RegistroDeHoras from '../../../services/RegistroDeHoras/registroDeHoras';
import CambioInicio from '../../../services/CambioInicio/CambioInicio';
import { Alert } from '@material-ui/lab';
import { environment } from '../../../enviroment/enviroment';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { DateRange } from '@material-ui/icons';
import { ButtonDetails } from '../Buttons/Details/ButtonDetails';
import { TimerPickerUpdate } from '../Buttons/Pickers/TimerPickerUpdate';
import { TextBoxUpdate } from '../Inputs/TextBox/TextBoxUpdate';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        descripcion: {
            float: 'left',
            marginTop: '23px',
            width: '100%'
        },
        boton: {
            marginTop: '2%',
            marginRight: '2%',
            marginBottom: '2%',
            float: 'right',
            backgroundColor: '#007DC4',
            color: '#FFFFFF',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            fontFamily: '"Montserrat", sans-serif',
            '&:hover': {
                backgroundColor: '#F6921E'
            }
        },
        root: {
            backgroundColor: '#F6921E',
            fontFamily: '"Montserrat", sans-serif',
            width: '96%'
        },
        icon: {
            color: '#FFF',
            fontSize: '20px',
            marginTop: 'auto',
            marginBottom: 'auto',
            marginLeft: '2%',
            fontFamily: '"Montserrat", sans-serif',
        },

        secondaryHeading: {
            fontSize: theme.typography.pxToRem(18),
            backgroundColor: '#F6921E',
            color: "#fff",
            textAlign: 'center',
            fontFamily: '"Montserrat", sans-serif',
        },
        warning: {
            fontSize: theme.typography.pxToRem(18),
            backgroundColor: '#fff',
            color: "#F6921E",
            marginLeft: '26%',
            fontFamily: '"Montserrat", sans-serif',
        },
    }),
);

interface props {

    nexo: boolean;

    setNexo: (value: boolean) => void;

}

export const AccordionUpdate = ({ nexo, setNexo }: props) => {

    const fecha = (fecha: any) => {

        const d = new Date(fecha);

        return (d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2))

    }

    const classes = useStyles();

    const [descripcion, setDescripcion] = useState('')

    const [horaInicio, setHoraInicio] = useState('')

    const [inicio, setInicio] = useState<Date>(new Date())

    const [fin, setFin] = useState<Date>(new Date());

    const [inicioTemp, setInicioTemp] = useState<Date>(new Date());

    const [isLoading, setIsLoading] = useState(false);

    const [pendiente, setPendiente] = useState('');

    const [id, setId] = useState<number>(0);

    const [open, setOpen] = useState(false);

    const [openError, setOpenError] = useState(false);

    const [alertText, setAlertText] = useState('');

    const [isOptionInvalid, setIsOptionInvalid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        async function PrimerRegistro() {

            try {

                const responseRegistros: any = await RegistroDeHoras(fecha(new Date().toDateString()));

                if (responseRegistros.status == 200) {

                    const d = new Date(responseRegistros.data.data[0].begin);

                    const f = new Date(responseRegistros.data.data[0].end);

                    setId(responseRegistros.data.data[0].idRegistro);

                    setPendiente(responseRegistros.data.data[0].estadoRegistro);

                    setInicio(d);

                    setFin(f);

                    setHoraInicio(('0' + (d.getHours())).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2) + 'Hs');

                    setIsLoading(true)

                }
                else if (responseRegistros.status === 403) {
                    localStorage.clear()
                    sessionStorage.clear();
                    navigate(environment.LOGIN);
                    window.location.replace('');
                }

            } catch (error) {

                setHoraInicio('');

                setIsLoading(false)

            }

        }

        PrimerRegistro();

    }, [localStorage.getItem('Inicio')]);

    async function modificacion() {



        try {

            if (descripcion != '') {


                if (inicioTemp.getDay() == new Date().getDay()) {

                    if (inicioTemp.getTime() < new Date().getTime()) {

                        const response: any = await CambioInicio(id, inicioTemp, descripcion);

                        if (response.data.info.code == '200') {

                            setNexo(!nexo);

                            setOpen(true);

                            setAlertText('Pedido de cambio realizado')

                            setNexo(!nexo)

                        } else {

                            setAlertText('Error de envio');

                        }

                    } else{
                        setOpenError(true);
                        setAlertText("El horario solicitado está por delante de su inicio original")
                    }
                } else {
                    setOpenError(true);
                    setAlertText('La fecha solicitada no corresponde al día de hoy')
                }



            } else {

                setOpenError(true);

                setAlertText('Debe agregar una justifcación para poder realizar el pedido')

            }

        } catch (error) {

            const err = error as AxiosError
            if (err.response?.status === 403) {
                setOpenError(true);
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
                navigate(environment.LOGIN);
            }

        }

    }

    const isPendiente = () => {

        if (pendiente == 'Aceptado') {

            return (

                <AccordionDetails className={classes.warning} >

                    <Typography>

                        Su pedido de cambio ya fue aceptado

                    </Typography>

                </AccordionDetails>

            )

        }

        if (pendiente == 'Rechazado') {

            return (

                <AccordionDetails className={classes.warning} >

                    <Typography>

                        Su pedido de cambio fue Rechazado

                    </Typography>

                </AccordionDetails>

            )

        }

        if (pendiente == 'Pendiente') {

            return (

                <AccordionDetails className={classes.warning} >

                    <Typography>

                        Ya tiene un pedido de cambio de inicio

                    </Typography>

                </AccordionDetails>

            )

        } else {

            return (<>

                <Grid container>

                    <Grid item xs={4} sm={4}>

                        <AccordionDetails >

                            <TimerPickerUpdate

                                setOpenError={setOpenError}

                                setAlertText={setAlertText}

                                setIsOptionInvalid={setIsOptionInvalid}

                                inicio={inicio}

                                fin={fin}

                                setInicio={setInicioTemp}

                            ></TimerPickerUpdate>

                        </AccordionDetails>

                    </Grid>

                    <Grid item xs={6} sm={8} className={classes.descripcion}>

                        <TextBoxUpdate text={descripcion} setText={setDescripcion} />

                    </Grid>

                </Grid>

                <Grid container>

                    <Grid item xs={12} sm={12}>

                        <ButtonDetails

                            estilo={classes.boton}

                            text={'Solicitar Cambio'}

                            disabled={isOptionInvalid}

                            onClick={modificacion}

                        ></ButtonDetails>

                    </Grid>

                </Grid>

            </>

            )

        }

    }

    const detalleInicio = () => {

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

                            <Grid item xs={12} sm={12} className={classes.secondaryHeading}>

                                Inicio de actividades a las {horaInicio}

                                <EditIcon className={classes.icon}></EditIcon>

                            </Grid>

                        </Grid>

                    </AccordionSummary>

                    {isLoading ? (

                        isPendiente()

                    ) : (

                        null

                    )}

                </Accordion>

            </div>

        )

    }

    const handleClose = () => {

        setOpen(false);

        setOpenError(false);

    };

    return (

        <>

            {detalleInicio()}

            <div>

                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>

                    <Alert onClose={handleClose} severity="success">

                        {alertText}

                    </Alert>

                </Snackbar>

                <Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>

                    <Alert onClose={handleClose} severity="error">

                        {alertText}

                    </Alert>

                </Snackbar>

            </div>


        </>

    )

}
