import { GridCloseIcon } from "@mui/x-data-grid";

import {useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import { Dialog, Divider, IconButton, MenuItem, TextField, Typography } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";
import { fechaHora } from "../../../function/fechaHora";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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

const initialState = {
  fecha: fechaHora(new Date()),
};

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

export interface DialogTitleProps extends WithStyles<typeof styles> {
  nombre: string;
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
          <GridCloseIcon />
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

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const DialogCierreProyecto = ({
  open,
  setOpen,
  proyecto,
  setProyecto,
  setProyectoCierre,
}: any) => {
  const classes = useStyles();
  const [dataForm, setDataForm] = useState(initialState);
  const [comentario , setComentario] = useState<string>("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date: Date | null) => {
    setDataForm({
      ...dataForm,
      fecha: fechaHora(date),
    });
  };

  async function handleClickFinish() {
    handleClose();
    setProyectoCierre({
      fechaCierreProyecto:dataForm.fecha,
      comentarioCierre:comentario,
      id_proyecto:proyecto.id,
      estadoCierre:proyecto.estado
    });
  }



  return (
    <>
      <Dialog open={open} aria-labelledby="customized-dialog-title">
        <div className={classes.titulo}>
          <DialogTitle nombre="customized-dialog-title" onClose={handleClose}>
            Cierre Proyecto
          </DialogTitle>
        </div>
        <DialogContent dividers>

          <TextField
            disabled
            name="nombre"
            margin="dense"
            label="Nombre-proyecto"
            value={proyecto.nombre}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setProyecto({ ...proyecto, nombre: e.target.value })}
          />
          <TextField
            disabled
            name="descripcion"
            margin="dense"
            label="Descripcion"
            value={proyecto.descripcion}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setProyecto({ ...proyecto, descripcion: e.target.value })}
            />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="fecha"
                format="dd/MM/yyyy"
                margin="normal"
                label="fecha de cierre"
                autoOk
                value={dataForm.fecha}
                onChange={(date) => handleDateChange(date)}
              />
          </MuiPickersUtilsProvider>
            <TextField
            select
            name="newEstado"
            margin="dense"
            label="Estado"
            value={proyecto.estado}
            type="text"
            fullWidth
            variant="outlined"
            //onChange={(e) => setNewEstado(e.target.value)}
            onChange={(e) => setProyecto({ ...proyecto, estado: e.target.value })}
            >
              <MenuItem key="FINALIZADO_SIN_EXITO" value={"FINALIZADO_SIN_EXITO"}>Finalizado sin exito</MenuItem>
              <Divider/>
              <MenuItem key="FINALIZADO_CON_EXITO" value={"FINALIZADO_CON_EXITO"}>Finalizado con exito</MenuItem>
            </TextField>
            <TextField
            name="comentario"
            margin="dense"
            label="comentario"
            value={comentario}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setComentario( e.target.value )
            }
          />
        </DialogContent>
        <DialogActions>
          <GroupButtonFinished
            cancelDisable={false}
            finishDisable={false}
            handleClickCancel={handleClose}
            handleClickFinish={handleClickFinish}
          ></GroupButtonFinished>
        </DialogActions>
      </Dialog>
    </>
  );
};
