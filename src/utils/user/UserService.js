import getCookie from "../cookie";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "jwt-wom";

export const getUserPrincipal = () => {
  const jwtCookie = JSON.parse(sessionStorage.getItem(TOKEN_KEY));
  
   if (jwtCookie !== null) {
     const decodedAccessToken = jwtDecode(jwtCookie?.token);
     
     return {
  
            idUsuario: decodedAccessToken?.id,
            nombre: jwtCookie?.user?.nombre,
            apellido: jwtCookie?.user?.apellido,
            email: jwtCookie?.user?.email,
            rol: jwtCookie?.user?.rol,
            entrada:  jwtCookie?.user?.entrada,
            salida:  jwtCookie?.user?.salida,
            marcacion:  jwtCookie?.user?.marcacion,
            iat: decodedAccessToken?.iat,
            exp: decodedAccessToken?.exp
          
          };
 /*  
     const decodedRefreshToken = jwtDecode(JSON.parse(jwtCookie).refresh_token);
     const now = new Date().getTime() / 1000;
     if (decodedAccessToken.exp - now > 0 || decodedRefreshToken.exp - now > 0) {
       return {
         name: decodedAccessToken.usuario,
         preferred_username: decodedAccessToken.usuario,
         given_name: decodedAccessToken.rol,
         family_name: decodedAccessToken.rol,
       };
     }
     */
  
}
  

};
export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  console.log(TOKEN_KEY)
  var d = new Date();
  d.setTime(d.getTime());
  var expires = "expires=" + d.toUTCString();
  console.log(expires)
  document.cookie = 'jwt-pos= ; Path=/; expires=Tue, 06 Jul 2020 20:19:55 GMT;;domain=enter.com.py;';
  window.location.href = `/`;
  //window.location.href = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_MENU}/acceder/`;
};

export default { getUserPrincipal, logout };
