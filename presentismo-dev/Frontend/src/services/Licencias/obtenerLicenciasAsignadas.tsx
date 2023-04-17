import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';


export default async function obtenerLicenciasAsignadas() {

    try {
        const response = await axios({
            url: environment.BACK + 'licencias/PENDIENTE_APROBACION_ATENCION',
           // url: environment.BACK_FRONT + 'pendingAtencionList',
            method: 'get',
            headers: cabecero,
            data: {
                header,
                data: {
                    usuario: localStorage.getItem("user"),
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