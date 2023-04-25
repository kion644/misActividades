import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';



export default async function UsuarioByToken():Promise<{
    id: number,
    user: string,
    nombre: string,
    apellido: string,
    lider: object,
    legajo: string,
    rol:object,
}[]> {
    try {
      const response = await axios({
        url: environment.BACK + 'usuario',
        method: "get",
        headers:cabecero,
      });
      return response.data;
    } catch (e) {
      throw e;
    }
};