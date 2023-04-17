import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function deleteLicense (id: number) {
    try {
      const response = await axios({
        url: environment.BACK + `tipoLicencia/${id}`,
        method: "delete",
        headers: cabecero,
        data: {
          id: id,
        },
      });
      return response;
    } catch (e) {
      throw e;
    }
};
