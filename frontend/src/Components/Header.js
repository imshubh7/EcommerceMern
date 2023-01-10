import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);

  const navigate = useNavigate();

  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Link to="/">
            <Navbar.Brand>MyShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/cart">
                <i className="fas fa-shopping-cart"></i>Cart
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item onClick={() => navigate("/profile")}>
                    {userInfo.name}
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={NavLink} to="/login">
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id="adminmenu">
                  <NavDropdown.Item onClick={() => navigate("/admin/userlist")}>
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/admin/productlist")}>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/admin/orderlist")}>
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
