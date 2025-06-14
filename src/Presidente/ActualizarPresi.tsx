import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Presi {
  nombre: string;
}

const ActuPresi: React.FC = () => {
  const { dni } = useParams();
  const navigate = useNavigate();
  const [presiAEditar, setPresiAEditar] = useState<Presi | null>(null);

  useEffect(() => {
    const fetchPresidente = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:4523/presi/${dni}`);
        const data = await res.json();
        console.log("Presi del backend:", data);

        if (!res.ok) throw new Error("No encontrado");

        setPresiAEditar(data);
      } catch (error) {
        console.error("Error al obtener presidente:", error);
        alert("No se pudo obtener presidente.");
        navigate("/ListarPresi");
      }
    };

    if (dni) fetchPresidente();
  }, [dni, navigate]);

  const actualizarPresi = async () => {
    if (!presiAEditar) return;

    const seguro = confirm("¿Estás seguro de que quieres actualizar este presidente?");
    if (!seguro) return;

    try {
      const res = await fetch(`http://127.0.0.1:4523/presi/${dni}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(presiAEditar),
      });

      if (!res.ok) throw new Error("Error al actualizar presidente.");

      alert("Presidente actualizado correctamente");
      navigate("/ListarPresi");
    } catch (error) {
      console.error("Error al actualizar presidente:", error);
      alert("No se pudo actualizar.");
    }
  };

  if (!presiAEditar) return <p style={{ textAlign: "center" }}>Cargando presidente...</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "orange" }}>Actualizar Presidente</h2>
      <input
        type="text"
        value={presiAEditar.nombre}
        onChange={(e) =>
          setPresiAEditar({ ...presiAEditar, nombre: e.target.value })
        }
        style={{ width: "100%", marginBottom: "10px" }}
        placeholder="Nombre del presidente"
      />
      <button onClick={actualizarPresi} style={{ width: "100%", marginBottom: "10px" }}>
        Guardar
      </button>
      <button onClick={() => navigate("/ListarPresi")} style={{ width: "100%" }}>
        Cancelar
      </button>
    </div>
  );
};

export default ActuPresi;
