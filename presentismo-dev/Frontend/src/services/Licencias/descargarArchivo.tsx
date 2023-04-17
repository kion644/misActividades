import axios from 'axios';
import { environment } from '../../enviroment/enviroment';
import { cabecero } from '../../function/cabecero';
import { idMensagge } from '../../function/idMenssage';
import { header } from '../../function/header';
import fileDownload from 'js-file-download';


export default async function descargaArchivo(idLicencia:string) {

    try {

       fetch(environment.BACK + 'adjunto/' + idLicencia , {
        method: 'GET',
        headers: cabecero
       })
       .then((response) => response.blob())
       .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob], {type: 'image/png'}));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'adjunto');
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
       })
      
       
    }
    catch (e) {
        throw e
    }

    

}


