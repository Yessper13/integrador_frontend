import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Profile from "../img/undraw_profile.svg";

export default function TopBar() {
  const { usuario, logout } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow d-flex align-items-center">
          <div className="text-right mr-3">
            <span className="d-block text-gray-800 font-weight-bold">
              {usuario ? usuario.nombre : "Invitado"}
            </span>
            <small className="text-gray-500">
              {usuario ? usuario.rol : "Sin cargo"}
            </small>
          </div>

          <button className="btn btn-link p-0 border-0">
            <img
              className="img-profile rounded-circle"
              src={Profile}
              alt="Perfil"
              style={{ width: "45px", height: "45px", cursor: "pointer" }}
            />
          </button>

          {usuario && (
         <div className="dropdown-menu dropdown-menu-right show shadow animated--grow-in mt-2">
           <button className="dropdown-item" onClick={logout} > <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" /> Cerrar Sesión </button>
           
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
