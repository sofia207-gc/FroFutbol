import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Equipos {
  codigo: number;
  nombre: string;
  anio_fund: number;
  dni_presi: string;
}

const ActuEqui: React.FC = () => {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [equipoAEditar, setEquipoAEditar] = useState<Equipos | null>(null);

  useEffect(() => {
    const obtenerEquipo = async () => {
      try {
        const res = await fetch(`http://localhost:1111/equipo/${codigo}`);
        if (!res.ok) throw new Error("No se pudo obtener el equipo");
        const data = await res.json();
        setEquipoAEditar(data.mensaje); // Asegúrate que el backend responde con "mensaje"
      } catch (error) {
        console.error("Error al cargar equipo:", error);
      }
    };

    if (codigo) obtenerEquipo();
  }, [codigo]);

  const actualizarEquipo = async () => {
    if (!equipoAEditar) return;
    const seguro = confirm("¿Estás seguro de que quieres actualizar este equipo?");
    if (!seguro) return;

    try {
      const res = await fetch(`http://127.0.0.1:4523/equipo/${codigo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipoAEditar),
      });

      if (!res.ok) throw new Error("Error al actualizar equipo.");
      await res.json();
      alert("Equipo actualizado con éxito.");
      navigate("/"); // Regresa a la lista
    } catch (error) {
      alert("No se pudo actualizar el equipo.");
      console.error("Error:", error);
    }
  };

  if (!equipoAEditar) return <p>Cargando equipo...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Actualizar Equipo</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={equipoAEditar.nombre}
        onChange={(e) =>
          setEquipoAEditar({ ...equipoAEditar, nombre: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Presidente"
        value={equipoAEditar.dni_presi}
        onChange={(e) =>
          setEquipoAEditar({ ...equipoAEditar, dni_presi: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Año de Fundación"
        value={equipoAEditar.anio_fund}
        onChange={(e) =>
          setEquipoAEditar({
            ...equipoAEditar,
            anio_fund: parseInt(e.target.value) || 0,
          })
        }
      />
      <br />
      <button onClick={actualizarEquipo}>Guardar</button>
      <button
        onClick={() => navigate("/")}
        style={{ marginLeft: "1rem", backgroundColor: "#ccc" }}
      >
        Cancelar
      </button>
    </div>
  );
};

export default ActuEqui;
