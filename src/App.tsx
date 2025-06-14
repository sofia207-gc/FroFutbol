import Login from "./Login/Login";
import CrearEqui from "./Equipo/CrearEqui";
import Navbarr from "./Componentes/Navbar";
import CrearPresi from "./Presidente/CrearPresi";
import ListarEqui from "./Equipo/ListarEqui";
import ListarPresi from "./Presidente/ListarPresi";
import ActuEqui from "./Equipo/ActualizarEqui";
import ActuPresi from "./Presidente/ActualizarPresi";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Registro from "./Registro/Registro";
import CerrarSesion from "./CerrarSesion/CerrarS";
import Perfil from "./Perfil/Perfil";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

function AppRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isRegistroPage = location.pathname === "/registro";

  return (
    <>
      {!isLoginPage && !isRegistroPage && <Navbarr />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/CrearEqui" element={<CrearEqui />} />
        <Route path="/CrearPresi" element={<CrearPresi />} />
        <Route path="/ListarEqui" element={<ListarEqui />} />
        <Route path="/ListarPresi" element={<ListarPresi />} />
        <Route path="/ActualizarEqui/:codigo" element={<ActuEqui />} />
        <Route path="/ActualizarPresi/:dni" element={<ActuPresi />} />
        <Route path="/CerrarSesion" element={<CerrarSesion />} />
        <Route path="/Perfil" element={<Perfil />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
