import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';


export default async function obtenerMisLicencias() {

    try {
    
        const response = await axios({
           // url: environment.BACK_FRONT + 'myLicenses',
            url: environment.BACK + 'licencias',
            method: 'get',
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


