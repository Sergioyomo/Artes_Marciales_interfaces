import { Outlet,useLocation  } from "react-router";
import Menu from "../components/Menu";  
import Footer from "../components/Footer";
import Carrusel from "../components/Carrusel";
import Descripcion from "../components/Descripcion";

function Home(){
    const location = useLocation();
    const isHome = location.pathname === "/";
    return (
        <div className="main-content">
            <Menu />
            <div className="content">
            {isHome ? (
                <>
                    <Carrusel />
                    <Descripcion />
                </>
            ) : (
                <Outlet /> 
            )}
            </div>
            <Footer />
        </div>
    );
}
export default Home;