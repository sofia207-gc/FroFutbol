import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "./ListarEqui.module.css";

interface Equipo {
  codigo: number;
  nombre: string;
  dni: number;
  anio_fund: number;
}

const ListarEqui: React.FC = () => {
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [filtro, setFiltro] = useState<string>("");

  const listarEquipos = async () => {
    try {
      const res = await fetch("http://127.0.0.1:4523/equipo");
      const data = await res.json();
      setEquipos(data.mensaje);
    } catch (error) {
      console.error("Error al cargar equipos:", error);
    }
  };

    const eliminarEquipo = async (codigo: number) => {
      const confirmado = confirm("¿Seguro que quieres eliminar este equipo?");
      if (!confirmado) return;
      try {
        const res = await fetch(`http://127.0.0.1:4523/equipo/${codigo}`, {
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
  (typeof e.nombre === "string" && e.nombre.toLowerCase().includes(filtro.toLowerCase())) ||
  (typeof e.dni === "number" && e.dni.toString().includes(filtro)) ||
  (typeof e.codigo === "number" && e.codigo.toString().includes(filtro))
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
            <tr key={equipo.codigo}>
              <td>{equipo.codigo}</td>
              <td>{equipo.nombre}</td>
              <td>{equipo.dni}</td>
              <td>{equipo.anio_fund}</td>
              <td>
                <button className="btn btn-danger" onClick={() => eliminarEquipo(equipo.codigo)}>
                  Eliminar
                </button>
              </td>
              <td>
               <Button variant="warning" onClick={() => navigate(`/ActualizarEqui/${equipo.codigo}`)}>
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
