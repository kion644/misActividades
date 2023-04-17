import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function getAllusuarios():Promise<{id: number,apellido: string, nombre: string, usuario: string , rol:object, lider:String}[]> {
    try {
      const response = await axios({
        url: environment.BACK + "roles",
        method: "get",
        headers:cabecero,
      });
      return response.data;
    } catch (e) {
      throw e;
    }
};