import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import {FaBars} from "react-icons/fa"
import MenuMobile from "./MenuMobile"

export default function NavBar () {
return (
    <div className={styles.container}>
        <div className={styles.content}>
            <Link to="/" className={styles.logo}>MeiComSite</Link>
            <div className={styles.menu}>
                <p>Soluções</p>
                <p>Planos e Preços</p>
                <Link to="suporte">Ajuda</Link>
            </div>
            <div className={styles.login}>
                <button className="button_link">Entrar</button>
                <button className="button_orange">cadastre-se</button>
                <div>
                    <FaBars className={`${styles.icon_mobile} navbar-toggler`} 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#offcanvasNavbar" 
                    aria-controls="offcanvasNavbar"/>
                </div>

            </div>
        </div>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="h-100%">
                    <div class="overflow-auto"> 
                        <MenuMobile 
                        type="button"
                        data_bs_dismiss="offcanvas" 
                        aria_label="Close"
                        />
                    </div>
                </div>
            </div>
    </div>
    )
}