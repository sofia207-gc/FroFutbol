import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ActualizarEqui.module.css";

interface Equipos {
  codigo: number;
  nombre: string;
  anio_de_fundacion: number;
  presidente: string;
}

const ActuEqui: React.FC = () => {
  const [equipoAEditar, setEquipoAEditar] = useState<Equipos | null>(null);
  const navigate = useNavigate();

  const actualizarEquipo = async () => {
    if (!equipoAEditar) return;

    const seguro = confirm("¿Estás seguro de que quieres actualizar este equipo?");
    if (!seguro) return;

    try {
      const res = await fetch(`http://localhost:1111/equipos/${equipoAEditar.codigo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipoAEditar),
      });

      if (!res.ok) throw new Error("Error al actualizar equipo.");
      await res.json();
      setEquipoAEditar(null);
    } catch (error) {
      alert("No se pudo actualizar el equipo.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* Modal de edición */}
      {equipoAEditar && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Actualizar Equipo</h4>

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
              value={equipoAEditar.presidente}
              onChange={(e) =>
                setEquipoAEditar({ ...equipoAEditar, presidente: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Año de Fundación"
              value={equipoAEditar.anio_de_fundacion}
              onChange={(e) =>
                setEquipoAEditar({
                  ...equipoAEditar,
                  anio_de_fundacion: parseInt(e.target.value) || 0,
                })
              }
            />

            <button onClick={actualizarEquipo}>Guardar</button>
            <button
              onClick={() => setEquipoAEditar(null)}
              style={{ marginLeft: "0.5rem", backgroundColor: "#ccc", color: "#333" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActuEqui;
