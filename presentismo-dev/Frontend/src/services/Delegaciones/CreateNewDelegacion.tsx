import axios from 'axios';
import { EnumType } from 'typescript';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function createNewDelegacion (accion: string, usuarioDelegado: string , usuarioDestinatarios:[]) {
    try {
      const response = await axios({
        url: environment.BACK + "delegaciones",
        method: "post",
        headers: cabecero,
        data: {
          accionDelegada: accion,
          idDelegado: usuarioDelegado,
          destinatarios: usuarioDestinatarios,
        },
      });
    } catch (e) {
      throw e;
    }
};