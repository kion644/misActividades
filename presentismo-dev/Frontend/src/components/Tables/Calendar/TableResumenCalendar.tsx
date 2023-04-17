import { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Skeleton } from '@material-ui/lab';
import { Grid, Table, TableBody, TableContainer, TableHead, TablePagination, Typography } from '@material-ui/core';
import Subditos from '../../../services/Subditos/Subditos';

import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import ClienteProyecto from '../../../services/ClienteProyecto/ClienteProyecto';
import HorasTrabajas from '../../../services/FiltroHorasTrabajadas/HorasTrabajas';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import HorasTrabajadasXDia from '../../../services/FiltroHorasTrabajadas/HorasTrabajadasXDia';

import { SumarDias } from '../../../function/SumarDias';
import { fechaConsulta } from '../../../function/fechaConsulta';
import { environment } from '../../../enviroment/enviroment';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Box } from '@mui/material';
import { AccordionReportDay } from '../../SmallerComponents/Accordions/AccordionReportDay';
import CalendarTwo from '../../SmallerComponents/Buttons/Pickers/CalendarTwo';
import CalendarTwoHasta from '../../SmallerComponents/Buttons/Pickers/CalendarTwoHasta';
import { ButtonFindCalendar } from '../../SmallerComponents/Buttons/Primary/ButtonFindCalendar';
import { SelectSubditos } from '../../SmallerComponents/Select/SelectSubditos';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: '#007DC4',
            fontFamily: '"Montserrat", sans-serif',
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {

        },
    }),
)(TableRow);


const useStyles = makeStyles({
    date: {
        display: "flex",
        alignItems: "center"
    },
    firstRow: {
        fontWeight: "bold",
        background: "#ffb056"
    },
    info: {
        height: '50%',
        paddingBottom: '3px'
    },
    head: {
        backgroundColor: '#007DC4',
        color: '#fff',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: '"Montserrat", sans-serif',
        fontSize: 26,
        marginBottom: 20
    },
    paper: {
        backgroundColor: '#007DC4',
        height: '100px',
    },
    bottonBuscar: {
        padding: '20px',
        float: "right"
    },
    clock: {
        marginLeft: '2%'
    },

    horas: {
        alignItems: "left"
    },
    resumen: {
        marginTop: "10px"
    },
    tableBody:{
        paddingTop:'100px',
        backgroundColor:'#FFF'

    },

});

export default function CustomizedTables() {
    const fecha = (fecha: any) => {
        const d = new Date(fecha);

        return (d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2))
    }

    const classes = useStyles();
    const [registroHora, setRegistroHora] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [desde, setdesde] = useState(fecha(new Date()));
    const [hasta, setHasta] = useState(fecha(new Date()));
    const [dateDesde, setDateDesde] = useState(new Date());
    const [dateHasta, setDateHasta] = useState(new Date());
    const [text, setText] = useState<any>(localStorage.getItem("user"));
    const [proyecto, setProyecto] = useState("");
    const [subditos, setSubditos] = useState<any>(null);
    const [proyectos, setProyectos] = useState<any>(null);
    const [consulta, setConsulta] = useState(true);
    const [botonbuscar, setBotonBuscar] = useState(false);
    const [horas, setHoras] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [xdia, setXDia] = useState<any>(null);
    const [rowsPerPage, setRowsPerPage] = useState(31)
    const [page, setPage] = useState(0);

    const [hasPeopleInCharge, setHasPeopleInCharge] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function SubditosBox() {
            const response1: any = await Subditos();
            try {

                if (response1.status === 200) {

                    setSubditos(response1.data.data);
                    ProyectosBox();
                } 
                else if (response1.status === 403) {
                    localStorage.clear()
                    sessionStorage.clear();
                    
                    navigate(environment.LOGIN);
                    window.location.replace('');
                }
                else {
                    setSubditos({});
                }


            } catch (error) {

            }

        }
        SubditosBox();
    }, []);





    async function ProyectosBox() {

        
        try {
            const response: any = await ClienteProyecto(localStorage.getItem('user'))


            if (response.status === 200) {


                setProyectos(response.data.data)
                setLoading(false);

            } 
            else if (response.status === 403) {
                localStorage.clear()
                sessionStorage.clear();
                navigate(environment.LOGIN);
                window.location.replace('');
            } 
            else {
                setProyectos({});
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

    async function loadDetails() {

        setHasPeopleInCharge(subditos.length > 1 ? true : false);
        setConsulta(true);
        setBotonBuscar(true);
        try {

            const response1: any = await HorasTrabajas(fechaConsulta(dateDesde), fechaConsulta(dateHasta), text)
            const response2: any = await HorasTrabajadasXDia(fechaConsulta(dateDesde), fechaConsulta(dateHasta), text)
    

            if (response1.status === 200 && response2.status === 200) {

                if(response1.data.data.hours != null || response1.data.data.minutes != null){
                    setHoras(response1.data.data.hours);
                    setMinutos(response1.data.data.minutes);
                }
                else{
                    setHoras(0);
                    setMinutos(0);
                }
                
                setXDia(response2.data.data)
                setConsulta(false);
                setBotonBuscar(false);
            } 
            else if (response1.status === 403) {
                localStorage.clear();
                sessionStorage.clear();
                navigate(environment.LOGIN);
                window.location.replace('');
            }
            else {
                setRegistroHora({});
                setSubditos({});
                setHoras(0);
                setMinutos(0);
            }


        } catch (error) {
            setBotonBuscar(false);
            const err = error as AxiosError
            if (err.response?.status === 403) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
            navigate(environment.LOGIN);
            }
        }

    }
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const formatoFecha = (xfecha: string) => {


        const hoy = new Date(xfecha)
       
        const fecha = (('0' + (hoy.getUTCDate())).slice(-2) + ' de ' + hoy.toLocaleString("es-ES", { month: "long" }) + ' del ' + hoy.getFullYear());
        // const fecha = (('0' + (hoy.getUTCDate())).slice(-2) + '/' + ('0' + (hoy.getUTCMonth() + 1)).slice(-2)) + '/' + hoy.getFullYear();
        return fecha

    };

    const horastime = () => {
       if(horas != null || minutos != null){
        let totalHoras: string = horas < 10 ? '0' + horas.toString() : horas.toString();
        let totalMinutos: string = minutos < 10 ? '0' + minutos.toString() : minutos.toString();
        return (totalHoras + ':' + totalMinutos);

       }
       else{
        return ""
       }

    }

    const getBoolean = (asd: string) =>{
        if (asd === "true") return true;
        else return false;
    }



    return (
        <>
            {loading ? (
                <div>

                    <Skeleton variant="text" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                </div>
            ) : (<>

                <Grid container className={classes.date}>
                    <Grid item xs={12} sm={2} >
                        {/* <SelectProyectos text={"Proyectos"} subText={""} data={proyectos} setText={setProyecto} ></SelectProyectos> */}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <SelectSubditos text={"Usuarios"} subText={""} data={subditos} setText={setText} ></SelectSubditos>
                    </Grid>
                    <Grid item xs={12} sm={2} className={classes.clock}>
                        <CalendarTwo setDate={setDateDesde} title={"Desde"}></CalendarTwo>
                    </Grid>
                    <Grid item xs={12} sm={2} className={classes.clock}>
                        <CalendarTwoHasta setDate={setDateHasta} title={"Hasta"} minDate={dateDesde}></CalendarTwoHasta>
                    </Grid>
                    <Grid item xs={12} sm={3} className={classes.bottonBuscar}>
                        <ButtonFindCalendar text={"Buscar"} disabled={botonbuscar} onClick={() => loadDetails()}></ButtonFindCalendar>
                    </Grid>

                </Grid>
                <Grid container className={classes.resumen}>
                    {!consulta ? (

                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <Typography className={classes.head}>
                                            <Grid container direction="row"
                                                justifyContent="space-between"
                                                alignItems="center">
                                                    <Box sx={{pl: 3, p: 2}}>
                                                        <CalendarTodayIcon /> {dateDesde.getUTCDate().toString() + "/"  + (dateDesde.getUTCMonth() + 1) + "/" + dateDesde.getUTCFullYear().toString()} {"    al    " + dateHasta.getUTCDate().toString() + "/"  + (dateHasta.getUTCMonth() + 1 ) + "/" + dateHasta.getUTCFullYear().toString()} 

                                                    </Box>
                                                    <Box sx={{pr: 3, p: 2}}>
                                                     <AccessTimeIcon /> {horastime()}
                                                    </Box>
                                            </Grid>
                                        </Typography>
                                        {/* <StyledTableCell align="center">Licencia por</StyledTableCell> */}
                                    </TableRow>
                                </TableHead>
                                    <TableBody className={classes.tableBody} >
                                        {xdia.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((a: any) =>
                                                <StyledTableRow key={a.registroId} >
                                                    {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}> */}
                                                    <AccordionReportDay date={a.date} user={a.usuario} hours={a.hours} minutes={a.minutes} requiereAtencion={getBoolean(a.requiereAtencion)} hasPeopleInCharge={hasPeopleInCharge}/>
                                                    {/* </Grid> */}
                                                </StyledTableRow>
                                        
                                        )}
                                    </TableBody>
                               
                            </Table>
                            <TablePagination
                                component="div"
                                count={xdia.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                nextIconButtonText={'sig'}
                                labelRowsPerPage={'Filas por página: '}
                            />

                        </TableContainer>

                    ) : (null)}
                </Grid>

            </>
            )
            }
        </>
    );
}