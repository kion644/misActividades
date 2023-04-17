import { useEffect, useState } from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Alert, Skeleton } from "@material-ui/lab";
import { Snackbar, TablePagination, Tooltip } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { licencias } from "../../../models/Licencias";
import obtenerLicenciasEjecutadas from "../../../services/Licencias/obtenerLicenciasEjecutadas";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { formatoFecha } from "../../../function/formatoFecha";
import ZoomInIcon from "@material-ui/icons/ZoomIn";

import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppsOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import DialogNewBitacora from "../../Dialog/Bitacora/DialogNewBitacora";
import DialogViewBitacora from "../../Dialog/Bitacora/DialogViewBitacora";
import DialogViewAprobadores from "../../Dialog/Licenses/DialogViewAprobadores";
import { IconButtonView } from "../../SmallerComponents/Buttons/IconButton/IconButtonView";
import { IconButtonViewNotification } from "../../SmallerComponents/Buttons/IconButton/IconButtonViewNotification";




const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#007DC4",
      fontFamily: '"Montserrat", sans-serif',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  button: {
    color: "#fff",
    backgroundColor: "#007DC4",
    "&:hover": {
      backgroundColor: "#F6921E",
    },
  },
  colorAprobadores: {
    color: "#007DC4",
    "&:hover": {
      color: "#F6921E",
    },
  },
  colorAprobadoresVacio: {
    color: "#999999",
  },
  colorDesaprobado: {
    color: "#FB0000",
  },
  colorAprobado: {
    color: "#00c109",
  },
  colorPendiente: {
    color: "#F6C32C",
  },
});

export default function LicenciasEjecutadas() {
  const classes = useStyles();
  const [registroHora, setRegistroHora] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [open, setOpen] = useState(false);
  const [aprobadores, setAprobadores] = useState([]);
  const [openAprobadores, setOpenAprobadores] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [id, setId] = useState(0);
  const [popUpView, setPopUpView] = useState(false);
  const [popUpNew, setPopUpNew] = useState(false);
  const [change, setChange] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenError(false);
    setActualizar(!actualizar);
  };
  const [data, setData] = useState<licencias[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    useEffect(() => {


        async function loadDetails() {
            const response: any = await obtenerLicenciasEjecutadas()
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


    }, [actualizar]);

  
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
          <Tooltip
            title={"Aprobado por el Líder, Pendiente de aprobacion de atención"}
            placement="right"
          >
            <SupervisorAccountIcon className={classes.colorPendiente} />
          </Tooltip>
        );
    }
  };

  const popUpAprobadores = () => {
    if (openAprobadores === true) {
      return (
        <DialogViewAprobadores
          setOpenAprobadores={setOpenAprobadores}
          aprobadores={aprobadores}
        ></DialogViewAprobadores>
      );
    }
  };

  const setC = () => {
    setChange(true);
  };
  const popUpBitacoraNew = () => {
    if (popUpNew === true) {
      return (
        <DialogNewBitacora
          setCerrar={setPopUpNew}
          id={id}
          setOpen={setOpen}
          setOpenError={setOpenError}
          setMessage={setMessage}
          setChange={setC}
        ></DialogNewBitacora>
      );
    }
  };
  const setN = () => {
    setPopUpNew(true);
  };
  const popUpBitacoraVeiw = () => {
    if (popUpView === true) {
      return (
        <DialogViewBitacora
          setCerrar={setPopUpView}
          newBitacora={setN}
          id={id}
          idUser={20}
          setChange={setC}
        ></DialogViewBitacora>
      );
    }
  };
  const setV = (id: number) => {
    setPopUpView(true);
    setId(id);
  };

    const columns : GridColDef[] = [
        
        
        {
            field: 'usuario',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Usuario',         
            sortable: true,
            renderCell: ({row}): any =>{
                return row.usuario;
            },
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'nombre',
            headerClassName: 'super-app-theme--header',
            headerName: 'Licencia por',
            cellClassName: 'super-app-theme--cell',
            sortable: true,

            renderCell: ({row}): any =>{
                return row.nombre;
            },
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'fechaDesde',
            headerClassName: 'super-app-theme--header',
            headerName: 'Desde',
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
            headerClassName: 'super-app-theme--header',
            headerName: 'Hasta',
            sortable: true,

            renderCell: ({row}): any =>{

                return new Date(row.fechaHasta).toLocaleDateString();
            },
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'estado',
            headerClassName: 'super-app-theme--header',
            headerName: 'Estado',
            sortable: true,

            renderCell: ({row}): any =>{

                return estado(row.estado)
            },
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
             field: 'bitacora',
             headerClassName: 'super-app-theme--header',
             headerName: 'Ver bitácora',
             sortable: false,

             renderCell: ({row}): any =>{
                if(row.notificaciones != 0){
                    return(

                        <IconButtonViewNotification notifications={row.notificaciones} setOpen={setV} id={row.idRegistro}></IconButtonViewNotification>


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
             flex: 1
        },
        {
            field: "aprobadores",
            headerClassName: "super-app-theme--header",
            headerName: "Aprobadores",
            sortable: false,

            renderCell: ({ row }): any => {
                if (!row.aprobadores) {
                    return (
                        <div>
                            <Tooltip title={"Sin aprobadores"} placement="right">
                                <AccountCircleIcon className={classes.colorAprobadoresVacio} />
                            </Tooltip>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <IconButton
                                onClick={() => {
                                    setOpenAprobadores(true);
                                    setAprobadores(row.aprobadores);
                                }}
                            >
                                <AccountCircleIcon className={classes.colorAprobadores} />
                            </IconButton>
                        </div>
                    );
                }
            },
            headerAlign: "center",
            align: "center",
            flex: 1,
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
            <>
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


                    }}
                rows={data}
                columns={columns}
                getRowId={(r) => r.idRegistro}
                pageSize={20}
                rowSpacingType="margin"
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                components={{
                  NoRowsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      No hay licencias ejecutadas
                    </Stack>
                  ),
                  NoResultsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      No hubo resultados
                    </Stack>
                  ),
                }}
              />
            </div>
          </div>
          {popUpBitacoraVeiw()}
          {popUpBitacoraNew()}
          {popUpAprobadores()}
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {message}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openError}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              {message}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
}
