import { createStyles, makeStyles, Theme } from "@material-ui/core";

const ABMTableStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    buttonNew: {
      fontFamily: '"Montserrat", sans-serif',
      color: "#007DC4",
      transition: "0.3s",
      "&:hover": {
        color: "#F6921E",
        backgroundColor: "#F4F4F4",
      },
    },
    filterText: {
      fontFamily: "Montserrat",
      fontSize: "small",
      color: "dimgray",
      fontWeight: "bold",
      padding: "5px",
      marginLeft: "30px",
      marginTop: "0px",
    },
    colorAzul: {
      color: "#007DC4",
      "&:hover": {
        color: "#F6921E",
      },
    },
    colorAprobado: {
      color: "#00c109",
    },
    colorDesaprobado: {
      color: "#FB0000",
    },
    colorPendiente: {
      color: "#F6C32C",
    },
  })
);

export default ABMTableStyles;
