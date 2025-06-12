import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbarr: React.FC = () => {
    return (
        <Navbar expand="lg" className={styles.navbarr}>
            <Container fluid>
                <Navbar.Brand className={styles.nombre}>FUTBOL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={`me-auto ${styles.links}`}>
                        <Nav.Link as={Link} to="/CrearEqui">Crear Equipos</Nav.Link>
                        <Nav.Link as={Link} to="/CrearPresi">Crear Presidente</Nav.Link>
                        <Nav.Link as={Link} to="/ListarEqui">Listar Equipos</Nav.Link>
                        <Nav.Link as={Link} to="/ListarPresi">Listar Presidentes</Nav.Link> 
                        <Nav.Link as={Link} to="/CerrarSesion">Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                  <img src="logo.png" className={styles.logo} alt="logo"/>
            </Container>
        </Navbar>
    );
};

export default Navbarr;
