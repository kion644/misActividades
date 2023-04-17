import axios from "axios";
import { environment } from "../../enviroment/enviroment";
import { cabecero } from "../../function/cabecero";

export default async function Paises() {
  try {
    const response = await axios({
      url: environment.BACK + "paises",
      // url: environment.BACK_FRONT + '',
      method: "get",
      headers: cabecero,
    });

    return response;
  } catch (e) {
    throw e;
  }
}
