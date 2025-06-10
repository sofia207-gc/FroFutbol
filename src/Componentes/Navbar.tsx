import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Navbarr.css';

const Navbarr: React.FC = () => {
    return (
        <Navbar expand="lg" className="navbarr">
            <Container fluid>
                <Navbar.Brand className="nombre">FUTBOL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto links"> 
                        <Link to="/">Crear Equipos</Link>
                        <Link to="/crear">Crear Equipos</Link>
                        <Link to="/ListarEquipo">Listar Equipos</Link>
                        <Link to="/ListarPresi">Listar Presidentes</Link>
                        <Link to="/ActualizarEqui">Actualizar Equipos</Link>
                        <Link to="/ActualizarPresi">Actualizar Presidentes</Link>
                    </Nav>
                </Navbar.Collapse>
                <img src="logo.png" alt="logo" width="100" height="100" />
            </Container>
        </Navbar>
    );
};

export default Navbarr;
