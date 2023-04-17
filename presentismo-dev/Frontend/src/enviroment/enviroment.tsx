export const environment = {
  production: true,
  HOST_LOCAL: null,
  LOCAL: true,
  versionDeploy : "2023/03/23",
  //-------------------------------- RUTAS--------------------------------------------
  LOGIN: "/login",
  HOME: "/",
  CALENDAR: "/calendar",
  REQUESTS: "/requests",
  LICENSES: "/licenses",
  ABM_CLIENTS: "/clients",
  ABM_AVAILABILITY: "/availability",
  ABM_PHASES: "/phases",
  ABM_HOLIDAYS: "/holidays",
  ABM_PROJECTS: "/projects",
  ABM_LICENSES: "/abm_licenses",
  WORKING: "/working",
  REPORTS: "/reports",
  ABM_DELEGACIONES:"/delegaciones",
  ABM_ROLES:"/roles",
  ABM_CN:"/caso_negocio",
  ABM_MONEDA:"/moneda",

  MANUAL: "/Home/ManualUsuario.pdf",

  BACK_FRONT: process.env.REACT_APP_BACKFRONT! ,
  BACK: process.env.REACT_APP_BACK!,
};
