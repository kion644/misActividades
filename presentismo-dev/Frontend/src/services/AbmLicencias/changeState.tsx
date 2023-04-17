import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function changeState ( id:number             
    ) {
    try {
      const response = await axios({
        url: environment.BACK + `tipoLicencia/estado/${id}`, 
        method: "put",
        headers: cabecero,
        data: {
            id: id,
          },
      });
    } catch (e) {
      throw e;
    }
};
