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
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ZoomInIcon from "@material-ui/icons/ZoomIn";

import { licencias } from "../../../models/Licencias";
import obtenerLicenciasPendienteLider from "../../../services/Licencias/obtenerLicenciasPendienteLider";
import { formatoFecha } from "../../../function/formatoFecha";
import obtenerLicenciasPendienteAtencion from "../../../services/Licencias/obtenerLicenciasPendienteAtencion";
import { roles } from "../../../enviroment/roles";
import descargaArchivo from "../../../services/Licencias/descargarArchivo";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { IconButton } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DialogViewAprobadores from "../../Dialog/Licenses/DialogViewAprobadores";
import { ButtonGroupLicenciasAtencion } from "../../SmallerComponents/Buttons/Group/ButtonGroupLicenciasAtencion";

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

export default function LicenciasPendientesAtencion() {
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    async function loadDetails() {
      if (localStorage.getItem("301") === roles.ROLLIDER) {
        const response: any = await obtenerLicenciasPendienteLider();
        try {
          if (response.status === 200 || response.length == 0) {
            setData(response.data);
            setLoading(false);
          } else {
            setRegistroHora({});
          }
        } catch (error) {}
      } else {
        const response: any = await obtenerLicenciasPendienteAtencion();
        try {
          setData(response.data);
          setLoading(false);
        } catch (error) {
          setData([]);
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

  const setN = () => {
    setPopUpNew(true);
  };
  const setV = (id: number) => {
    setPopUpVeiw(true);
    setId(id);
  };
  const popUpAprobadores: any = () => {
    if (openAprobadores === true) {
      return (
        <DialogViewAprobadores
          setOpenAprobadores={setOpenAprobadores}
          aprobadores={aprobadores}
        ></DialogViewAprobadores>
      );
    };
  }
    const columns : GridColDef[] = [
        
        
        {
            field: 'usuario',
            headerName: 'Usuario',         
            sortable: true,
           
            renderCell: ({row}): any =>{

                return  row.usuario;
            },
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'super-app-theme--header',
            flex: 1
        },
        {
            field: 'nombre',
            headerClassName: 'super-app-theme--header',
            headerName: 'Licencia por',
            renderCell: ({row}): any =>{

                return row.nombre;
            },
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
            field: 'idRegistro',
            headerClassName: 'super-app-theme--header', 
            headerName: 'Acción',         
            sortable: false,
           
            renderCell: ({row}): any => {
           return <ButtonGroupLicenciasAtencion
                id={row.idRegistro}
                setOpen={setOpen}
                setOpenError={setOpenError}
                setMessage={setMessage}
            ></ButtonGroupLicenciasAtencion>
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
        }
       
    ];

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
                          width: '100%',
                          overflowWrap: "break-word"
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
                    No hay licencias pendientes
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
      </>
    )}
    {popUpAprobadores()}
  </>
);
 }

