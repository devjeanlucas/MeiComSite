import { useState,useEffect } from "react"
import App from "../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { Link, Outlet, useParams } from "react-router-dom"
import styles from "./HomeCliente.module.css"
import NavigationBar from "./components/NavegationBar";
import Footer from "./components/Footer";
import Loading from "../components/Loading";
import NavShop from "./layouts/Loja Virtual/NavShop";


export default function HomeCliente () {

    const {site} = useParams()
    const [load, setLoading] = useState(false)
    const [clientes, setClientes] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const cliente = clientes.length > 0 && clientes.filter(dado => dado.site == site)
    

    
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setClientes((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                setLoading(true)
            };
            getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])



    return (
        <>
            {cliente && cliente[0].theme == "Light" &&
                <div className={styles.container}>
                    <div className="row">
                        <div className={`${styles.no_margin_no_padding} col-xl-2`}>
                            <div className={styles.navBar}>
                                <NavigationBar info={cliente && cliente[0]}/>
                            </div>
                        </div>
                        <div className={`${styles.no_margin_no_padding} col-xl-10`}>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            }
            {cliente && cliente[0].theme == "Dark" &&
                <div className={`${styles[cliente && cliente[0].theme]} ${styles.container}`}>
                    <div className="row">
                        <div className={`${styles.no_margin_no_padding} col-md-3 order-lg-1`}>
                            <NavigationBar info={cliente && cliente[0]}/>
                            <NavShop/>
                        </div>
                        <div className={`${styles.no_margin_no_padding} order-lg-2 col-sm-12 col-md-9`}>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            }
            {!load && <Loading/>}

        
        </>
        )
}