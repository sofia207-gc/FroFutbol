import { useEffect, useState } from "react";

interface Presidente {
  dni: number;
  nombre: string;
}

  const FiltarPresi: React.FC = () => {
    const [presidentes, setPresidentes] = useState<Presidente[]>([]);
    const [filtro, setFiltro] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const cargarPresidentes = async () => {
      try {
        const res = await fetch('http://localhost:3333/presi');
        const data = await res.json();
        console.log("Datos recibidos:", data);

        // Verifica si se han recibido datos
        const presidentesData = Array.isArray(data) ? data : data.mensaje;
        setPresidentes(presidentesData);
      } catch (error) {
        console.error("Error al cargar presidentes:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      cargarPresidentes();
    }, []);

    const presidentesFiltrados = presidentes.filter(
      (presidente) =>
        presidente.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        presidente.dni.toString().includes(filtro)
    );

    return (
      <div className="p-4">
        <input
          type="text"
          placeholder="Filtrar por nombre o DNI"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="form-control my-3 w-50"
        />

        {loading ? (
          <p>Cargando presidentes...</p>
        ) : presidentesFiltrados.length === 0 ? (
          <p>No se encontraron presidentes con ese filtro.</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>DNI</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {presidentesFiltrados.map((presidente) => (
                <tr key={presidente.dni}>
                  <td>{presidente.dni}</td>
                  <td>{presidente.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };    

  export default FiltarPresi;

