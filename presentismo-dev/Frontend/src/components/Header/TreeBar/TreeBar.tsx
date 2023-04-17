import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { environment } from "../../../enviroment/enviroment";
import Context from "../../../hooks/UseContext/Solicitudes";
import { mensaje } from "../../../models/Mensaje";
import CantidadSolicitudes from "../../../services/Solicitudes/CantidadSolicitudes";
import CantidadSolicitudesBita from "../../../services/Solicitudes/CantidadSolicitudesBita";
import Drawer from "../Drawer/Drawer";

export const TreeBar = () => {


    const solicitudes = useContext(Context);
    const [solicitud, setSolicitud] = useState(solicitudes.solicitudes);
    const [solicitud2, setSolicitud2] = useState(solicitudes.bitas);
    const navegate =useNavigate();
    const [bitasNuevas, setBitasNuevas] = useState<any[]>([]);
    useEffect(()=>{
        // async function Cantidad() {

        //     const response: any = await CantidadSolicitudes();
        //     if (response.status === 200) {
        //       var xx = response.data.data.Solicitudes;
        //       var yy: number = +xx;
        //       solicitudes.solicitudes = yy;
        //       localStorage.setItem("Solicitudes", solicitudes.solicitudes.toString());
        //       setSolicitud(yy)
        //     }
        //     else if (response.status === 403) {
        //         localStorage.clear()
        //         sessionStorage.clear();
        //         window.location.reload();
        //         navegate(environment.LOGIN);
        //         window.location.replace('');
        //     }
        //   }
        //   Cantidad();
    },[localStorage.getItem("Solicitudes")]);
    


    useEffect(()=>{
  
    },[localStorage.getItem("Solicitudes")])

    useEffect(()=>{
        
    },[solicitud])



    const numero =(texto:string|null)=>{
        var xx = texto;
        var yy: number = xx==null?+0:+xx;
        return(yy)
    }

    return (
        <>
            <Drawer ></Drawer>
            
    </>
  )



}

