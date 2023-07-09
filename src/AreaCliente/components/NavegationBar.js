import { FaAngleDown, FaBars, FaHome, FaSearch, FaShoppingBag, FaShoppingCart } from "react-icons/fa"
import MenuMobileCliente from "./MenuMobileCliente"
import styles from "./NavigationBar.module.css"
import { Link, useParams } from "react-router-dom"



export default function NavigationBar (props) {

    const list = props.info && props.info
    const {site, categoria} = useParams()
    

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
                            <Link
                            to={`/${site}/compras`}
                            categoria={categoria}
                            >
                                <FaShoppingBag
                                className={styles.icon_bag}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            }


            {list &&  list.theme == "Dark" && 
            <>
                <div className={`${styles[list && list.theme]}`}>
                    <div className={styles.navigation}>
                        <div className={styles.info_place}>
                            {list && !list.logo ? <h4>list.razao</h4> : <img src={list.logo} className={styles.logo}/>}
                            <Link to={`/${list && list.site}`} 
                            className={styles.link_home}
                            >{list && list.razao}</Link>

                            <div className={styles.info_desk}>
                                <button className={styles.btn_cat} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Categorias <FaAngleDown/></button>
                                <div className={`${styles.body_offcanva} offcanvas offcanvas-top`} tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                                    <div class="offcanvas-header">
                                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div class="offcanvas-body">
                                        ...
                                    </div>
                                </div>
                                <Link className={styles.link}>Novidades</Link>
                            </div>
                        </div>
                        
                        <div className={`${styles.info_desk} ${styles.cont_input}`}>
                            <input type="text" className={styles.search}
                            placeholder="Pesquisar produto"
                            />
                        </div>


                        <div className={styles.cont_search}>
                            <Link
                            to={`/${site}/compras`}
                            categoria={categoria}
                            >
                                <FaShoppingCart className={styles.icon}/>
                            </Link>
                            <Link  to={`/${list && list.site}`}>
                                <FaHome className={styles.icon}/>
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