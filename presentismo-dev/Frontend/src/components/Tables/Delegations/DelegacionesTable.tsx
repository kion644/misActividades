import { makeStyles } from "@material-ui/core";
import { Navigate } from "react-router-dom";
import { environment } from "../../../enviroment/enviroment";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Snackbar } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import getAllDelegaciones from "../../../services/Delegaciones/GetAllDelegaciones";
import createNewDelegacion from "../../../services/Delegaciones/CreateNewDelegacion";
import EditDelegacion from "../../../services/Delegaciones/EditDelegacion";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { AxiosError } from "axios";
import deleteDelegacion from "../../../services/Delegaciones/DeleteDelegacion";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { DialogEditDestinatarios } from "../../Dialog/Delegacion/DialogEditDestinatarios";
import { DialogNewDelegation } from "../../Dialog/Delegacion/DialogNewDelegacion";
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
});

export const DelegacionesTable = () => {
  const classes = useStyles();
  const [data, setData] = useState< any []>([]);
  const [editedDelegacion, setEditedDelegacion] = useState<{
    id: null | string;
    accion: null | string;
  }>({
    id: null,
    accion: null,
  });
  const [idDeleteDelegation, setidDeleteDelegation] = useState<number>(0);
  const [UsuariosDestinatarios, setUsuariosDestinatarios] = useState<object>();

  const [listaUsuariosSeleccionados, setListaUsuariosSeleccionados] = useState<Number[]>([]);

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
  
  
 const [openUsuariosDestinatarios, setOpenUsuariosDestinatarios] = useState<boolean>(false);
  const [openDialogAdd, setOpenDialogAdd] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  const [openDialogEdit, setOpenDialogEdit] = useState<boolean>(false);
  const [delegacion, setDelegacion] = useState();

  const DelegacionesToData = async () => {
    setData(await getAllDelegaciones());
  };
  useEffect(() => {
    DelegacionesToData();
  }, []);

  const Add = (accion:string, usuarioDelegado: string,usuarioDestinatarios: [] ) => {
    createNewDelegacion(accion, usuarioDelegado, usuarioDestinatarios)
      .then(() => DelegacionesToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "agregado",
          message: "Delegacion agregada",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "agregar",
          message: "Ya existe una delegacion con este delegado, dirijase a la columna ver destinatarios y modificar",
          open: true,
        })
      );
  };

  const Delete = (id: number) => {
    deleteDelegacion(id)
      .then(() => DelegacionesToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "eliminada",
          message: "Delegacion eliminada",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "eliminar",
          message: "ID de la delegacion no encontrado",
          open: true,
        })
      );
  };

  const Edit = (Delegacion: any, userChecked: Number[]) => {
    EditDelegacion(Delegacion.id, Delegacion.accion, Delegacion.usuarioDelegado.id, userChecked)
      .then(() => DelegacionesToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "editada",
          message: "Delegacion editada",
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
  
  const handleDeleteClick = (Delegacion: any) => {
    setidDeleteDelegation(Delegacion.id);
    setOpenDialogDelete(true);
  };

  const handleUsuariosClick = (delegacion: any) => {
    setDelegacion(delegacion);
    setUsuariosDestinatarios(delegacion.usuarioDestinatario);
    setOpenUsuariosDestinatarios(true);
  };
  
  const columns: GridColDef[] = [
    // {
    //     field: "id",
    //     headerClassName: "super-app-theme--header",
    //     headerName: "Delegacion",
    //     sortable: true,
  
    //     renderCell: ({ row }): any => {
    //       return row.id;
    //     },
  
    //     headerAlign: "center",
    //     align: "center",
    //     flex: 0,
    // },
    {
        field: "row",
        headerClassName: "super-app-theme--header",
        headerName: "Delego a",
        sortable: true,
  
        renderCell: ({ row }): any => {
          return `${row.usuarioDelegado.apellido}, ${row.usuarioDelegado.nombre}`
        },
  
        headerAlign: "center",
        align: "center",
        flex: 1,
    },
    {
        field: "accion",
        headerClassName: "super-app-theme--header",
        headerName: "Acciones",
        sortable: true,

        renderCell: ({ row }): any => {
            let accion = "";
            switch (row.accion) {
              case 'LICENCIAS':
                accion ="Licencias";
                break;
              case 'CAMBIO_HORARIO':
                accion ="Cambios de Horarios";
                break;
            
              default:
                break;
            }
            
            return accion;
        },

        headerAlign: "center",
        align: "center",
        flex: 1,
    },
    {
      field: "fechaCreacion",
      headerClassName: "super-app-theme--header",
      headerName: "Fecha de creacion",
      sortable: true,

      renderCell: ({ row }): any => {
        return new Date (row.fechaCreacion).toLocaleDateString();
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "usuario",
      headerClassName: "super-app-theme--header",
      headerName: "Ver destinatarios",
      sortable: false,

      renderCell: ({ row }): any => {
        return (
          <IconButton onClick={() => handleUsuariosClick(row)}>
            <VisibilityIcon style={{ color: "#007DC4" }} />
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
          
          <IconButton
            style={{ fontFamily: '"Montserrat", sans-serif', color: "#007DC4" }}
            onClick={() => {
              setOpenDialogAdd(true);
            }}
          >
            <AddCircleIcon /> Delegacion
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
            }}
          >
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "small",
                textAlign: "center",
                color: "dimgray",
                fontWeight: "bold",
                marginLeft: "35px",
                padding: "5px",
                borderRadius: "3px",
              }}
            >
              Para establecer filtros posicione el mouse sobre el titulo el cual
              desea filtrar, haga click en los tres puntos y luego en filtro
            </p>
          </div>
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
                //getRowId={(r) => r.delegacion.id}
                pageSize={10}
                rowSpacingType="margin"
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                components={{
                  NoRowsOverlay: () => (
                    <Stack
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      No hay Delegaciones
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
                  Error al {alert.request} delegacion:{" "}
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
                  Delegacion {alert.request} con exito:{" "}
                  <strong>{alert.message}</strong>
                </Alert>
              </Snackbar>
            </div>
          </div>
          <DialogNewDelegation
            open={openDialogAdd}
            setOpen={setOpenDialogAdd}
            addDelegacion={Add}
          />
          <DialogDelete
            id={idDeleteDelegation}
            title={"Eliminar delegacion"}
            text={"Seguro desea eliminar la delegacion ?"}
            open={openDialogDelete}
            setOpen={setOpenDialogDelete}
            deleteFunction={Delete}
          />
          <DialogEditDestinatarios
            id={idDeleteDelegation}
            title={" delegacion"}
            text={" la delegacion ?"}
            open={openUsuariosDestinatarios}
            setOpen={setOpenUsuariosDestinatarios}
            delegacion={delegacion}
            addDelegacion={Edit}
          />
        </>
      ) : (
        <Navigate to={environment.LOGIN} replace={true}></Navigate>
      )}
    </>
  );
};
