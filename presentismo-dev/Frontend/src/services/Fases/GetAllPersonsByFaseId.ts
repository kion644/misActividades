import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { Proyecto } from '../../models/Proyecto';

export default async function getAllPersonsByFaseId(id: number
){
    try {
      const response = await axios({
        url: environment.BACK + `persona_fase/${id}`,
        //url: environment.BACK + 'persona_fase/'+ 249,
        method: "get",
        headers:cabecero,
      });
      return response;
    } catch (e) {
      throw e;
    }
};