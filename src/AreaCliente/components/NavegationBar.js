import { FaBars, FaSearch, FaShoppingCart } from "react-icons/fa"
import MenuMobileCliente from "./MenuMobileCliente"
import styles from "./NavigationBar.module.css"
import { Link, useParams } from "react-router-dom"



export default function NavigationBar (props) {

    const list = props.info && props.info
    const {site} = useParams()

    return (
        <>
             {list &&  list.theme == "Light" && 
                <div className={`${styles[list && list.theme]}`}>
                    <div className={styles.title}>
                        <div className={styles.menu_mob}>
                            <img src={list && list.logo} className={styles.logo}/>
                            <h3>{list && list.razao}</h3>
                            <FaBars className={styles.icon_bars}
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbarLight"
                            aria-controls="offcanvasNavbar"
                            />
                        </div>
                    </div>
                </div>
            }


            {list &&  list.theme == "Dark" && 
            <>
                <div className={`${styles[list && list.theme]}`}>
                    <div className={styles.navigation}>
                        <div>
                            {list && !list.logo ? <h4>list.razao</h4> : <img src={list.logo} className={styles.logo}/>}
                        </div>
                        <div className={styles.options}>
                            <Link to={`/${list && list.site}`}>Catálogo</Link>
                            <Link>Promoções</Link>
                        </div>
                        <div className={styles.cont_search}>
                            <input type="text"
                            placeholder={`Pesquisar`}
                            className={styles.input}
                            />
                            <Link
                            to={`/${site}/compras`}
                            >
                                <FaShoppingCart className={styles.icon}/>
                            </Link>
                            <FaBars className={styles.icon_bars}
                            type="button" 
                            data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvasNavbarDark" 
                            aria-controls="offcanvasNavbar"
                            />
                        </div>
                    </div>
                </div>
            </>
            }
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbarLight" aria-labelledby="offcanvasNavbarLabel">
            <div class="h-100%">
                <div class="overflow-auto"> 
                    <MenuMobileCliente 
                    type="button"
                    data_bs_dismiss="offcanvas" 
                    aria_label="Close"
                    tema={list && list.theme}
                    dados={list && list}
                    />
                </div>
            </div>
        </div>
        
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbarDark" aria-labelledby="offcanvasNavbarLabel">
            <div class="h-100%">
                <div class="overflow-auto"> 
                    <MenuMobileCliente 
                    type="button"
                    data_bs_dismiss="offcanvas" 
                    aria_label="Close"
                    tema={list && list.theme}
                    dados={list && list}
                    />
                </div>
            </div>
        </div>
        </>
        )

}