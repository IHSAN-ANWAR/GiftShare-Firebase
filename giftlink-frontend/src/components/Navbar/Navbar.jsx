import { Link } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap';

function Navbar({ user, onLogout }) {
  return (
    <BSNavbar bg="primary" variant="dark" expand="lg">
      <Container>
        <BSNavbar.Brand as={Link} to="/">Gift Link</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/gifts">Browse Gifts</Nav.Link>
            <Nav.Link as={Link} to="/search">Search</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <BSNavbar.Text className="me-3">
                  Signed in as: <strong>{user.username}</strong>
                </BSNavbar.Text>
                <Button variant="outline-light" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
