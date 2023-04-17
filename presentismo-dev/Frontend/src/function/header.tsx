import axios, { AxiosRequestConfig } from 'axios';
import { idMensagge } from './idMenssage';



export const header: any = {
  consulter: localStorage.getItem("user"),
  date: new Date().toString(),
  messageId: idMensagge(),
  token: localStorage.getItem('token')
}

