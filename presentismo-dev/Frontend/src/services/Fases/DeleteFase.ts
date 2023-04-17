import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function deleteFase (id: number) {
    try {
      const response = await axios({
        url: environment.BACK + `fases/${id}`,
        //url: environment.BACK + "fases/"+ 337 ,
        method: "delete",
        headers: cabecero,
      });
    } catch (e) {
      throw e;
    }
};