import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function EditDelegacion (id: number,accion: string, usuarioDelegado: string , usuarioDestinatario: Number[]) {
    try {
      const response = await axios({
        url: environment.BACK + `delegaciones/${id}`,
        method: "put",
        headers: cabecero,
        data: {
          accionDelegada: accion,
          idDelegado: usuarioDelegado,
          destinatarios: usuarioDestinatario,
        },
      });
    } catch (e) {
      throw e;
    }
};