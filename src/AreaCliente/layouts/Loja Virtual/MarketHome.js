import styles from "./MarketHome.module.css"
import { Link, useParams } from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import Loading from "../../../components/Loading"
import { useState } from "react"
import App from "../../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";


export default function MarketHome () {
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const [produtos, setProdutos] = useState([])
    const [users, setUsers] = useState([])
    const [state, setState] = useState("start")
    const {site} = useParams()
    
    const getProdutos = async () => {
        const ProdutosCollection = usuario && collection(db, `MeiComSite/${usuario[0].email}/produtos`)
        const data = await getDocs(ProdutosCollection)
        setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setState("fim")
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

    const [busca, setBusca] = useState()


    return (
        <>
            {usuario.length > 0 && usuario[0].theme == "Dark" &&
                <>
                <div className={`${styles.container} ${styles[usuario && usuario[0].theme]}`}>
                    
                        <div className={styles.list}>
                            <ul className="row">
                            {produtos && produtos.map(dados => {
                                return (
                                        <li key={dados.id} className="col-md-4">
                                            <div>
                                                <img src={dados.img} className={styles.img}/>
                                                <div className={styles.cont_desc}>
                                                    <div>
                                                        <h5>{dados.nome}</h5>
                                                        <p>{dados.colors}</p>
                                                    </div>
                                                    <div>
                                                        <h5>{FormataValor(dados.preço)}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                            })}
                         </ul>
                    </div>
                        </div>
                </>
            }
        </>
        )
}