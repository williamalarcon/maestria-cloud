import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await loginUser(username, password);
        if (response.access_token) {
            localStorage.setItem("token", response.access_token);
            alert("Login exitoso!");
            navigate("/tasks");
        } else {
            alert("Credenciales inválidas");
        }
    };

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <input placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="Contraseña" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Ingresar</button>
            <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p> {/* Agregamos enlace al registro */}
        </div>
    );
}

export default Login;
