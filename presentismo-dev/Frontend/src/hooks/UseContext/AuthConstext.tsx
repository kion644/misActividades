import { SupervisedUserCircle } from "@material-ui/icons";
import { createContext, useState } from "react";
import Logins from "../../services/Logins/iniciarSesion";

const AuthProvider = createContext( {
    user:'',
    Login:async(usuario: string, password: string) =>{
        try {
            
            if (password != "" || usuario != "") {

                const response: any = await Logins(usuario, password)

                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("301", response.data.roles);
                    localStorage.setItem("user", usuario.trim().replace("@cdainfo.com", ""));
                    localStorage.setItem("nombre", response.data.nombre);
                    localStorage.setItem("apellido", response.data.apellido);
                    localStorage.setItem("Solicitudes", "0");

                    if (localStorage.getItem("user") != "" && localStorage.getItem("token") != "") {
                        return (true)
                    }
                } else if (response.status == 404) {
                    localStorage.setItem("token", "");
                    localStorage.setItem("user", "");
                    localStorage.setItem("301", "");
                    return(false)
                }

            } else {
               return(false)
            }
        } catch (error) {
           return(false); 
        }
    }
    
})

export default AuthProvider;


