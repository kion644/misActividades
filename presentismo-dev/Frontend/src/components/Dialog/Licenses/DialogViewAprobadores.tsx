import React, { useContext, useEffect, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { DataGrid, GridColDef, esES } from "@mui/x-data-grid";
import { formatoFecha } from "../../../function/formatoFecha";
import Context from "../../../hooks/UseContext/Solicitudes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root2: {
      fontFamily: '"Montserrat", sans-serif',
    },
    titulo: {
      backgroundColor: "#007DC4",
      color: "#FFFF",
      fontSize: "100%",
      textAlign: "center",
      fontFamily: '"Montserrat", sans-serif',
    },
    selectAling: {
      marginLeft: "13px",
    },
  })
);
const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const columns: GridColDef[] = [
  {
    field: "usuario",
    headerClassName: "super-app-theme--header",
    headerName: "Usuario",
    sortable: true,
    renderCell: ({ row }): any => {
      return row.aprobador.username;
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
      return row.aprobador.rol.tipo;
    },
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "fecha",
    headerClassName: "super-app-theme--header",
    headerName: "Fecha",
    sortable: true,
    renderCell: ({ row }): any => {

      if(row.fechaAccion != null){
        return formatoFecha(row.fechaAccion);

      }
      else{
        return "Sin procesar"
      }
  
    },
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
];

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

interface prop {
  setOpenAprobadores: (value: boolean) => void;
  aprobadores: Array<any>;
}

export default function DialogViewAprobadores({
  setOpenAprobadores,
  aprobadores,
}: prop) {
  const classes = useStyles();
  const temp = useContext(Context);

  const [array, setArray] = useState<any>([]);

  useEffect(() => {

   setArray(Object.values(aprobadores))



  }, [])



  return (
    <div className={classes.root2}>
      <Dialog
        onClose={() => setOpenAprobadores(false)}
        aria-labelledby="customized-dialog-title"
        open={true}
        maxWidth="xl"
      >
        <div className={classes.titulo}>
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => setOpenAprobadores(false)}
          >
            Aprobadores
          </DialogTitle>
        </div>

        <DialogContent dividers>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ height: "auto", width: "100%" }}>
              <DataGrid
                sx={{
                  width: "400px",
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
                rows={array}
                columns={columns}
                getRowId={(r) => r.id}  
                rowSpacingType="margin"
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                autoHeight={true}
                hideFooter={true}
                hideFooterPagination={true}
                hideFooterSelectedRowCount={true}
                disableSelectionOnClick={true}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
