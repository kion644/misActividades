import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function getAllProyects():Promise<{nombre: string, id: number}[]> {
    try {
      const response = await axios({
        url: environment.BACK + "proyectos",
        method: "get",
        headers:cabecero,
      });
      
      return response.data;
    } catch (e) {
      throw e;
    }
};