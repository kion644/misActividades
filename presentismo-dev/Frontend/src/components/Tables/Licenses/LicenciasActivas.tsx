import { useEffect, useState } from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Alert, Skeleton } from "@material-ui/lab";
import { Snackbar, TablePagination } from "@material-ui/core";
import obtenerLicenciasActivas from "../../../services/Licencias/obtenerLicenciasActivas";
import { licencias } from "../../../models/Licencias";
import { formatoFecha } from "../../../function/formatoFecha";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { IconButton } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Tooltip } from "@material-ui/core";
import DialogViewAprobadores from "../../Dialog/Licenses/DialogViewAprobadores";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#007DC4",
      fontFamily: '"Montserrat", sans-serif',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  button: {
    color: "#fff",
    backgroundColor: "#007DC4",
    "&:hover": {
      backgroundColor: "#F6921E",
    },
  },
  colorAprobadores: {
    color: "#007DC4",
    "&:hover": {
      color: "#F6921E",
    },
  },
  colorAprobadoresVacio: {
    color: "#999999",
  },
});

export default function LicenciasActivas() {
  const classes = useStyles();
  const [registroHora, setRegistroHora] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const handleClose = () => {
    setOpen(false);
    setOpenError(false);
    setActualizar(!actualizar);
  };
  const [data, setData] = useState<licencias[]>([]);
  const [aprobadores, setAprobadores] = useState([]);
  const [openAprobadores, setOpenAprobadores] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const popUpAprobadores = () => {
    if (openAprobadores === true) {
      return (
        <DialogViewAprobadores
          setOpenAprobadores={setOpenAprobadores}
          aprobadores={aprobadores}
        ></DialogViewAprobadores>
      );
    }
  };

    useEffect(() => {

        async function loadDetails() {
            const response: any = await obtenerLicenciasActivas()
            try {

                if (response.status === 200) {
                    setData(response.data);
                    setLoading(false);
                }
                else {
                    setRegistroHora({});
                }

            } catch (error) {

            }

        }
        loadDetails();

    }, [actualizar]);

  const fechas = (fecha: any) => {
    const d = new Date(fecha);

    return (
      ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
    );
  };

  const anioMesDia = (fecha: any) => {
    const d = new Date(fecha);

    return (
      d.getFullYear() +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + d.getDate()).slice(-2)
    );
  };

  const filas = () => {
    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row: any) => (
        <StyledTableRow key={row.registroId}>
          <StyledTableCell align="center">{row.usuario}</StyledTableCell>
          <StyledTableCell align="center">{row.nombre} </StyledTableCell>
          <StyledTableCell align="center">
            {formatoFecha(row.fechaDesde)}
          </StyledTableCell>
          <StyledTableCell align="center">
            {formatoFecha(row.fechaHasta)}
          </StyledTableCell>
        </StyledTableRow>
      ));
  };

  const columns: GridColDef[] = [
    {
      field: "usuario",
      headerClassName: "super-app-theme--header",
      headerName: "Usuario",
      sortable: true,

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "nombre",
      headerClassName: "super-app-theme--header",
      headerName: "Licencia por",
      sortable: true,

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "fechaDesde",
      headerClassName: "super-app-theme--header",
      headerName: "Desde",
      sortable: true,

      renderCell: ({ row }): any => {
        return new Date(row.fechaDesde).toLocaleDateString();
      },
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "fechaHasta",
      headerClassName: "super-app-theme--header",
      headerName: "Hasta",
      sortable: true,

      renderCell: ({ row }): any => {
        return new Date(row.fechaHasta).toLocaleDateString();
      },
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "aprobadores",
      headerClassName: "super-app-theme--header",
      headerName: "Aprobadores",
      sortable: false,

      renderCell: ({ row }): any => {
        if (!row.aprobadores) {
          return (
            <div>
              <Tooltip title={"Sin aprobadores"} placement="right">
                <AccountCircleIcon className={classes.colorAprobadoresVacio} />
              </Tooltip>
            </div>
          );
        } else {
          return (
            <div>
              <IconButton
                onClick={() => {
                  setOpenAprobadores(true);
                  setAprobadores(row.aprobadores);
                }}
              >
                <AccountCircleIcon className={classes.colorAprobadores} />
              </IconButton>
            </div>
          );
        }
      },

      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];

  return (
    <>
      {loading ? (
        <div>
          <Skeleton variant="text" />
          <Skeleton variant="rect" />
          <Skeleton variant="rect" />
        </div>
      ) : (
        <>
          <div style={{ display: "flex", width: "100%" }}>
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
                getRowId={(r) => r.idRegistro}
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
                      No hay Licencias Activas
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
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {message}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openError}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              {message}
            </Alert>
          </Snackbar>
        </>
      )}
      {popUpAprobadores()}
    </>
  );
}