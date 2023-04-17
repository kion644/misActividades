import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function editClientes (id: number, name: string) {
    try {
      const response = await axios({
        url: environment.BACK + "clientes",
        method: "put",
        headers: cabecero,
        data: {
          id: id,
          nombre: name,
        },
      });
    } catch (e) {
      throw e;
    }
};