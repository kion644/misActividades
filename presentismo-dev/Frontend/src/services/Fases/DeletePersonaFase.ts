import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function deletePersonaFase (id: number) {
    try {
      const response = await axios({
        url: environment.BACK + `persona_fase/${id}`,
        method: "delete",
        headers: cabecero,
      });
    } catch (e) {
      throw e;
    }
};