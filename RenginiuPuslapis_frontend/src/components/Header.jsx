import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaUserAltSlash } from "react-icons/fa";
import { FcAbout, FcContacts } from "react-icons/fc";
import { IoCreateOutline, IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import { logout, reset } from "./Page/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";
import {
  createTheme
} from "@nextui-org/react";
const darkTheme = createTheme({
  type: "dark",
});

  
  const Header = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
      if (localStorage.user) setUser(JSON.parse(localStorage.user));
    }, [localStorage.user]);
    const navigate = useNavigate();
  
    const dispatch = useDispatch();
    const onLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate("/");
    };

  

    return (
      <>
        {localStorage.user ? (
          <div className="bosas">
            <Navbar className="navbar-default" variant="dark" expand="lg">
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Brand onClick={()=> navigate('/')}>Renginiu Puslapis</Navbar.Brand>

                  <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate("/renginiai")}>
                      Renginiai
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate("/about")}>
                     Apie projektą
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate("/contacts")}>
                      Kontaktai
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate("/addevent")}>
                      Sukurti renginį
                    </Nav.Link>
                  </Nav>
                  <Nav.Link onClick={onLogout}><IoLogOutOutline/> Atsijungti </Nav.Link>
                  <Nav.Link
                    onClick={() => navigate("/MyEvents")}
                    style={{ textDecoration: "none" }}
                  >
                    <FaUserAlt /> {user.name && user.name}
                  </Nav.Link>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        ) : (
          <div className="bosas">
            <Navbar className="navbar-default" variant="dark" expand="lg">
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav " />
                <Navbar.Collapse className="justify-content-end">
                  <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate("/renginiai")}>
                      Renginiai
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate("/about")}>
                      Apie projektą
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate("/contacts")}>
                      Kontaktai
                    </Nav.Link>
                  </Nav>
                  <Nav.Link onClick={() => navigate("/register")}>
                    Dar neužsiregistravęs? Registruokis!
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate("/login")}>
                     Jau užsiregistravęs? Prisijunk!
                  </Nav.Link>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        )}
      </>
    );
  };

export default Header;
