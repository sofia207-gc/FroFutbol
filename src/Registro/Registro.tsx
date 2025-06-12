import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate(); 
  const enviarDatos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:4523/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, apellido, email, password: contraseña }),
    });

    const data = await res.json();

    if (data.msj === "Registro correcto") {
      localStorage.setItem("email", email);
      localStorage.setItem("contraseña", contraseña);
      localStorage.setItem("nombre", nombre);
      localStorage.setItem("apellido", apellido);
      localStorage.setItem("direccion", direccion);
      localStorage.setItem("telefono", telefono);
      localStorage.setItem("auth", "true");
      navigate("/login"); 
    }

    console.log(data);
  };

  return (
    <div className="login-container">      
      <div className="login">
        <h2>REGISTRO</h2>
        <form onSubmit={enviarDatos}>
          <input
            placeholder="Escriba tu nombre"
            type="text"
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            placeholder="Escriba tu apellido"
            type="text"
            onChange={(e) => setApellido(e.target.value)}
          />
          <input
            placeholder="Escriba tu email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Escriba tu contraseña"
            type="number"
            onChange={(e) => setContraseña(e.target.value)}
          />
          <input
            placeholder="Confirma tu contraseña"
            type="password"
            onChange={(e) => setContraseña(e.target.value)}
          />

          <input
            placeholder="Escriba tu direccion"
            type="text"
            onChange={(e) => setDireccion(e.target.value)}
          />
          <input
            placeholder="Escriba tu telefono"
            type="number"
            onChange={(e) => setTelefono(e.target.value)}
          />

          <button type="submit" className="btn-login">
            <img src="/balon.png" alt="balón" className="balon-btn" />
            REGISTRAR
          </button>
          <a href="#" onClick={() => navigate("/")}>
            ¿Ya tienes cuenta? INGRESA AHORA
          </a>
        </form>
      </div>
    </div>
  );
};      

export default Registro;