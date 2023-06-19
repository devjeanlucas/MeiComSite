import styles from "./MarketHome.module.css"
import { Link, useOutletContext, useParams } from "react-router-dom";
import NavShop from "./NavShop"
import Loading from "../../components/Loading"
import { useState } from "react"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { FaShoppingBag } from "react-icons/fa";
import { Helmet } from "react-helmet";


export default function MarketHome () {
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const [produtos, setProdutos] = useState([])
    const [users, setUsers] = useState([])
    const [state, setState] = useState("start")
    const [load, setLoading] = useState(false)
    const {site} = useParams()
    
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
    

    const reduced = [] 
    
    produtos && produtos.forEach((item) => {
        var duplicated  = reduced.findIndex(redItem => {
            return item.categoria == redItem.categoria;
        }) > -1;
    
        if(!duplicated) {
            reduced.push(item);
        }
    });

    
    return (
        <>
                <>
                {usuario.length > 0 && usuario[0].theme == "Dark" &&
                <>
                {!load && <Loading/>}
                <div className={`${styles.container} row ${styles[usuario && usuario[0].theme]}`}>
                    <div className="col-md-3">
                        <NavShop/>
                    </div>
                    <div className="col-md-9">
                        <div className={styles.list}>
                            <ul className="row">
                            {produtos && produtos.map(dados => {
                                    return (
                                            <li key={dados.id} className={`${styles.li} col-12 col-md-12`}>
                                                <div>
                                                    <div className={styles.cont_img}>
                                                        <Link
                                                        to={`/${site}/${dados.categoria}`}
                                                        >
                                                            <img src={dados.img} className={styles.img}/>
                                                        </Link>
                                                        <div className={styles.cont_desc}>
                                                            <h4>{dados.categoria}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                
                            })
                            }
                            </ul>
                        </div>
                    </div>
                </div>
                </>
            }
            {usuario.length > 0 && usuario[0].theme == "Light" && 
                    <div className={`${styles.container} row ${styles[usuario && usuario[0].theme]}`}>
                        <div className="col-lg-3">
                            <NavShop/>
                        </div>
                        <div className="col-lg-9">
                        <ul className={`row ${styles.list}`}>
                                {produtos && produtos.map(dados=> {
                                    if (dados.status != "inerit") {
                                        return (
                                                <li key={dados.id} className="col-lg-4 col-md-6">
                                                    <div className={styles.item}>
                                                        <div className="row">
                                                            <div className={`col-4 col-lg-12 ${styles.no_padding_no_margin}`}>
                                                                <div className={styles.cont_img}><img src={dados.img} className={styles.img}/></div>
                                                            </div>
                                                            <div className={`col-8 col-lg-12 ${styles.no_padding_no_margin}`}>
                                                                <div className={styles.cont_text}>
                                                                    <h4 className={styles.nome_prod}>{dados.nome}</h4>
                                                                    <p className={styles.desc_prod}>{dados.desc}</p>
                                                                    <p className={styles.preço_prod}>{FormataValor(dados.preço)}</p>
                                                                    <div className={styles.cont_buttons}>
                                                                        <Link
                                                                        to={`/${site}/produto/${dados.nome.replaceAll(' ', '').toLowerCase()}`}
                                                                        >Comprar</Link>
                                                                        <button><FaShoppingBag/></button>
                                                                    </div>
                                                                </div>
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
            
                {<Helmet title="Grava"/>}
        </>
        )
}