import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../context/UserContext";

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    
    // Estados para login
    const [usuarioInput, setUsuarioInput] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    // Estados para registro
    const [registerData, setRegisterData] = useState({
        nombre: '',        
        correo: '',        
        contraseña: '',    
        rol: '',
        estado: ''
    });

    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleLoginClick = () => {
        setIsLogin(true);
        setError("");
        setUsuarioInput("");
        setContrasena("");
    };

    const handleRegisterClick = () => {
        setIsLogin(false);
        setError("");
    };

    const manejarLogin = async (e) => {
        if (e) e.preventDefault();
        
        setError("");
        setCargando(true);

        if (!usuarioInput || !contrasena) {
            setError("Por favor llena todos los campos.");
            setCargando(false);
            return;
        }

        try {
            const respuesta = await axios.get("https://nondeducible-unnotched-ari.ngrok-free.dev/usuarios/login", {
                params: {
                    nombre: usuarioInput,
                    contraseña: contrasena,
                },
            });

            const usuarioEncontrado = respuesta.data;
            console.log("Usuario autenticado:", usuarioEncontrado);

            if (usuarioEncontrado) {
                login(usuarioEncontrado);

                if (usuarioEncontrado.rol === "Docente") {
                    navigate("/estadistica");
                } else if (usuarioEncontrado.rol === "Estudiante") {
                    navigate("/estadistica");
                } else if (usuarioEncontrado.rol === "Empresario") {
                    navigate("/estadistica");
                } else {
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

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setCargando(true);

        // Validar campos obligatorios (CORREGIDO - sin username)
        if (!registerData.nombre || !registerData.correo || !registerData.contraseña || !registerData.rol || !registerData.estado) {
            setError("Por favor llena todos los campos.");
            setCargando(false);
            return;
        }

        try {
            console.log("Enviando datos:", registerData);
            
            const respuesta = await axios.post("https://nondeducible-unnotched-ari.ngrok-free.dev/usuarios", registerData);

            console.log("Usuario registrado:", respuesta.data);
            
            setError("¡Registro exitoso! Ahora puedes iniciar sesión.");
            setIsLogin(true);
            
            // Limpiar formulario de registro
            setRegisterData({
                nombre: '',
                correo: '',
                contraseña: '',
                rol: '',
                estado: ''
            });

        } catch (err) {
            console.error("Error al registrar:", err);
            if (err.response) {
                console.error("Respuesta del servidor:", err.response.data);
                setError(`Error: ${err.response.data.message || "No se pudo registrar el usuario"}`);
            } else {
                setError("Error de conexión. Verifica que el servidor esté ejecutándose.");
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <main>
            <div className={`contenedor__todo ${isLogin ? 'login' : 'register'}`}>
                <div className="caja__trasera">
                    <div className="caja__trasera-login">
                        <h3>¿Ya tienes una cuenta?</h3>
                        <p>Inicia sesión para entrar en la página</p>
                        <button id="btn__iniciar-sesion" onClick={handleLoginClick}>Iniciar Sesión</button>
                    </div>
                    <div className="caja__trasera-register">
                        <h3>¿Aún no tienes una cuenta?</h3>
                        <p>Regístrate para que puedas iniciar sesión</p>
                        <button id="btn__registrarse" onClick={handleRegisterClick}>Regístrarse</button>
                    </div>
                </div>

                <div className={`contenedor__login-register ${isLogin ? 'login' : 'register'}`}>
                    {error && <p className="text-danger text-center mb-3">{error}</p>}
                    
                    {isLogin ? (
                        <form onSubmit={manejarLogin} className="formulario__login">
                            <h2>Iniciar Sesión</h2>
                            <input 
                                type="text" 
                                name="usuario"
                                placeholder="Usuario" 
                                value={usuarioInput} 
                                onChange={(e) => setUsuarioInput(e.target.value)} 
                                required 
                            />
                            <input 
                                type="password" 
                                name="contrasena"
                                placeholder="Contraseña" 
                                value={contrasena} 
                                onChange={(e) => setContrasena(e.target.value)} 
                                required 
                            />
                            <button type="submit" disabled={cargando}>
                                {cargando ? "Cargando..." : "Entrar"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegisterSubmit} className="formulario__register">
                            <h2>Regístrarse</h2>
                            <input 
                                type="text" 
                                name="nombre"        
                                placeholder="Nombre completo" 
                                value={registerData.nombre} 
                                onChange={handleRegisterChange} 
                                required 
                            />
                            <input 
                                type="email" 
                                name="correo"        
                                placeholder="Correo Electronico" 
                                value={registerData.correo} 
                                onChange={handleRegisterChange} 
                                required 
                            />
                            <input 
                                type="password" 
                                name="contraseña"    
                                placeholder="Contraseña" 
                                value={registerData.contraseña} 
                                onChange={handleRegisterChange} 
                                required 
                            />
                            <select 
                                name="rol" 
                                value={registerData.rol} 
                                onChange={handleRegisterChange} 
                                required
                            >
                                <option value="">Selecciona un rol</option>
                                <option value="Docente">Docente</option>
                                <option value="Estudiante">Estudiante</option>
                                <option value="Empresario">Empresario</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                            <select 
                                name="estado" 
                                value={registerData.estado} 
                                onChange={handleRegisterChange} 
                                required
                            >
                                <option value="">Selecciona un estado</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                            <button type="submit" disabled={cargando}>
                                {cargando ? "Cargando..." : "Regístrarse"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
};

export default LoginRegister;