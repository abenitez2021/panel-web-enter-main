import axios from "axios";
//import axiosInstance from './axios';
//import qs from 'querystring';
import { notificacionAlerta } from "../components/Notificaciones";
export const origin = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}auth/login`;

export const CancelToken = axios.CancelToken;

const instance = axios.create({
  baseURL: origin,
  timeout: 10000,
});

export const login = async (datosUser) => {


  try {
    axios.defaults.headers.common["Authorization"] = "";
    const response = await instance.post("/", datosUser);
    console.log(response.data)
    if (response.data?.ok) {
      sessionStorage.setItem("jwt-wom", JSON.stringify(response?.data?.result));

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;
      return { status: "OK", response: response?.data };

    } else {
      return { status: "SINACCESO", message: response.data?.message};
    }


  } catch (error) {
    console.log(error.response);
    if (error.message) {
      notificacionAlerta(error.response?.data?.message);
    }
    return { status: "ERR", message: error };
  }
};

/* export const refreshToken = async () => {
  try {
    axios.defaults.headers.common['Authorization'] = '';
    const refreshToken = JSON.parse(localStorage.getItem('jwt-ingrid'))
      .refresh_token;
    const response = await instance.post(
      '/refresh',
      qs.stringify({
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        client_id: process.env.REACT_APP_AUTH_API_CLIENT_ID,
      })
    );

    const authorizationHeader = `Bearer ${response.data.access_token}`;
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = authorizationHeader;
    localStorage.setItem('jwt-ingrid', JSON.stringify(response.data));
    return { status: 'OK', authorizationHeader };
  } catch (err) {
    localStorage.removeItem('jwt-ingrid');
    return { status: 'ERR', message: err };
  }
}; */

/* export const logout = async (username, password) => {
  try {
    await instance.post(  
      '/logout',
      qs.stringify({
        refresh_token: JSON.parse(localStorage.getItem('jwt-ingrid'))
          .refresh_token,
        client_id: process.env.REACT_APP_AUTH_API_CLIENT_ID,
      })
    );
    localStorage.removeItem('jwt-ingrid');

    axios.defaults.headers.common['Authorization'] = '';
    return { status: 'OK' };
  } catch (err) {
    return { status: 'ERR', message: err };
  }
}; */

export default instance;
