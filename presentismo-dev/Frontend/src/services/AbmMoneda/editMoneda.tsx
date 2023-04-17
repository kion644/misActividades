import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function editMoneda (id: number, descripcion: string, abreviatura: string) {
    try {
      const response = await axios({
        url: environment.BACK + `moneda/edit/${id}`,
        method: "put",
        headers: cabecero,
        data: {
          descripcion: descripcion,
          abreviatura: abreviatura
        },
      });
      return response;
    } catch (e) {
      throw e;
    }
};
