import { createStyles, makeStyles, Theme } from "@material-ui/core";

const DialogStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    titulo: {
      backgroundColor: "#007DC4",
      color: "#FFFF",
      fontSize: "100%",
      textAlign: "center",
      fontFamily: '"Montserrat", sans-serif',
    },
    content: {
      display: "flex",
      "& > *": {
        flex: 1,
      },
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    cancelButton: {
      color: "#FFFF",
      fontSize: "16px",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      textTransform: "none",
      width: "90%",
      minWidth: "190px",
      padding: "2px",
      backgroundColor: "#007DC4",
      "&:hover": {
        backgroundColor: "#F6921E",
      },
    },
    deleteButton: {
      color: "#FFFF",
      fontSize: "16px",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      textTransform: "none",
      width: "90%",
      minWidth: "190px",
      padding: "2px",
      backgroundColor: "#007DC4",
      "&:hover": {
        backgroundColor: "#FB0000",
      },
    },
  })
);

export default DialogStyles;
