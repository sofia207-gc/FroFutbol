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
  const [equipo, setEquipo] = useState<Equipos | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:4523/equipo/${codigo}`);
        const data = await res.json();

        console.log("Respuesta del backend:", data);

        let encontrado: Equipos | undefined;

        if (Array.isArray(data?.mensaje)) {
          // el backend devuelve un array
          encontrado = data.mensaje.find(
            (e: Equipos) => e.codigo === Number(codigo)
          ) || data.mensaje[0];               
        } else if (data?.mensaje && data.mensaje.codigo) {
          encontrado = data.mensaje;
        } else if (data.codigo) {
          encontrado = data;
        }

        if (encontrado) {
          setEquipo(encontrado);
        } else {
          alert("No se encontró el equipo.");
          navigate("/ListarEqui");
        }
      } catch (err) {
        console.error("Error al obtener equipo:", err);
        alert("Error al obtener equipo.");
        navigate("/ListarEqui");
      } finally {
        setLoading(false);
      }
    };

    if (codigo) fetchEquipo();
  }, [codigo, navigate]);

  const actualizarEquipo = async () => {
    if (!equipo) return;

    try {
      const res = await fetch(`http://127.0.0.1:4523/equipo/${codigo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(equipo),
      });

      if (!res.ok) throw new Error("Error al actualizar");

      alert("Equipo actualizado correctamente");
      navigate("/ListarEqui");
    } catch (err) {
      console.error("Error al actualizar equipo:", err);
      alert("No se pudo actualizar el equipo.");
    }
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Cargando datos del equipo...</p>;

  if (!equipo)
    return <p style={{ textAlign: "center" }}>No se encontró el equipo.</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "orange" }}>Actualizar Equipo</h2>

      <input
        value={equipo.nombre}
        onChange={(e) => setEquipo({ ...equipo, nombre: e.target.value })}
        placeholder="Nombre"
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        value={equipo.dni_presi}
        onChange={(e) => setEquipo({ ...equipo, dni_presi: e.target.value })}
        placeholder="Presidente"
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="number"
        value={equipo.anio_fund}
        onChange={(e) =>
          setEquipo({
            ...equipo,
            anio_fund: parseInt(e.target.value) || 0,
          })
        }
        placeholder="Año de Fundación"
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button
        onClick={actualizarEquipo}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        Guardar
      </button>

      <button onClick={() => navigate("/")} style={{ width: "100%" }}>
        Cancelar
      </button>
    </div>
  );
};

export default ActuEqui;
