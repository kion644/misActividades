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
import { Badge, Snackbar, TablePagination, Tooltip } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ZoomInIcon from "@material-ui/icons/ZoomIn";

import { licencias } from "../../../models/Licencias";
import obtenerLicenciasPendienteLider from "../../../services/Licencias/obtenerLicenciasPendienteLider";
import { formatoFecha } from "../../../function/formatoFecha";
import obtenerLicenciasPendienteAtencion from "../../../services/Licencias/obtenerLicenciasPendienteAtencion";
import { roles } from "../../../enviroment/roles";
import descargaArchivo from "../../../services/Licencias/descargarArchivo";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import obtenerLicenciasAsignadas from "../../../services/Licencias/obtenerLicenciasAsignadas";
import { Stack } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { IconButton } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { fechaHora } from "../../../function/fechaHora";
import DialogNewBitacora from "../../Dialog/Bitacora/DialogNewBitacora";
import DialogViewBitacora from "../../Dialog/Bitacora/DialogViewBitacora";
import DialogViewAprobadores from "../../Dialog/Licenses/DialogViewAprobadores";
import { ButtonGroupLicencias } from "../../SmallerComponents/Buttons/Group/ButtonGroupLicencias";
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
    color: "#007DC4",
    "&:hover": {
      color: "#F6921E",
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
});

export default function LicenciasAsignadas() {
  const classes = useStyles();
  const [registroHora, setRegistroHora] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const [popUpObservar, setPopUpobservar] = useState(false);
  const [popUpVeiw, setPopUpVeiw] = useState(false);
  const [popUpNew, setPopUpNew] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [id, setId] = useState(0);
  const [change, setChange] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenError(false);
    setActualizar(!actualizar);
  };
  const [data, setData] = useState<licencias[]>([]);
  const [aprobadores, setAprobadores] = useState([]);
  const [openAprobadores, setOpenAprobadores] = useState(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    useEffect(() => {


        async function loadDetails() {
            if (localStorage.getItem('301') === roles.ROLLIDER) {
                const response: any = await obtenerLicenciasAsignadas()
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
            } else {
                const response: any = await obtenerLicenciasAsignadas()
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

        }
        loadDetails();


    }, [actualizar]);
    async function bajar(id: string) {


        const response1: any = await descargaArchivo(id)
        setMessage("La descarga comenzara en segundo")

        // if(response1.status === 200){
        //     setMessage("Descarga exitosa");
        // }
        // else{
        //     setMessage("Hubo un error al descargar");
        // }



    }

  const descarga = (download: boolean, id: string) => {
    if (download === true) {
      return (
        <CloudDownloadIcon
          color="primary"
          onClick={() => bajar(id)}
        ></CloudDownloadIcon>
      );
    }
    return <CloudDownloadIcon color="disabled"></CloudDownloadIcon>;
  };

  async function guardar(id: string) {}

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

  const popUpBitacoraVeiw = () => {
    if (popUpVeiw === true) {
      return (
        <DialogViewBitacora
          setCerrar={setPopUpVeiw}
          newBitacora={setN}
          id={id}
          idUser={20}
          setChange={setC}
        ></DialogViewBitacora>
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

  const setV = (id: number) => {
    setPopUpVeiw(true);
    setId(id);
  };

  const setN = () => {
    setPopUpNew(true);
  };

    const columns : GridColDef[] = [
        
        
        {
            field: 'usuario',
            headerName: 'Usuario',         
            sortable: true,
           
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'super-app-theme--header', 
            flex: 1
        },
        {
            field: 'nombre',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Licencia por',         
            sortable: true,
           
            
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
            field: 'tieneArchivo',
            headerClassName: 'super-app-theme--header',
            headerName: 'Archivo',
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
            field: 'id',
            headerClassName: 'super-app-theme--header',
            headerName: 'Acción',
            sortable: false,

            renderCell: ({row}): any => {

                return <ButtonGroupLicencias
                id={row.idRegistro}
                setOpen={setOpen}
                setOpenError={setOpenError}
                setMessage={setMessage}
                ></ButtonGroupLicencias>


            },
            headerAlign: 'center',
            align: 'center',
            editable: false,
            flex: 1
        },
        {
            field: 'bitacora',
            headerClassName: 'super-app-theme--header',
            headerName: 'Ver Bitácora',
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
        {
            field: 'ultima_modificacion',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Última modificación',         
            sortable: false,
            renderCell: ({row}): any =>{

              
               
                return fechaHora(row.ultima_modificacion);
            },
            headerAlign: 'center',
            align: 'center',
            editable: false,
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
  ];

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
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                sx={{
                  width: "100%",
                  mx: "auto",
                  p: 1,
                  m: 1,
                  borderRadius: 2,
                  borderColor: "#007DD1",
                  tableLayout: "fixed",
                  overflowWrap: "break-word",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  "& .super-app-theme--header": {
                    backgroundColor: "#007DC4",
                    color: "white",
                    width: "100%",
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
                      No tiene licencias asignadas
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
          {popUpBitacoraVeiw()}
          {popUpBitacoraNew()}
          {popUpAprobadores()}
        </>
      )}
    </>
  );
}
