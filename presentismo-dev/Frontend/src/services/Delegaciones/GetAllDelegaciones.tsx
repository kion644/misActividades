import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function getAllDelegaciones():Promise<{id: number,accion: string,fechaCreacion: Date, usuarioCreador: object, usuariosDelegado: object , usuarioDestinatario:object}[]> {
    try {
      const response = await axios({
        url: environment.BACK + "delegaciones",
        method: "get",
        headers:cabecero,
      });
      return response.data;
    } catch (e) {
      throw e;
    }
};