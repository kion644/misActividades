import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { header } from '../../function/header';


export default async function getAllCasosNegocio(){

    try {
    
        const response = await axios({
            url: environment.BACK + 'getAllCasosNegocio',
            method: 'get',
            headers: cabecero,
        }); 
        let newArr = response.data.map((item: any) => {
            return{
               id: item.id,
               nombre: item.nombre,
               moneda: item.moneda
            }
          })
          return newArr;
        
    }
    catch (e) {
        throw e
    }

}

