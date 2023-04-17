import React, {  useState } from "react";

const Temporizador = React.createContext((intervalo:number,funcion:()=>void)=>{
   const id = setTimeout(funcion,intervalo);
    return(id)
})

export default Temporizador