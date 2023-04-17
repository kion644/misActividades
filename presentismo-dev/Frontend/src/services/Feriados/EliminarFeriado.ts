import axios from "axios";
import { environment } from "../../enviroment/enviroment";
import { cabecero } from "../../function/cabecero";

export default async function EliminarFeriado(id:number) {
  try {
    const response = await axios({
      url: environment.BACK + `feriados/${id}`,
      // url: environment.BACK_FRONT + '',
      method: "delete",
      headers: cabecero,
      data: {
          registroId: id,
        },
    });

    return response;
  } catch (e) {
    throw e;
  }
}
