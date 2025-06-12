import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './CerrarS.css'; 

const CerrarSesion: React.FC = () => {
  const navigate = useNavigate();

  const handleCerrarSesion = async () => {
    const email = localStorage.getItem("email");

    try {
      await fetch("http://127.0.0.1:4523/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.error("Error cerrando sesión en el servidor:", error);
    }

    localStorage.removeItem("email");
    localStorage.removeItem("auth");
    navigate("/");
  };

  const handleCancelar = () => {
    navigate("/crearEqui");
  };

  return (
    <div className="logout-container">
      <h1>¿QUIERES CERRAR TU SESIÓN?</h1>
      <Button variant="outline-light" onClick={handleCerrarSesion} className="logout-button">
        Cerrar sesión
      </Button>
      <Button variant="outline-danger" onClick={handleCancelar} className="logout-button" style={{ marginLeft: "10px" }}>
        No quiero cerrar sesión
      </Button>
    </div>
  );
};

export default CerrarSesion;
