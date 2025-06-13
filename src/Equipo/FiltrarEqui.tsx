import { useEffect, useState } from "react";

interface Equipo {
  codigo: number;
  nombre: string;
  anio_fund: number; 
  dni_presi: string;
}

const FiltrarEquipo: React.FC = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const cargarEquipos = async () => {
  try {
    const res = await fetch("http://127.0.0.1:4523/equipo");
    const data = await res.json();
    console.log("Datos recibidos:", data);

    // Verifica si se han recibido datos
    const equiposData = Array.isArray(data) ? data : data.mensaje;

    // Filtra objetos incompletos
    const equiposValidos = equiposData.filter(
      (e: any) =>
        e &&
        typeof e.codigo === "number" &&
        typeof e.nombre === "string" &&
        typeof e.anio_fund === "number" &&
        typeof e.dni_presi === "string"
    );

    setEquipos(equiposValidos);
  } catch (error) {
    console.error("Error al cargar equipos:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    cargarEquipos();
  }, []);

  const equiposFiltrados = equipos.filter((equipo) => {
  return (
    (typeof equipo.nombre === "string" && equipo.nombre.toLowerCase().includes(filtro.toLowerCase())) ||
    equipo.anio_fund?.toString().includes(filtro) ||
    equipo.codigo?.toString().includes(filtro)
  );
});



  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Filtrar por nombre, presidente, año o código"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="form-control my-3 w-50"
      />

      {loading ? (
        <p>Cargando equipos...</p>
      ) : equiposFiltrados.length === 0 ? (
        <p>No se encontraron equipos con ese filtro.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Presidente</th>
              <th>Año de Fundación</th>
            </tr>
          </thead>
          <tbody>
            {equiposFiltrados.map((equipo) => (
              <tr key={equipo.codigo}>
                <td>{equipo.codigo}</td>
                <td>{equipo.nombre}</td>
                <td>{equipo.dni_presi}</td>
                <td>{equipo.anio_fund}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FiltrarEquipo;
