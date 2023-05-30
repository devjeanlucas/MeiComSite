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
        </div>
        
        <Outlet/>
        <Footer/>
        </>
            
        )
}