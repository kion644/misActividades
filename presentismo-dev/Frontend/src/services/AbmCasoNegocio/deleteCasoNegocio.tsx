import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function deleteCasoNegocio ( 
    id?: number,
    ) {
    try {
      const response = await axios({
        url: environment.BACK + `casoNegocio/delete/${id}`,
        method: "delete",
        headers: cabecero,
        
      });
    } catch (e) {
      throw e;
    }
};
