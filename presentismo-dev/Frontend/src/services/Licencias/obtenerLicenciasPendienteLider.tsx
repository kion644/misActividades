import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
import { useState } from 'react';


export default async function obtenerLicenciasPendienteLider() {

    try {
       
        const response = await axios({
           url: environment.BACK + 'licencias/PENDIENTE_APROBACION_LIDER',
            //url: environment.BACK_FRONT +'pendingLeaderList',

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


