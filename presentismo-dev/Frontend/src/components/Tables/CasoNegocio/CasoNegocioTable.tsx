import { Box, IconButton, Snackbar } from "@material-ui/core";
import { Add, Edit, Delete } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Stack } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { environment } from "../../../enviroment/enviroment";
import asociarCasoNegocioAProyecto from "../../../services/AbmCasoNegocio/asociarCasoNegocioAProyecto";
import createNewCasoNegocio from "../../../services/AbmCasoNegocio/createNewCasoNegocio";
import deleteCasoNegocio from "../../../services/AbmCasoNegocio/deleteCasoNegocio";
import editCasoNegocio from "../../../services/AbmCasoNegocio/editCasoNegocio";
import getAllCasosNegocio from "../../../services/AbmCasoNegocio/getAllCasosNegocio";
import ABMTableStyles from "../../../styles/ABMTable/ABMTableStyles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DialogDelete } from "../../Dialog/GenericDelete/DialogDelete";
import { DialogEditCasoNegocio } from "../../Dialog/CasoNegocio/DialogEditCasoNegocio";
import { DialogNewCasoNegocio } from "../../Dialog/CasoNegocio/DialogNewCasoNegocio";


export const CasoNegocioTable = () => {
    const classes = ABMTableStyles();
    const [data, setData] = useState<{ nombre: string; id: number; }[]>([]);

    const [editedCasoNegocio, setEditedCasoNegocio] = useState<{
        id: null | number;
        nombre: null | string;
        idMoneda: null | number;
    }>({
        id: null,
        nombre: null,
        idMoneda: null
    });

    const [idDeletedCasoNegocio, setIdDeletedCasoNegocio] = useState<number>(0);
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

  async function casosNegocioToData() {
    const newArr: any = await getAllCasosNegocio();
    const data = newArr;
    setData(data);
  }

  useEffect(() => {
    casosNegocioToData();
  }, []);

  const Add = (newNombre: string, newMoneda: string) => {
    createNewCasoNegocio(newNombre , newMoneda)
      .then(() => casosNegocioToData())
      .then(() =>
      setAlert({
        type: "Realizado",
        request: "Agregado",
        message: "Caso de negocio agregado",
        open: true
      })
      )
      .catch(() =>
      setAlert({
        type: "Error",
        request: "Agregar",
        message: "Ya existe un caso de negocio con este nombre",
        open: true
      })
      );
  };

  const Delete = (id: number) => {
    deleteCasoNegocio(id)
      .then(() => casosNegocioToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "eliminado",
          message: "Caso de negocio eliminado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "eliminar",
          message: "Posiblemente este caso de negocio esté asignado a un proyecto activo. Verifique que el caso de negocio no esté asignado a ningun proyecto",
          open: true,
        })
      ); 
  };

  const Edit = (casoNegocio: { nombre: string;  id: number; },newMoneda: number) => {
    editCasoNegocio( casoNegocio.id, casoNegocio.nombre , newMoneda)
      .then(() => casosNegocioToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "editado",
          message: "Caso de negocio editado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "editar",
          message: "Posiblemente este caso de negocio esté asignado a un proyecto activo. Verifique que el caso de negocio no esté asignado a ningun proyecto",
          open: true,
        })
      );
  };




  const openDialogAñadir = () => {
    if(openDialogAdd){
        return (<>
          <DialogNewCasoNegocio
                        open={openDialogAdd}
                        setOpen={setOpenDialogAdd}
                        addCasoNegocio={Add}
                    />
        </>)
    }

  }

  const openDialogBorrar = () => {
    if(openDialogDelete){
        return(<>
          <DialogDelete
                        id={idDeletedCasoNegocio}
                        title={"Eliminar Caso de Negocio"}
                        text={"Seguro desea eliminar el caso de negocio?"}
                        open={openDialogDelete}
                        setOpen={setOpenDialogDelete}
                        deleteFunction={Delete}
                    />
        </>)
    }

  }

  const openDialogEditar = () => {
    if(openDialogEdit){
        return (<>
         <DialogEditCasoNegocio
                        open={openDialogEdit}
                        setOpen={setOpenDialogEdit}
                        casoNegocio={editedCasoNegocio}
                        setCasoNegocio={setEditedCasoNegocio}
                        editCasoNegocio={Edit}
                    />
        </>)
    }
  }

  const handleEditClick = (casoNegocio: {
    nombre:string,
    idMoneda: number,
    id: number}) => {
    setEditedCasoNegocio({ nombre: casoNegocio.nombre, id: casoNegocio.id, idMoneda: casoNegocio.idMoneda});
    setOpenDialogEdit(true);
  };

  const handleDeleteClick = (casoNegocio: {
    nombre:string,
    id: number
}) => {
    setIdDeletedCasoNegocio(casoNegocio.id);
    setOpenDialogDelete(true);
  };

  const columns: GridColDef[] = [
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
                    <Box p={3}>
                        <IconButton
                            className={classes.buttonNew}
                            onClick={() => {
                                setOpenDialogAdd(true);
                            }}
                        >
                            <AddCircleIcon /> Nuevo caso de negocio
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
                                                No ha creado ningun caso de negocio
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
                                        Error al {alert.request} el caso de negocio:{" "}
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
                                        Caso de negocio {alert.request} con exito:{" "}
                                        <strong>{alert.message}</strong>
                                    </Alert>
                                </Snackbar>
                            </div>
                        </div>
                    </Box>
                  {openDialogAñadir()}
                  {openDialogEditar()}
                  {openDialogBorrar()}
                   
                  

                </>
            ) : (
                <Navigate to={environment.LOGIN} replace={true}></Navigate>
            )}
        </>
    );
}