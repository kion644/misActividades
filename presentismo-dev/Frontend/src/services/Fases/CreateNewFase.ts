import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function createNewFase (newFase: string, newDescripcion: string, proyectoId: number ) {
    try {
      const response = await axios({
        url: environment.BACK + "fases",
        method: "post",
        headers: cabecero,
        data: {
          nombre: newFase,
          descripcion:newDescripcion,
          proyectoId: proyectoId
        },
      });
    } catch (e) {
      throw e;
    }
};