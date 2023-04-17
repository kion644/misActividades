import { AnyNaptrRecord } from "dns";
import { useState } from "react";
import {Route, Navigate} from 'react-router-dom';
import { environment } from "../enviroment/enviroment";

export default function PrivateRoute(componente:any,...rest: any[]){

    const [usuario,setUsuario] = useState(localStorage.getItem("user"))
    return(
        <Route {...rest}>
          {usuario!=undefined?componente:<Navigate to={environment.LOGIN}/>};  
        </Route>
    )
}