import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ActualizarPresi.module.css";

interface Presi {
  nombre: string;
}

const ActuPresi: React.FC = () => {
  const [presiAEditar, setPresiAEditar] = useState<Presi | null>(null);


  const actualizarEquipo = async () => {
    
    if (!presiAEditar) return;

    const seguro = confirm("¿Estás seguro de que quieres actualizar este equipo?");
    if (!seguro) return;

    try {
      const res = await fetch(`http://127.0.0.1:4523/equipos/${presiAEditar.nombre}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(presiAEditar),
      });

      if (!res.ok) throw new Error("Error al actualizar equipo.");
      await res.json();
      setPresiAEditar(null);
    } catch (error) {
      alert("No se pudo actualizar el equipo.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* Modal de edición */}
      {presiAEditar && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Actualizar Equipo</h4>

            <input
              type="text"
              placeholder="Nombre"
              value={presiAEditar.nombre}
              onChange={(e) =>
                setPresiAEditar({ ...presiAEditar, nombre: e.target.value })
              }
            />
            <button onClick={actualizarEquipo}>Guardar</button>
            <button onClick={() => setPresiAEditar(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActuPresi;
