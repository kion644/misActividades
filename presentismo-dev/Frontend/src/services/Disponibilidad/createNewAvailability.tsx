import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function createNewAvailability (              
    usuario:string,
    disponibilidad:string,) {
    try {
      const response = await axios({
        //url: environment.BACK + "disponibilidad",
        url:"https://efe64ace-a07d-4f58-a187-4663a4f0620e.mock.pstmn.io/licenses",
        method: "post",
        headers: cabecero,
        data: {
            usuario:usuario,
            disponibilidad:disponibilidad,
        },
      });
    } catch (e) {
      throw e;
    }
};
