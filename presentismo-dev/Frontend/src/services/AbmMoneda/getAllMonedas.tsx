import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function getAllMonedas(){

    try {
    
        const response = await axios({
            url: environment.BACK + 'getAllMonedas',
            method: 'get',
            headers: cabecero,
        }); 
        let newArr = response.data.map((item: any) => {
            return{
               id: item.id,
               descripcion: item.descripcion,
               abreviatura: item.abreviatura
            }
          })
          return newArr;
        
    }
    catch (e) {
        throw e
    }

}

