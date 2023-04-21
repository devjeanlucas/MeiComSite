import { FaBars, FaSearch, FaShoppingCart } from "react-icons/fa"
import MenuMobileCliente from "./MenuMobileCliente"
import styles from "./NavigationBar.module.css"
import { Link } from "react-router-dom"
import {FaBookReader, FaBookmark, FaFireAlt, FaWineGlassAlt} from "react-icons/fa"
import MarketHome from "../layouts/Loja Virtual/MarketHome"


export default function NavigationBar (props) {

    const list = props.info && props.info
    

    return (
        <>
             {list &&  list.theme == "Light" && 
                <div className={`${styles[list && list.theme]}`}>
                    <div className={styles.menu_mob}>
                        <img src={list && list.logo} className={styles.logo}/>
                        <h3>{list && list.razao}</h3>
                        <FaBars className={styles.icon_bars}
                        type="button" 
                        data-bs-toggle="offcanvas" 
                        data-bs-target="#offcanvasNavbar" 
                        aria-controls="offcanvasNavbar"
                        />
                    </div>
                    <div className={`${styles.cont_left}`}>
                        <div className={styles.cont_title}>
                            <div className={styles.title}>
                                <h4>{list.razao}</h4>
                            </div>
                        </div>
                        <div className={`${styles.cont_options}`}>
                            <ul className={styles.list}>
                                <li>
                                    <Link
                                    to={`/${list.site}`}
                                    >
                                    <FaBookmark className={`item ${styles.icon}`}/>Pedidos
                                    </Link>
                                </li>

                                <li>

                                    <Link
                                    to={`/${list.site}/cardapio`}
                                    >
                                        <FaBookReader className={styles.icon}/>Cardápio
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                    >
                                        <FaFireAlt className={styles.icon}/>Promoções
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
            {list &&  list.theme == "Dark" && 
            <>
                <div className={`${styles[list && list.theme]}`}>
                    <div className={styles.navigation}>
                        <h4>{list && list.razao}</h4>
                        <div className={styles.options}>
                            <Link to={`/${list && list.site}/estoque`}>Ver tudo</Link>
                            <Link>Promoções</Link>
                        </div>
                        <div className={styles.cont_search}>
                            <input type="text"
                            placeholder={` Pesquisar`}
                            />
                            <FaShoppingCart className={styles.icon}/>
                        </div>
                    </div>
                </div>
            </>
            }
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="h-100%">
                <div class="overflow-auto"> 
                    <MenuMobileCliente 
                    type="button"
                    data_bs_dismiss="offcanvas" 
                    aria_label="Close"/>
                </div>
            </div>
        </div>
        </>
        )

}