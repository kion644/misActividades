import axios from 'axios';
import { Navigation } from 'react-calendar';
import ReactDOM from 'react-dom';
import App from './App';
import { environment } from './enviroment/enviroment';
// import   App        from './components/App';
import './index.css';

import Swal from 'sweetalert2';
import '../node_modules/sweetalert2/dist/sweetalert2.css'


axios.interceptors.response.use( 
  response => { 
    return response;
  }, error => {
  if (error.response.status === 401) {

    localStorage.clear();
    sessionStorage.clear();
    
    Swal.fire({ 
      title: 'La sesión ha expirado',
      text: "Será redireccionado a la pagina de ingreso. Por favor, vuelva a ingresar",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      
    }).then((result) => {
      window.location.href = "#/login";
      window.location.reload();
    })

  }
  return Promise.reject(error);
  }
);

ReactDOM.render(

      <App />
  ,
  document.getElementById('root')
);

