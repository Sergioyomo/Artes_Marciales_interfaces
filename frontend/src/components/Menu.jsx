import { useContext, useState } from "react";
import { ThemeContext } from "../ThemeProvider";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
    MDBBtn,
} from "mdb-react-ui-kit";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

function Menu() {
  const [openBasic, setOpenBasic] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
      <MDBNavbar expand="lg" light={!darkMode} dark={darkMode} bgColor={darkMode ? "dark" : "light"}>
          {/* Contenedor que separa el contenido en dos secciones */}
          <MDBContainer fluid className="d-flex justify-content-between align-items-center">
              {/* Sección izquierda: Logo y menú */}
              <div className="d-flex align-items-center">
                  <MDBNavbarBrand href="/">
                      <img src={logo} height="30" alt="logo" loading="lazy" />
                      Artes Marciales
                  </MDBNavbarBrand>

                  {/* Botón de menú en móviles */}
                  <MDBNavbarToggler
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                      onClick={() => setOpenBasic(!openBasic)}
                  >
                      <MDBIcon icon="bars" fas />
                  </MDBNavbarToggler>

                  {/* Menú de navegación */}
                  <MDBCollapse navbar open={openBasic}>
                      <MDBNavbarNav className="mb-2 mb-lg-0">
                          <MDBNavbarItem>
                              <MDBDropdown>
                                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                                      Sensei
                                  </MDBDropdownToggle>
                                  <MDBDropdownMenu>
                                      <Link to="/altasensei" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                                          <MDBDropdownItem link>Alta de sensei</MDBDropdownItem>
                                      </Link>
                                      <Link to="/listadosensei" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                                          <MDBDropdownItem link>Listado de sensei</MDBDropdownItem>
                                      </Link>
                                  </MDBDropdownMenu>
                              </MDBDropdown>
                          </MDBNavbarItem>
                          <MDBNavbarItem>
                              <MDBDropdown>
                                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                                      Aprendiz
                                  </MDBDropdownToggle>
                                  <MDBDropdownMenu>
                                      <Link to="/altaaprendiz" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                                          <MDBDropdownItem link>Alta de Aprendiz</MDBDropdownItem>
                                      </Link>
                                      <Link to="/listadoaprendiz" style={{ color: darkMode ? "#fff" : "#4f4f4f" }}>
                                          <MDBDropdownItem link>Listado de Aprendiz</MDBDropdownItem>
                                      </Link>
                                  </MDBDropdownMenu>
                              </MDBDropdown>
                          </MDBNavbarItem>
                      </MDBNavbarNav>
                  </MDBCollapse>
              </div>

              {/* Sección derecha: Botón de cambio de tema */}
              <MDBBtn outline color={darkMode ? "light" : "dark"} onClick={() => setDarkMode(!darkMode)}>
                  <MDBIcon icon={darkMode ? "sun" : "moon"} fas />
              </MDBBtn>
          </MDBContainer>
      </MDBNavbar>
  );
}

export default Menu;
