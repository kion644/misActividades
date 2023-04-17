import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { header } from '../../function/header';


export default async function getAvailability(){

    try {
    
        const response = await axios({
            url: environment.BACK + 'usuario_disponibilidad',
            method: 'get',
            headers: cabecero,
        })
        return response;
        
    }
    catch (e) {
        throw e
    }

}

