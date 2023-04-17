import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function getAllClientes():Promise<{descripcion: string, comboId: number}[]> {
    try {
      const response = await axios({
        url: environment.BACK + "clientes",
        method: "get",
        headers:cabecero,
      });
      
      return response.data;
    } catch (e) {
      throw e;
    }
};