import { Navigate, Outlet } from "react-router-dom";

export default function ProteccionRouter({ rol }) {
 
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Si no hay usuario, lo redirige al login
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // Si se requiere un cargo específico y no coincide
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/no-autorizado" replace />;
  }

  // Si todo está bien, renderiza la ruta interna
  return <Outlet/>;
    
  
}
