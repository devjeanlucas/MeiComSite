import { Link, Outlet } from "react-router-dom";
import styles from "../layouts/layoutsSuporte/ControlSuporte.module.css"
import {FaAngleLeft} from "react-icons/fa"
import NavBar from "../components/NavBar"
import Footer from "../layouts/layoutsHome/Footer"


export default function Suporte () {
    return (
        <>
        <NavBar/>
        <div className={styles.container}>
                    <div className={styles.container_icon}>
                        <Link to="/suporte">
                            <FaAngleLeft className={styles.icon}/>
                        </Link>
                    </div>
                    <div className={styles.cont_input}>
                    <p className={styles.query_input}>O que precisa saber?</p>
                    <input type="text" className={styles.input}/>
            </div>
            
        </div>
        
        <Outlet/>
        <Footer/>
        </>
            
        )
}