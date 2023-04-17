import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function getAllFases():Promise<[]> {
    try {
      const response = await axios({
        url: environment.BACK + "fases",
        method: "get",
        headers:cabecero,
      });
      let newArr = response.data.map((item: any) => {
        return{
           id: item.id,
           nombreFase: item.nombre,
           descripcion: item.descripcion,
           nombreProyecto: item.proyecto.nombre
        }
      })
      return newArr;
    } catch (e) {
      throw e;
    }
};