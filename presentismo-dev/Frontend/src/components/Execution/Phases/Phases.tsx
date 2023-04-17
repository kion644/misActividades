import {
  makeStyles,
  AppBar,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  Box,
} from "@material-ui/core";
import { Navigate } from "react-router-dom";
import { environment } from "../../../enviroment/enviroment";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import getAllFases from "../../../services/Fases/GetAllFases";
import createNewFase from "../../../services/Fases/CreateNewFase";
import deleteFase from "../../../services/Fases/DeleteFase";
import editFase from "../../../services/Fases/EditFase";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { AxiosError } from "axios";

const useStyles = makeStyles({
  bodyDiv: {
    fontFamily: '"Montserrat", sans-serif',
    width: "100%",
    height: "100%",
  },
  inputEdit: {
    borderTop: 0,
    borderRight: 0,
    borderLeft: 0,
    backgroundColor: "transparent",
    textAlign: "center",
    "&:focus": {
      outline: "none",
    },
  },
  postButton: {
    marginTop: "20px",
    position: "absolute",
    right: "10px",
    backgroundColor: "#007DC4",
    color: "white",
    borderRadius: "5px",
    padding: "5px",
    border: "#007DD1",
    "&:hover": {
      cursor: "pointer",
    },
  },
  barra: {
    backgroundColor: "#007DC4",
  },
});

export const Phases = () => {
  const classes = useStyles();
  const [data, setData] = useState<[]>([]);
  const [editedFase, setEditedFase] = useState<{
    id: null | number;
    editedName: null | string;
    editedDescripcion: null | string;
  }>({
    id: null,
    editedName: null,
    editedDescripcion: null,
  });
  const [idDeletedFase, setIdDeletedFase] = useState<number>(0);
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

  const FasesToData = async () => {
    setData(await getAllFases());
  };

  useEffect(() => {
    FasesToData();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "nombreProyecto",
      headerClassName: "super-app-theme--header",
      headerName: "Proyecto",
      sortable: true,

      renderCell: ({ row }) => {
        return row.nombreProyecto;
      },

      headerAlign: "center",
      align: "center",
      flex: 1.5,
    },
    {
      field: "nombreFase",
      headerClassName: "super-app-theme--header",
      headerName: "Nombre",
      sortable: true,

      renderCell: ({ row }) => {
        return row.nombreFase;
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "descripcion",
      headerClassName: "super-app-theme--header",
      headerName: "Descripcion",
      sortable: true,

      renderCell: ({ row }) => {
        return row.descripcion;
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];

  return (
    <>
      {localStorage.getItem("user") !== undefined ? (
        <>
          <AppBar position="static">
            <Tabs
              className={classes.barra}
              value={0}
              aria-label="simple tabs example"
            >
              <Tab label="Fases" />
            </Tabs>
          </AppBar>
          <Box p={3}>
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "small",
                color: "dimgray",
                fontWeight: "bold",
                padding: "5px",
                marginLeft: "20px",
                marginTop: "0px",
              }}
            >
              Para establecer filtros posicione el mouse sobre el titulo el cual
              desea filtrar, haga click en los tres puntos y luego en filtro
            </p>
            <div style={{ display: "flex", width: "100%" }}>
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
                        No hay clientes
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
        </>
      ) : (
        <Navigate to={environment.LOGIN} replace={true}></Navigate>
      )}
    </>
  );
};
