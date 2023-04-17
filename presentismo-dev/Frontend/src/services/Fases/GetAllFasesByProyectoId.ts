import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { Proyecto } from '../../models/Proyecto';

export default async function getAllFasesByProyectoId(id: number
  
):Promise<any> {
    try {
      const response = await axios({
        url: environment.BACK + `fases/proyecto/${id}`,
        //url: environment.BACK + 'fases/proyecto/'+241,
        method: "get",
        headers:cabecero,
        
      });
      let newArr = response.data.map((item: any) => {
        return{
           id: item.id,
           idProyecto: item.proyecto.id,
           nombreFase: item.nombre,
           descripcion: item.descripcion,
           nombreProyecto: item.proyecto.nombre,
        }
      })
      return newArr;
    } catch (e) {
      throw e;
    }
};