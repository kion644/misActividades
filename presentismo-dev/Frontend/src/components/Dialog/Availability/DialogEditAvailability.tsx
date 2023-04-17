import { useState } from "react";

import { GridCloseIcon } from "@mui/x-data-grid";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import { Dialog, IconButton, TextField, Typography } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { GroupButtonFinished } from "../../SmallerComponents/Buttons/Group/GroupButtonFinished";

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

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children} </Typography>
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

export const DialogEditAvailability = ({
  open,
  availability,
  setOpen,
  setAvailability,
  editAvailability,
}: any) => {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const [diaLunes, setDiaLunes] = useState<boolean>(availability.lunes);
  const [diaMartes, setDiaMartes] = useState<boolean>(availability.martes);
  const [diaMiercoles, setDiaMiercoles] = useState<boolean>(availability.miercoles);
  const [diaJueves, setDiaJueves] = useState<boolean>(availability.jueves);
  const [diaViernes, setDiaViernes] = useState<boolean>(availability.viernes);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAvailability({
      ...availability,
      [name]: value,
    });
    
  };
  const handleChangeLunes = (e: any) => {
    setDiaLunes(!diaLunes);
    const { name, value } = e.target;
    setAvailability({
      ...availability,
      [name]: value,
    });
    
  };
  const handleChangeMartes = (e: any) => {
     setDiaMartes(!diaMartes);
    const { name, value } = e.target;
    setAvailability({
      ...availability,
      [name]: value,
    });
    
  };
  const handleChangeMiercoles = (e: any) => {
     setDiaMiercoles(!diaMiercoles);
    const { name, value } = e.target;
    setAvailability({
      ...availability,
      [name]: value,
    });
    
  };
  const handleChangeJueves = (e: any) => {
     setDiaJueves(!diaJueves);
    const { name, value } = e.target;
    setAvailability({
      ...availability,
      [name]: value,
    });
    
  };
  const handleChangeViernes = (e: any) => {
     setDiaViernes(!diaViernes);
    const { name, value } = e.target;
    setAvailability({
      ...availability,
      [name]: value,
    });
    
  };

 

  async function handleClickFinish() {
    handleClose();
    editAvailability(availability);
  }

  return (
    <>
      <Dialog open={open} aria-labelledby="customized-dialog-title">
        <div className={classes.titulo}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Editar disponibilidad
          </DialogTitle>
        </div>
        <DialogContent  dividers>
          
          <TextField
            disabled
            name="usuario"
            margin="dense"
            label="Usuario"
            value={availability.usuario}
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogContent  dividers>
            <TextField
              name="hs_diarias"
              margin="dense"
              label="Disponibilidad diaria"
              value={availability.hs_diarias}
              type="text"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              required
            >
            </TextField>
          </DialogContent>
          <DialogContent>
            <FormGroup >
          
              <FormControlLabel name="lunes" control={
              availability.lunes ? (
              <Checkbox   defaultChecked
              onChange={handleChangeLunes}
              value={diaLunes}
                />) : (
              <Checkbox 
              onChange={handleChangeLunes}
              value={diaLunes} />)}  label="Lunes" />

              <FormControlLabel name="martes" control={
              availability.martes ? (
              <Checkbox  defaultChecked
              onChange={handleChangeMartes}
              value={diaMartes}
                />) : (
                <Checkbox 
                onChange={handleChangeMartes}
                value={diaMartes} />)} label="Martes" />

                <FormControlLabel name="miercoles" control={
              availability.miercoles ? (
              <Checkbox defaultChecked
              onChange={handleChangeMiercoles}
              value={diaMiercoles}
                />) : (
                <Checkbox 
                onChange={handleChangeMiercoles}
                value={diaMiercoles} />)} label="Miercoles" />

                <FormControlLabel name="jueves" control={
              availability.jueves ? (
              <Checkbox defaultChecked
              onChange={handleChangeJueves}
              value={diaJueves}
                />) : (
                <Checkbox
                onChange={handleChangeJueves}
                value={diaJueves} />)} label="Jueves" />

                <FormControlLabel name="viernes" control={
              availability.viernes ? (
              <Checkbox defaultChecked
              onChange={handleChangeViernes}
              value={diaViernes}
                />) : (
                <Checkbox
                onChange={handleChangeViernes}
                value={diaViernes} />)} label="Viernes" />
             </FormGroup>
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
