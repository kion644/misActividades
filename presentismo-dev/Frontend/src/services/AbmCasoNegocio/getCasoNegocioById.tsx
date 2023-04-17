import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { header } from '../../function/header';


export default async function getAllCasosNegocioById(id: number) {

    try {

        const response = await axios({
            url: environment.BACK + `getCasoNegocioById/${id}`,
            method: 'get',
            headers: cabecero,
        });

        return response;

    }
    catch (e) {
        throw e
    }

}

