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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import getAllClientes from "../../../services/Clientes/GetAllClientes";
import createNewCliente from "../../../services/Clientes/CreateNewCliente";
import deleteClientes from "../../../services/Clientes/DeleteCliente";
import editClientes from "../../../services/Clientes/EditCliente";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { AxiosError } from "axios";
import { DialogEditCliente } from "../../Dialog/Cliente/DialogEditCliente";
import { DialogNewCliente } from "../../Dialog/Cliente/DialogNewCliente";
import { DialogDelete } from "../../Dialog/Fase/DialogDeleteFase";


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

export const Clients = () => {
  const classes = useStyles();
  const [data, setData] = useState<{ descripcion: string; comboId: number }[]>([]);
  const [editedCliente, setEditedCliente] = useState<{
    id: null | number;
    editedName: null | string;
  }>({
    id: null,
    editedName: null,
  });
  const [idDeletedClient, setIdDeletedClient] = useState<number>(0);
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

  const clientesToData = async () => {
    setData(await getAllClientes());
  };

  useEffect(() => {
    clientesToData();
  }, []);

  const Add = (newName: string) => {
    createNewCliente(newName)
      .then(() => clientesToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "agregado",
          message: "Cliente agregado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "agregar",
          message: "Ya existe un cliente con este nombre",
          open: true,
        })
      );
  };

  const Delete = (id: number) => {
    deleteClientes(id)
      .then(() => clientesToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "eliminado",
          message: "Cliente eliminado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "eliminar",
          message: "Posiblemente el cliente tenga proyectos activos o en uso. Verifique que el cliente no esté operativo para eliminarlo",
          open: true,
        })
      );
  };

  const Edit = (cliente: { editedName: string; id: number }) => {
    editClientes(cliente.id, cliente.editedName)
      .then(() => clientesToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "editado",
          message: "Cliente editado",
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
            message: "ID no encontrado",
            open: true,
          });
        }
      });
  };

  const handleEditClick = (cliente: { descripcion: string; comboId: number }) => {
    setEditedCliente({ editedName: cliente.descripcion, id: cliente.comboId });
    setOpenDialogEdit(true);
  };

  const handleDeleteClick = (cliente: { nombre: string; comboId: number }) => {
    setIdDeletedClient(cliente.comboId);
    setOpenDialogDelete(true);
  };

  const columns: GridColDef[] = [
    {
      field: "descripcion",
      headerClassName: "super-app-theme--header",
      headerName: "Nombre",
      sortable: true,

      renderCell: ({ row }): { nombre: string; id: number } => {
        return row.nombre;
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
      field: "Trash",
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
      {localStorage.getItem("user") !== undefined ? (
        <>
          <AppBar position="static">
            <Tabs
              className={classes.barra}
              value={0}
              aria-label="simple tabs example"
            >
              <Tab label="Clientes" />
            </Tabs>
          </AppBar>
          <Box p={3}>
            <IconButton
              style={{
                fontFamily: '"Montserrat", sans-serif',
                color: "#007DC4",
              }}
              onClick={() => {
                setOpenDialogAdd(true);
              }}
            >
              <AddCircleIcon /> Agregar nuevos clientes
            </IconButton>
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "small",
                color: "dimgray",
                fontWeight: "bold",
                padding: "5px",
                marginLeft: "30px",
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
                  getRowId={(r) => r.comboId}
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
                  autoHideDuration={5000}
                  onClose={() => setAlert({ ...alert, open: false })}
                >
                  <Alert
                    severity="error"
                    onClose={() => {
                      setAlert({ ...alert, open: false });
                    }}
                  >
                    <AlertTitle>{alert.type}</AlertTitle>
                    Error al {alert.request} cliente:{" "}
                    <strong>{alert.message}</strong>
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={alert.type === "Realizado" && alert.open}
                  autoHideDuration={5000}
                  onClose={() => setAlert({ ...alert, open: false })}
                >
                  <Alert
                    severity="success"
                    onClose={() => {
                      setAlert({ ...alert, open: false });
                    }}
                  >
                    <AlertTitle>{alert.type}</AlertTitle>
                    Cliente {alert.request} con exito:{" "}
                    {/* <strong>{alert.message}</strong> */}
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </Box>
          <DialogNewCliente
            open={openDialogAdd}
            setOpen={setOpenDialogAdd}
            addCliente={Add}
          />
          <DialogEditCliente
            open={openDialogEdit}
            setOpen={setOpenDialogEdit}
            cliente={editedCliente}
            setCliente={setEditedCliente}
            editCliente={Edit}
          />
          <DialogDelete
            id={idDeletedClient}
            title={"Eliminar Cliente"}
            text={"Seguro desea eliminar el cliente?"}
            open={openDialogDelete}
            setOpen={setOpenDialogDelete}
            deleteFunction={Delete}
          />
        </>
      ) : (
        <Navigate to={environment.LOGIN} replace={true}></Navigate>
      )}
    </>
  );
};
