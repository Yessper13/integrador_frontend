import { useState, useEffect } from "react";
import Profile from "../img/undraw_profile.svg";

export default function TopBar() {
  const [usuario, setUsuario] = useState(null);
  const [abierto, setAbierto] = useState(false);

  const cargarUsuario = () => {
    const datosUsuario = localStorage.getItem("usuario");
    if (datosUsuario) {
      try {
        setUsuario(JSON.parse(datosUsuario));
      } catch (error) {
        console.error("Error al leer usuario:", error);
      }
    } else {
      setUsuario(null);
    }
  };

  useEffect(() => {
    cargarUsuario();

    // 👇 Detectar cambios en localStorage (cuando se logea o cierra sesión)
    window.addEventListener("storage", cargarUsuario);

    // 👇 También al regresar de login
    window.addEventListener("focus", cargarUsuario);

    return () => {
      window.removeEventListener("storage", cargarUsuario);
      window.removeEventListener("focus", cargarUsuario);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow d-flex align-items-center">
          {/* Nombre y cargo */}
          <div className="text-right mr-3">
            <span className="d-block text-gray-800 font-weight-bold">
              {usuario ? usuario.usuario : "Invitado"}
            </span>
            <small className="text-gray-500">
              {usuario ? usuario.cargo : "Sin cargo"}
            </small>
          </div>

          {/* Imagen como botón */}
          <button
            className="btn btn-link p-0 border-0"
            onClick={() => setAbierto(!abierto)}
            style={{ outline: "none" }}
          >
            <img
              className="img-profile rounded-circle"
              src={Profile}
              alt="Perfil"
              style={{ width: "45px", height: "45px", cursor: "pointer" }}
            />
          </button>

          {/* Menú */}
          {abierto && (
            <div className="dropdown-menu dropdown-menu-right show shadow animated--grow-in mt-2">
              <a className="dropdown-item" href="perfil.html">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                Perfil
              </a>
              <div className="dropdown-divider" />
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  localStorage.removeItem("usuario");
                  setUsuario(null);
                  window.location.href = "/";
                }}
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Cerrar Sesión
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
