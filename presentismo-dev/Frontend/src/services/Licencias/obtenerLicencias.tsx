import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';


export default async function obtenerLicencias() {

    try {
        const response = await axios({
            url: environment.BACK + 'licencias/disponibles',
            //url: environment.BACK_FRONT + 'licenseType'

            method: 'get',
            headers: cabecero,
            data: {
                header,
                data: {
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


