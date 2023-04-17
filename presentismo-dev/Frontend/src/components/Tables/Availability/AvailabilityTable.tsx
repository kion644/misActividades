import { Checkbox, makeStyles } from "@material-ui/core";
import { Navigate } from "react-router-dom";
import { environment } from "../../../enviroment/enviroment";
import { DataGrid, GridColDef, esES, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Snackbar } from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import createNewAvailability from "../../../services/Disponibilidad/createNewAvailability";
import editAvailability from "../../../services/Disponibilidad/editAvailability";
import getAvailability from "../../../services/Disponibilidad/getAvailability";
import deleteAvailability from "../../../services/Disponibilidad/deleteAvailability";
import { DialogEditAvailability } from "../../Dialog/Availability/DialogEditAvailability";


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

export const AvailabilityTable = () => {
  const classes = useStyles();
  const [data, setData] = useState<{ usuario: string; hs_diarias:number; lunes:boolean; martes:boolean; miercoles:boolean; jueves:boolean; viernes:boolean }[]>([]);
  const [editedAvailability, setEditedAvailability] = useState<{
    id: null | number;
    usuario: null | string;
    hs_diarias: null | number;
    lunes: null | boolean;
    martes: null | boolean;
    miercoles: null | boolean;
    jueves: null | boolean;
    viernes: null | boolean;
  }>({
    id: null,
    usuario: null ,
    hs_diarias: null ,
    lunes: null,
    martes: null,
    miercoles: null,
    jueves: null,
    viernes: null
});
  const [idDeletedAvailability, setIdDeletedAvailability] = useState<number>(0);
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
  const [checked, setChecked] = useState(true);
  
  async function availabilityToData() {
    const response: any = await getAvailability()
    const data = response.data
    setData (data);
}
useEffect(() => {
  availabilityToData();

},[]);

  const Edit = (availability: { usuario: string; hs_diarias: number; lunes: boolean; martes: boolean; miercoles: boolean; jueves: boolean; viernes: boolean;  id: number }) => {
    editAvailability(availability.usuario, availability.hs_diarias , availability.lunes, availability.martes, availability.miercoles, availability.jueves, availability.viernes , availability.id,)
      .then(() => availabilityToData())
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "editado",
          message: "disponibilidad editada",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "editar",
          message: "ID no encontrado",
          open: true,
        })
      );
  };

  const handleEditClick = (availability: {
    usuario:string,
    hs_diarias:number,
    lunes: boolean,
    martes: boolean, 
    miercoles: boolean,
    jueves: boolean, 
    viernes: boolean;
    id: number }) => {
    setEditedAvailability({ usuario: availability.usuario, hs_diarias: availability.hs_diarias,
    lunes: availability.lunes, martes: availability.martes, miercoles: availability.miercoles, jueves: availability.jueves, viernes: availability.viernes, id: availability.id });
    setOpenDialogEdit(true);
  };

  const columns: GridColDef[] = [
    {
      field: "usuario",
      headerClassName: "super-app-theme--header",
      headerName: "Usuario",
      sortable: true,

      renderCell: ({ row }): any => {
        return row.usuario;
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "hs_diarias",
      headerClassName: "super-app-theme--header",
      headerName: "Diarias",
      sortable: true,

      renderCell: ({ row }): any => {
        return row.hs_diarias;
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "hs_semanales",
      headerClassName: "super-app-theme--header",
      headerName: "Semanales",
      sortable: true,
      

      renderCell: ({ row }): any => {
        return row.semanal;
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "lunes",
      headerClassName: "super-app-theme--header",
      headerName: "Lunes",
      sortable: true,
      type: "boolean",

      renderCell: ({ row }): any => {
        return (row.lunes === true ? <CheckIcon style={{ color: "#007DC4" }} /> : <RemoveIcon />)
        ;
      },

      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "martes",
      headerClassName: "super-app-theme--header",
      headerName: "Martes",
      sortable: true,

      renderCell: ({ row }): any => {
        return (row.martes === true ? <CheckIcon style={{ color: "#007DC4" }} /> : <RemoveIcon />);
        //row.martes;
      },

      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "miercoles",
      headerClassName: "super-app-theme--header",
      headerName: "Miercoles",
      sortable: true,

      renderCell: ({ row }): any => {
        return (row.miercoles === true ? <CheckIcon style={{ color: "#007DC4" }} /> : <RemoveIcon />);
      },

      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "jueves",
      headerClassName: "super-app-theme--header",
      headerName: "Jueves",
      sortable: true,

      renderCell: ({ row }): any => {
        return (row.jueves === true ? <CheckIcon style={{ color: "#007DC4" }} /> : <RemoveIcon />);
      },

      headerAlign: "center",
      align: "center",
      flex: 0.5,
    },
    {
      field: "viernes",
      headerClassName: "super-app-theme--header",
      headerName: "Viernes",
      sortable: false,

      renderCell: ({ row }): any => {
        
        return (row.viernes === true ? <CheckIcon style={{ color: "#007DC4" }} /> : <RemoveIcon />);
      },
      

      headerAlign: "center",
      align: "center",
      flex: 0.5,
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
    }
  ];

  return (
    <>
      {localStorage.getItem("user") !== undefined ? (
        <>
          <button
            className={classes.addButton}
            onClick={() => {
              setOpenDialogAdd(true);
            }}
          >
          </button>
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
                      No ha creado ninguna disponibilidad
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
                  Error al {alert.request} disponibilidad:{" "}
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
                  Dsiponibilidad {alert.request} con exito:{" "}
                  <strong>{alert.message}</strong>
                </Alert>
              </Snackbar>
            </div>
          </div>
          
          <DialogEditAvailability
            open={openDialogEdit}
            setOpen={setOpenDialogEdit}
            availability={editedAvailability}
            setAvailability={setEditedAvailability}
            editAvailability={Edit}
          />
        </>
      ) : (
        <Navigate to={environment.LOGIN} replace={true}></Navigate>
      )}
    </>
  );
};
