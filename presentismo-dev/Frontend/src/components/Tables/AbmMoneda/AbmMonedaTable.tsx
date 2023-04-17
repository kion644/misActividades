import { Box, IconButton, Snackbar } from "@material-ui/core";
import { Add, Edit, Delete } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Stack } from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { environment } from "../../../enviroment/enviroment";
import ABMTableStyles from "../../../styles/ABMTable/ABMTableStyles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DialogDelete } from "../../Dialog/GenericDelete/DialogDelete";
import { DialogNewMoneda } from "../../Dialog/AbmMoneda/DialogNewMoneda";
import { DialogEditMoneda } from "../../Dialog/AbmMoneda/DialogEditMoneda";
import getAllMonedas from "../../../services/AbmMoneda/getAllMonedas";
import createNewMoneda from "../../../services/AbmMoneda/createNewMoneda";
import editMoneda from "../../../services/AbmMoneda/editMoneda";
import deleteMoneda from "../../../services/AbmMoneda/deleteMoneda";


export const AbmMonedaTable = () => {
    const classes = ABMTableStyles();
    const [data, setData] = useState<{ nombre: string; id: number; }[]>([]);

    const [editedMoneda, setEditedMoneda] = useState<{
        id: null | number;
        descripcion: null | string;
        abreviatura: null | string;
    }>({
        id: null,
        descripcion: null,
        abreviatura: null
    });

    const [idDeletedMoneda, setIdDeletedMoneda] = useState<number>(0);
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

  async function monedaToData() {
    const newArr: any = await getAllMonedas();
    const data = newArr;
    setData(data);
  }

  useEffect(() => {
    monedaToData();
  }, []);

  const Add = (newDescripcion: string, newAbreviatura: string) => {
    createNewMoneda(newDescripcion,newAbreviatura)
      .then(() => monedaToData())
      .then(() =>
      setAlert({
        type: "Realizado",
        request: "Agregada",
        message: "Moneda agregada",
        open: true
      })
      )
      .catch(() =>
      setAlert({
        type: "Error",
        request: "Agregar",
        message: "Ya existe una moneda con esta descripcion",
        open: true
      })
      );
  };

  const Delete = (id: number) => {
    deleteMoneda(id)
      .then(() => monedaToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "eliminada",
          message: "Moneda eliminada",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "eliminar",
          message: "Posiblemente esta moneda esté asignado a un caso de negocio activo. Verifique que la moneda no esté asignada a ningun caso de negocio",
          open: true,
        })
      ); 
  };

  const Edit = (moneda: { descripcion: string; abreviatura: string; id: number; }) => {
    editMoneda( moneda.id, moneda.descripcion, moneda.abreviatura)
      .then(() => monedaToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "editada",
          message: "Moneda editada",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "editar",
          message: "Posiblemente esta moneda esté asignado a un caso de negocio activo. Verifique que la moneda no esté asignada a ningun caso de negocio",
          open: true,
        })
      );
  };




  const openDialogAñadir = () => {
    if(openDialogAdd){
        return (<>
          <DialogNewMoneda
                        open={openDialogAdd}
                        setOpen={setOpenDialogAdd}
                        addMoneda={Add}
                    />
        </>)
    }

  }

  const openDialogBorrar = () => {
    if(openDialogDelete){
        return(<>
          <DialogDelete
                        id={idDeletedMoneda}
                        title={"Eliminar Moneda"}
                        text={"Seguro desea eliminar la moneda?"}
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
         <DialogEditMoneda
                        open={openDialogEdit}
                        setOpen={setOpenDialogEdit}
                        moneda={editedMoneda}
                        setMoneda={setEditedMoneda}
                        editMoneda={Edit}
                    />
        </>)
    }
  }

  const handleEditClick = (moneda: {
    descripcion:string,
    abreviatura:string,
    id: number}) => {
    setEditedMoneda({ descripcion: moneda.descripcion, abreviatura: moneda.abreviatura, id: moneda.id});
    setOpenDialogEdit(true);
  };

  const handleDeleteClick = (moneda: {
    nombre:string,
    id: number
}) => {
    setIdDeletedMoneda(moneda.id);
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
      field: "abreviatura",
      headerClassName: "super-app-theme--header",
      headerName: "Abreviatura",
      sortable: true,

      renderCell: ({ row }): any => {
        return row.abreviatura;
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
                            <AddCircleIcon /> Nueva moneda
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
                                                No ha creado ninguna moneda
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
                                        Error al {alert.request} la moneda:{" "}
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
                                        Moneda {alert.request} con exito:{" "}
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