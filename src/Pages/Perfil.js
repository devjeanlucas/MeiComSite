import { Outlet } from "react-router-dom";
import Header from "../layouts/layoutsPerfil/Header"


export default function Perfil () {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
        )
}