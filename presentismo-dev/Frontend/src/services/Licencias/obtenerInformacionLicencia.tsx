import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';


export default async function obtenerInformacionLicencia(id:number) {

    try {
        const response = await axios({
            url: environment.BACK + 'licencias/participantes/' + id,
            //url: environment.BACK_FRONT + 'informationLicenses',
            method: 'get',
            headers: cabecero,
            
        })

        return response;
    }
    catch (e) {
        throw e
    }

}


