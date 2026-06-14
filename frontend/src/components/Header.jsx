import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {

  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsAdmin(loggedIn === "true");
  }, [location]);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <Navbar bg="light" variant="light" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          News<span style={{ fontWeight: "bold", color: "red" }}>Portal</span>
        </Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/all-news">All News</Nav.Link>
          {!isAdmin && (
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/category/Technology">Technology</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/Politics">Politics</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/Climate">Climate</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/Business">Business</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/Sports">Sports</NavDropdown.Item>
            </NavDropdown>
          )}
          {isAdmin && (
            <>
              <NavDropdown title="Admin Dashboard" id="admin-nav-dropdown">
                <NavDropdown.Item as={Link} to="/admin/news-list">
                  News List
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/profile" className="p-0 me-3">
                <FaUserCircle style={{ fontSize: "22px", color: "#333" }} title="My Profile" />
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="p-0" style={{ cursor: "pointer" }}>
                <FaSignOutAlt style={{ fontSize: "20px", color: "red" }} title="Log Out" />
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;