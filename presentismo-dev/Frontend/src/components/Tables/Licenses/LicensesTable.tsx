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
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { Badge, Slide, Snackbar, TablePagination, Tooltip } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import theme from '../../../theme/themeConfig';
import obtenerMisLicencias from '../../../services/Licencias/obtenerMisLicencias';
import { licencias } from '../../../models/Licencias';
import { formatoFecha } from '../../../function/formatoFecha';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { TransitionProps } from '@material-ui/core/transitions';
import descargaArchivo from '../../../services/Licencias/descargarArchivo';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { upLoadFile } from '../../../function/upLoadFile';
import obtenerInformacionLicencia from '../../../services/Licencias/obtenerInformacionLicencia';
import { comboLicencia } from '../../../models/comboLicencia';
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import CantidadSolicitudesBitaLicencia from '../../../services/Solicitudes/CantidadSolicitudesBitaPorLicencia';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DialogNewBitacora from '../../Dialog/Bitacora/DialogNewBitacora';
import DialogViewMiBitacora from '../../Dialog/Bitacora/DialogViewMiBitacora';
import { IconButtonView } from '../../SmallerComponents/Buttons/IconButton/IconButtonView';
import { IconButtonViewNotification } from '../../SmallerComponents/Buttons/IconButton/IconButtonViewNotification';

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
    colorDesaprobado: {
        color: '#FB0000'
    },
    colorAprobado: {
        color: '#00c109'
    },
    colorPendiente: {
        color: '#F6C32C'
    },
    colorPendienteAtencion: {
        color: '#F6C32C'
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
});

export default function LicensesTable() {
    const classes = useStyles();
    const [registroHora, setRegistroHora] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [icono, setIcono] = useState<any>();
    const [rowsPerPage, setRowsPerPage] = useState(20)
    const [page, setPage] = useState(0);
    const [data, setData] = useState<licencias[]>([]);
    const [popUpNew, setPopUpNew] = useState(false);
    const [popUpVeiw, setPopUpVeiw] = useState(false);
    const [id, setId] = useState(0)
    const [file, setFile] = useState<FormData>();
    // const [archvio, setArchivo] = useState(new File())
    const [label, setLabel] = useState('')
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [idTemp, setIdTemp] = useState('');
    const [cargo, setCargo] = useState(false);
    const [idUser,setIdUser] = useState(0);
    const [change, setChange] = useState(false);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

        setRowsPerPage(+event.target.value);
        setPage(0);

    };
  

    async function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {

        if (e.target.files?.length) {
           
            setOpen(true)
            setMensaje('Cargando el archivo ..... ')
            upLoadFile(e.target.files[0], idTemp, setMensaje, setOpenError, setOpen, setCargo)
        } else {
            setOpenError(true)
            setMensaje('Error al cargar el Archivo')
        }

    }

    useEffect(() => {
        setLoading(false);
        setCargo(false)
        async function loadDetails() {
            const response: any = await obtenerMisLicencias()
            try {
                if (response.status === 200) {
                    setData(response.data);
                    setLoading(false);
                    
                }
                else {
                    setRegistroHora({});
                }
            } catch (error) {

            }

             

        }
        loadDetails();

    }, [cargo]);

 


    async function bajar(id: string) {

       
        const response1: any = await descargaArchivo(id)
        setMensaje("La descarga comenzara en segundo")

        // if(response1.status === 200){
        //     setMensaje("Descarga exitosa");
        // }
        // else{
        //     setMensaje("Hubo un error al descargar");
        // }
    
                

    }





    const popUpBitacoraNew = () => {
        if (popUpNew === true) {
            return (
                <DialogNewBitacora setCerrar={setPopUpNew} 
                id={id} setOpen={setOpen} 
                setOpenError={setOpenError}
                setMessage={setMensaje}
                setChange={setC}
                ></DialogNewBitacora>
            )
        }
    }

    const handleClose = () => {
        setOpen(false);
        setOpenError(false);

    };

    const estado = (estado: string) => {

        switch (estado) {
            case 'ACEPTADA':

                return (
                    <Tooltip title={"Aprobado"} placement='right'>
                        <CheckCircleOutlineIcon className={classes.colorAprobado}></CheckCircleOutlineIcon>
                    </Tooltip>
                )

            case 'RECHAZADA':

                return (
                    <Tooltip title={"Desaprobado"} placement='right'>
                        <CancelIcon className={classes.colorDesaprobado}></CancelIcon>
                    </Tooltip>)

            case 'PENDIENTE_APROBACION_LIDER':

                return (
                    <Tooltip title={"Pendiente de aprobación por el líder"} placement='right'>
                        <AccessAlarmIcon className={classes.colorPendiente}></AccessAlarmIcon>
                    </Tooltip>)

            default:
                return (
                    <Tooltip title={"Aprobado por el Líder, Pendiente de aprobacion de atención"} placement='right'>
                        <SupervisorAccountIcon className={classes.colorPendiente} />
                    </Tooltip>
                )

        }


    }

    function TransitionUp(props: TransitionProps) {
        return <Slide {...props} direction="up" />;
    }



    const descarga = (adjunto: boolean, id: string) => {
        if (adjunto === true) {
            return (
                <Tooltip title={"Descargar archivo"} placement='right'>
                    <CloudDownloadIcon color={'primary'} onClick={() => { bajar(id) }} ></CloudDownloadIcon>
                </Tooltip>
            )
        } else {
            return (

                <div className={classes.root}>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        onChange={changeHandler}
                    />
                    <label htmlFor="contained-button-file">
                        <Tooltip title={"Clic para adjuntar archivo"} placement='right'>
                            <AttachFileIcon color={'primary'} onClick={() => { setIdTemp(id) }} ></AttachFileIcon>
                        </Tooltip>
                    </label>
                </div>
            )
        }


    }


        async function loadDetails() {
            
            const response: any = await obtenerInformacionLicencia(id);
            
            try {

                if (response.status === 200) {
                    response.data.data.array.forEach((element:comboLicencia) => {
                        if(element.nombreUsuario==localStorage.getItem('user')){
                            setIdUser(element.idDeUsuario)
                        }
                        
                    });
                }
               


            } catch (error) {

            }
      
        }
       

    const setN = () => {
        setPopUpNew(true)
    }

    const setC = () => {
        setChange(true);
    }

    const popUpBitacoraVeiw = () => {
        if (popUpVeiw === true) {
            loadDetails();
            return (
                <DialogViewMiBitacora setCerrar={setPopUpVeiw} newBitacora={setN} id={id} idUser={idUser} setChange={setC}></DialogViewMiBitacora>
            )
        }
    }
    const setV = (id: number) => {
       
        setPopUpVeiw(true);
        setId(id);
        
    }


    const columns : GridColDef[] = [
        
        
        {
            field: 'nombre',
            headerName: 'Licencia por',
            headerClassName: 'super-app-theme--header',

            sortable: true,
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'fecha_creacion',
            headerName: 'Fecha de solicitud',
            headerClassName: 'super-app-theme--header',         
            sortable: true,
            renderCell: ({row}): any =>{
               
                return new Date(row.fecha_creacion).toLocaleDateString();
            },
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'fechaDesde',
            headerName: 'Desde',
            headerClassName: 'super-app-theme--header',         
            sortable: true,
            renderCell: ({row}): any =>{
               
                return new Date(row.fechaDesde).toLocaleDateString();
            },
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            
        },
        {
            field: 'fechaHasta',
            headerName: 'Hasta',
            headerClassName: 'super-app-theme--header',         
            sortable: true,
            renderCell: ({row}): any =>{
               
                return new Date(row.fechaHasta).toLocaleDateString();
            },
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'diasPedido',
            headerName: 'Dias Pedidos',
            headerClassName: 'super-app-theme--header',         
            sortable: true,
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'estado',
            headerName: 'Estado',
            headerClassName: 'super-app-theme--header',         
            sortable: true,
            renderCell: ({row}): any =>{
                
                return estado(row.estado)
            },
            headerAlign: 'center',
            align: 'center',
            
        },
        {
            field: 'tieneArchivo',
            headerName: 'Archivo',
            headerClassName: 'super-app-theme--header',         
            sortable: false,
            renderCell: ({row}): any => {
               return descarga(row.tieneArchivo, row.idRegistro);
            },
            headerAlign: 'center',
            align: 'center',
            editable: false,
            flex: 1
        },
         {
             field: 'bitacora',
             headerName: 'Ver Bitácora',
             headerClassName: 'super-app-theme--header',
             cellClassName: 'super-app-theme--cell',         
             sortable: false,
             renderCell: ({row}): any => {
                if(row.notificaciones != 0){
                    return(
                        <Tooltip title={"Ver bitácora"} placement='right'>
                        <IconButtonViewNotification setOpen={setV} notifications={row.notificaciones} id={row.idRegistro}></IconButtonViewNotification>
                        
                    </Tooltip>
                    )
                }
                else return (
                 <div>
                    <Tooltip title={"Ver bitácora"} placement='right'>
                     <IconButtonView setOpen={setV} icon={<ZoomInIcon />} id={row.idRegistro}></IconButtonView>
                     
                 </Tooltip>
                 
                 </div>
                 );
             },
             headerAlign: 'center',
             align: 'center',
             
             editable: false,
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
                         },
                         '& .super-app-theme--cell':{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent:'center'
                         },
                         
                    }}
                rows={data}
                columns={columns}
                getRowId={(r) => r.idRegistro}
                pageSize={20}
                rowSpacingType='margin'
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                components={{
                    NoRowsOverlay: ()=>(
                    <Stack height="100%" alignItems="center" justifyContent="center">
                     No tiene ninguna licencia
                     </Stack>
                    ),
                    NoResultsOverlay: ()=> (
                        <Stack height="100%" alignItems="center" justifyContent="center">
                     No hubo resultados
                     </Stack>
                    )
            
            }}
                />
                </div>
                </div>
                )}
            {popUpBitacoraVeiw()}
            {popUpBitacoraNew()}
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {mensaje}
                </Alert>
            </Snackbar>
            <Snackbar open={openError}
                TransitionComponent={TransitionUp}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="error">
                    {mensaje}
                </Alert>
            </Snackbar>
        </>
    );

}