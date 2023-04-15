import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../layouts/layoutsHome/Footer";
import InfoPerfil from "../layouts/layoutsPerfil/InfoPerfil";
import NavBarUser from "../layouts/layoutsPerfil/NavBarUser";


export default function Perfil () {
    return (
        <div>
            <NavBar/>
            <NavBarUser/>
            <InfoPerfil/>
            <Outlet/>
            <Footer/>
        </div>
        )
}