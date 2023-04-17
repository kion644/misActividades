import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function deleteDelegacion (id: number) {
    try {
      const response = await axios({
        url: environment.BACK + "delegaciones/" + id,
        method: "delete",
        headers: cabecero,
      });
    } catch (e) {
      throw e;
    }
};