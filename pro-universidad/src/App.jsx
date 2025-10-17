import Estadistica from './pages/Estadistica'
import NavBar from './components/NavBar' 
import TopBar from './components/TopBar'
import { Routes, Route } from "react-router-dom"
import FormularioLogin from './pages/FormularioLogin'
import ProteccionRouter from './components/ProteccionRouter'
import NoAutorizado from './pages/NoAutorizado'
import '../src/admin/css/login.css';

function App() {
  // Assumptions: desktop sidebar width is 14rem (matches CSS at >=768px)
  // and topbar height is 56px. Adjust these if you want different sizes.
  const sidebarWidth = '14rem'
  const topbarHeight = '56px'

  const rol = JSON.parse(localStorage.getItem("usuario"))?.rol;

  return (
    <>
      {/* Sidebar fixed to the left */}
      <div style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: sidebarWidth, overflowY: 'auto' }}>
        <NavBar />
      </div>

      {/* Topbar fixed at the top (to the right of the sidebar) */}
      <div style={{ position: 'fixed', left: sidebarWidth, right: 0, top: 0, height: topbarHeight, zIndex: 1000 }}>
        <TopBar />
      </div>

      {/* Main content: sits to the right of the sidebar and below the topbar; scrollable */}
      <div style={{ marginLeft: sidebarWidth, marginTop: topbarHeight, height: `calc(100vh - ${topbarHeight})`, overflowY: 'auto', padding: '3rem' }}>
        <Routes>         
        <Route path="/" element={<FormularioLogin/>} />        
        <Route element={<ProteccionRouter cargoRequerido={rol}/>}>
        <Route path="/estadistica" element={<Estadistica/>} />
        </Route>
        <Route path="/no-autorizado" element={<NoAutorizado />} />

        </Routes>
      </div>
    </>
  )
}

export default App
