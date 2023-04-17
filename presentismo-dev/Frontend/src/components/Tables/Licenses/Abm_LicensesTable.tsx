import { makeStyles } from "@material-ui/core";
import { Navigate } from "react-router-dom";
import { environment } from "../../../enviroment/enviroment";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { FormControlLabel, FormGroup, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Snackbar, Box } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import obtenerLicencias from '../../../services/AbmLicencias/obtenerLicencias';
import createNewLicense from "../../../services/AbmLicencias/createNewLicense";
import changeState from "../../../services/AbmLicencias/changeState";
import deleteLicense from '../../../services/AbmLicencias/DeleteLicense';
import editLicence from '../../../services/AbmLicencias/editLicense';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import ABMTableStyles from "../../../styles/ABMTable/ABMTableStyles";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from '@mui/icons-material/Close';

import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import { DialogDelete } from "../../Dialog/Fase/DialogDeleteFase";
import { DialogEditLicense } from "../../Dialog/Licenses/DialogEditLicense";
import { DialogNewLicense } from "../../Dialog/Licenses/DialogNewLicense";
import { DialogChangeState } from "../../Dialog/Licenses/DialogChangeState";
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
  addButton: {
    display: "flex",
    alignItems: "center",
    
    border: 0,
    "&:hover": {
      cursor: "pointer",
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

export const AbmLicensesTable = () => {
  const classes = ABMTableStyles();
  const [data, setData] = useState<{ descripcion: string; nombre:string; tipoProyecto: string; estado: string; id: number ; clienteId: number ; }[]>([]);
  const [editedLicense, setEditedLicense] = useState<{
    id: null | number;
    descripcion: null | string;
    nombre: null | string;
    clienteId: null | number;
    tipoproyecto: null | string;
    estado: null | string;
  }>({
    id: null,
    clienteId: null,
    descripcion: null ,
    nombre: null ,
    tipoproyecto: null ,
    estado: null ,
  });
  const [idDeletedLicense, setIdDeletedLicense] = useState<number>(0);
  const [idChangeState, setIdChangeState] = useState<number>(0);
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
  const [openDialogChangeState, setOpenDialogChangeState] = useState<boolean>(false);
  const [openDialogEdit, setOpenDialogEdit] = useState<boolean>(false);
  const [checked, setChecked] = useState(true);

  async function licensesToData() {
    const newArr: any = await obtenerLicencias()
    const data = newArr
    setData (data);
}
useEffect(() => {
  licensesToData();

},[]);

  const Add = (
    newDescripcion: string,
    newNombre: string,
    newtipoProyecto: string,
    newEstado: string,
    newClienteId: number
    ) => {
    createNewLicense(newDescripcion,newNombre, newtipoProyecto, newEstado, newClienteId, )
      .then(() => licensesToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "agregado",
          message: "Tipo de licencia agregado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "agregar",
          message: "Ya existe un tipo de licencia con este nombre",
          open: true,
        })
      );
  };

  const Delete = (id: number) => {
    deleteLicense(id)
      .then(() => licensesToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "eliminado",
          message: "Tipo de licencia eliminado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "eliminar",
          message: "Posiblemente existan registros o fases con esta licencia proyecto. Verifique que estos registros o fases se hayan eliminado previamente",
          open: true,
        })
      ); 
  };

  const Edit = (license: { descripcion: string; nombre: string; tipoproyecto: string; estado: string; clienteId: number;id: number; }) => {
    editLicence(license.descripcion, license.nombre, license.tipoproyecto, license.estado, license.clienteId,license.id,)
      .then(() => licensesToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "editado",
          message: "Tipo de licencia editado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "editar",
          message: "Posiblemente existan registros vigentes con esta licencia. No se ha podido editar.",
          open: true,
        })
      );
  };
  const handleChangeState = (license : {
    id:number
  }) => {
    setIdChangeState(license.id);
    setOpenDialogChangeState(true);
  };
  const CambiarEstado = (id:number) => {
    changeState(id)
      .then(() => licensesToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "modificado",
          message: "Estado cambiado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "modificar",
          message: "No se realizo el cambio de estado",
          open: true,
        })
      );
  }
  const handleEditClick = (license: {
    descripcion:string,
    nombre:string,
    tipoproyecto: string,
    estado: string,
    id: number,
    clienteId:number }) => {
    setEditedLicense({ descripcion: license.descripcion, nombre: license.nombre, tipoproyecto: license.tipoproyecto, estado: license.estado, id: license.id, clienteId: license.clienteId });
    setOpenDialogEdit(true);
  };

  const handleDeleteClick = (license: {
    descripcion:string,
    nombre:string,
    tipoProyecto: string,
    estado: string,
    id: number  }) => {
    setIdDeletedLicense(license.id);
    setOpenDialogDelete(true);
  };
  

  const columns: GridColDef[] = [
    {
      field: "descripcion",
      headerClassName: "super-app-theme--header",
      headerName: "Descripcion",
      sortable: true,

      renderCell: ({ row }): any => {
        return row.descripcion;
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

      renderCell: ({ row }): any => {
        return row.nombre;
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    // {
    //   field: "tipoproyecto",
    //   headerClassName: "super-app-theme--header",
    //   headerName: "Tipo",
    //   sortable: true,

    //   renderCell: ({ row }): any => {
    //     return row.tipoproyecto;
    //   },

    //   headerAlign: "center",
    //   align: "center",
    //   flex: 1,
    // },
    {
      field: "estado",
      headerClassName: "super-app-theme--header",
      headerName: "Estado",
      sortable: true,

      renderCell: ({ row }): any => {
        return row.estado;
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
      field: "activar",
      headerClassName: "super-app-theme--header",
      headerName: "Cambiar estado",
      sortable: false,

      renderCell: ({ row }): any => {
       
        if (row.estado === "ACTIVO") {
          return (
              <div>
                  <IconButton
                      onClick={() => 
                        handleChangeState(row)
                      }
                  >
                  <CheckIcon  style={{ color: "#007DC4" }} />
                  </IconButton>
              </div>
          );
      } else {
          return (
              <div>
                  <IconButton
                      onClick={() => 
                        handleChangeState(row)
                      }
                  >
                      <CloseIcon  />
                  </IconButton>
              </div>
          );
      }
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
            <Box p={3}>
            <IconButton
              className={classes.buttonNew}
              onClick={() => {
                setOpenDialogAdd(true);
              }}
            >
              <AddCircleIcon /> Nuevo tipo de licencia
            </IconButton>
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

          <div style={{ display: "flex", width: "99%" }}>
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
                      No ha creado ninguna licencia
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
                  Error al {alert.request} tipo de licencia:{" "}
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
                  Tipo de licencia {alert.request} con exito:{" "}
                  <strong>{alert.message}</strong>
                </Alert>
              </Snackbar>
            </div>
          </div>
          </Box>
          <DialogNewLicense
            open={openDialogAdd}
            setOpen={setOpenDialogAdd}
            addLicense={Add}
          />
          <DialogEditLicense
            open={openDialogEdit}
            setOpen={setOpenDialogEdit}
            license={editedLicense}
            setLicense={setEditedLicense}
            editLicense={Edit}
          />
          <DialogDelete
            id={idDeletedLicense}
            title={"Eliminar tipo de licencia"}
            text={"Seguro desea eliminar el tipo de licencia?"}
            open={openDialogDelete}
            setOpen={setOpenDialogDelete}
            deleteFunction={Delete}
          />
          <DialogChangeState
            id={idChangeState}
            title={"Cambiar estado"}
            text={"Seguro desea cambiar el estado de esta licencia?"}
            open={openDialogChangeState}
            setOpen={setOpenDialogChangeState}
            changeFunction={CambiarEstado}
          />
        </>
      ) : (
        <Navigate to={environment.LOGIN} replace={true}></Navigate>
      )}
    </>
  );
};
