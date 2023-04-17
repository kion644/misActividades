import { useEffect, useState } from "react";
import { Feriados } from "../../../models/Feriados";


import { Navigate } from "react-router-dom";
import { environment } from "../../../enviroment/enviroment";

import ObtenerFeriados from "../../../services/Feriados/ObtenerFeriados";
import NuevoFeriado from "../../../services/Feriados/NuevoFeriado";
import EditarFeriado from "../../../services/Feriados/EditarFeriado";
import EliminarFeriado from "../../../services/Feriados/EliminarFeriado";
import Paises from "../../../services/ConsultaPaises/Paises";

import { formatoFecha } from "../../../function/formatoFecha";

import ABMTableStyles from "../../../styles/ABMTable/ABMTableStyles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert } from "@material-ui/lab";
import {
  AppBar,
  Box,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
} from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  DataGrid,
  GridColDef,
  esES,
  getGridDateOperators,
} from "@mui/x-data-grid";
import { AlertTitle, Stack } from "@mui/material";
import { DialogDelete } from "../../Dialog/Fase/DialogDeleteFase";
import { DialogEditHoliday } from "../../Dialog/Holiday/DialogEditHoliday";
import { DialogNewHoliday } from "../../Dialog/Holiday/DialogNewHoliday";
import { AxiosError } from "axios";


interface paises {
  idPais: number;
  nombrePais: string;
}

export const Holidays = () => {
  const classes = ABMTableStyles();

  const [data, setData] = useState<Feriados[]>([]);
  const [paises, setPaises] = useState<paises[]>([]);
  const [openNewFeriado, setOpenNewFeriado] = useState<boolean>(false);
  const [openEditFeriado, setOpenEditFeriado] = useState<boolean>(false);
  const [openDeleteFeriado, setOpenDeleteFeriado] = useState<boolean>(false);
  const [editedFeriado, setEditedFeriado] = useState<null | Feriados>({
    fecha: "",
    idPais: 0,
    descripcion: "",
    registroId: 0,
  });
  const [id, setId] = useState<number>(0);
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

  async function loadHolidays() {
    setData(await ObtenerFeriados());
  }

  async function loadPaises() {
    const response: any = await Paises();

    try {
      if (response.status === 200) {
        setPaises(response.data);
      } else {
        setPaises([]);
      }
    } catch (e) {
      throw e;
    }
  }
  useEffect(() => {
    loadPaises();
    loadHolidays();
  }, []);

  const addFeriado = (feriado: Feriados) => {
    NuevoFeriado(feriado)
      .then(() => loadHolidays())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "agregado",
          message: "Feriado agregado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "agregar",
          message: "Ya existe un feriado en esa fecha",
          open: true,
        })
      );
  };

  const editFeriado = (feriado: Feriados) => {
    EditarFeriado(feriado)
      .then(() => loadHolidays())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "editado",
          message: "Feriado editado",
          open: true,
        })
      )
      .catch((error: any) => {
        const mensaje = error.response.data.mensaje;
        const estado = error.response.data.estado;
        setAlert({
          type: "Error",
          request: "editar",
          message: mensaje,
          open: true,
        });
      });
  };

  const deleteFeriado = (id: number) => {
    EliminarFeriado(id)
      .then(() => loadHolidays())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "eliminado",
          message: "Feriado eliminado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "eliminar",
          message: "ID del Feriado no encontrado",
          open: true,
        })
      );
  };

  const showNombrePais = (id: number) => {
    for (let i = 0; i < paises.length; i++) {
      if (paises[i].idPais === id) {
        return paises[i].nombrePais;
      }
    }
  };

  const handleEditClick = (feriado: any) => {
    setEditedFeriado(feriado);
    setOpenEditFeriado(true);
  };

  const columns: GridColDef[] = [
    {
      field: "descripcion",
      headerClassName: "super-app-theme--header",
      headerName: "Feriado",
      sortable: true,

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "fecha",
      headerClassName: "super-app-theme--header",
      headerName: "Fecha",
      sortable: true,
      type: "date",

      filterOperators: getGridDateOperators().filter(
        (operator) =>
          operator.value === "is" ||
          operator.value === "before" ||
          operator.value === "after" ||
          operator.value === "onOrBefore" ||
          operator.value === "onOrAfter" 
      ),

      renderCell: ({ row }): any => {
        return formatoFecha(row.fecha);
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "pais",
      headerClassName: "super-app-theme--header",
      headerName: "País",
      sortable: true,

      renderCell: ({ row }): any => {
        return showNombrePais(row.idPais);
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "editar",
      headerClassName: "super-app-theme--header",
      headerName: "Editar",
      sortable: false,
      disableColumnMenu: true,

      renderCell: ({ row }): any => {
        return (
          <div>
            <IconButton
              onClick={() => {
                handleEditClick(row);
              }}
            >
              <EditIcon className={classes.colorAzul} />
            </IconButton>
          </div>
        );
      },

      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "eliminar",
      headerClassName: "super-app-theme--header",
      headerName: "Eliminar",
      sortable: false,
      disableColumnMenu: true,

      renderCell: ({ row }): any => {
        return (
          <div>
            <IconButton
              onClick={() => {
                setId(row.registroId);
                setOpenDeleteFeriado(!openDeleteFeriado);
              }}
            >
              <DeleteIcon className={classes.colorAzul} />
            </IconButton>
          </div>
        );
      },

      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
  ];

  return (
    <>
      {localStorage.getItem("user") !== undefined ? (
        <div>
          <AppBar position="static">
            <Tabs value={0} aria-label="simple tabs example">
              <Tab label="Feriados" />
            </Tabs>
          </AppBar>
          <Box p={3}>
            <IconButton
              className={classes.buttonNew}
              onClick={() => {
                setOpenNewFeriado(!openNewFeriado);
              }}
            >
              <AddCircleIcon /> Nuevo Feriado
            </IconButton>
            <p className={classes.filterText}>
              Para establecer filtros posicione el mouse sobre el titulo el cual
              desea filtrar, haga click en los tres puntos y luego en filtro.
            </p>

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ height: "auto", width: "100%" }}>
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
                  getRowId={(r) => r.registroId}
                  pageSize={20}
                  rowSpacingType="margin"
                  localeText={
                    esES.components.MuiDataGrid.defaultProps.localeText
                  }
                  components={{
                    NoRowsOverlay: () => (
                      <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        No hay feriados
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
          </Box>
          <DialogNewHoliday
            open={openNewFeriado}
            setOpen={setOpenNewFeriado}
            addFeriado={addFeriado}
            paises={paises}
          ></DialogNewHoliday>
          <DialogEditHoliday
            open={openEditFeriado}
            feriado={editedFeriado}
            paises={paises}
            setOpen={setOpenEditFeriado}
            setFeriado={setEditedFeriado}
            editFeriado={editFeriado}
          ></DialogEditHoliday>
          <DialogDelete
            id={id}
            title={"Eliminar Feriado"}
            text={"Seguro desea eliminar el feriado?"}
            open={openDeleteFeriado}
            setOpen={setOpenDeleteFeriado}
            deleteFunction={deleteFeriado}
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
              Error al {alert.request} feriado: <strong>{alert.message}</strong>
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
              Feriado {alert.request} con exito:{" "}
              <strong>{alert.message}</strong>
            </Alert>
          </Snackbar>
        </div>
      ) : (
        <Navigate to={environment.LOGIN} replace={true}></Navigate>
      )}
    </>
  );
};
