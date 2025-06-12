import { useState } from "react";
import { Alert } from "react-bootstrap";
import styles from "./CrearPresi.module.css";

const CrearPresi: React.FC = () => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState<string>("");
  const [cargando, setCargando] = useState(false);

  const guardarPresi = async () => {
    if (dni.trim() === "" || nombre.trim() === "") {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:4523/presidentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dni, nombre }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMensaje(data.mensaje || "Ocurrió un error al crear el presidente.");
      } else {
        setMensaje(data.mensaje || "Presidente guardado con éxito.");
      }
      } catch (error) {
      console.error("Error al crear al Presidente:", error);
      setMensaje("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formulario}>
        <form>
          <h1 className={styles.titulo}>Formulario Presidente</h1>
          <div className={styles.formGroup}>
            <label htmlFor="dni" className={styles.label}>DNI</label>
            <input
              id="dni"
              type="number"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nombre" className={styles.label}>Nombre</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={styles.input}
            />
          </div>

          <button
            type="button"
            onClick={guardarPresi}
            disabled={cargando}
            className={styles.boton}
          >
            {cargando ? "Guardando..." : "Guardar"}
          </button>
        </form>

        {mensaje && (
          <Alert variant="info" className={`mt-3 text-center ${styles.alerta}`}>
            {mensaje}
          </Alert>
        )}
        
      </div>
    </div>
  );
};


export default CrearPresi;
