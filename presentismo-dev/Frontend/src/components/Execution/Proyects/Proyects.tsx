import { Navigate } from "react-router-dom";
import { environment } from "../../../enviroment/enviroment";

import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";

import { Proyecto } from "../../../models/Proyecto";
import { AxiosError } from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import getProyects from "../../../services/Proyecto/GetProyects";
import createNewProyect from "../../../services/Proyecto/CreateProyect";
import editProyectos from "../../../services/Proyecto/EditProyect";
import deleteProyectos from "../../../services/Proyecto/DeleteProyects";
import ABMTableStyles from "../../../styles/ABMTable/ABMTableStyles";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@material-ui/icons/Close';


import {
  AppBar,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  Box,
  Modal,
} from "@material-ui/core";

import { ProyectPhase } from "./ProyectPhase";
import { DialogDeleteProyecto } from "../../Dialog/Proyectos/DialogDeleteProyecto";
import { DialogEditProyecto } from "../../Dialog/Proyectos/DialogEditProyecto";
import { DialogNewProyecto } from "../../Dialog/Proyectos/DialogNewProyecto";
import { DialogCierreProyecto} from "../../Dialog/Proyectos/DialogCierreProyecto";
import { formatoFecha } from "../../../function/formatoFecha";
import CierreProyecto from "../../../services/Proyecto/CierreProyecto";

  
  export const Proyects = () => {
    
    const classes = ABMTableStyles();
    
    const [data, setData] = useState<{ 
      
      nombre: string, 
      descripcion:string,
      estado:void,
      tipoProyecto:string,
      cliente:string,
      id:number
     
    }[]>([]);
    
     const [editedProyecto, setEditedProyect] = useState<{
    
      nombre: null | string,
      descripcion: null | string,
      estado: null | void,
      tipoProyecto: null | string,
      idCliente: null | string;
      id: null | number;
      horasCliente: null | number;
      idCasoNegocio: null | number;
    }>({
      
      nombre: null,
      descripcion: null,
      estado: null,
      tipoProyecto: null,
      idCliente: null,
      id: null,
      horasCliente: null,
      idCasoNegocio: null
    });
    //  const [abrirFase, setAbrirFase] = useState<{
    //   id: null | number;
    // }>({
    //   id: null
    // });
    
    const [idDeletedProyect, setIdDeletedProyect] = useState<number>();
    const [idAbrirFase, setIdAbrirFase] = useState<number>();
    const [alert, setAlert] = useState<{
      type: string | null;
      request: string | null;
      message: string | null;
      open: boolean;
    }>({
      type: null,
      request: null,
      message: null,
      open: false,
    });
  
    const [openDialogAdd, setOpenDialogAdd] = useState<boolean>(false);
    const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
    const [openDialogEdit, setOpenDialogEdit] = useState<boolean>(false);
    const [openDialogcierreProyecto, setOpenDialogcierreProyecto] = useState<boolean>(false);
    const [phase, setPhase] = useState<boolean>(false);
    

  const proyectsToData = async () => {
    setData(await getProyects());
  };

  useEffect(() => {
    proyectsToData();
  }, []);

  const Add = (newName: string, newDescription: string, newType: string, newClient: string, newLider: string, newEstado: string, newHorasCliente: number, newCN: number, newFechaInicio: Date, newFechaFinEstimada: Date) => {
    createNewProyect(newName,
      newDescription,
      newType,
      newClient,
      newLider,
      newEstado,
      newHorasCliente,
      newCN,
      newFechaInicio,
      newFechaFinEstimada)
      .then(() => proyectsToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "agregado",
          message: "Proyecto agregado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "agregar",
          message: "Ya existe un proyecto con este nombre",
          open: true,
        })
      );
  };

  const Delete = (id: number) => {
    deleteProyectos(id)
      .then(() => proyectsToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "eliminado",
          message: "Proyecto eliminado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "eliminar",
          message: "Posiblemente el proyecto esté en uso y tenga registros vigentes o fases activas",
          open: true,
        })
      );
  };

  const Edit = (proyecto: Proyecto) => {

    editProyectos(proyecto)
      .then(() => proyectsToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "editado",
          message: "Proyecto editado",
          open: true,
        })
      )
      .catch((reason: AxiosError) => {
        if (reason.response?.status === 500) {
          setAlert({
            type: "Error",
            request: "editar",
            message: "Posiblemente el proyecto esté en uso y tenga registros vigentes",
            open: true,
          });
        } else {
          setAlert({
            type: "Error",
            request: "editar",
            message: "Nombre no encontrado",
            open: true,
          });
        }
      });
  };
  
  
    useEffect(() => {
      proyectsToData();
    }, []);
  
    const cierreProyecto = (dto: any) => {
      
      CierreProyecto(dto)
      .then(() => proyectsToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "cerrado",
          message: "Proyecto cerrado",
          open: true,
        })
      )
      .catch((reason: AxiosError) => {
        if (reason.response?.status === 500) {
          setAlert({
            type: "Error",
            request: "cerrar",
            message: "No se encuentro el proyecto",
            open: true,
          });
        }
      });
  };


  const handleEditClick = (proyecto: Proyecto) => {

    setEditedProyect({
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      estado: proyecto.estado,
      tipoProyecto: proyecto.tipoProyecto,
      idCliente: proyecto.cliente,
      id: proyecto.id,
      horasCliente: proyecto.horasCliente,
      idCasoNegocio: proyecto.idCasoNegocio
    });

    setOpenDialogEdit(true);
  };

    const handleCierreProyectoClick = (proyecto: Proyecto) => {
      
      setEditedProyect({ 
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      estado: proyecto.estado,
      tipoProyecto: proyecto.tipoProyecto,
      idCliente: proyecto.cliente,
      id:proyecto.id,
      horasCliente: proyecto.horasCliente,
      idCasoNegocio: proyecto.idCasoNegocio});
    
      setOpenDialogcierreProyecto(true);
  };
  
    const handleDeleteClick = (proyecto: { id: number }) => {
      setIdDeletedProyect(proyecto.id);
      setOpenDialogDelete(true);
      
    };

  const handlePhaseClick = (proyecto: { id: number }) => {
    setIdAbrirFase(proyecto.id);
    setPhase(true);
  }

  const columns: GridColDef[] = [
    {
      field: "descripcion",
      headerClassName: "super-app-theme--header",
      headerName: "Descripcion",
      sortable: true,

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "estado",
      headerClassName: "super-app-theme--header",
      headerName: "Estado",
      sortable: true,

      renderCell: ({ row }): { estado: string; } => {
        return row.estado;
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "nombre",
      headerClassName: "super-app-theme--header",
      headerName: "Nombre",
      sortable: true,

      renderCell: ({ row }): { nombre: string; } => {
        return row.nombre;
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "fecha_inicio",
      headerClassName: "super-app-theme--header",
      headerName: "Fecha inicio",
      sortable: true,
      type: "date",

      renderCell: ({ row }): any => {
        if (row.fechaInicio != null) {
          return formatoFecha(row.fechaInicio)

        }
        else {
          return "-"
        }
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "fecha_fin_estimada",
      headerClassName: "super-app-theme--header",
      headerName: "Fecha fin estimada",
      sortable: true,
      type: "date",

      renderCell: ({ row }): any => {
        if (row.fechaFinEstimada != null) {
          return formatoFecha(row.fechaFinEstimada)
        }
        else {
          return "-"
        }
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "fecha_fin_real",
      headerClassName: "super-app-theme--header",
      headerName: "Fecha fin estimada",
      sortable: true,
      type: "date",

      renderCell: ({ row }): any => {
        if (row.fechaFinReal != null) {
          return formatoFecha(row.fechaFinReal)
        }
        else {
          return "-"
        }
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "lideres",
      headerClassName: "super-app-theme--header",
      headerName: "Lider",
      sortable: true,

      renderCell: ({ row }) => {
        return row.lider;
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "nombreCliente",
      headerClassName: "super-app-theme--header",
      headerName: "Cliente",
      sortable: true,

      renderCell: ({ row }): { nombreCliente: string; } => {
        return row.nombreCliente;
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "fases",
      headerClassName: "super-app-theme--header",
      headerName: "Fases",
      sortable: false,

      renderCell: ({ row }): any => {
        return (
          <div>
            <IconButton onClick={() => handlePhaseClick(row)}>
              <VisibilityIcon style={{ color: "#007DC4" }} />
            </IconButton>
          </div>
        );
      },

      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "Lapiz",
      headerClassName: "super-app-theme--header",
      headerName: "Editar",
      sortable: false,

      renderCell: ({ row }): any => {
        return (
          <IconButton onClick={() => handleEditClick(row)}>
            <EditIcon style={{ color: "#007DC4" }} />
          </IconButton>
        );
      },

      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "cerrar",
      headerClassName: "super-app-theme--header",
      headerName: "Finalizar",
      sortable: false,

      renderCell: ({ row }): any => {
        return (
          <IconButton onClick={() => handleCierreProyectoClick(row)}>
            <CloseIcon style={{ color: "#007DC4" }} />
          </IconButton>
        );
      },

      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "Delete",
      headerClassName: "super-app-theme--header",
      headerName: "Eliminar",
      sortable: false,

      renderCell: ({ row }): any => {
        return (
          <IconButton onClick={() => handleDeleteClick(row)}>
            <DeleteIcon style={{ color: "#007DC4" }} />
          </IconButton>
        );
      },

      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
  ];

  const dialogAñadir = () => {
    if (openDialogAdd) {
      return (<>
        <DialogNewProyecto
          open={openDialogAdd}
          setOpen={setOpenDialogAdd}
          addProyecto={Add}
        />
      </>)
    }

  }
  const dialogEditar = () => {
    if (openDialogEdit) {
      return (<>
        <DialogEditProyecto
          open={openDialogEdit}
          setOpen={setOpenDialogEdit}
          proyecto={editedProyecto}
          setProyecto={setEditedProyect}
          editProyecto={Edit}
        />
      </>)
    }

  }
  const dialogBorrar = () => {
    if (openDialogDelete) {
      return (<>
        <DialogDeleteProyecto
          id={idDeletedProyect}
          title={"Eliminar Proyecto"}
          text={"Seguro desea eliminar el proyecto?"}
          open={openDialogDelete}
          setOpen={setOpenDialogDelete}
          deleteFunction={Delete}
        />
      </>)
    }
  }

  const dialogFasesProyecto = () => {
    if (phase) {
      return (<>
        <ProyectPhase
          id={idAbrirFase}
          open={phase}
          setOpen={setPhase}
        />
      </>)
    }
  }
  
    return (
      <>
        {localStorage.getItem("proyect") !== undefined ? (
          <>
            <AppBar position="static">
              <Tabs
                value={0}
                aria-label="simple tabs example"
              >
                <Tab label="Proyectos" />
              </Tabs>
            </AppBar>
            <Box p={3}>
            
            <IconButton
              className={classes.buttonNew}
              disabled={false}//HABILITAR CUANDO EL ABM ESTÉ OPERATIVO
              onClick={() => {
                setOpenDialogAdd(true);
              }}
            >
              <AddCircleIcon /> Agregar nuevo proyecto
            </IconButton>

            <p className={classes.filterText}>
              Para establecer filtros posicione el mouse sobre el titulo el cual
              desea filtrar, haga click en los tres puntos y luego en filtro.
            </p>


            <div style={{ display: "flex", width: "99%" }}>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  autoHeight
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
                  getRowId={(r) => r.id}
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
                        No hay proyectos
                      </Stack>
                    ),
                    NoResultsOverlay: () => (
                      <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        No hay resultados
                      </Stack>
                    ),
                  }}
                />
                <Snackbar
                  open={alert.type === "Error" && alert.open}
                  autoHideDuration={3000}
                  onClose={() => setAlert({ ...alert, open: false })}
                >
                  <Alert
                    severity="error"
                    onClose={() => {
                      setAlert({ ...alert, open: false });
                    }}
                  >
                    <AlertTitle>{alert.type}</AlertTitle>
                    Error al {alert.request} proyecto:{" "}
                    <strong>{alert.message}</strong>
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={alert.type === "Realizado" && alert.open}
                  autoHideDuration={3000}
                  onClose={() => setAlert({ ...alert, open: false })}
                >
                  <Alert
                    severity="success"
                    onClose={() => {
                      setAlert({ ...alert, open: false });
                    }}
                  >
                    <AlertTitle>{alert.type}</AlertTitle>
                    Proyecto {alert.request} con exito:{" "}
                    <strong>{alert.message}</strong>
                  </Alert>
                </Snackbar>
              </div>
            </div>
            </Box>
            
            <DialogNewProyecto
              open={openDialogAdd}
              setOpen={setOpenDialogAdd}
              addProyecto={Add}
            />
            <DialogEditProyecto
              open={openDialogEdit}
              setOpen={setOpenDialogEdit}
              proyecto={editedProyecto}
              setProyecto={setEditedProyect}
              editProyecto={Edit}
            />
            <DialogCierreProyecto
              open={openDialogcierreProyecto}
              setOpen={setOpenDialogcierreProyecto}
              proyecto={editedProyecto}
              setProyecto={setEditedProyect}
              setProyectoCierre={cierreProyecto}
            />
            <DialogDeleteProyecto
              id={idDeletedProyect}
              title={"Eliminar Proyecto"}
              text={"Seguro desea eliminar el proyecto?"}
              open={openDialogDelete}
              setOpen={setOpenDialogDelete}
              deleteFunction={Delete}
            />
            <ProyectPhase
              id={idAbrirFase}
              open={phase}
              setOpen={setPhase}
            />
        </>
      ) : (
        <Navigate to={environment.LOGIN} replace={true}></Navigate>
      )}
    </>
  );
};  