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



    const redirect = cliente && cliente[0].site

    return (
        <>
            {cliente && cliente[0].theme == "Light" &&
                redirect ? window.location.replace(`https://meicomsite.netlify.com/${redirect}/cardapio`):
                <div className={styles.center}>
                    <Loading/>
                    <p>Redirecionando...</p>
                </div>
            }
            {cliente && cliente[0].theme == "Dark" &&
                redirect ? window.location.replace(`https://meicomsite.netlify.com/${redirect}/estoque`):
                <div className={styles.center}>
                    <Loading/>
                    <p>Redirecionando...</p>
                </div>
            }

        </>
        )
}