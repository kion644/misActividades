import { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Skeleton } from '@material-ui/lab';
import registroDeHoras from '../../../services/RegistroDeHoras/registroDeHoras';
import { environment } from '../../../enviroment/enviroment';
import { useNavigate } from 'react-router-dom';

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
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
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
   
});

export default function CustomizedTables() {

    const anioMesDia = (fecha: any) => {
        const d = new Date(fecha);

        return (d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2))
    }
    const classes = useStyles();
    const [registroHora, setRegistroHora] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [cambie, SetCambie] = useState("");
    const navegate = useNavigate();
    useEffect(() => {

        loadDetails();


    }, [cambie]);
    async function loadDetails() {
        const response: any = await registroDeHoras(anioMesDia(new Date()));
        try {

            if (response.status === 200) {
                setRegistroHora(response.data);
                setLoading(false);
            }
            else if (response.status === 403) {
                localStorage.clear()
                sessionStorage.clear();
                window.location.reload();
                navegate(environment.LOGIN);
                window.location.replace('');
            } 
            else {
                setRegistroHora({});
            }


        } catch (error) {

        }

    }
    const fechas = (fecha: any) => {
        if (fecha != null) {
            const d = new Date(fecha);



            return ('0' + (d.getHours())).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2) + ' Hrs';
        } else {
            return ('')
        }

    }
    
    const estadoR = (estadoGeneral:string) => {
        if (estadoGeneral != "Abierto") {
          return(  <CheckCircleIcon className={classes.iconA} ></CheckCircleIcon>)
        } else {
           return( <ErrorIcon className={classes.iconE} ></ErrorIcon>)
        }
    }
    const filas = () => {

        return (

            registroHora.data.map((row: any) => (
                <StyledTableRow key={row.registroId} >
                    <StyledTableCell align='center'>{fechas(row.begin)}</StyledTableCell>
                    <StyledTableCell align="center">{fechas(row.end)}</StyledTableCell>
                    <StyledTableCell align="center">{row.horasRango}</StyledTableCell>
                    <StyledTableCell align="center">{row.proyectoText}</StyledTableCell>
                    <StyledTableCell align="center">{row.lugarTrabajo}</StyledTableCell>
                    <StyledTableCell align="center">{row.description}</StyledTableCell>
                    <StyledTableCell align="center">{estadoR(row.estadoGeneral)}</StyledTableCell>
                </StyledTableRow>

            )
            ));

    }
    return (
        <>
            {loading ? (
                <div>

                    <Skeleton variant="text" />
                    <Skeleton variant="rect" />
                    <Skeleton variant="rect" />
                </div>
            ) : (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Inicio</StyledTableCell>
                                <StyledTableCell align="center">Fin</StyledTableCell>
                                <StyledTableCell align="center">Horas</StyledTableCell>
                                <StyledTableCell align="center">Cliente/Proyecto</StyledTableCell>
                                <StyledTableCell align="center">Lugar de trabajo</StyledTableCell>
                                <StyledTableCell align="center">Descripcion</StyledTableCell>
                                <StyledTableCell align="center">Completada</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filas()}
                        </TableBody>
                    </Table>
                </TableContainer>)}
        </>
    );
}