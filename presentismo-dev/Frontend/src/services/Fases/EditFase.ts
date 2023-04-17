import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function editFase (nombre: string, faseId: number) {
    try {
      const response = await axios({
        url: environment.BACK + "fases",
        method: "put",
        headers: cabecero,
        data: {
          nombre: nombre,
          id: faseId
        },
      });
    } catch (e) {
      throw e;
    }
};