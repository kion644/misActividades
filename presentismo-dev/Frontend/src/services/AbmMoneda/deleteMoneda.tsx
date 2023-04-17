import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function deleteMoneda ( 
    id?: number,
    ) {
    try {
      const response = await axios({
        url: environment.BACK + `moneda/delete/${id}`,
        method: "delete",
        headers: cabecero,
        
      });
    } catch (e) {
      throw e;
    }
};
