import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate();

  const enviarDatos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre.trim() || !apellido.trim() || !email.trim() || !contraseña.trim() || !confirmarContraseña.trim() || !telefono.trim()) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:4523/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          password: contraseña,
          direccion,
          telefono
        }),
      });

      const data = await res.json();
      console.log("Respuesta del servidor:", data);

  
      if (data.mensaje === "Usuario registrado") {
        localStorage.setItem("email", email);
        localStorage.setItem("contraseña", contraseña);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("apellido", apellido);
        localStorage.setItem("direccion", direccion);
        localStorage.setItem("telefono", telefono);
        localStorage.setItem("auth", "true");

        navigate("/CrearEqui");
      } else {
        alert(data.mensaje || "Ocurrió un error durante el registro.");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("No se pudo registrar. Intenta de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2>REGISTRO</h2>
        <form onSubmit={enviarDatos}>
          <input placeholder="Escriba tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input placeholder="Escriba tu apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          <input placeholder="Escriba tu email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Escriba tu contraseña" type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
          <input placeholder="Confirma tu contraseña" type="password" value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} />
          <input placeholder="Escriba tu dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          <input placeholder="Escriba tu teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

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
