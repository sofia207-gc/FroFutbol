import Login from "./Login/Login";
import CrearEqui from "./Equipo/CrearEqui";
import Navbarr from "./Componentes/Navbar";
import CrearPresi from "./Presidente/CrearPresi";
import ListarEqui from "./Equipo/ListarEqui";
import ListarPresi from "./Presidente/ListarPresi";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Componente que envuelve rutas y muestra Navbarr si no estamos en login
function AppRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Navbarr />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CrearEqui" element={<CrearEqui />} />
        <Route path="/CrearPresi" element={<CrearPresi />} />
        <Route path="/ListarEqui" element={<ListarEqui />} />
        <Route path="/ListarPresi" element={<ListarPresi />} />
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
