import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function AllUsuarios ():Promise<any> {
    try {
      const response = await axios({
        url: environment.BACK + "allUsers",
        method: "get",
        headers: cabecero,
      });
      return response.data;
    } catch (e) {
      throw e;
    }
};