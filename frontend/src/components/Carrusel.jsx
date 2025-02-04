import { MDBCarousel, MDBCarouselItem, MDBContainer } from "mdb-react-ui-kit";
import karate from "../assets/images/karate.jpg";
import taekwondo from "../assets/images/Taekwondo.jpg";
import judo from "../assets/images/judo.jpg";

function Carrusel() {
    return (
        <MDBCarousel showIndicators showControls fade>
            <MDBCarouselItem itemId={1}>
                <img src={karate} className="d-block w-100" alt="Karate" />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2}>
                <img src={judo} className="d-block w-100" alt="Judo" />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={3}>
                <img src={taekwondo} className="d-block w-100" alt="Taekwondo" />
            </MDBCarouselItem>
        </MDBCarousel>
    );
}

export default Carrusel;
