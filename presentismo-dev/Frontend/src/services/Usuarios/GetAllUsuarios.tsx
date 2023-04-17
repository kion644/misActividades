import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function GetAllUsuarios(id: number):Promise<any> {
    try {
      const response = await axios({
        url: environment.BACK + `usuarios/${id}`,
        method: "get",
        headers: cabecero,
      });
      return response.data;
    } catch (e) {
      throw e;
    }
};