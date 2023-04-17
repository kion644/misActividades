import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function deleteClientes (id: number) {
    try {
      const response = await axios({
        url: environment.BACK + "clientes/" + id,
        method: "delete",
        headers: cabecero,
      });
    } catch (e) {
      throw e;
    }
};