import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function EditRoles (dto : any ) {
    try {
      const response = await axios({
        url: environment.BACK + `roles`,
        method: "post",
        headers: cabecero,
        data: dto,
      });
    } catch (e) {
      throw e;
    }
};