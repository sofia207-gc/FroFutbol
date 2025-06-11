import { useState } from "react";
import styles from "./CrearPresi.module.css";

const CrearPresi: React.FC = () => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");

  const guardarPresi = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dni || !nombre) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3333/presi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dni, nombre }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const data = await response.json();
      alert("Presidente guardado correctamente");

      setDni("");
      setNombre("");
    } catch (error) {
      console.error("Error al guardar presidente:", error);
      alert("Ocurrió un error al guardar el presidente.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formulario}>
        <form onSubmit={guardarPresi}>
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

          <button type="submit" className={styles.boton}>Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default CrearPresi;
