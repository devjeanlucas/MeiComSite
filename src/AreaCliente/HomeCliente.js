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
import MarketHome from "./layouts/Loja Virtual/MarketHome";


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
    const {sites} = useParams()
    

    return (
        <>
            {cliente && cliente[0].theme == "Dark" &&
                <>
                    {!load ? <></>:
                    <div className="row">
                        <NavigationBar info={cliente && cliente[0]}/>
                        <div className="col-md-3">
                            <NavShop/>
                        </div>
                        <div className="col-md-9">
                            <Outlet/>
                        </div>
                    </div>
                    }
                </>
            }
            {cliente && cliente[0].theme == "Light" &&
                <div>
                    <NavigationBar info={cliente && cliente[0]}/>
                    <Outlet/>
                </div>
            }

        </>
        )
}