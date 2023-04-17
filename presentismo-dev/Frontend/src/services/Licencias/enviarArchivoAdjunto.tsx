import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';


export default async function enviarArchivoAdjunto(idLicencia:number,archivo:any) {

    try {
        const response = await axios({
            url: environment.BACK_FRONT + 'getLicenciaPendiente',
            method: 'post',
            headers:cabecero,
            data: {
                header,
                data: {
                    idLicencia: idLicencia,
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


