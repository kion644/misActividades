import { Button, Collapse, Grid, makeStyles } from "@material-ui/core";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Theme } from "@mui/material";
import { useRef, useState } from "react";
import { DialogFacturacion } from "../../../Dialog/Reportes/DialogFacturacion";

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

export const Personas = () => {
  const [open, SetOpen] = useState(false);
  const containerRef = useRef(null);
  const classes = useStyles();
  const handleClose = () => {
    SetOpen(!open);
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
          Clientes
        </Button>

        <Button
          size="large"
          className={classes.button}
          variant="contained"
          startIcon={<AssignmentIndIcon />}
          onClick={handleClose}
        >
          Empleados
        </Button>
      </Grid>
      <hr />

      <Collapse in={open}>
        <DialogFacturacion />
      </Collapse>
    </div>
  );
};
