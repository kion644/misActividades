import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { header } from '../../function/header';


export default async function obtenerLicencias(){

    try {
    
        const response = await axios({
            url: environment.BACK + 'tipoLicencia',
            //url: "https://efe64ace-a07d-4f58-a187-4663a4f0620e.mock.pstmn.io/licenses",
            method: 'get',
            headers: cabecero,
        }); 
        let newArr = response.data.map((item: any) => {
            return{
               id: item.id,
               descripcion: item.descripcion,
               nombre: item.nombre,
               estado: item.estado,
               tipoproyecto: item.tipoproyecto,
               clienteId: item.cliente.id
            }
          })
          return newArr;
        
    }
    catch (e) {
        throw e
    }

}

