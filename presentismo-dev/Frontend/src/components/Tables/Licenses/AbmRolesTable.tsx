import { makeStyles } from "@material-ui/core";
import { Navigate } from "react-router-dom";
import { environment } from "../../../enviroment/enviroment";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { AxiosError } from "axios";
import getAllusuarios from "../../../services/AbmRoles/GetAllUsuarios";
import EditRoles from "../../../services/AbmRoles/EditRoles";
import { DialogEditRol } from "../../Dialog/Licenses/Roles/DialogEditRol";

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

export const AbmRolesTable = () => {
  const classes = useStyles();
  const [data, setData] = useState< any []>([]);
  const [editRol, setEditRol] = useState<{
      editedUsername: null | string,
      editedApellido: null | string,
      editedNombre: null | string,
      editedLider: null | string,
      editedRol: null | string,
  
    }>({
      editedUsername: null,
      editedApellido: null,
      editedNombre: null,
      editedLider: null,
      editedRol: null,
  
    });


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
  
  const [openDialogEdit, setOpenDialogEdit] = useState<boolean>(false);
  const [rol, setRol] = useState();

  const RolesToData = async () => {
    setData(await getAllusuarios());
  };
  useEffect(() => {
    RolesToData();
  }, []);

  const Edit = (rol: any) => {
    EditRoles({ username: rol.editedUsername, role: rol.editedRol })
      .then(() => RolesToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "editada",
          message: "Rol editado",
          open: true,
        })
      )
      .catch((reason: AxiosError) => {
        if (reason.response?.status === 500) {
          setAlert({
            type: "Error",
            request: "editar",
            message: " El usuario no tiene rol comun",
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

  const handleUsuariosClick = (rol: any) => {
    setEditRol({ 
      editedUsername: rol.username,
      editedApellido: rol.apellido,
      editedNombre: rol.nombre,
      editedLider: rol == null || rol.lider == null ? "No tiene lider" : `${rol.lider.apellido}, ${rol.lider.nombre}`,
      editedRol: rol == null || rol.rol == null ? "No tiene rol" : rol.rol.tipo,
    
    });
    setOpenDialogEdit(true);
    
  };
  
  const columns: GridColDef[] = [
    {
        field:"apellido",
        headerClassName: "super-app-theme--header",
        headerName: "Apellido",
        sortable: true,
  
        renderCell: ({ row }): any => {
          return (row.apellido);
        },
  
        headerAlign: "center",
        align: "center",
        flex: 1,
    },
    {
      field:"nombre",
      headerClassName: "super-app-theme--header",
      headerName: "Nombre",
      sortable: true,

      renderCell: ({ row }): any => {
        return (row.nombre);
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
  },
    {
      field: "username",
      headerClassName: "super-app-theme--header",
      headerName: "Usuario",
      sortable: true,

      renderCell: ({ row }): any => {
        return (row.username);
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "rol",
      headerClassName: "super-app-theme--header",
      headerName: "Rol",
      sortable: true,

      renderCell: ({ row }): any => {
        if(row == null || row.rol == null){
          return "-";
        }
        else{
          let rol = "";
          switch (row.rol.tipo) {
            case 'COMUN':
              rol ="Comun";
              break;
            case 'LIDER':
              rol ="Lider";
              break;
            case 'ATENCION':
              rol ="Atencion";
              break;
            case 'ASISTENCIA_ADMINISTRATIVA':
              rol ="Asistencia administrativa";
              break;      
          
            default:
              break;
          }
          
          return rol;
        }
        
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "lider.apellido",
      headerClassName: "super-app-theme--header",
      headerName: "Responde a",
      sortable: true,

      renderCell: ({ row }): any => {
        if(row == null || row.lider == null){
          return "-";
        }
        else{return  `${row.lider.apellido}, ${row.lider.nombre}`;}
        
        ;
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "usuario",
      headerClassName: "super-app-theme--header",
      headerName: "Editar",
      sortable: false,

      renderCell: ({ row }): any => {
        return (
          <IconButton onClick={() => handleUsuariosClick(row)}>
            <EditIcon style={{ color: "#007DC4" }} />
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
                getRowId={(r) => r.id}
                pageSize={30}
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
          <DialogEditRol
              open={openDialogEdit}
              setOpen={setOpenDialogEdit}
              rol={editRol}
              setRol={setEditRol}
              editProyecto={Edit}
            />
        </>
      ) : (
        <Navigate to={environment.LOGIN} replace={true}></Navigate>
      )}
    </>
  );
};
