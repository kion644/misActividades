import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function CierreProyecto (dto:any) {
    try {
      const response = await axios({
        url: environment.BACK + "proyectos/cierre",
        method: "post",
        headers: cabecero,
        data: dto,
      });
      return response;
    } catch (e) {
      throw e;
    }
};