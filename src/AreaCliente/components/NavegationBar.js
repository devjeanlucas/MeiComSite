import { FaBars } from "react-icons/fa"
import MenuMobileCliente from "./MenuMobileCliente"
import styles from "./NavigationBar.module.css"
import { Link } from "react-router-dom"



export default function NavigationBar (props) {

    const list = props.info && props.info

    return (
        <>
        <div className={`${styles[props.info && props.info.theme]} `}>

            <nav className={`${styles.navigation}`}>
                <h3>{list && list.razao}</h3>
                <div className={styles.menu_desk}>
                    <Link>Pedidos</Link>
                    <Link>Contato</Link>
                </div>
                
                <FaBars className={`${styles.icon_mobile} navbar-toggler`} 
                type="button" 
                data-bs-toggle="offcanvas" 
                data-bs-target="#menuCliente" 
                aria-controls="offcanvasNavbar"/>
            </nav>
        </div>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="menuCliente"     aria-labelledby="offcanvasNavbarLabel">
                <div class="h-100%">
                    <div class="overflow-auto"> 
                        <MenuMobileCliente 
                        type="button"
                        data_bs_dismiss="offcanvas" 
                        aria_label="Close"
                        
                        />
                    </div>
                </div>
            </div>
        </>
        )

}