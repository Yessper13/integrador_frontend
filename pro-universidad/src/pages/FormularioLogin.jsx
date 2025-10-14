import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoEntrada from "../components/CampoEntrada";
import Boton from "../components/Boton";

export default function FormularioLogin() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarLogin = async () => {
    setCargando(true);

    const datos = [
      { usuario: "pepito", contrasena: "123", cargo: "estadistica" },
      { usuario: "juan", contrasena: "123", cargo: "admin" }
    ];

    if (!usuario || !contrasena) {
      setError("Por favor llena todos los campos.");
      setCargando(false);
      return;
    }

    const usuarioEncontrado = datos.find(
      (u) => u.usuario === usuario && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
      setError("");
      console.log("Guardando en localStorage:", usuarioEncontrado);
      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

      if (usuarioEncontrado.cargo === "admin") {
        navigate("/admin");
      } else if (usuarioEncontrado.cargo === "estadistica") {
        navigate("/estadistica");
      }
    } else {
      setError("Usuario o contraseña incorrectos.");
    }

    setCargando(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "22rem" }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        {error && <p className="text-danger text-center mb-3">{error}</p>}

        <CampoEntrada
          etiqueta="Usuario"
          tipo="text"
          valor={usuario}
          alCambiar={(e) => setUsuario(e.target.value)}
        />

        <CampoEntrada
          etiqueta="Contraseña"
          tipo="password"
          valor={contrasena}
          alCambiar={(e) => setContrasena(e.target.value)}
        />

        <Boton
          texto={cargando ? "Cargando..." : "Entrar"}
          alClic={manejarLogin}
          deshabilitado={cargando}
        />
      </div>
    </div>
  );
}
