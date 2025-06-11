import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ListarPresi.module.css";

interface Presidente {
  dni: number;
  nombre: string;
}

const ListarPresi: React.FC = () => {
  const navigate = useNavigate();
  const [presidentes, setPresidentes] = useState<Presidente[]>([]);
  const [filtro, setFiltro] = useState<string>("");

  const listarPresidentes = async () => {
    try {
      const res = await fetch("http://localhost:1111/presidentes");
      const data = await res.json();
      setPresidentes(data.mensaje);
    } catch (error) {
      console.error("Error al cargar presidentes:", error);
    }
  };

  const eliminarPresidente = async (dni: number) => {
    const confirmado = confirm("¿Estás seguro de que quieres eliminar este presidente?");
    if (!confirmado) return;

    try {
      const res = await fetch(`http://localhost:1111/presidentes/${dni}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar presidente");
      await res.json();
      listarPresidentes();
    } catch (error) {
      alert("No se pudo eliminar el presidente.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    listarPresidentes();
  }, []);

  const presidentesFiltrados = presidentes.filter((p) =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.dni.toString().includes(filtro)
  );

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Buscar por DNI o nombre"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className={styles["search-input"]}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th colSpan={2}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {presidentesFiltrados.map((presi) => (
            <tr key={presi.dni}>
              <td>{presi.dni}</td>
              <td>{presi.nombre}</td>
              <td>
                <button
                  onClick={() => eliminarPresidente(presi.dni)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
              <td>
                <button variant="warning" onClick={() => navigate(`/ActualizarPresi/${presi.dni}`)}>
                Actualizar
                </button>


              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className={styles["floating-button"]}
        onClick={() => navigate("/CrearPresi")}
      >
        + Crear Presidente
      </button>
    </div>
  );
};

export default ListarPresi;
