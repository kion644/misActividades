import { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Alert, Skeleton } from '@material-ui/lab';
import estadoPendientes from '../../../services/CambioInicio/estadoPendientes';
import { Snackbar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';
import { AxiosError } from 'axios';
import { environment } from '../../../enviroment/enviroment';
import CantidadSolicitudes from '../../../services/Solicitudes/CantidadSolicitudes';
import { roles } from '../../../enviroment/roles';
import { ButtonGroupLeader } from '../../SmallerComponents/Buttons/Group/ButtonGroupLeader';


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

    button: {

        color: '#fff',

        backgroundColor: '#007DC4',

        '&:hover': {

            backgroundColor: '#F6921E'

        }

    },

});


export default function CustomizedTables() {

    const classes = useStyles();

    const [registroHora, setRegistroHora] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    const [refrescar, setRefrescar] = useState(false)

    const [actualizar, setActualizar] = useState(false);

    const [open, setOpen] = useState(false);

    const [openError, setOpenError] = useState(false);

    const [message, setMessage] = useState("")

    const navigate = useNavigate();

    const handleClose = () => {

        setOpen(false)

        setOpenError(false)

        setActualizar(!actualizar)

        setRefrescar(!refrescar)

    };
    useEffect(() => {
        async function Cantidad() {
          if (localStorage.getItem("301") == roles.ROLLIDER) {
            const response: any = await CantidadSolicitudes();
            if (response.status === 200) {
              localStorage.setItem("Solicitudes", response.data.data.Solicitudes);
              // if (localStorage.getItem("Solicitudes") != "0"){
              //   audio.play();
              // }
            }
          }
        }
        Cantidad();
      }, [refrescar]);

    useEffect(() => {

        async function loadDetails() {

        try {

            const response: any = await estadoPendientes()

            try {

                if (response.status === 200) {

                    setRegistroHora(response.data);

                    setLoading(false);

                }

                else {

                    setRegistroHora({});
                }


            } catch (error) {

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

        loadDetails();

    }, [actualizar]);

    const fechas = (fecha: any) => {

        const d = new Date(fecha);

        return ('0' + (d.getHours())).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2);

    }

    const anioMesDia = (fecha: any) => {

        const d = new Date(fecha);

        return (d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2))

    }

    const filas = () => {

        return (

            registroHora.data.map((row: any) => (

                <StyledTableRow key={row.registroId} >

                    <StyledTableCell align="center">{row.user}</StyledTableCell>

                    <StyledTableCell align='center'>{anioMesDia(row.begin)} </StyledTableCell>

                    <StyledTableCell align="center">{fechas(row.begin) + ' Hrs'}</StyledTableCell>

                    <StyledTableCell align="center">{fechas(row.beginChange)}</StyledTableCell>

                    <StyledTableCell align="center">{row.justification}</StyledTableCell>

                    <StyledTableCell align="center">

                        <ButtonGroupLeader

                            id={row.registroId}

                            setOpen={setOpen}

                            setOpenError={setOpenError}

                            setMessage={setMessage}

                        ></ButtonGroupLeader>

                    </StyledTableCell>

                </StyledTableRow>

            )

            ));

    }

    const columns : GridColDef[] = [
        
        
        {
            field: 'user',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Usuario',         
            sortable: true,
           
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'fecha',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Fecha',         
            sortable: true,
           
            renderCell: ({row}): any =>{
               
                return anioMesDia(row.begin);
            },
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'begin',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Hora De Inicio',         
            sortable: true,
           
            renderCell: ({row}): any =>{
               
                return fechas(row.begin) + 'Hrs';
            },
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            
        },
        {
            field: 'beginChange',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Hora de inicio a aprobar',         
            sortable: true,
           
            renderCell: ({row}): any =>{
               
                return fechas(row.beginChange);
            },
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'justification',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Justificación',         
            sortable: true,
           
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'action',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Acción',         
            sortable: true,
           
            renderCell: ({row}): any => {

                return <ButtonGroupLeader

                            id={row.registroId}

                            setOpen={setOpen}

                            setOpenError={setOpenError}

                            setMessage={setMessage}

                        ></ButtonGroupLeader>

            },
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        
    ]

    return (

        <>

            {loading ? (

                <div>

                    <Skeleton variant="text" />

                    <Skeleton variant="rect" />

                    <Skeleton variant="rect" />

                </div>

            ) : (<>

            <div style={{ display: 'flex', width: '100%'}}>
                    <div style={{height: 400, width: '100%',}}>
                    
                    <DataGrid sx={{
                         width: '100%', 
                         mx:'auto', 
                         p:1, 
                         m:1,
                         borderRadius: 2, 
                         borderColor:"#007DD1", 
                         tableLayout: "fixed",
                         overflowWrap: "break-word",
                         display: 'flex',
                         justifyContent: 'center',
                         alignContent:'center',
                         '& .super-app-theme--header':{
                            backgroundColor: '#007DC4',
                            color: 'white',
                            width: '100%'
                         }
                    }}
                rows={registroHora.data}
                columns={columns}
                getRowId={(r) => r.registroId}
                pageSize={5}
                rowSpacingType='margin'
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                
                />
                </div>
                </div>

                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} >

                    <Alert onClose={handleClose} severity="success">

                        {message}

                    </Alert>

                </Snackbar>

                <Snackbar open={openError} autoHideDuration={4000} onClose={handleClose} >

                    <Alert onClose={handleClose} severity="error">

                        {message}

                    </Alert>

                </Snackbar>

            </>)

            }

        </>

    );

}