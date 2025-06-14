import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbarr: React.FC = () => {
    return (
        <Navbar expand="lg" className={styles.navbarr}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <Navbar.Brand className={styles.nombre}>FUTBOL</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={styles.links}>
                            <Nav.Link as={Link} to="/CrearEqui">Crear Equipos</Nav.Link>
                            <Nav.Link as={Link} to="/CrearPresi">Crear Presidente</Nav.Link>
                            <Nav.Link as={Link} to="/ListarEqui">Listar Equipos</Nav.Link>
                            <Nav.Link as={Link} to="/ListarPresi">Listar Presidentes</Nav.Link> 
                            <Nav.Link as={Link} to="/Perfil">Perfil</Nav.Link>
                            <Nav.Link as={Link} to="/CerrarSesion">Cerrar Sesión</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
                <img src="logo.png" className={styles.logo} alt="logo" />
            </div>
        </Navbar>
    );
};

export default Navbarr;
