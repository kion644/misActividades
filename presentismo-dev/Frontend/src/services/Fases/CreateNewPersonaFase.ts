import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function createNewPersonaFase (newFase: string, proyectoId: number, faseId: number ) {
    try {
      const response = await axios({
        url: environment.BACK + "persona_fase",
        method: "post",
        headers: cabecero,
        data: {
          userId: newFase,
          proyectoId: proyectoId,
          faseId:faseId
        },
      });
    } catch (e) {
      throw e;
    }
};