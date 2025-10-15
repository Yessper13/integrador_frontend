import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CampoEntrada from "../components/CampoEntrada";
import Boton from "../components/Boton";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function FormularioLogin() {
  const [usuarioInput, setUsuarioInput] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(UserContext); // 👈 Contexto

  const manejarLogin = async () => {
    setError("");
    setCargando(true);

    if (!usuarioInput || !contrasena) {
      setError("Por favor llena todos los campos.");
      setCargando(false);
      return;
    }

    try {
      // Llamada al backend con Axios
      const respuesta = await axios.get("http://localhost:8080/usuarios/login", {
        params: {
          nombre: usuarioInput,
          contraseña: contrasena,
        },
      });

      const usuarioEncontrado = respuesta.data;
      console.log("Usuario autenticado:", usuarioEncontrado);

      if (usuarioEncontrado) {
        // Guardamos en contexto y localStorage
        login(usuarioEncontrado);

        // Redirigir según el rol
        if (usuarioEncontrado.rol === "Docente") {
          navigate("/estadistica");
        } else if (usuarioEncontrado.rol === "Estudiante") {
          navigate("/estadistica");
        }
        else if (usuarioEncontrado.rol === "Empresario") {
          navigate("/estadistica");
        }
         else {
          navigate("/no-autorizado");
        }
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Usuario o contraseña incorrectos o servidor no disponible.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "22rem" }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>

        {error && <p className="text-danger text-center mb-3">{error}</p>}

        <CampoEntrada
          etiqueta="Usuario"
          tipo="text"
          valor={usuarioInput}
          alCambiar={(e) => setUsuarioInput(e.target.value)}
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
