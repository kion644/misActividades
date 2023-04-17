import axios from 'axios';
import Swal from 'sweetalert2';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function createNewCasoNegocio (       nombre:string, newMoneda: string

 ) {
    try {
      const response = await axios({
        url: environment.BACK + "casoNegocio/new", 
        method: "post",
        headers: cabecero,
        data: {
          id: 0,
            nombre,
            idMoneda: newMoneda
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
};
