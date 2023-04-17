import { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Skeleton } from '@material-ui/lab';
import { useNavigate } from 'react-router-dom';
import { mensaje } from '../../../models/Mensaje';
import misBitacoras from '../../../services/Bitacora/misBitacoras';
import { roles } from '../../../enviroment/roles';
import TodasBitacoras from '../../../services/Bitacora/todasBitacoras copy';
import CantidadSolicitudesBitaLicencia from '../../../services/Solicitudes/CantidadSolicitudesBitaPorLicencia';
import { AxiosError } from 'axios';
import { environment } from '../../../enviroment/enviroment';



const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: '#007DC4',
            fontFamily: '"Montserrat", sans-serif',
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,

            maxWidth: 500,
            overflowWrap: 'break-word'
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

interface props {
    id: number;
    setChange: (value: boolean) => void;
}
export default function TableMiBitacora({ id, setChange }: props) {


    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [cambie, setCambie] = useState<boolean>(false);
    const [bit, setBitacora] = useState<any[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        async function loadDetails() {
            try {

                const response: any = await misBitacoras(id);
                try {

                    if (response.status === 200) {
                        setBitacora(response.data);

                        setLoading(false);
                    }
                    else {
                        setBitacora([]);
                    }


                } catch (error) {

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
        loadDetails();



    }, [setChange]);


    const fechas = (fecha: any) => {
        if (fecha != null) {
            const d = new Date(fecha)
            return (
                ('0' + (d.getDate())).slice(-2) +
                '/' + 
                ('0' + (d.getMonth() + 1)).slice(-2) + 
                '/' 
                + (d.getFullYear() + '').slice(-2) + 
                ' ' 
                +
                ('0' + (d.getHours())).slice(-2) + 
                ':'
                + 
                ('0' + (d.getMinutes())).slice(-2) + ' Hrs');
        } else {
            return ('')
        }

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
                                <StyledTableCell align="center">Fecha</StyledTableCell>
                                <StyledTableCell align="center">Observación</StyledTableCell>

                                <StyledTableCell align="center">Enviado por</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bit.map((row: any) => (
                                <StyledTableRow key={row.id} >
                                    <StyledTableCell align='center'>{fechas(row.fecha)}</StyledTableCell>
                                    <StyledTableCell align="center">{row.texto}</StyledTableCell>
                                    {row.remitente.username === localStorage.getItem('user') ?
                                        <StyledTableCell align="center">{row.remitente != null ? "Usted" : ""}</StyledTableCell>
                                        :
                                        <StyledTableCell align="center">{row.remitente != null ? row.remitente.nombre + ' ' + row.remitente.apellido : ""}</StyledTableCell>}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>)}
        </>
    );
}