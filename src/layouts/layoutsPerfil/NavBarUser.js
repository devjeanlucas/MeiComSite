import { Link } from "react-router-dom";
import styles from "./NavBarUser.module.css"

export default function NavBarUser () {
    return (
            <ul className={`${styles.navigation} nav`}> 
                <li className={`nav-item`}>
                    <Link 
                    to="/perfil/user/negocio"
                    className="nav-link">Meu Negócio</Link>
                </li>
                <li className={`nav-item`}>
                    <Link 
                    to="/perfil/user/dados"
                    className="nav-link" aria-current="page">Produtos</Link>
                </li>
                <li className={`nav-item`}>
                    <Link 
                    to="/perfil/user/membros"
                    className="nav-link">Membros</Link>
                </li>
                <li className={`nav-item`}>
                    <Link 
                    to="/perfil/user/config"
                    className="nav-link">Configurações</Link>
                </li>
            </ul>
        )

}