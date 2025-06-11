import { useState } from "react";
import { Alert } from "react-bootstrap";
import styles from './CrearEqui.module.css';

const CrearEqui: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [anio_de_fundacion, setAnio_de_fundacion] = useState<number>(0);
  const [dni_del_presidente, setDni_del_presidente] = useState<number>(0);
  const [mensaje, setMensaje] = useState<string>("");
  const [cargando, setCargando] = useState(false);

  const guardarEqui = async () => {
    if (nombre.trim() === "") {
      setMensaje("El nombre no puede estar vacío.");
      return;
    }

    if (!anio_de_fundacion || anio_de_fundacion <= 0) {
      setMensaje("Año de fundación inválido.");
      return;
    }

    if (!dni_del_presidente || dni_del_presidente <= 0) {
      setMensaje("DNI del presidente inválido.");
      return;
    }

    try {
      setCargando(true);
      const response = await fetch("http://localhost:1111/equipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          anio_de_fundacion,
          dni_del_presidente,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMensaje(data.mensaje || "Ocurrió un error al crear el equipo.");
      } else {
        setMensaje(data.mensaje || "Equipo guardado con éxito.");
      }
    } catch (error) {
      console.error("Error al crear el equipo:", error);
      setMensaje("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formulario}>
        <form>
          <h1 className={styles.titulo}>Formulario Equipo</h1>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="anio">Año de Fundación</label>
              <input
                type="number"
                id="anio"
                value={anio_de_fundacion}
                onChange={(e) => {
                  const value = e.target.value;
                  setAnio_de_fundacion(value === "" ? 0 : parseInt(value));
                }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="dni">DNI Presidente</label>
              <input
                type="number"
                id="dni"
                value={dni_del_presidente}
                onChange={(e) => {
                  const value = e.target.value;
                  setDni_del_presidente(value === "" ? 0 : parseInt(value));
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={guardarEqui}
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

export default CrearEqui;
