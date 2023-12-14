import axios from "axios";
import getCookie from "./cookie";
import { logout } from "./user/UserService";
import SweetAlert from "sweetalert2";

//import { refreshToken } from './authUtils';
//import history from './history';

export const origin = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}`;

export const CancelToken = axios.CancelToken;

const instance = axios.create({
  baseURL: origin,
  //timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

let tokenCookies = sessionStorage.getItem("jwt-wom");

instance.interceptors.request.use(
  (config) => {
    let token = `Bearer ${JSON.parse(tokenCookies).token}`;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* try {
  instance.defaults.headers.common["Authorization"] = `Bearer ${
    JSON.parse(tokenCookies).access_token
  }`;
  instance.defaults.headers.common[
    "Content-Type"
  ] = `application/x-www-form-urlencoded`;
  instance.defaults.headers.common["Access-Control-Allow-Credentials"] = `true`;
  instance.defaults.headers.common[
    "Access-Control-Allow-Headers"
  ] = `Accept, Origin, Context-Type, X-Requested-With, Authorization, authorization,content-type`;
  instance.defaults.headers.common[
    "Access-Control-Allow-Methods"
  ] = `GET, PUT, POST, DELETE, HEAD, OPTIONS`;
  instance.defaults.headers.common["Access-Control-Allow-Origin"] = `*`;
} catch (err) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${
    JSON.parse(tokenCookies).access_token
  }`;
} */

//intercerptor para los errores 401 y 403
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Error: Network Error: ", error);
    if (!error.response) {

    } else {
      switch (error.response.status) {
        case 400:
          SweetAlert.fire({
            icon: 'warning',
            title: '¡ATENCIÓN!',
            text: error.response.data.message,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#43a047',
          });
          return;

        case 401:
          SweetAlert.fire({
            icon: 'warning',
            title: '¡SESIÓN EXPIRADA!',
            text: 'Por favor vuelva a logearse.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#43a047',
          }).then(function () {
            logout();
          });

          return;

        case 403:
          SweetAlert.fire({
            icon: 'warning',
            title: '¡ATENCIÓN!',
            text: 'Usted no cuenta con permiso para acceder a esta página.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#43a047',
          }).then(function () {
            window.history.back();
          });

          return;

        case 404:
          SweetAlert.fire({
            icon: 'warning',
            title: '¡ATENCIÓN!',
            text:
              'La página no se encuentra disponible por el momento, vuelva a intentarlo en unos minutos.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#43a047',
          });

          return;

        case 500:
          SweetAlert.fire({
            icon: 'error',
            title: '¡ATENCIÓN!',
            text: 'Error en el servidor, vuelva a intentarlo en unos minutos.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#43a047',
          });

          return;

        case 503:
          SweetAlert.fire({
            icon: 'error',
            title: '¡ATENCIÓN!',
            text:
              'El servicio no se encuentra disponible, vuelva a intentarlo en unos minutos.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#43a047',
          });

          return;

        default:
          SweetAlert.fire({
            icon: 'error',
            title: 'OCURRIO UN ERROR!',
            text:
              'Ocurrio un error inesperado, vuelva a intentarlo o contacte con soporte técnico.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#43a047',
          });
          break;
      }
    }

    return Promise.reject(error);
  }
);

// Interceptor para llamar a refreshToken cuando el access token vence.
/* instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('ERROR', error);
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      originalRequest._retry = true;
      const refreshResponse = await refreshToken();
      if (refreshResponse.status === 'OK') {
        originalRequest.headers['Authorization'] =
          refreshResponse.authorizationHeader;
        return instance(originalRequest);
      } else {
        //history.push(`/login`);
      }
    }
    return Promise.reject(error);
  }
); */

export default instance;
