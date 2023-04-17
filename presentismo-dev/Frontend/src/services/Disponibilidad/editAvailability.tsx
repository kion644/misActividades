import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function editAvailability ( 
    usuario: string,
    hs_diarias:number,
    lunes:boolean,
    martes:boolean,
    miercoles:boolean,
    jueves:boolean,
    viernes:boolean,
    id?: number) {
    try {
      const response = await axios({
        url: environment.BACK + "usuario_disponibilidad",
        //url: "https://efe64ace-a07d-4f58-a187-4663a4f0620e.mock.pstmn.io/licenses",
        method: "post",
        headers: cabecero,
        data: {
          usuario:usuario,
          hs_diarias: hs_diarias,
          lunes:lunes,
          martes:martes,
          miercoles:miercoles,
          jueves:jueves,
          viernes:viernes,
          id: id,
        },
      });
    } catch (e) {
      throw e;
    }
};
