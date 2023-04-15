import styles from "./Cardapio.module.css"
import NavigationBar from "../../components/NavegationBar"
import Loading from "../../../components/Loading"
import { useState,useEffect } from "react"
import App from "../../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { useParams } from "react-router-dom"
import Categories from "./Categories"


export default function Cardapio () {

    const {site} = useParams()
    const [clientes, setClientes] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const cliente = clientes && clientes.filter(dado => dado.site.toLowerCase().replace(' ', '') == site)
    

    
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
            <div>
                <Categories cliente={cliente && cliente[0]}/>
            </div>
        )
}