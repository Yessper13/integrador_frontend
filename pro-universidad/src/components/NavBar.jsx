import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import '../admin/css/sb-admin-2.min.css';
import '../admin/css/sb-admin-2.css';
import '../admin/css/custom-styles.css';
import Estadistica from "../pages/Estadistica";
// keep activateCurrentModule for backwards compatibility if needed
import { activateCurrentModule } from '../admin/js/sidebar.js';


export default function NavBar() {
  const [open, setOpen] = useState({
    collapseIngreso: false,
    collapseHistorial: false,
    collapseFamiliar: false,
    collapseNotas: false,
    collapseAsistencias: false,
    collapseBienestar: false,
    collapseEstadisticas: false,
  });

  const [activeItem, setActiveItem] = useState('');

  // Determine initial open/active based on current pathname
  useEffect(() => {
    const currentPage = window.location.pathname.split('/').pop();
    // map pages to collapse keys and active hrefs
    const map = {
      'index.html': { openKey: null, href: 'index.html' },
      'listado-estudiantes.html': { openKey: 'collapseIngreso', href: 'listado-estudiantes.html' },
      'crear-estudiante.html': { openKey: 'collapseIngreso', href: 'crear-estudiante.html' },
      'listado-notas.html': { openKey: 'collapseNotas', href: 'listado-notas.html' },
      'crear-nota.html': { openKey: 'collapseNotas', href: 'crear-nota.html' },
      'listado-historial.html': { openKey: 'collapseHistorial', href: 'listado-historial.html' },
      'crear-historial.html': { openKey: 'collapseHistorial', href: 'crear-historial.html' },
      'listado-familiares.html': { openKey: 'collapseFamiliar', href: 'listado-familiares.html' },
      'crear-familiar.html': { openKey: 'collapseFamiliar', href: 'crear-familiar.html' },
      'listado-asistencias.html': { openKey: 'collapseAsistencias', href: 'listado-asistencias.html' },
      'crear-asistencia.html': { openKey: 'collapseAsistencias', href: 'crear-asistencia.html' },
      'listado-bienestar.html': { openKey: 'collapseBienestar', href: 'listado-bienestar.html' },
      'crear-bienestar.html': { openKey: 'collapseBienestar', href: 'crear-bienestar.html' },
      'estadisticas.html': { openKey: 'collapseEstadisticas', href: 'estadisticas.html' },
      'perfil.html': { openKey: null, href: 'perfil.html' },
    };

    const entry = map[currentPage];
    if (entry) {
      setActiveItem(entry.href || '');
      if (entry.openKey) setOpen(prev => ({ ...prev, [entry.openKey]: true }));
    } else {
      // fallback: try to call legacy function to keep parity
      try { activateCurrentModule(currentPage); } catch (e) {}
    }
  }, []);

  function toggle(key, e) {
    if (e && e.preventDefault) e.preventDefault();
    setOpen(prev => {
      // If key is already open, close it. Otherwise open only this key (accordion behavior)
      const isOpen = !!prev[key];
      const newState = Object.keys(prev).reduce((acc, k) => {
        acc[k] = false;
        return acc;
      }, {});
      newState[key] = !isOpen;
      return newState;
    });
  }

  function handleItemClick(href) {
    setActiveItem(href);
  }

  return (
    <>
  {/* Sidebar */}
  <ul
    className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    {/* Sidebar - Brand */}
    <a
      className="sidebar-brand d-flex align-items-center justify-content-center"
      href="index.html"
    >
      <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-graduation-cap" />
      </div>
      <div className="sidebar-brand-text mx-3">Sistema Educativo</div>
    </a>
    {/* Divider */}
    <hr className="sidebar-divider my-0" />
    {/* Nav Item - Dashboard */}
    <li className={`nav-item ${activeItem === 'index.html' ? 'active' : ''}`}>
      <a className="nav-link" href="index.html" onClick={() => handleItemClick('index.html')}>
        <i className="fas fa-fw fa-tachometer-alt" />
        <span>Dashboard</span>
      </a>
    </li>
    {/* Divider */}
    <hr className="sidebar-divider" />
    {/* Heading */}
    <div className="sidebar-heading">Módulos Educativos</div>
    {/* Nav Item - Ingreso y registro */}
    <li className={`nav-item ${open.collapseIngreso ? 'active' : ''}`}>
      <a
        className="nav-link collapsed"
        href="#"
        onClick={(e) => toggle('collapseIngreso', e)}
        aria-expanded={open.collapseIngreso}
        aria-controls="collapseIngreso"
      >
        <i className="fas fa-fw fa-user-plus" />
        <span>Ingreso y registro</span>
      </a>
      <div
        id="collapseIngreso"
        className={`${open.collapseIngreso ? 'collapse show' : 'collapse'} collapse-transition`}
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Acciones:</h6>
          <a className={`collapse-item ${activeItem === 'listado-estudiantes.html' ? 'active' : ''}`} href="listado-estudiantes.html" onClick={() => handleItemClick('listado-estudiantes.html')}>
            Ver Estudiantes
          </a>
          <a className={`collapse-item ${activeItem === 'crear-estudiante.html' ? 'active' : ''}`} href="crear-estudiante.html" onClick={() => handleItemClick('crear-estudiante.html')}>
            Crear Estudiante
          </a>
        </div>
      </div>
    </li>
    {/* Nav Item - Hy estudiantil */}
    <li className={`nav-item ${open.collapseHistorial ? 'active' : ''}`}>
      <a
        className="nav-link collapsed"
        href="#"
        onClick={(e) => toggle('collapseHistorial', e)}
        aria-expanded={open.collapseHistorial}
        aria-controls="collapseHistorial"
      >
        <i className="fas fa-fw fa-history" />
        <span>Hy estudiantil</span>
      </a>
      <div
        id="collapseHistorial"
        className={`${open.collapseHistorial ? 'collapse show' : 'collapse'} collapse-transition`}
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Acciones:</h6>
          <a className={`collapse-item ${activeItem === 'listado-historial.html' ? 'active' : ''}`} href="listado-historial.html" onClick={() => handleItemClick('listado-historial.html')}>
            Ver Historial
          </a>
          <a className={`collapse-item ${activeItem === 'crear-historial.html' ? 'active' : ''}`} href="crear-historial.html" onClick={() => handleItemClick('crear-historial.html')}>
            Crear Registro
          </a>
        </div>
      </div>
    </li>
    {/* Nav Item - Modulo Familiar */}
    <li className={`nav-item ${open.collapseFamiliar ? 'active' : ''}`}>
      <a
        className="nav-link collapsed"
        href="#"
        onClick={(e) => toggle('collapseFamiliar', e)}
        aria-expanded={open.collapseFamiliar}
        aria-controls="collapseFamiliar"
      >
        <i className="fas fa-fw fa-users" />
        <span>Módulo Familiar</span>
      </a>
      <div
        id="collapseFamiliar"
        className={`${open.collapseFamiliar ? 'collapse show' : 'collapse'} collapse-transition`}
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Acciones:</h6>
          <a className={`collapse-item ${activeItem === 'listado-familiares.html' ? 'active' : ''}`} href="listado-familiares.html" onClick={() => handleItemClick('listado-familiares.html')}>
            Ver Familiares
          </a>
          <a className={`collapse-item ${activeItem === 'crear-familiar.html' ? 'active' : ''}`} href="crear-familiar.html" onClick={() => handleItemClick('crear-familiar.html')}>
            Crear Familiar
          </a>
        </div>
      </div>
    </li>
    {/* Nav Item - Seguimiento de notas */}
    <li className={`nav-item ${open.collapseNotas ? 'active' : ''}`}>
      <a
        className="nav-link collapsed"
        href="#"
        onClick={(e) => toggle('collapseNotas', e)}
        aria-expanded={open.collapseNotas}
        aria-controls="collapseNotas"
      >
        <i className="fas fa-fw fa-clipboard-list" />
        <span>Seguimiento de notas</span>
      </a>
      <div
        id="collapseNotas"
        className={`${open.collapseNotas ? 'collapse show' : 'collapse'} collapse-transition`}
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Acciones:</h6>
          <a className={`collapse-item ${activeItem === 'listado-notas.html' ? 'active' : ''}`} href="listado-notas.html" onClick={() => handleItemClick('listado-notas.html')}>
            Ver Notas
          </a>
          <a className={`collapse-item ${activeItem === 'crear-nota.html' ? 'active' : ''}`} href="crear-nota.html" onClick={() => handleItemClick('crear-nota.html')}>
            Registrar Nota
          </a>
        </div>
      </div>
    </li>
    {/* Nav Item - Asistencias */}
    <li className={`nav-item ${open.collapseAsistencias ? 'active' : ''}`}>
      <a
        className="nav-link collapsed"
        href="#"
        onClick={(e) => toggle('collapseAsistencias', e)}
        aria-expanded={open.collapseAsistencias}
        aria-controls="collapseAsistencias"
      >
        <i className="fas fa-fw fa-calendar-check" />
        <span>Asistencias</span>
      </a>
      <div
        id="collapseAsistencias"
        className={`${open.collapseAsistencias ? 'collapse show' : 'collapse'} collapse-transition`}
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Acciones:</h6>
          <a className={`collapse-item ${activeItem === 'listado-asistencias.html' ? 'active' : ''}`} href="listado-asistencias.html" onClick={() => handleItemClick('listado-asistencias.html')}>
            Ver Asistencias
          </a>
          <a className={`collapse-item ${activeItem === 'crear-asistencia.html' ? 'active' : ''}`} href="crear-asistencia.html" onClick={() => handleItemClick('crear-asistencia.html')}>
            Registrar Asistencia
          </a>
        </div>
      </div>
    </li>
    {/* Nav Item - Bienestar Estudiantil */}
    <li className={`nav-item ${open.collapseBienestar ? 'active' : ''}`}>
      <a
        className="nav-link collapsed"
        href="#"
        onClick={(e) => toggle('collapseBienestar', e)}
        aria-expanded={open.collapseBienestar}
        aria-controls="collapseBienestar"
      >
        <i className="fas fa-fw fa-heart" />
        <span>Bienestar Estudiantil</span>
      </a>
      <div
        id="collapseBienestar"
        className={`${open.collapseBienestar ? 'collapse show' : 'collapse'} collapse-transition`}
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Acciones:</h6>
          <a className={`collapse-item ${activeItem === 'listado-bienestar.html' ? 'active' : ''}`} href="listado-bienestar.html" onClick={() => handleItemClick('listado-bienestar.html')}>
            Ver Registros
          </a>
          <a className={`collapse-item ${activeItem === 'crear-bienestar.html' ? 'active' : ''}`} href="crear-bienestar.html" onClick={() => handleItemClick('crear-bienestar.html')}>
            Crear Registro
          </a>
        </div>
      </div>
    </li>
    {/* Nav Item - Estadísticas */}
    <li className={`nav-item ${open.collapseEstadisticas ? 'active' : ''}`}>
      <a
        className="nav-link collapsed"
        href="#"
        onClick={(e) => toggle('collapseEstadisticas', e)}
        aria-expanded={open.collapseEstadisticas}
        aria-controls="collapseEstadisticas"
      >
        <i className="fas fa-fw fa-chart-bar" />
        <span>Estadísticas</span>
      </a>
      <div
        id="collapseEstadisticas"
        className={`${open.collapseEstadisticas ? 'collapse show' : 'collapse'} collapse-transition`}
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Acciones:</h6>
            <Link className={`collapse-item ${activeItem === 'estadisticas.html' ? 'active' : ''}`} to="/" onClick={() => handleItemClick('estadisticas.html')}>
              Ver Reportes
            </Link>
        </div>
      </div>
    </li>
    {/* Divider */}
    <hr className="sidebar-divider" />
    {/* Sidebar Toggler (Sidebar) */}
    <div className="text-center d-none d-md-inline">
      <button className="rounded-circle border-0" id="sidebarToggle" />
    </div>
  </ul>
  {/* End of Sidebar */}
</>

  )
}
