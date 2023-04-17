import axios, { AxiosRequestHeaders } from "axios";
import { environment } from "../../enviroment/enviroment";

export default async function Logins(username: string, password: string) {

  const cabecero:AxiosRequestHeaders={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
  } 
  
  try {
    const response = await axios({
    url: environment.BACK + process.env.REACT_APP_LOGIN,
      method: 'post',
      headers: cabecero,
      data: {
        username: username.trim(),
        password: password,
      }
    })
    return response;
  } catch (error) {
    throw error;
  }
}