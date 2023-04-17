import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';


export default async function asignacionLicenciasAtencion(idLicense:number) {

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
            url: environment.BACK + 'licencias/asignar/' + idLicense,
            //url: environment.BACK_FRONT + 'licenseActionsAttention',

            method: 'put',
            headers: cabecero,
            data: {
              
            }
        })

        return response;
    }
    catch (e) {
        throw e
    }

}


