import {
    makeStyles,
    Theme,
    createStyles,
    withStyles
} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Paper, TablePagination, TableFooter, Icon, Snackbar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import RegistroDeHorasRangos from '../../../services/ConsultaCaliendario/RegistroHoraRangos';
import { formatoFecha } from '../../../function/formatoFecha';
import { environment } from '../../../enviroment/enviroment';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Alert, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Box } from '@mui/system';
import ReportIcon from '@mui/icons-material/Report'
import { EditRegistroButton } from '../Buttons/EditRegistroButton';
import DialogEditRegistro from '../../Dialog/Calendar/DialogEditRegistro';


const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: '#007DC4',
            fontFamily: '"Montserrat", sans-serif',
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 16,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: "#d8d8d8",
            },
            '&:nth-of-type(even)': {
                backgroundColor: "#b8b8b8",
            },
        },
    }),
)(TableRow);
interface prop {
    date: string;
    user: string;
    hours: string;
    minutes: string;
    requiereAtencion: boolean;
    hasPeopleInCharge: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: "bold",
            margin: "2px"
        },
        detailsNull: {
            color: '#F6921E',
            fontFamily: '"Montserrat", sans-serif',
            alignItems: 'center',
            backGround: "#fff"

        },
        flecha: {
            background: "#51a7d6",
        },
        redFlecha: {
            backgroundColor: "#db3535"
        },
        titleRow: {
            color: "#fff",
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        tableHead: {
            fontSize: 18,

        },
    }),
);

export const AccordionReportDay = ({ date, user, hours, minutes, requiereAtencion, hasPeopleInCharge }: prop) => {

    const classes = useStyles();
    const [registroHora, setRegistroHora] = useState<any>([]);
    const [horas, setHoras] = useState("");
    const navigate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = useState(30)
    const [page, setPage] = useState(0);
    const [consulta, setConsulta] = useState(true);
    const [popUpEdit, setPopUpEdit] = useState(false);
    const [id, setId] = useState(0);
    const [cerrar, setCerrar] = useState(false);

    const [rh, setRh] = useState<any>();

    const [openSnackError, setOpenSnackError] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [message, setMessage] = useState("");

    
    const handleSnackClose = () => {

        setOpenSnackError(false);
        setOpenSnack(false);
    };

    const [nexo, setNexo] = useState(false);
    const formatoHoraString = (fecha: any) => {
        if (fecha != null) {
            const d = new Date(fecha);
            return ('0' + (d.getHours())).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2) + ' Hrs';
        } else {
            return ('')
        }


    }
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const stringHorasMinutos = (hora: string, minutos: string) => {
        if (horas != null) {
            return (('0' + hora).slice(-2) + ':' + ('0' + minutos).slice(-2) + ' Hrs');
        } else {
            return ('')
        }

    }

    useEffect(() => {
        setNexo(false);
        async function loadDetails() {
            setConsulta(true);
            try {
                const response: any = await RegistroDeHorasRangos(date, date, user);

                if (response.status === 200) {
                    setRegistroHora(response.data);

                }
                // else if (response.status === 403) {
                //     localStorage.clear()
                //     sessionStorage.clear();
                //     navegate(environment.LOGIN);
                //     window.location.replace('');
                // }
                else {
                    setRegistroHora({});
                }
                setConsulta(false)
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
        loadDetails()
    }, [date, nexo])

    const editPopUp = (rh: any) => {
        setRh(rh);
        setPopUpEdit(true);
        setCerrar(false);

    }


    const popUp = () => {
        if (popUpEdit && !cerrar) {
            return (
                <DialogEditRegistro user={user} setCerrar={setCerrar} id={id} rh={rh} setNexo={setNexo} 
                setOpenSnack={setOpenSnack} setOpenSnackError={setOpenSnackError}
                setMessage={setMessage}
                ></DialogEditRegistro>
            )
        }
    }

    const rows = (rh: any) => {
        if (rh.estadoRegistroHora != "PROCESADO") {
            if (rh.fin != null && formatoFecha(rh.inicio) != formatoFecha(new Date().toString())) {
                return (
                    <StyledTableRow key={rh.id}>
                        <StyledTableCell align='center'>{rh.usuario.username}</StyledTableCell>
                        <StyledTableCell align='center'>{formatoHoraString(rh.inicio)}</StyledTableCell>
                        <StyledTableCell align="center">{formatoHoraString(rh.fin)}</StyledTableCell>
                        <StyledTableCell align="center">{rh.fin != null ? Math.floor((new Date(rh.fin).getTime() - new Date(rh.inicio).getTime()) / (1000 * 60 * 60)).toString().padStart(2, "0") + ':' + Math.floor((new Date(rh.fin).getTime() - new Date(rh.inicio).getTime()) / (1000 * 60) % 60).toString().padStart(2, "0") : ""}</StyledTableCell>
                        <StyledTableCell align="center">{rh.fase != null ? rh.fase.proyecto.nombre + ' / ' + rh.fase.nombre : ""}</StyledTableCell>
                        <StyledTableCell align="center">{rh.fase != null ? rh.fase.proyecto.cliente.nombre : ""}</StyledTableCell>
                        <StyledTableCell align="center">{rh.lugarTrabajo != null ? rh.lugarTrabajo.nombre : ""}</StyledTableCell>
                        <StyledTableCell align="center">{rh.descripcion}</StyledTableCell>
                        <StyledTableCell align='center'>{rh.tipoHora.nombre == "Pausa" ? "Pausa" : <EditRegistroButton onClick={() => editPopUp(rh)}></EditRegistroButton>}</StyledTableCell>
                    </StyledTableRow>
                )
            }
            else {
                return (

                    <StyledTableRow key={rh.id}>
                        <StyledTableCell align='center'>{rh.usuario.username}</StyledTableCell>
                        <StyledTableCell align='center'>{formatoHoraString(rh.inicio)}</StyledTableCell>
                        <StyledTableCell align="center">{formatoHoraString(rh.fin)}</StyledTableCell>
                        <StyledTableCell align="center">{rh.fin != null ? Math.floor((new Date(rh.fin).getTime() - new Date(rh.inicio).getTime()) / (1000 * 60 * 60)).toString().padStart(2, "0") + ':' + Math.floor((new Date(rh.fin).getTime() - new Date(rh.inicio).getTime()) / (1000 * 60) % 60).toString().padStart(2, "0") : ""}</StyledTableCell>
                        <StyledTableCell align="center">{rh.fase != null ? rh.fase.proyecto.nombre + ' / ' + rh.fase.nombre : ""}</StyledTableCell>
                        <StyledTableCell align="center">{rh.fase != null ? rh.fase.proyecto.cliente.nombre : ""}</StyledTableCell>
                        <StyledTableCell align="center">{rh.lugarTrabajo != null ? rh.lugarTrabajo.nombre : ""}</StyledTableCell>
                        <StyledTableCell align="center">{rh.descripcion}</StyledTableCell>
                        <StyledTableCell align='center'>{rh.tipoHora.nombre == "Pausa" ? "Pausa" : "Registro actual"}</StyledTableCell>
                    </StyledTableRow>

                )
            }
        }






        else {
            return (

                <StyledTableRow key={rh.id}>
                    <StyledTableCell align='center'>{rh.usuario.username}</StyledTableCell>
                    <StyledTableCell align='center'>{formatoHoraString(rh.inicio)}</StyledTableCell>
                    <StyledTableCell align="center">{formatoHoraString(rh.fin)}</StyledTableCell>
                    <StyledTableCell align="center">{rh.fin != null ? Math.floor((new Date(rh.fin).getTime() - new Date(rh.inicio).getTime()) / (1000 * 60 * 60)).toString().padStart(2, "0") + ':' + Math.floor((new Date(rh.fin).getTime() - new Date(rh.inicio).getTime()) / (1000 * 60) % 60).toString().padStart(2, "0") : ""}</StyledTableCell>
                    <StyledTableCell align="center">{rh.fase != null ? rh.fase.proyecto.nombre + ' / ' + rh.fase.nombre : ""}</StyledTableCell>
                    <StyledTableCell align="center">{rh.fase != null ? rh.fase.proyecto.cliente.nombre : ""}</StyledTableCell>
                    <StyledTableCell align="center">{rh.lugarTrabajo != null ? rh.lugarTrabajo.nombre : ""}</StyledTableCell>
                    <StyledTableCell align="center">{rh.descripcion}</StyledTableCell>
                    <StyledTableCell align='center'>{
                        rh.tipoHora.nombre == "Pausa" ? "Pausa" : "Editar en TimeSheet"
                    }</StyledTableCell>
                </StyledTableRow>

            )
        }
    }

    const detalleInicio = () => {
        return (
            <Grid container >
                <Grid xs={12} sm={12} md={12} lg={12} xl={12} className={classes.root}>
                    <Accordion className={requiereAtencion? classes.redFlecha : classes.flecha}>
                        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" >
                            <Typography className={classes.titleRow}>
                                <div>
                                    {requiereAtencion && <ReportIcon />}
                                    { " " + formatoFecha(date)}
                                </div>
                                <div>
                                    {stringHorasMinutos(hours, minutes)}
                                </div>    
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails className={classes.detailsNull}>
                            <Grid item xs={12}>
                                {!consulta ?
                                    (
                                        <TableContainer>
                                            <Table aria-label="customized table">
                                                <TableHead >
                                                    <TableRow >
                                                        <StyledTableCell align="center" className={classes.tableHead}>Usuario</StyledTableCell>
                                                        <StyledTableCell align="center" className={classes.tableHead}>Inicio</StyledTableCell>
                                                        <StyledTableCell align="center" className={classes.tableHead}>Fin</StyledTableCell>
                                                        <StyledTableCell align="center" className={classes.tableHead}>Horas</StyledTableCell>
                                                        <StyledTableCell align="center" className={classes.tableHead}>Proyecto/Fase</StyledTableCell>
                                                        <StyledTableCell align="center" className={classes.tableHead}>Cliente</StyledTableCell>
                                                        <StyledTableCell align="center" className={classes.tableHead}>Lugar de trabajo</StyledTableCell>
                                                        <StyledTableCell align="center" className={classes.tableHead}>Descripcion</StyledTableCell>
                                                        <StyledTableCell align="center" className={classes.tableHead}>Pedido de edición</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {registroHora.map((rh: any) => (
                                                        rows(rh)
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    ) : (
                                        <div>

                                            <Skeleton variant="text" />
                                            <Skeleton variant="rectangular" />
                                            <Skeleton variant="rectangular" />
                                        </div>
                                    )}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        )

    }

    return (
        <>
            {detalleInicio()}
            {popUp()}

            <Snackbar open={openSnack} autoHideDuration={4000} onClose={handleSnackClose} >
                        <Alert onClose={handleSnackClose} severity="success">
                            {message}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openSnackError} autoHideDuration={4000} onClose={handleSnackClose} >
                        <Alert onClose={handleSnackClose} severity="error">
                            {message}
                        </Alert>
                    </Snackbar>

        </>
    )
}


