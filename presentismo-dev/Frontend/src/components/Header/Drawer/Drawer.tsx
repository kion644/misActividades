import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DehazeIcon from "@material-ui/icons/Dehaze";
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@mui/icons-material/Public";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ReportIcon from "@mui/icons-material/Report";
import cdaLogo from "../../SmallerComponents/Logos/cdaLogo.png";
import { Badge, Collapse, Snackbar, Tooltip } from "@material-ui/core";
import Context from "../../../hooks/UseContext/Solicitudes";
import { useNavigate } from "react-router-dom";
import { environment } from "../../../enviroment/enviroment";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";
import ExportarExcel from "../../../services/Exportar/ExportarExcel";
import { soloFecha } from "../../../function/soloFecha";
import { Alert } from "@material-ui/lab";
import { AxiosError } from "axios";
import { roles } from '../../../enviroment/roles';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Divider from '@mui/material/Divider';


import CantidadSolicitudesBita from "../../../services/Solicitudes/CantidadSolicitudesBita";
import NotificacionesContext from "../../../hooks/UseContext/NotificacionesContext";
import CantidadSolicitudes from "../../../services/Solicitudes/CantidadSolicitudes";
import CantidadSolicitudesLicencias from "../../../services/Solicitudes/CantidadSolicitudesLicencias";
import Skeleton from "@mui/material/Skeleton";

const useStyles = makeStyles({
  list: {
    width: "auto",
    height: "auto",
    backgroundColor: "#fff",

  },
  list2: {
    width: "auto",
    height: "auto",
    backgroundColor: "#fff",

  },
  color: {
    color: "#007DC4",
    backgroundColor: "#FFF",
    "&:hover": {
      backgroundColor: "#F6921E",
    },
    paddingTop: "15px",
    paddingBottom: "15px",
  },
  colorFecha: {
    color: "#007DC4",
    marginLeft: "50px"
  },
  divider: {
    paddingTop: "50px",
  },
  colorSub: {
    color: "#FFF",
    backgroundColor: "#F6921E",
    "&:hover": {
      backgroundColor: "#e07a06",
    },
    paddingTop: "15px",
    paddingBottom: "15px",
  },
  colorSub2: {
    color: "#FFF",
    backgroundColor: "#F6921E",
    "&:hover": {
      backgroundColor: "#e07a06",
    },
    paddingTop: "15px",
    paddingBottom: "15px",

  },
  iconColor: {
    color: "#007DC4",
    width: "32px",
    height: "32px",
  },
  iconSubMenu: {
    color: "#007DC4",
  },

  iconLine: {
    color: "#007DC4",
    "&:hover": {
      color: "#F6921E",
    },
    width: "32px",
    height: "32px",
  },
  deplegableColor: {
    backgroundColor: "white",
    overflow: "disabled",
  },
  section1: {
    backgroundColor: "#fff",
  },
  img: {
    width: "110px",
    marginLeft: "15%",
    marginTop: "5%",
  },
  baged: {
    marginTop: "10px",
  },
  bodyDiv: {
    fontFamily: '"Montserrat", sans-serif',
    width: "100%",
    height: "100%",
    backgroundColor: "#F4F4F4",
  },
  scroll: {
    overflow: "hidden",
  },
});

type Anchor = "left";

export default function Drawer() {
  const classes = useStyles();
  const temp = useContext(Context);
  const [solicitudes] = useState(temp);
  const navigate = useNavigate();
  const [openError, setOpenError] = useState(false);
  const [openSu, setOpenSu] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [state, setState] = React.useState({
    left: false,
  });
  const [open, setOpen] = React.useState(false);
  const [openCda, setOpenCda] = React.useState(false);
  const [openEjecucion, setOpenEjecucion] = React.useState(false);

  const [refrescar, setRefrescar] = useState(false)

  const [notificaciones, setNotificaciones] = useState({
    cambiosDeInicio: 0,
    licenciasNuevas: 0,
    mensajesNuevos: 0,
  });
    const [loading, setLoading] = useState(true);

  const handleClick = () => {
    setOpen(open === true ? false : true);

  };
  useEffect(() => {
    async function obtenerNotificaciones() {
      try {
        const response = await CantidadSolicitudesBita();
        if (response.status === 200) {
          setNotificaciones((notificaciones) => ({
            ...notificaciones,
            mensajesNuevos: response.data,
          }));
        }

        if (localStorage.getItem("301") !== roles.ROLCOMUN) {
          const response2 = await CantidadSolicitudes();
          if (response2.status === 200) {
            setNotificaciones((notificaciones) => ({
              ...notificaciones,
              cambiosDeInicio: response2.data.data.Solicitudes,
            }));
          }
          const response3 = await CantidadSolicitudesLicencias();
          if (response3.status === 200) {
            setNotificaciones((notificaciones) => ({
              ...notificaciones,
              licenciasNuevas: response3.data,
            }));
          }
        }
        setLoading(false);
      } catch (error) {
      }
    }
    obtenerNotificaciones();
  }, [refrescar]);

  const handleClickCda = () => {
    setOpenCda(openCda === true ? false : true);
  };

  const handleClickEjecucion = () => {
    setOpenEjecucion(openEjecucion === true ? false : true);
  };

  const handleClose = () => {
    setOpenSu(false);
    setOpenError(false);
  };

  const closeDrawer = (anchor: Anchor) => {
    setState({ ...state, [anchor]: false });
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }
        setState({ ...state, [anchor]: open });
        setRefrescar(!refrescar)
      };

  const numero = (texto: string | null) => {
    let xx = texto;
    let yy: number = xx == null ? +0 : +xx;
    return yy;
  };

  async function exportExcel() {
    try {
      setMensaje("Por favor aguarde unos instantes, se estan procesando los registros y generando el excel para iniciar la descarga");
      setOpenSu(true);
      const response: any = await ExportarExcel();
      if (response !== undefined) {
        setMensaje("La descarga ha finalizado");
        setOpenSu(true);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          "TimeSheet_" + soloFecha(new Date()) + ".xls"
        );
        document.body.appendChild(link);
        link.click();
      } else if (response.status === 403) {
        localStorage.clear();
        sessionStorage.clear();
        navigate(environment.LOGIN);
        window.location.reload();
        window.location.replace("");
      } else {
        setMensaje("Error al intentar descargar el Excel");
        setOpenError(true);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 403) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
        navigate(environment.LOGIN);
      }
    }
  }

  const subListEjecucion: { name: string; env: string }[] = [
    { name: "Casos de negocio", env: environment.ABM_CN},
    { name: "Clientes", env: environment.ABM_CLIENTS },
    { name: "Delegaciones", env: environment.ABM_DELEGACIONES },
    { name: "Disponibilidad", env: environment.ABM_AVAILABILITY },
    { name: "Feriados", env: environment.ABM_HOLIDAYS },
    { name: "Licencias", env: environment.ABM_LICENSES },
    { name: "Moneda", env: environment.ABM_MONEDA },
    { name: "Proyectos", env: environment.ABM_PROJECTS },
    { name: "Roles", env: environment.ABM_ROLES },
    { name: "Casos de negocio", env: environment.ABM_CN },

  ];

  const listItemDrawer = (
    visibleWord: string,
    color: string,
    onClickFunction: () => void
  ) => {
    return (
      <ListItem
        button
        key={visibleWord}
        className={classes.colorSub2}
        onClick={() => {
          onClickFunction();
        }}
      > <div style={{ marginRight: "33px" }} ></div>
        <ListItemIcon style={{ marginRight: "-30px" }}>
          <NavigateNextIcon className={classes.iconSubMenu} />
        </ListItemIcon>
        <ListItemText style={{ marginRight: "24px" }} primary={visibleWord} />
      </ListItem>
    );
  };

  const list = (anchor: Anchor) => (
    <>
      <div role="presentation" className={classes.deplegableColor}>
        <section className={classes.section1}>
          <img src={cdaLogo} className={classes.img} alt="Logo CDA" />
        </section>
        <List className={classes.list}>
          <ListItem
            button
            key={"Inicio"}
            className={classes.color}
            onClick={() => {
              // localStorage.setItem('301', rol);
              closeDrawer(anchor);
              setOpen(false);
              setOpenCda(false);
              navigate(environment.HOME);
            }}
          >
            <ListItemIcon>
              <HomeIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText>{"Inicio"}</ListItemText>
          </ListItem>

          <ListItem
            button
            key={"Calendario"}
            className={classes.color}
            onClick={() => {
              closeDrawer(anchor);
              setOpen(false);
              setOpenCda(false);
              navigate(environment.CALENDAR);
            }}
          >
            <ListItemIcon>
              <DateRangeIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary={"Calendario"} />
          </ListItem>

          <ListItem
            button
            key={"Solicitudes"}

            className={classes.color}
            onClick={handleClick}
          >
            <ListItemIcon>
              <Badge
                badgeContent={solicitudes.solicitudes}
                color="error"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <ListAltIcon className={classes.iconColor} />
              </Badge>

              <Tooltip title="Tiene solicitudes nuevas">
                <Badge
                  badgeContent={
                    notificaciones.mensajesNuevos != 0 ||
                      notificaciones.cambiosDeInicio != 0 ||
                      notificaciones.licenciasNuevas != 0
                      ? "!"
                      : null
                  }
                  color="error"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                ></Badge>
              </Tooltip>
            </ListItemIcon>
            <ListItemText primary={"Solicitudes"} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <Badge badgeContent={numero(localStorage.getItem("Solicitudes"))} color="error"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}> */}
              <ListItem
                button
                key={"CambioHorarios"}
                className={classes.colorSub}
                onClick={() => {
                  closeDrawer(anchor);
                  setOpen(false);
                  setOpenCda(false);
                  navigate(environment.REQUESTS);
                }}
              > <div style={{ marginRight: "33px" }} ></div>
                <ListItemIcon style={{ marginRight: "-30px" }} >
                  <NavigateNextIcon className={classes.iconSubMenu} />
                </ListItemIcon>
                <ListItemText primary="Cambio de horarios" />
                <Badge
                  badgeContent={notificaciones.cambiosDeInicio}
                  color="error"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                ></Badge>
              </ListItem>

              <ListItem
                button
                key={"Licencias"}
                className={classes.colorSub}
                onClick={() => {
                  closeDrawer(anchor);
                  setOpen(false);
                  setOpenCda(false);
                  navigate(environment.LICENSES);
                }}
              > <div style={{ marginRight: "33px" }} ></div>
                <ListItemIcon style={{ marginRight: "-30px" }}>
                  <NavigateNextIcon className={classes.iconSubMenu} />
                </ListItemIcon>

                <ListItemText primary="Licencias" />
                <Badge
                  badgeContent={notificaciones.licenciasNuevas + notificaciones.mensajesNuevos}
                  color="error"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                ></Badge>

                {/* <Badge badgeContent={localStorage.getItem('Bitas') !== '0' ? true : null } color="error"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
            </Badge> */}
                <Tooltip title="Tiene notificaciones nuevas">
                  <Badge
                    badgeContent={notificaciones.licenciasNuevas + notificaciones.mensajesNuevos}
                    color="error"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  ></Badge>
                </Tooltip>
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            key={"websCda"}
            className={classes.color}
            onClick={handleClickCda}
          >
            <ListItemIcon>
              <PublicIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary={"CDA"} />
            {openCda ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCda} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                key={"WebCda"}
                className={classes.colorSub}
                onClick={() => {
                  window.location.replace("https://www.cdainfo.com/es");
                }}
              ><div style={{ marginRight: "33px" }} ></div><ListItemIcon style={{ marginRight: "-30px" }}>
                  <NavigateNextIcon className={classes.iconSubMenu} />
                </ListItemIcon>
                <ListItemText primary="Web" />
              </ListItem>

              <ListItem
                button
                key={"Intranet"}
                className={classes.colorSub}
                onClick={() => {
                  window.location.replace("https://cdainfo.com/es/intranet");
                }}
              ><div style={{ marginRight: "33px" }}></div><ListItemIcon style={{ marginRight: "-30px" }}>
                  <NavigateNextIcon className={classes.iconSubMenu} />
                </ListItemIcon>
                <ListItemText style={{ marginRight: "87px" }} primary="Intranet" />
              </ListItem>

              <ListItem
                button
                key={"Beneficios"}
                className={classes.colorSub}
                onClick={() => {
                  window.location.replace("https://ar.beneficioscda.com/");
                }}
              ><div style={{ marginRight: "33px" }}></div><ListItemIcon style={{ marginRight: "-30px" }} >
                  <NavigateNextIcon className={classes.iconSubMenu} />
                </ListItemIcon>
                <ListItemText primary="Beneficios" />
              </ListItem>
            </List>
          </Collapse>

          {localStorage.getItem("301") != "COMUN" ? (





            <ListItem
              button
              key={"ejecucion"}
              className={classes.color}
              onClick={handleClickEjecucion}
            >
              <ListItemIcon>
                <AccountCircleIcon className={classes.iconColor} />
              </ListItemIcon>
              <ListItemText primary={"Ejecucion"} />
              {openEjecucion ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          ) : null}



          <Collapse in={openEjecucion} timeout="auto" unmountOnExit>
            <List component="div" disablePadding >
              {subListEjecucion.map((element, index) => {
                return listItemDrawer(element.name, classes.colorSub, () => {
                  closeDrawer(anchor);
                  setOpenEjecucion(false);
                  navigate(element.env);
                });
              })}
            </List>
          </Collapse>
          {localStorage.getItem("301") != "COMUN" ? (
            <ListItem
              button
              key={"Reportes"}
              className={classes.color}
              onClick={() => {
                closeDrawer(anchor);
                setOpen(false);
                setOpenCda(false);
                navigate(environment.REPORTS);
              }}
            >
              <ListItemIcon>
                <ReportIcon className={classes.iconColor} />
              </ListItemIcon>
              <ListItemText primary={"Reportes"} />
            </ListItem>
          ) : null}

          {localStorage.getItem('301') === roles.ROLASISTADMIN ? (
            <ListItem
              button
              key={"Exportar"}
              className={classes.color}
              onClick={() => {
                exportExcel();
              }}
            >
              <ListItemIcon>
                <AssignmentReturnedIcon
                  className={classes.iconColor}
                ></AssignmentReturnedIcon>
              </ListItemIcon>
              <ListItemText primary={"Exportar"} />
            </ListItem>
          ) : (
            <></>
          )}
        </List>
      </div>
      <Snackbar open={openSu} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {mensaje}
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {mensaje}
        </Alert>
      </Snackbar>

      <a href={environment.MANUAL} download="GuiaMisActividades.pdf" >
        <List className={classes.list2}>
          <ListItem className={classes.color}>
            <ListItemIcon>
              <MenuBookIcon
                className={classes.iconColor}
              ></MenuBookIcon>
            </ListItemIcon>
            <ListItemText primary={"Manual"} />
          </ListItem>
        </List>
      </a>
      <Divider className={classes.divider} />
      <ListItemText primary={environment.versionDeploy} className={classes.colorFecha} />

    </>

  );

  let suma = () => {
    if (localStorage.Bitas !== null && localStorage.Solicitudes !== null) {
      let resultado =
        parseInt(localStorage.Bitas) + parseInt(localStorage.Solicitudes);

      if (resultado > 0) {
        return resultado;
      }
    }
  };

  const ToReturn = () => {
    const {cargando, cambiosDeInicio, licenciasNuevas, mensajesNuevos} = useContext(NotificacionesContext);

    return (
    
      <>
        {loading ? 
        <div>
  
        <Skeleton variant="rectangular" />
  
    </div>
        : 
        
        <> 
        <div className={classes.scroll}>
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}>
            <Tooltip title="Menu lateral">
              <Badge
                badgeContent={
                  notificaciones.cambiosDeInicio > 0 || notificaciones.licenciasNuevas > 0 || notificaciones.mensajesNuevos > 0 ? "!" : null
                }
                color="error"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                className={classes.baged}
              >
                <DehazeIcon viewBox="" className={classes.iconLine} />
              </Badge>
            </Tooltip>
          </Button>
  
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </React.Fragment>
      </div>
        </>
        }
      
      </>
    );
  }

  return(
    
      <NotificacionesContext.Provider
        value={{ ...notificaciones, cargando: loading }}
      >
       {ToReturn()}
      </NotificacionesContext.Provider>
    
  )
}
