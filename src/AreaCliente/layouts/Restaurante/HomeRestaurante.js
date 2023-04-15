import App from "../../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import styles from "./HomeRestaurante.module.css"
import { useState,useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import NavigationBar from "../../components/NavegationBar";


export default function HomeRestaurante (props) {

    const list = props.loja && props.loja

    const [load, setLoading] = useState(false)
    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite/${list && list.email}/produtos`)

    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                setLoading(true)
            };

                
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])
    const {site} = useParams()


    return (
            <>
                <NavigationBar info={list && list}/>
                <div className={styles[list && list.theme]}>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className={styles.cont_text_light}>
                                <div>
                                    <h2>{list && list.fraseprincipal}</h2>
                                    <Link to={`/${site}/cardapio`}>Ver Cardápio</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <img src={list && list.imgprincipal} className={styles.img}/>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <div>
                            <h4 className={styles.title_footer}>Abre</h4>
                            <p>{list && list.abre}h</p>
                        </div>
                        <div>
                            <h4 className={styles.title_footer}>Fecha</h4>
                            <p>{list && list.fecha}h</p>
                        </div>
                        <div>
                            <h4 className={styles.title_footer}>Celular</h4>
                            <p>{list && list.telefone}</p>
                        </div>
                    </div>
                </div>
            </>
        )
}