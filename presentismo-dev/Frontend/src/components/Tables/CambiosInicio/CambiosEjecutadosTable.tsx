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
import estadosFinalizados from '../../../services/CambioInicio/estadosFinalizados';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';
import '../../../App.css';
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

    const navigate = useNavigate();

    useEffect(() => {

        async function loadDetails() {

            try {

                const response: any = await estadosFinalizados()

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
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.reload();
                    navigate(environment.LOGIN);
                }
        
            }

        }

        loadDetails();
       
    }, []);


//FUNCION QUE DADA UNA HORA LA FORMATEA A 04:04
    const horas = (fecha: any) => {

        const d = new Date(fecha);

        return ('0' + (d.getHours())).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2);

    }

//FUNCION QUE DADA UNA FECHA DEVUELVE EN FORMATO 2022-12-02
    const anioMesDia = (fecha: any) => {

        const d = new Date(fecha);

        return (d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2))

    }
// FUNCION QUE DEVUELVE LAS FILAS FORMATEADAS PARA LLENAR LA TABLA
    const filas = () => {

        return (

            registroHora.data.map((row: any) => (

                <StyledTableRow key={row.registroId} >

                    <StyledTableCell align="center">{row.user}</StyledTableCell>

                    <StyledTableCell align='center'> {anioMesDia(row.begin)}  </StyledTableCell>

                    <StyledTableCell align="center">{horas(row.beginChange) + ' Hrs'}</StyledTableCell>

                    <StyledTableCell align="center">{horas(row.begin) + ' Hrs'}</StyledTableCell>

                    <StyledTableCell align="center">{row.justification}</StyledTableCell>

                    <StyledTableCell align="center" >{row.estadoRegistro}</StyledTableCell>

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
            field: 'beginChange',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Hora De Inicio',         
            sortable: true,
            
            renderCell: ({row}): any =>{
               
                return horas(row.beginChange) + 'Hrs';
            },
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            
        },
        {
            field: 'begin',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Hora de cambio solicitada',         
            sortable: true,
            
            renderCell: ({row}): any =>{
               
                return horas(row.begin);
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
            field: 'estadoRegistro',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Estado',         
            sortable: true,
            
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

            ) : (
                //TABLA
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
                )}

        </>

    );

}