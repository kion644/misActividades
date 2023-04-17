import {
  Card,
  CardHeader,
  Chip,
  Grid,
  makeStyles,
  Slide,
  Snackbar,
  Theme,
  Typography,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { environment } from "../../enviroment/enviroment";
import {licencia} from '../../models/Licencia'
import obtenerLicencias from "../../services/AbmLicencias/obtenerLicencias";
import DialogViewResumen from "../Dialog/Licenses/DialogViewResumen";
import DateRangePicker from "../SmallerComponents/Buttons/Pickers/DateRangePicker";
import DateRangePickerHasta from "../SmallerComponents/Buttons/Pickers/DateRangePickerHasta";
import UploadButtons from "../SmallerComponents/Buttons/Upload/Upload";
import { SelectProyectosLicencia } from "../SmallerComponents/Select/SelectProyectosLicencia";
import CustomizedSteppers from "../SmallerComponents/Stepper/Stepper";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  barra: {
    backgroundColor: "#007DC4",
  },
  cardLicencia: {
    height: "280px",
    width: "280px",
  },
  scroll: {
    height: "280px",
    width: "280px",
    overflowY: "scroll",
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
  principal: {
    paddingLeft: "5%",
  },
  stepper: {
    paddingRight: "3%",
  },
  licenciaText: {
    marginLeft: "45px",
    height: "200px",
    width: "236px",
    overflowY: "scroll",
  },
  chip: {
    marginLeft: "500%",
  },
}));

export default function Licencias() {
  const classes = useStyles();
  const [value, setValue] = useState<string | undefined>("");
  const [dateDesde, setDateDesde] = useState(new Date());
  const [dateHasta, setDateHasta] = useState(new Date());
  const [licencia, setLicencia] = useState(false);
  const [resumen, setResumen] = useState(false);
  const [subir, setSubir] = useState(false);
  const [boolRadio, setBoolRadio] = useState(false);
  const [cardTwo, setCardTwo] = useState(false);
  const [fase, setFase] = useState<number>(0);
  const [dias, setDias] = useState(0);
  const [diasA, setDiasA] = useState(0);
  const [diasL, setDiasL] = useState(2);
  const [pasos, setPasos] = useState(["Licencia"]);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [disabledButton, setDisabledbutton] = useState(true);
  const [file, setFile] = useState<FormData | undefined>();
  const [licencias, setLicencias] = useState<licencia[]>([]);
  const [popUpVeiw, setPopUpVeiw] = useState(false);
  const navegate = useNavigate();
  const [label, setLabel] = useState("");
  const [nameFile, setNameFile] = useState("");

  
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
  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
  }

  // useEffect(() => {

  //     async function loadDetails() {
  //         console.log('FILE:' + file)
  //         const response: any = await CargaArchivos(file)
  //         try {
  //             if (response.status === 201) {
  //                 console.log('cargue los datos')
  //             }
  //         } catch (error) {

  //         }

  //     }
  //     if (file) {

  //         loadDetails()
  //     }
  // }, [file])

  useEffect(() => {
    if (label != "") {
      setDisabledbutton(false);
    }
    switch (label) {
      case "v": {
        setDiasL(365);
        setPasos(["Licencia", "Rango de días"]);
        break;
      }

      default: {
        setDiasL(365);
        setPasos(["Licencia", "Rango de días", "Carga de archivo"]);
        break;
      }
    }
  }, [label]);

  useEffect(() => {
    async function estado() {
      const response: any = await obtenerLicencias();

     setLicencias(response);
     licencias.sort();
    }
    estado();
  }, []);

  useEffect(() => {
    switch (fase) {
      case 0: {
        setLicencia(false);
        setBoolRadio(false);

        break;
      }
      case 1: {
        setLicencia(true);
        setBoolRadio(true);
        setCardTwo(false);
        setResumen(false);
        setSubir(false);

        break;
      }
      case 2: {
        setSubir(true);
        break;
        // if (pasos.length === 3) {
        //     setResumen(true);
        //     setCardTwo(true)
        //     break;
        // }
        // else {
        //     setResumen(false)
        //     setSubir(true)
        //     break;
        // }
      }
    }
    // if(value !==''){
    //     setLicencia(true);
    //     setBoolRadio(true);
    //     setFase(1);
    // }
  }, [fase]);
  useEffect(() => {
    let diasCount =
      Math.round((dateHasta.getTime() - dateDesde.getTime()) / 3600000 / 24) +
      1;

    if (diasCount > diasL) {
      setMensaje("Superó el limite de días disponibles");
      setOpenError(true);
    } else if (diasCount <= 0) {
      setMensaje("Fecha incorrecta");
      setOpenError(true);
    } else {
      setDiasA(diasCount);
      setOpenError(false);
    }
  }, [dateHasta]);

  useEffect(() => {
    let diff = diasL - diasA;

    if (diff >= 0) {
      setDias(diasL - diasA);
    }
  }, [diasA, diasL]);
  useEffect(() => {
    setDateHasta(dateDesde);
  }, [dateDesde]);
  const handleClose = () => {
    setOpen(false);
    setOpenError(false);
    navegate(environment.HOME);
  };
  const handleCloseError = () => {
    setOpen(false);
    setOpenError(false);
  };

  function sumarFecha(dias: number) {
    let fecha = new Date(dateDesde);
    fecha.setDate(dateDesde.getDate() + dias);
    return fecha;
  }

  const popUpBitacoraVeiw = () => {
    if (popUpVeiw === true) {
      return (
        <DialogViewResumen
          setCerrar={setPopUpVeiw}
          label={label}
          desde={dateDesde}
          hasta={dateHasta}
          dias={diasA}
          file={file}
          setMensaje={setMensaje}
          setOpen={setOpen}
          setOpenError={setOpenError}
          value={value}
          archivo={nameFile}
          setAlert={setAlert}
        ></DialogViewResumen>
      );
    }
  };

  async function enviar() {
    setPopUpVeiw(true);
  }
  return (
    <>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        className={classes.principal}
      >
        <Grid item xs={12} md={3} lg={3}>
          <Card className={classes.cardLicencia}>
            <Grid item xs={12}>
              <CardHeader
                title={<Typography>Licencias</Typography>}
                className={classes.cardHeader}
              />
            </Grid>

            <Grid item xs={12} className={classes.licenciaText}>
              <SelectProyectosLicencia
                data={licencias}
                value={value}
                setValue={setValue}
                disable={boolRadio}
                setLabel={setLabel}
                label={label}
              ></SelectProyectosLicencia>
              {/* <RadioButtonsGroupGeneric
                                // data={licencia}
                                data={licencias}
                                value={value}
                                setValue={setValue}
                                disable={boolRadio}
                                setLabel={setLabel}
                                label={label} /> */}
            </Grid>
          </Card>
        </Grid>
        {licencia ? (
          <Grid
            item
            xs={12}
            md={3}
            lg={3}
            justifyContent="center"
            alignItems="center"
          >
            <Card className={classes.cardLicencia}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12}>
                  <CardHeader
                    disableTypography
                    title={<Typography>Días de licencia</Typography>}
                    className={classes.cardHeader}
                  />
                </Grid>
                {/* <Grid item xs={6} className={classes.chip} >
                                    <Chip label={"Días disponibles " + dias} color="primary" disabled={cardTwo} />
                                </Grid> */}

                <Grid item xs={1}>
                  <Chip
                    label={"Días a pedir " + diasA}
                    color="primary"
                    disabled={cardTwo}
                    className={classes.chip}
                  />
                </Grid>

                <Grid item xs={12}>
                  <DateRangePicker
                    propDate={dateDesde}
                    setDate={setDateDesde}
                    title={"Desde"}
                    maxDate={sumarFecha(365)}
                    disable={cardTwo}
                  ></DateRangePicker>
                </Grid>
                <Grid item xs={12}>
                  <DateRangePickerHasta
                    propDate={dateHasta}
                    setDate={setDateHasta}
                    title={"Hasta"}
                    maxDate={sumarFecha(diasL - 1)}
                    minDate={dateDesde}
                    disable={cardTwo}
                  ></DateRangePickerHasta>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ) : (
          <></>
        )}
        {subir ? (
          <Grid
            item
            xs={12}
            md={3}
            lg={3}
            justifyContent="center"
            alignItems="center"
          >
            <Card className={classes.cardLicencia}>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <CardHeader
                    disableTypography
                    title={
                      <Typography>Carga de Archivo {"(Opcional)"}</Typography>
                    }
                    className={classes.cardHeader}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <UploadButtons
                    files={file}
                    setFile={setFile}
                    label={nameFile}
                    setLabel={setNameFile}
                  ></UploadButtons>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        className={classes.stepper}
      >
        <Grid item xs={12}>
          <CustomizedSteppers
            fase={fase}
            setFase={setFase}
            steps={pasos}
            disableButton={disabledButton}
            handleClic={enviar}
          ></CustomizedSteppers>
        </Grid>
      </Grid>
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
              {alert.request} exitosa:{" "}
              <strong>{alert.message}</strong>
            </Alert>
          </Snackbar>
      {popUpBitacoraVeiw()}
    </>
  );
}
