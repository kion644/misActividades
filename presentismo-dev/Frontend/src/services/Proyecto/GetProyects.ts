import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { Proyecto } from '../../models/Proyecto';

export default async function getProyects():Promise<Proyecto[]> {
    try {
      const response = await axios({
        url: environment.BACK + "tipoProductiva",
        method: "get",
        headers:cabecero,
      });
      return response.data;
    } catch (e) {
      throw e;
    }
};