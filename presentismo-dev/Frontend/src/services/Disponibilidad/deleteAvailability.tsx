import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';

export default async function deleteAvailability (id: number) {
  const base_url = "https://efe64ace-a07d-4f58-a187-4663a4f0620e.mock.pstmn.io/licenses"
    try {
      const response = await axios({
        //url: environment.BACK + "availability/" + id,
        // url:"https://efe64ace-a07d-4f58-a187-4663a4f0620e.mock.pstmn.io/licenses/id",
        url: `${base_url}/${id}`,
        method: "delete",
        headers: cabecero,
      });
    } catch (e) {
      throw e;
    }
};
