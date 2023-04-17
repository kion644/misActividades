import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';


export default async function accionesLicencias(idLicense:number,Estado:string) {

    const estadoBoolean = (estado: string) =>{
        if(estado === "Aceptado"){
            return true;
        }
        else{
            return false;
        }
    }

    try {
        const response = await axios({
            url: environment.BACK+ 'licencias/' + idLicense,
            //url: environment.BACK_FRONT + 'licenseActionLeader',

            method: 'put',
            headers:cabecero,
            data: estadoBoolean(Estado)
        })

        return response;
    }
    catch (e) {
        throw e
    }

}

