import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function editCasoNegocio (id: number, nombre: string, newMoneda: number,) {
    try {
      const response = await axios({
        url: environment.BACK + `casoNegocio/edit/${id}`,
        method: "put",
        headers: cabecero,
        data: {
          nombre: nombre,
          idMoneda: newMoneda
        },
      });
      return response;
    } catch (e) {
      throw e;
    }
};
