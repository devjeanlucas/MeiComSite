import { Link, useParams } from "react-router-dom"
import Loading from "../../../components/Loading"
import { useState } from "react"
import App from "../../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import styles from "./Categorias.module.css"


export default function Categorias () {
    const {site, categoria} = useParams()
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const [produtos, setProdutos] = useState([])
    const [users, setUsers] = useState([])
    const [state, setState] = useState("start")
    const [load, setLoading] = useState(false)
    
    const getProdutos = async () => {
        const ProdutosCollection = usuario && collection(db, `MeiComSite/${usuario[0].email}/produtos`)
        const data = await getDocs(ProdutosCollection)
        setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setState("fim")
        setLoading(true)
    }

    const getCliente = async () => {
        const data = await getDocs(UserCollection)
        setUsers((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setState("produto")
    }

    const usuario = users && users.filter(dados => {
        if (dados.site == site) {
            return dados
        }
    })

    if (usuario) {
        if (state == "produto") {
            getProdutos()
        }
    }

    if (state == "start") {
        getCliente()
    }
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    

    return (
            <>
                {usuario.length > 0 && usuario[0].theme == "Dark" &&
                    <div className={`${styles.container} ${styles[usuario && usuario[0].theme]}`}>  
                        <div className={styles.list}>
                                <ul className="row">
                                    {produtos && produtos.map(dados => {
                                        if (dados.categoria.toLowerCase() == categoria) {
                                            return (
                                                <li key={dados.id} className="col-6 col-md-6 col-lg-4">
                                                    <div>
                                                        <div className={styles.cont_img}>
                                                            <Link
                                                            to={`/${site}/produto/${dados.nome.toLowerCase().replaceAll(' ', '')}`}
                                                            >
                                                                <img src={dados.img} className={styles.img}/>
                                                            </Link>
                                                        </div>
                                                        <div className={styles.cont_desc}>
                                                            <div className={styles.text}>
                                                                <h4>{dados.nome}</h4>
                                                                <h5>{FormataValor(parseFloat(dados.preço))}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                )
                                        }
                                    })}
                            </ul>
                        </div>
                    </div>
                }
            </>
        )
}