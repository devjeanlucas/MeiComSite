import styles from "./HomeCliente.module.css"
import Loading from "../../components/Loading"
import { useState,useEffect } from "react"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs, setDoc, doc} from "@firebase/firestore";
import { useParams } from "react-router-dom"
import NavigationBar from "../components/NavegationBar"
import HomeRestaurante from "../layouts/Restaurante/HomeRestaurante";
import { Helmet } from "react-helmet";



export default function HomeCliente () {

    

    const [load, setLoading] = useState(false)
    const [Users, setUsers] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, "MeiComSite")

    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setUsers((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                setLoading(true)
            };

                
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])

    const {site} = useParams()


    const AdicionaProdutoDefault = async (email) => {
        await setDoc(doc(db, `MeiComSite/${email && email}/produtos`, "1"), {
            nome:"First",
            status:"inerit"
        });
    };

    
    return (
            <>
                {Users && Users.map(dados => {
                    if (dados.site.replace(' ', '').toLowerCase() == site) {
                        AdicionaProdutoDefault(dados.email)
                        if (dados.mod == "Restaurante") {
                            return (
                            <>
                                <Helmet title={dados.razao}/>
                                <div className={styles[dados.theme]}>
                                    <HomeRestaurante loja={dados}/>
                                </div>
                            </>
                                )
                        }
                    }
                })}
                {!load &&
                <Loading/>
                }
            </>
        )
}