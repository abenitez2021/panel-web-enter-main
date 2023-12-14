import React, { useState, useEffect } from "react";
import UsersContext from "../user/UserContext";
import { getUserPrincipal, logout } from "../user/UserService";

const defaultState = {
  idUsuario: 0,
  email: "",
  nombre: "",
  apellido: "",
  rol: "",
  entrada: "",
  salida: "",
  marcacion: "",
  iat: 0,
  exp: 0,
}

const UserProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    updateUser();
  }, []);

  const updateUser = async () => {
    let user = getUserPrincipal();
    if (user) {
      setState({
        idUsuario: user?.idUsuario,
        email: user?.email,
        nombre: user?.nombre,
        apellido: user?.apellido,
        rol: user?.rol,
        entrada:  user?.entrada,
        salida:  user?.salida,
        marcacion:  user?.marcacion,
        iat: user?.iat,
        exp: user?.exp
      });
    } else{
      setState(defaultState);
    }
  };

  const clearUser = () => {
    setState(defaultState);
    logout();
  };

  const updateMarcacion = async (newMarcacion) => {
    let user = getUserPrincipal();

    if (state) {
      // Copia la información del usuario y actualiza 'marcacion'
      const updatedUser = {
        ...state,
        marcacion: newMarcacion !== undefined ? newMarcacion : state.marcacion,
      };
  
      // Actualiza la información del usuario en 'sessionStorage'
      const existingSessionData = JSON.parse(sessionStorage.getItem("jwt-wom")) || {};
      const updatedSessionData = {
        ...existingSessionData,
        user: {
          ...existingSessionData.user,
          marcacion: updatedUser.marcacion,
        },
      };
  
      sessionStorage.setItem("jwt-wom", JSON.stringify(updatedSessionData));
  
      // Actualiza el estado del usuario
      setState(updatedUser);
  
    } else {
      setState(defaultState);
    }
  };
  
  
  return (
    <UsersContext.Provider value={{ state, updateUser, clearUser, updateMarcacion }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UserProvider;
