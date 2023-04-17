import { GridCloseIcon } from "@mui/x-data-grid";
import {createStyles,makeStyles,Theme,withStyles,WithStyles} from "@material-ui/core/styles";
import { Dialog, Grid, IconButton, MenuItem, TextField, Typography } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { autocompleteClasses } from "@mui/material";
import { flexbox } from "@mui/system";
import { GroupButtonFinished } from "../../../SmallerComponents/Buttons/Group/GroupButtonFinished";

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
    text:{
        width: '350px',
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

export const DialogEditRol = ({open,setOpen,rol,setRol,editProyecto}: any) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  async function handleClickFinish() {
    editProyecto(rol);
    handleClose();
  }

  const handleRolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRol({ 
      editedUsername: rol.editedUsername,
      editedApellido: rol.editedApellido,
      editedNombre: rol.editedNombre,
      editedLider: rol.editedLider,
      editedRol: event.target.value
    });
  };

  return (
      <>
            <Dialog open={open} aria-labelledby="customized-dialog-title">
                <div className={classes.titulo}>
                <DialogTitle nombre="customized-dialog-title" onClose={handleClose}>
                    Editar rol
                </DialogTitle>
                </div>
                <DialogContent dividers>
                <Grid container spacing={3} xs={12} >
                    <Grid item xs={8}>
                        <TextField disabled name="apellido" margin="dense" label="Apellido" value={rol.editedApellido} type="text" fullWidth variant="outlined"
                          onChange={(e) => setRol({ ...rol,  editedApellido: e.target.value })}
                        />
                    </Grid>    
                    <Grid item xs={8}>
                        <TextField disabled name="nombre" margin="dense" label="Nombre" value={rol.editedNombre} type="text" fullWidth variant="outlined"
                        onChange={(e) => setRol({ ...rol, editedNombre: e.target.value })}
                        /> 
                    </Grid>
                    <Grid item xs={8}>
                        <TextField disabled name="id_lider" margin="dense" label="Responde a" value={rol.editedLider} type="text" fullWidth variant="outlined"
                            onChange={(e) => setRol({ ...rol, editedLider: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField className={classes.text} id="standard-select-currency" select label="Rol" value={rol.editedRol} onChange={handleRolChange} helperText="Por favor Seleccione rol" >
                            <MenuItem key="COMUN" value="COMUN">Comun</MenuItem>
                            <MenuItem key="LIDER" value="LIDER">Lider</MenuItem>
                            <MenuItem key="ATENCION" value="ATENCION">Atencion</MenuItem>
                            <MenuItem key="ASISTENCIA_ADMINISTRATIVA" value="ASISTENCIA_ADMINISTRATIVA">Asistencia administrativa</MenuItem>
                        </TextField>                    
                    </Grid>
                </Grid>
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
