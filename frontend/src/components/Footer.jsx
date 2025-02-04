import { MDBFooter, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

function Footer() {
    return (
        <MDBFooter bgColor="dark" className="text-center text-lg-start text-light mt-4">
            <MDBContainer className="p-4">
                <MDBRow>
                    <MDBCol lg="6" md="12" className="mb-4">
                        <h5 className="text-uppercase">Artes Marciales</h5>
                        <p>Explora el mundo de las artes marciales con nuestros cursos y entrenadores.</p>
                    </MDBCol>
                    <MDBCol lg="3" md="6" className="mb-4">
                        <h5 className="text-uppercase">Enlaces</h5>
                        <ul className="list-unstyled mb-0">
                            <li><a href="/" className="text-light">Inicio</a></li>
                            <li><a href="/altasensei" className="text-light">Alta de sensei</a></li>
                            <li><a href="/listadosensei" className="text-light">Listado de sensei</a></li>
                            <li><a href="/altaAprendiz" className="text-light">Alta de aprendiz</a></li>
                            <li><a href="/listadoAprendiz" className="text-light">Listado de aprendiz</a></li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                © {new Date().getFullYear()} Artes Marciales - Todos los derechos reservados
            </div>
        </MDBFooter>
    );
}

export default Footer;
