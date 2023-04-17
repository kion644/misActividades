import React, {  useState } from "react";

const NotificacionesContext = React.createContext({
    cambiosDeInicio:0,
    licenciasNuevas:0,
    mensajesNuevos:0,
    cargando: true || false
})

export default NotificacionesContext;