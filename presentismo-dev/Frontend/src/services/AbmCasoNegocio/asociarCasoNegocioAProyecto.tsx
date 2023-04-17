import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function asociarCasoNegocioAProyecto (idCasoNegocio: number, idProyecto: number) {
    try {
      const response = await axios({
        url: environment.BACK + `casoNegocio/asociarAProyecto`,
        method: "post",
        headers: cabecero,
        data: {
          idCasoNegocio: idCasoNegocio,
          idProyecto: idProyecto
        },
      });
      return response;
    } catch (e) {
      throw e;
    }
};
