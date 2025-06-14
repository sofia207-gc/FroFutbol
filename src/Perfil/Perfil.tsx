import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Perfil.css"; // opcional
import CerrarSesion from "../CerrarSesion/CerrarS";

const Perfil = () => {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    email: "",
    contraseña: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    const contraseña = localStorage.getItem("contraseña") || "";

    setPerfil({ email, contraseña });
  }, []);

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/CerrarSesion");
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2>Mi Perfil</h2>
        <p><strong>Email:</strong> {perfil.email}</p>
        <p><strong>Contraseña:</strong> {perfil.contraseña}</p>
        <button className="cerrar-btn" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Perfil;
