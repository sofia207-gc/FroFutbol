import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "./ListarEqui.module.css";

interface Equipo {
  id: number;
  nombre: string;
  dni_presi: string;
  anio_fund: number;
}

const ListarEqui: React.FC = () => {
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [filtro, setFiltro] = useState<string>("");

  const listarEquipos = async () => {
    try {
      const res = await fetch("http://localhost:3333/equipo");
      const data = await res.json();
      setEquipos(data.mensaje);
    } catch (error) {
      console.error("Error al cargar equipos:", error);
    }
  };

  const eliminarEquipo = async (id: number) => {
    const confirmado = confirm("¿Seguro que quieres eliminar este equipo?");
    if (!confirmado) return;

    try {
      const res = await fetch(`http://localhost:3333/equipo/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar equipo");
      await res.json();
      listarEquipos();
    } catch (error) {
      alert("No se pudo eliminar el equipo.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    listarEquipos();
  }, []);

  const equiposFiltrados = equipos.filter((e) =>
    e.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    e.dni_presi.toLowerCase().includes(filtro.toLowerCase()) ||
    e.id.toString().includes(filtro)
  );

  return (
    <div className={styles.container}>
            <input
        type="text"
        placeholder="Buscar por nombre, presidente, ID..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className={styles["search-input"]}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Presidente</th>
            <th>Año de Fundación</th>
            <th colSpan={2}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equiposFiltrados.map((equipo) => (
            <tr key={equipo.id}>
              <td>{equipo.id}</td>
              <td>{equipo.nombre}</td>
              <td>{equipo.dni_presi}</td>
              <td>{equipo.anio_fund}</td>
              <td>
                <button className="btn btn-danger" onClick={() => eliminarEquipo(equipo.id)}>
                  Eliminar
                </button>
              </td>
              <td>
               <Button variant="warning" onClick={() => navigate(`/ActualizarEqui/${equipo.id}`)}>
               Actualizar
               </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className={styles["floating-button"]}
        onClick={() => navigate("/CrearEqui")}
      >
        + Crear Equipo
      </button>
    </div>
  );
};

export default ListarEqui;
