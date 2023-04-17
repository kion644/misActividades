
import { DataGrid, esES, GridCloseIcon, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
  
} from "@material-ui/core/styles";
import { Select, MenuItem, Alert, AlertTitle, Stack} from "@mui/material";
import { Dialog, TextField, Typography, FormControl, InputLabel, InputBase, } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import getAllLideres from "../../../services/Proyecto/GetComboLider";
import getAllClientes from "../../../services/Clientes/GetAllClientes";
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished"; 
import GetAllUsuarios from "../../../services/Usuarios/GetAllUsuarios";
import AllUsuarios from "../../../services/Usuarios/AllUsers";

import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  AppBar,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  Box,
} from "@material-ui/core";

import { Proyecto } from '../../../models/Proyecto';
import ABMTableStyles from "../../../styles/ABMTable/ABMTableStyles";
import getAllPersonsByFaseId from "../../../services/Fases/GetAllPersonsByFaseId";
import { DialogNewPersonFase } from "../../Dialog/Fase/DialogNewPersonFase";
import createNewPersonaFase from "../../../services/Fases/CreateNewPersonaFase";
import theme from "../../../theme/themeConfig";

import CloseIcon from '@material-ui/icons/Close';
import { DialogDelete } from "../../Dialog/Fase/DialogDeleteFase";
import deletePersonaFase from "../../../services/Fases/DeletePersonaFase";


export const PhasePerson = ({ open, setOpen, idProyecto, fases, idFase}: any) => {
  
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
  const classes = ABMTableStyles();
  const [DeletedPersonaFase, setDeletedPersonaFase] = useState<number | any>(0);
  const [data, setData] = useState<{ 
      
    apellido: string, 
    nombre: string,
    lider: string,
   
  }[]>([]);
  const [DeletedPerson, setDeletedPerson] = useState<number | any>(0);

  
  const [openDialogAddPersonaFase, setOpenDialogAddPersonaFase] = useState<boolean>(false);
  const [openDialogAddFase, setOpenDialogAddFase] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDeleteFase] = useState<boolean>(false);

  async function PersonsPhases() {
    const response: any = await getAllPersonsByFaseId(idProyecto)
    const data = response.data
    setData (data);
  }

  useEffect(() => {
    fases();
    PersonsPhases();
  }, []);
  const AddPersonaFase = (newFase:string, proyectoId: number, faseId: number) => {
    createNewPersonaFase (newFase,proyectoId, faseId)
    .then(() => PersonsPhases())
    .then(() =>
      setAlert({
        type: "Realizado",
        request: "agregada",
        message: "Persona agregada",
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

const Delete = (id: number) =>{
  deletePersonaFase(id)
    .then(() => PersonsPhases())
    .then(() =>
      setAlert({
        type: "Realizado",
        request: "eliminada",
        message: "Persona eliminada",
        open: true,
      })
    )
    .catch(() =>
      setAlert({
        type: "Error",
        request: "eliminar",
        message: "La persona no fue eliminada",
        open: true,
      })
    );
};


const handleDeleteClick = (personaFase: { id: number }) => {
  setDeletedPersonaFase(personaFase.id);
  setOpenDialogDeleteFase(true);
};

  const handleClose = () => {
    setOpen(false);
  };


  async function handleClickFinish() {
    handleClose();
  };

  const columns: GridColDef[] = [
      {
        field: "apellido",
        headerClassName: "super-app-theme--header",
        headerName: "Apellido",
        sortable: true,
  
        renderCell: ({row}) => {
          return row.apellido;
        
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
  
        renderCell: ({row}) => {
          return row.nombre;
        },
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "lider",
        headerClassName: "super-app-theme--header",
        headerName: "Lider",
        sortable: true,
  
        renderCell: ({row}) => {
          return row.lider;
        },
        headerAlign: "center",
        align: "center",
        flex: 1,
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
 

  return (
    <>
      <Dialog open={open} aria-labelledby="customized-dialog-title" onClose={handleClose} fullWidth={true}
        maxWidth={"lg"}>
          <AppBar position="static" >
              <Tabs
                value={0}
                aria-label="simple tabs example"
              >
                <Tab label="Personas" />
              </Tabs>
              <IconButton aria-label="close" style={{
            position: 'absolute',
            right: theme.spacing(1),
            color: theme.palette.grey[500],
        }} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </AppBar>
            
            <Box p={3}>
            
            <IconButton
              className={classes.buttonNew}
              onClick={() => {
                setOpenDialogAddPersonaFase(true);
              }}
            >
            <AddCircleIcon /> Agregar personas a la fase
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
                        No hay personas agregadas a la fase
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
                    Error al {alert.request} fase:{" "}
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
                    Persona {alert.request} con exito:{" "}
                    <strong>{alert.message}</strong>
                  </Alert>
                </Snackbar>
              </div>
            </div>
            </Box>

             <DialogNewPersonFase
              open={openDialogAddPersonaFase}
              setOpen={setOpenDialogAddPersonaFase}
              addProyecto={AddPersonaFase}
              personas={PersonsPhases}
              idProyecto={idFase}
              idFase={idProyecto}
            />
            <DialogDelete
              id={DeletedPersonaFase}
              title={"Eliminar Persona de la Fase"}
              text={"Seguro desea eliminar la persona seleccionada?"}
              open={openDialogDelete}
              setOpen={setOpenDialogDeleteFase}
              deleteFunction={Delete}
            />
           
      </Dialog>
    </>
  );
};
