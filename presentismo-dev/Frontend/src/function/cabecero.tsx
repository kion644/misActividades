import axios, { AxiosRequestHeaders } from 'axios';



export const cabecero:AxiosRequestHeaders={
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, OPTIONS',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'User': ''+ localStorage.getItem('user')
} 
   
  