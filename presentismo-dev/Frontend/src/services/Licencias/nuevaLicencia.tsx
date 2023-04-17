import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';


export default async function nuevaLicencia(idProyectoPersona: any, desde: Date, hasta: Date, archivos: any) {

    try {
        const response = await axios({
            url: environment.BACK + 'licencias',
            //url: environment.BACK_FRONT + 'newLicense',

            method: 'post',
            headers: cabecero,
            data: {
    
                    usuario: localStorage.getItem("user"),
                    idProyectoPersona: idProyectoPersona,
                    fechaDesde: desde,
                    fechaHasta: hasta,
                    archivo: archivos
         
            }
        })

        return response;
    }
    catch (e) {
        throw e;
    }

}

