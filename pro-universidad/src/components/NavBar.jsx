import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Asegúrate de tener esta ruta bien
import "../admin/css/sb-admin-2.min.css";
import "../admin/css/sb-admin-2.css";
import "../admin/css/custom-styles.css";

export default function NavBar() {
  const [open, setOpen] = useState({
    collapseIngreso: false,
    collapseHistorial: false,
    collapseFamiliar: false,
    collapseNotas: false,
    collapseAsistencias: false,
    collapseBienestar: false,
    collapseEstadistica: false,
  });

  const [activeItem, setActiveItem] = useState("");
  const location = useLocation();

  // Obtenemos el usuario desde el contexto global
  const { usuario } = useContext(UserContext);

  // Autoabrir submenú según la ruta actual
  useEffect(() => {
    const path = location.pathname;

    const map = {
      "/": { openKey: null },
      "/listado-estudiantes": { openKey: "collapseIngreso" },
      "/crear-estudiante": { openKey: "collapseIngreso" },
      "/listado-notas": { openKey: "collapseNotas" },
      "/crear-nota": { openKey: "collapseNotas" },
      "/listado-historial": { openKey: "collapseHistorial" },
      "/crear-historial": { openKey: "collapseHistorial" },
      "/listado-familiares": { openKey: "collapseFamiliar" },
      "/crear-familiar": { openKey: "collapseFamiliar" },
      "/listado-asistencias": { openKey: "collapseAsistencias" },
      "/crear-asistencia": { openKey: "collapseAsistencias" },
      "/listado-bienestar": { openKey: "collapseBienestar" },
      "/crear-bienestar": { openKey: "collapseBienestar" },
      "/estadistica": { openKey: "collapseEstadistica" },
      "/perfil": { openKey: null },
    };

    const entry = map[path];
    if (entry) {
      setActiveItem(path);
      if (entry.openKey) {
        setOpen((prev) => ({ ...prev, [entry.openKey]: true }));
      }
    }
  }, [location.pathname]);

  // Controla la expansión del menú
  const toggle = (key, e) => {
    e.preventDefault();
    setOpen((prev) => {
      const newState = Object.keys(prev).reduce((acc, k) => {
        acc[k] = false;
        return acc;
      }, {});
      newState[key] = !prev[key];
      return newState;
    });
  };

  const isActive = (href) => (activeItem === href ? "active" : "");

  return (
    <>
      {/* Sidebar */}
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        {/* Brand */}
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-graduation-cap" />
          </div>
          <div className="sidebar-brand-text mx-3">Sistema Educativo</div>
        </Link>

        <hr className="sidebar-divider my-0" />

        {/* Dashboard */}
        <li className={`nav-item ${isActive("/")}`}>
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Módulos Educativos</div>

        {/* === Módulo Ingreso === */}
        <li className={`nav-item ${open.collapseIngreso ? "active" : ""}`}>
          <a className="nav-link collapsed" href="#" onClick={(e) => toggle("collapseIngreso", e)}>
            <i className="fas fa-fw fa-user-plus" />
            <span>Ingreso y registro</span>
          </a>
          <div className={`${open.collapseIngreso ? "collapse show" : "collapse"} collapse-transition`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Acciones:</h6>
              <Link className={`collapse-item ${isActive("/listado-estudiantes")}`} to="/listado-estudiantes">Ver Estudiantes</Link>
              <Link className={`collapse-item ${isActive("/crear-estudiante")}`} to="/crear-estudiante">Crear Estudiante</Link>
            </div>
          </div>
        </li>

        {/* === Historial === */}
        <li className={`nav-item ${open.collapseHistorial ? "active" : ""}`}>
          <a className="nav-link collapsed" href="#" onClick={(e) => toggle("collapseHistorial", e)}>
            <i className="fas fa-fw fa-history" />
            <span>Historial Estudiantil</span>
          </a>
          <div className={`${open.collapseHistorial ? "collapse show" : "collapse"} collapse-transition`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Acciones:</h6>
              <Link className={`collapse-item ${isActive("/listado-historial")}`} to="/listado-historial">Ver Historial</Link>
              <Link className={`collapse-item ${isActive("/crear-historial")}`} to="/crear-historial">Crear Registro</Link>
            </div>
          </div>
        </li>

        {/* === Familiar === */}
        <li className={`nav-item ${open.collapseFamiliar ? "active" : ""}`}>
          <a className="nav-link collapsed" href="#" onClick={(e) => toggle("collapseFamiliar", e)}>
            <i className="fas fa-fw fa-users" />
            <span>Módulo Familiar</span>
          </a>
          <div className={`${open.collapseFamiliar ? "collapse show" : "collapse"} collapse-transition`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Acciones:</h6>
              <Link className={`collapse-item ${isActive("/listado-familiares")}`} to="/listado-familiares">Ver Familiares</Link>
              <Link className={`collapse-item ${isActive("/crear-familiar")}`} to="/crear-familiar">Crear Familiar</Link>
            </div>
          </div>
        </li>

        {/* === Notas === */}
        <li className={`nav-item ${open.collapseNotas ? "active" : ""}`}>
          <a className="nav-link collapsed" href="#" onClick={(e) => toggle("collapseNotas", e)}>
            <i className="fas fa-fw fa-clipboard-list" />
            <span>Seguimiento de Notas</span>
          </a>
          <div className={`${open.collapseNotas ? "collapse show" : "collapse"} collapse-transition`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Acciones:</h6>
              <Link className={`collapse-item ${isActive("/listado-notas")}`} to="/listado-notas">Ver Notas</Link>
              <Link className={`collapse-item ${isActive("/crear-nota")}`} to="/crear-nota">Registrar Nota</Link>
            </div>
          </div>
        </li>

        {/* === Asistencias === */}
        <li className={`nav-item ${open.collapseAsistencias ? "active" : ""}`}>
          <a className="nav-link collapsed" href="#" onClick={(e) => toggle("collapseAsistencias", e)}>
            <i className="fas fa-fw fa-calendar-check" />
            <span>Asistencias</span>
          </a>
          <div className={`${open.collapseAsistencias ? "collapse show" : "collapse"} collapse-transition`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Acciones:</h6>
              <Link className={`collapse-item ${isActive("/listado-asistencias")}`} to="/listado-asistencias">Ver Asistencias</Link>
              <Link className={`collapse-item ${isActive("/crear-asistencia")}`} to="/crear-asistencia">Registrar Asistencia</Link>
            </div>
          </div>
        </li>

        {/* === Bienestar === */}
        <li className={`nav-item ${open.collapseBienestar ? "active" : ""}`}>
          <a className="nav-link collapsed" href="#" onClick={(e) => toggle("collapseBienestar", e)}>
            <i className="fas fa-fw fa-heart" />
            <span>Bienestar Estudiantil</span>
          </a>
          <div className={`${open.collapseBienestar ? "collapse show" : "collapse"} collapse-transition`}>
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Acciones:</h6>
              <Link className={`collapse-item ${isActive("/listado-bienestar")}`} to="/listado-bienestar">Ver Registros</Link>
              <Link className={`collapse-item ${isActive("/crear-bienestar")}`} to="/crear-bienestar">Crear Registro</Link>
            </div>
          </div>
        </li>
        
        {/* ===== Estadísticas - Mostrar solo si NO es Administrador ===== */}
        {usuario && usuario.rol !== "Administrador" && (
          <>
            <li className={`nav-item ${isActive("/estadistica")}`}>
              <Link
                className="nav-link"
                to="/estadistica"
                onClick={() => setActiveItem("/estadistica")}
              >
                <i className="fas fa-fw fa-chart-bar" />
                <span>Estadística</span>
              </Link>
            </li>

            <hr className="sidebar-divider" />

            <div className="text-center d-none d-md-inline">
              <button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
          </>
        )}
      </ul>
      {/* End of Sidebar */}
    </>
  );
}
