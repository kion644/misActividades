import { Button, Collapse, Grid, makeStyles } from "@material-ui/core";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Theme } from "@mui/material";
import { useRef, useState } from "react";
import reporteDeHoras from "../../../../services/Exportar/ReporteDeHoras";
import { DialogFacturacion } from "../../../Dialog/Reportes/DialogFacturacion";
import { DialogReporteDeHoras } from "../../../Dialog/Reportes/DialogReporteDeHoras";

const useStyles = makeStyles((theme: Theme) => ({
  page: {
    height: "80vh",
  },
  botones: {
    height: "250px",
  },
  modal: {
    bgcolor: "background.paper",
    border: "2px solid #000",
  },
  icon: {
    color: "#007DC4",

    "&:hover": {
      cursor: "pointer",
    },
  },
  button: {
    backgroundColor: "#007DC4",
    margin: "10px",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#F6921E",
    },
  },
}));

export const Facturacion = () => {
  const [open, SetOpen] = useState(false);
  const [openReporteDeHora, setOpenReporteDeHora] = useState(false);
  const containerRef = useRef(null);
  const classes = useStyles();
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
  const handleClose = () => {
    SetOpen(!open);
    if (openReporteDeHora === true) {
      setOpenReporteDeHora(false);
  }
  };
  const handleOpen = () => {
    setOpenReporteDeHora(!openReporteDeHora);
    if (open === true) {
      SetOpen(false);
    }
  };
  const Add = (proyecto: string,tipoDeFecha: string,tipoDeHora:string,dateDesde: Date, dateHasta: Date) => {
    reporteDeHoras(proyecto,tipoDeFecha,tipoDeHora,dateDesde,dateHasta)
      .then(() =>
        setAlert({
          type: "Realizado",
          request: "agregado",
          message: "Proyecto agregado",
          open: true,
        })
      )
      .catch(() =>
        setAlert({
          type: "Error",
          request: "agregar",
          message: "Ya existe un proyecto con este nombre",
          open: true,
        })
      );
  };
  return (
    <div className={classes.page}>
      <Grid
        className={classes.botones}
        container
        justifyContent="center"
        alignContent="space-around"
        spacing={2}
        ref={containerRef}
      >
        <Button
          size="large"
          className={classes.button}
          variant="contained"
          startIcon={<AssignmentIndIcon />}
          onClick={handleClose}
        >
          Facturacion 1
        </Button>

        <Button
          size="large"
          className={classes.button}
          variant="contained"
          startIcon={<AssignmentIndIcon />}
          onClick={handleOpen}
        >
          Reporte de horas
        </Button>
      </Grid>
      <hr />

      <Collapse in={openReporteDeHora}>
        <DialogReporteDeHoras
        addExport={Add}
        />
      </Collapse>
      <Collapse in={open}>
        <DialogFacturacion 
        />
      </Collapse>
    </div>
  );
};
