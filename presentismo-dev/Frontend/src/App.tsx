import { AppBar, Grid, makeStyles, Toolbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme/themeConfig";
import CantidadSolicitudes from "./services/Solicitudes/CantidadSolicitudes";
import { Component, useContext, useEffect, useState } from "react";
import Context from "./hooks/UseContext/Solicitudes";
import {
  BrowserRouter as Router,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { environment } from "./enviroment/enviroment";

import CantidadSolicitudesBita from "./services/Solicitudes/CantidadSolicitudesBita";

import { roles } from "./enviroment/roles";
import { HomeLeader } from "./components/DayStartChange/HomeLeader";
import { Delegaciones } from "./components/Delegations/Delegaciones";
import { Abm_Licenses } from "./components/Execution/Abm_Licenses/ABM_Licenses";
import { Availability } from "./components/Execution/Availability/Availability";
import { Clients } from "./components/Execution/Clients/Clients";
import { Holidays } from "./components/Execution/Holidays/Holidays";
import { Phases } from "./components/Execution/Phases/Phases";
import { Proyects } from "./components/Execution/Proyects/Proyects";
import { Reports } from "./components/Execution/Reports/Reports";
import { ItemsHeader } from "./components/Header/ItemsHeader/ItemsHeader";
import { Licenses } from "./components/Licenses/Licenses";
import { Working } from "./components/Working/Working";
import { Home } from "./components/Home/Home";
import { HomeReportDay } from "./components/Calendar/HomeReportDay";
import { LoginUser } from "./components/Login/Login";
import { AbmRoles } from "./components/templates/Home/AbmRoles";
import { CasoNegocio } from "./components/CasoNegocio/CasoNegocio";
import { AbmMoneda } from "./components/Moneda/AbmMoneda";
import NotificacionesContext from "./hooks/UseContext/NotificacionesContext";

// import { Routerr } from '@reach/router';
// import React, { Fragment } from 'react';

const useStyles = makeStyles({
  color: {
    backgroundColor: "#fff",
  },
});

function App() {
  const classes = useStyles();
  const notificaciones = useContext(NotificacionesContext);
  const [usuario, setUsuario] = useState(localStorage.getItem("user"));
  let id: any;

  useEffect(() => {
    // async function Cantidad() {
    //   if (localStorage.getItem("301") == roles.ROLLIDER) {
    //     const response: any = await CantidadSolicitudes();
    //     if (response.status === 200) {
    //       localStorage.setItem("Solicitudes", response.data.data.Solicitudes);
    //       // if (localStorage.getItem("Solicitudes") != "0"){
    //       //   audio.play();
    //       // }
    //     }
    //   }
    // }
    // Cantidad();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <HashRouter>
          {usuario != undefined ? (
            <Toolbar className={classes.color}>
              <Grid container>
                <Grid item xs={12}>
                  <AppBar>
                    <ItemsHeader></ItemsHeader>
                  </AppBar>
                </Grid>
              </Grid>
            </Toolbar>
          ) : (
            <></>
          )}

          <Routes>
            <Route path={environment.LOGIN} element={<LoginUser />} />

            <Route path={environment.HOME} element={<Home />} />

            <Route path={environment.CALENDAR} element={<HomeReportDay />} />

            <Route path={environment.REQUESTS} element={<HomeLeader />} />

            <Route path={environment.LICENSES} element={<Licenses />} />

            <Route path={environment.WORKING} element={<Working />} />

            <Route path={environment.ABM_LICENSES} element={<Abm_Licenses />} />

            <Route path={environment.ABM_AVAILABILITY} element={<Availability />} />

            <Route path={environment.ABM_CLIENTS} element={<Clients />} />

            <Route path={environment.ABM_HOLIDAYS} element={<Holidays />} />
            
            <Route path={environment.ABM_PHASES} element={<Phases />} />

            <Route path={environment.REPORTS} element={<Reports />} />

            <Route path={environment.ABM_PROJECTS} element={<Proyects />} />

            <Route path={environment.ABM_DELEGACIONES} element={<Delegaciones />} />

            <Route path={environment.ABM_ROLES} element={<AbmRoles />} />
            
            <Route path={environment.ABM_CN} element={<CasoNegocio />} />

            <Route path={environment.ABM_MONEDA} element={<AbmMoneda />} />


            <Route
              path="*"
              element={
                <>
                  {" "}
                  <h1>404 Not found</h1>
                </>
              }
            />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
