import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';


export default async function getAllLideres():Promise<{username:string, id:number}[]> {
    try {
      const response = await axios({
        url: environment.BACK + "lideres",
        method: "get",
        headers:cabecero,
      });
      
      return response.data;
    } catch (e) {
      throw e;
    }
};