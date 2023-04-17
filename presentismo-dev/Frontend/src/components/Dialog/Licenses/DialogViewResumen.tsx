import React, { useEffect, useState } from "react";
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
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Card, Grid } from "@material-ui/core";
import CargaArchivos from "../../../services/File/CargaArchivos";
import nuevaLicencia from "../../../services/Licencias/nuevaLicencia";
import { ButtonPrimary } from "../../SmallerComponents/Buttons/Primary/ButtonPrimary";
import { AxiosError } from "axios";



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
    center: {
      alignItems: "center",
    },
    cardLicencia: {
      height: "280px",
      width: "280px",
      marginLeft: "12%",
    },

    cardHeader: {
      backgroundColor: "#007DC4",
      color: "#FFFF",
      fontSize: "100%",
      textAlign: "center",
      fontFamily: '"Montserrat", sans-serif',
    },
    resumenText: {
      marginLeft: "10px",
      marginTop: "10px",
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

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
interface prop {
  setCerrar: (value: boolean) => void;
  label: string;
  desde: Date;
  hasta: Date;
  dias: number;
  value: string | undefined;
  file: FormData | undefined;
  setMensaje: (value: string) => void;
  setOpen: (value: boolean) => void;
  setOpenError: (value: boolean) => void;
  setAlert: (value: {type: string | null; request: string | null; message: string | null; open: boolean;}) => void;
  archivo: string;
}

export default function DialogViewResumen({
  setCerrar,
  label,
  desde,
  hasta,
  dias,
  value,
  file,
  setMensaje,
  setOpen,
  setOpenError,
  archivo,
  setAlert
}: prop) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(false);
  }, []);

  async function handleClickFinish() {
    setCerrar(false);
  }
 

  const enviar = () => {
    nuevaLicencia(value, desde, hasta, file)
    .then(() => 
    setAlert({
      type: "Realizado",
      request: "Creación de licencia",
      message: "Licencia creada",
      open: true,
    })
    )
    .then(() => {
      setOpen(true);
      setCerrar(false);
    })
    .catch((error: any) => {
      const mensaje = error.response.data.mensaje;
      const estado = error.response.data.estado;
      setAlert({
        type: "Error",
        request: "crear",
        message: mensaje,
        open: true,
      });
    })
  }

  async function cargarArchvio() {
    const response1: any = await CargaArchivos(file);

    if (response1.status === 201) {
      setMensaje("Licencia y archivo adjunto cargados");
      setOpen(true);
      setCerrar(false);
      return;
    } else {
      setMensaje("Ya solicitó una licencia dentro de estas fechas");
      setOpenError(true);
      setCerrar(false);
      return;
    }
  }

  return (
    <div className={classes.root2}>
      {isLoading ? null : (
        <>
          <Dialog
            onClose={handleClickFinish}
            aria-labelledby="customized-dialog-title"
            open={true}
            maxWidth="xl"
          >
            <div className={classes.titulo}>
              <DialogTitle
                id="customized-dialog-title"
                onClose={handleClickFinish}
              >
                Resumen
              </DialogTitle>
            </div>

            <DialogContent dividers className={classes.center}>
              <Card className={classes.cardLicencia}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  className={classes.resumenText}
                >
                  <Grid item xs={12}>
                    <Typography>Tipo de Licencia: {label}</Typography>
                    {/* <Chip label={"Tipo de Lincencia: " + label} color="primary" /> */}
                  </Grid>
                  {archivo != "" ? (
                    <Grid item xs={12}>
                      <Typography>Archivo: {archivo}</Typography>
                    </Grid>
                  ) : null}
                  <Grid item xs={12}>
                    <Typography>Día/s: {dias}</Typography>
                    {/* <Chip label={"Días: " + diasA} color="primary" /> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Desde:{" "}
                      {desde.toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </Typography>
                    {/* <Chip label={"Desde: " + dateDesde.toLocaleDateString("es-ES", { weekday: 'long', day: 'numeric', month: 'long' })} color="primary" /> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Hasta:{" "}
                      {hasta.toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </Typography>
                    {/* <Chip label={"Hasta: " + dateHasta.toLocaleDateString("es-ES", { weekday: 'long', day: 'numeric', month: 'long' })} color="primary" /> */}
                  </Grid>
                </Grid>
              </Card>
            </DialogContent>
            <DialogActions>
              <Grid container className={classes.center} spacing={1}>
                <Grid item xs={6}>
                  <ButtonPrimary
                    text={"Cerrar"}
                    disabled={false}
                    onClick={handleClickFinish}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ButtonPrimary
                    text={"Confirmar"}
                    disabled={false}
                    onClick={enviar}
                  />
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}
