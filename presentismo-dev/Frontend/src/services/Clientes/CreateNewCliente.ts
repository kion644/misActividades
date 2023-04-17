import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function createNewCliente (nombre: string ) {
    try {
      const response = await axios({
        url: environment.BACK + "clientes",
        method: "post",
        headers: cabecero,
        data: {
          nombre: nombre,
        },
      });
    } catch (e) {
      throw e;
    }
};