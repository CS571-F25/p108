import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import getGlobalStyles from "../styles/globalStyles";

// ✅ FIREBASE AUTH
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function NavBar() {
  const styles = getGlobalStyles(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // ✅ Listen for login / logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("✅ Logged out");
      navigate("/");
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  return (
    <Navbar expand="lg" style={styles.navbar} variant="dark">
      <Container>

        {/* BRAND / LOGO */}
        <Navbar.Brand as={Link} to="/" style={styles.logo}>
          FanPass
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

            {/* ✅ AUTH-AWARE SECTION */}
            {user ? (
              <>
                <Button
                  as={Link}
                  to="/profile"
                  style={styles.profileBtn}
                >
                  Profile
                </Button>

                <Button
                  variant="outline-light"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-light"
                >
                  Log In
                </Button>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
