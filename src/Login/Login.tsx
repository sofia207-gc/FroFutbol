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

    if (!email.trim() || !contraseña.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:4523/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: contraseña }),
      });

      const data = await res.json();
      console.log("Respuesta del servidor:", data);

      if (data.mensaje === "Usuario logueado") {
        localStorage.setItem("email", email);
        localStorage.setItem("contraseña", contraseña);
        localStorage.setItem("auth", "true");
        navigate("/crearEqui");
      } else {
        alert(data.mensaje || "Error al iniciar sesión.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("No se pudo iniciar sesión. Intenta más tarde.");
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2>INICIAR SESIÓN</h2>
        <form onSubmit={enviardatos}>
          <input
            placeholder="Escriba el Gmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Escriba el Password"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <button type="submit" className="btn-login">
            <img src="/balon.png" alt="balón" className="balon-btn" />
            INGRESAR
          </button>
          <a href="#" onClick={() => navigate("/registro")}>
            ¿No tienes cuenta? REGÍSTRATE AHORA
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
