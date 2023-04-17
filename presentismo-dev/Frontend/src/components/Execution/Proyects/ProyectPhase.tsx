import * as React from 'react';
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";

import { AxiosError } from "axios";


import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Dialog, TextField, Typography, FormControl, InputLabel, InputBase, DialogActions, } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
  AppBar,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  Box,
} from "@material-ui/core";
import { PhasePerson } from '../../templates/Home/Phase_Person';
import { Proyecto } from '../../../models/Proyecto';
import theme from '../../../theme/themeConfig';
import ABMTableStyles from '../../../styles/ABMTable/ABMTableStyles';
import { DialogDelete } from '../../Dialog/Fase/DialogDeleteFase';
import createNewFase from '../../../services/Fases/CreateNewFase';
import { DialogEditFase } from '../../Dialog/Fase/DialogEditFase';
import { DialogNewFase } from '../../Dialog/Fase/DialogNewFase';
import editFase from '../../../services/Fases/EditFase';
import deleteFase from '../../../services/Fases/DeleteFase';
import getAllFasesByProyectoId from '../../../services/Fases/GetAllFasesByProyectoId';


export const ProyectPhase = ({ id, open, setOpen }: any) => {
  const classes = ABMTableStyles();

  const [data, setData] = useState<{

    nombrefase: string,
    personas: string,
    id: number,

  }[]>([]);
  const [idFaseEdit, setIdFaseEdit] = useState<number>();
  const [editedFase, setEditedFase] = useState<{

    nombre: null | string,

  }>({

    nombre: null,

  });

  const [DeletedFase, setDeletedFase] = useState<number | any>(0);

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


  const [openDialogAddFase, setOpenDialogAddFase] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDeleteFase] = useState<boolean>(false);
  const [openDialogEditFase, setOpenDialogEditFase] = useState<boolean>(false);
  const [phase, setPhase] = useState<boolean>(false);
  const [idAbrirFase, setIdAbrirFase] = useState<number>();

  const ProyectPhasesToData = async () => {
    setData(await getAllFasesByProyectoId(id));

  };


  useEffect(() => {
    ProyectPhasesToData();

  }, []);

  const dialogNewFase = () => {
    if (openDialogAddFase) {
      return (<>
        <DialogNewFase
          open={openDialogAddFase}
          setOpen={setOpenDialogAddFase}
          addProyecto={AddFase}
          idProyecto={id}
        />
      </>)
    }
  }
  const dialogEditFase = () => {
    if (openDialogEditFase) {
      return (<>
        <DialogEditFase
          open={openDialogEditFase}
          setOpen={setOpenDialogEditFase}
          fase={editedFase}
          setFase={setEditedFase}
          editFase={Edit}
          idFase={idFaseEdit}
        />
      </>)
    }
  }

  const dialogDeleteFase = () => {
    if (openDialogDelete) {
      return (<>
        <DialogDelete
          id={DeletedFase}
          title={"Eliminar Fase"}
          text={"Seguro desea eliminar la fase seleccionada?"}
          open={openDialogDelete}
          setOpen={setOpenDialogDeleteFase}
          deleteFunction={Delete}
        />
      </>)
    }
  }

  const dialogFasesProyecto = () => {
    if (phase) {
      return (<>
        <PhasePerson
          idProyecto={idAbrirFase}
          idFase={id}
          open={phase}
          setOpen={setPhase}
          fases={ProyectPhasesToData}
        />
      </>)
    }
  }

  const AddFase = (newFase: string, newDescripcion: string, proyectoId: number) => {
    createNewFase(newFase, newDescripcion, proyectoId)
      .then(() => ProyectPhasesToData())
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
    deleteFase(id)
      .then(() => ProyectPhasesToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "eliminada",
          message: "Fase eliminada",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "eliminar",
          message: "La fase esta en uso",
          open: true,
        })
      );
  };

  const Edit = (nombre: string, faseId: number) => {

    editFase(nombre, faseId)
      .then(() => ProyectPhasesToData())
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
            message: "Nombre ya existente",
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


  const handleEditClick = (fase: { nombreFase: string; lider: string; personas: string, id: number }) => {

    setEditedFase({ nombre: fase.nombreFase });
    setIdFaseEdit(fase.id)
    setOpenDialogEditFase(true);
  };

  const handleDeleteClick = (fase: { id: number }) => {
    setDeletedFase(fase.id);
    setOpenDialogDeleteFase(true);
  };

  const handlePhaseClick = (proyecto: { id: number }) => {
    setIdAbrirFase(proyecto.id);
    setPhase(true);
  }

  const handleClose = () => {
    setOpen(false);
  };


  const columns: GridColDef[] = [
    {
      field: "nombreFase",
      headerClassName: "super-app-theme--header",
      headerName: "Fases",
      sortable: true,

      renderCell: ({ row }) => {
        return row.nombreFase;
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "personas",
      headerClassName: "super-app-theme--header",
      headerName: "Personas",
      sortable: true,

      renderCell: ({ row }): any => {
        return (
          <IconButton onClick={() => handlePhaseClick(row)}>
            <VisibilityIcon style={{ color: "#007DC4" }} />
          </IconButton>
        );
      },
      headerAlign: "center",
      align: "center",
      flex: 1,
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
            <Tab label="Fases" />
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
              setOpenDialogAddFase(true);
            }}
          >
            <AddCircleIcon /> Agregar nueva fase
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
                pageSize={5}
                rowSpacingType="margin"
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                components={{
                  NoRowsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      No hay fases
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
                  Fase {alert.request} con exito:{" "}
                  <strong>{alert.message}</strong>
                </Alert>
              </Snackbar>
            </div>
          </div>
        </Box>

        {dialogNewFase()}
        {dialogDeleteFase()}
        {dialogEditFase()}
        {dialogFasesProyecto()}




      </Dialog>
    </>
  );
};