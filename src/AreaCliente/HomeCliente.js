import { useState,useEffect } from "react"
import App from "../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { Outlet, useParams } from "react-router-dom"
import styles from "./HomeCliente.module.css"
import NavigationBar from "./components/NavegationBar";
import Footer from "./components/Footer";


export default function HomeCliente () {

    const {site} = useParams()
    const [clientes, setClientes] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const cliente = clientes.length > 0 && clientes.filter(dado => dado.site == site)
    

    
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setClientes((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
            };
            getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])


    return (
            <div className={styles.container}>
                <div className="row">
                    <div className={`${styles.no_margin_no_padding} col-xl-2`}>
                        <div className={styles.navBar}>
                            <NavigationBar info={cliente && cliente[0]}/>
                        </div>
                    </div>
                    <div className={`${styles.no_margin_no_padding} col-xl-10`}>
                        <Outlet/>
                        <Footer/>
                    </div>
                </div>
            </div>
        )
}