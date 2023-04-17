import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';


export default async function obtenerLicenciasEjecutadas() {

    try {
        const response = await axios({
            url: environment.BACK + 'licencias/historico',
            //url: environment.BACK_FRONT + 'historicLicenses',

            method: 'get',
            headers: cabecero,
            data: {
                header,
                data: {
                    user: localStorage.getItem("user"),
                },
                info: {
                    message: '',
                    code: ''
                }
            }
        })

        return response;
    }
    catch (e) {
        throw e
    }

}


