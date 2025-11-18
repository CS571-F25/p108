import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import getGlobalStyles from "../styles/globalStyles";

export default function NavBar() {
  const styles = getGlobalStyles(null);

  return (
    <Navbar 
      expand="lg"
      style={styles.navbar}
      variant="dark"
    >
      <Container>

        {/* BRAND / LOGO */}
        <Navbar.Brand as={Link} to="/" style={styles.logo}>
          LOGO HERE.
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto d-flex align-items-center" style={{ gap: "30px" }}>

            <Nav.Link as={Link} to="/support" style={styles.navLink}>
              Support
            </Nav.Link>

            <Nav.Link as={Link} to="/buy" style={styles.navLink}>
              Buy
            </Nav.Link>

            <Nav.Link as={Link} to="/sell" style={styles.navLink}>
              Sell
            </Nav.Link>

            <Button 
              as={Link} 
              to="/profile"
              style={styles.profileBtn}
            >
              Profile
            </Button>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}
