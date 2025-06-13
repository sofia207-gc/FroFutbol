import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate(); 
  const enviardatos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:4523/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: contraseña }),
    });

    const data = await res.json();

    if (data.msj === "Inicio de sesion correcto") {
      localStorage.setItem("email", email);
      localStorage.setItem("contraseña", contraseña);
      localStorage.setItem("auth", "true");
      navigate("/crearEqui"); 
    }
    if (data.msj === "Usuario no encontrado") {
      alert("Usuario no encontrado");
    }

    console.log(data);
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2>INICIAR SESIÓN</h2>
        <form onSubmit={enviardatos}>
          <input
            placeholder="Escriba el Gmail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Escriba el Password"
            type="password"
            onChange={(e) => setContraseña(e.target.value)}
          />
          <button type="submit" className="btn-login">
            <img src="/balon.png" alt="balón" className="balon-btn" />
            INGRESAR
          </button>
          <a href="#" onClick={() => navigate("/registro")}>
            ¿No tienes cuenta? REGISTRATE AHORA
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
