import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
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
      const res = await fetch("http://127.0.0.1:4523/presi");
      const data = await res.json();
      setPresidentes(data.mensaje);
    } catch (error) {
      console.error("Error al cargar presidentes:", error);
    }
  };

  const eliminarPresi = async (dni: number) => {
  const confirmado = confirm("¿Estás seguro de eliminar este presidente?");
  if (!confirmado) return;
  try {
    const res = await fetch(`http://127.0.0.1:4523/presi/${dni}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("No se pudo eliminar");
    alert("Presidente eliminado correctamente");
  } catch (error) {
    console.error("Error eliminando presidente:", error);
    alert("Error al eliminar presidente.");
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
                  onClick={() => eliminarPresi(presi.dni)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
              <td>
                <Button variant="warning" onClick={() => navigate(`/ActualizarPresi/${presi.dni}`)}>
                Actualizar
                </Button>


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
