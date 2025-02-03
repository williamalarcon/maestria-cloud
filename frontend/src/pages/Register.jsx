import { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        const response = await registerUser(username, password);
        if (response.message === "User created successfully") {
            alert("Registro exitoso! Ahora inicia sesión.");
            navigate("/"); // Redirige al login
        } else {
            alert("Error al registrar usuario");
        }
    };

    return (
        <div>
            <h1>Registrarse</h1>
            <input placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="Contraseña" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Registrar</button>
            <p>¿Ya tienes una cuenta? <a href="/">Inicia sesión</a></p>
        </div>
    );
}

export default Register;
