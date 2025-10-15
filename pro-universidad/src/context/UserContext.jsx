import { createContext, useState } from "react";

// Crear el contexto
export const UserContext = createContext();

// Proveedor de contexto
export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const datos = localStorage.getItem("usuario");
    return datos ? JSON.parse(datos) : null;
  });

  // Función para hacer login y guardar usuario en contexto y localStorage
  const login = (usuarioData) => {
    setUsuario(usuarioData);
    localStorage.setItem("usuario", JSON.stringify(usuarioData));
  };

  // Función para logout
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
