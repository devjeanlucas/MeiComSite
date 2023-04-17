import { Link, useParams } from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import Loading from "../../../components/Loading"
import styles from "./Cardapio.module.css"
import { useState } from "react"
import App from "../../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import Categorias from "./Categorias";

export default function Categories () {
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
                {usuario.length > 0 && usuario[0].theme == "Light" && 
                    <div className={`${styles.container} ${styles[usuario && usuario[0].theme]}`}>
                            <div className={`${styles.no_margin_no_padding}`}>
                                <div className={styles.cont_right}>
                                    <div className={styles.cont_promoção}>
                                        <h2>Promoção</h2>
                                        <div className={styles.promoção}>
                                            <div className="row">
                                                <div className="col-7">
                                                    <div className={styles.cont_text_promo}>
                                                        <h3>Crie suas primeiras promoções </h3>
                                                        <p>Quem ai não gosta de uma promoção? comece a criar as suas</p>
                                                        <button>Começar</button>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <img src="https://img.freepik.com/free-vector/simple-megaphone-white-background_1308-111054.jpg?w=740&t=st=1681587185~exp=1681587785~hmac=ee657c2b9e638208d9f8e56daca028d84e7f0278e8252f5ab15bad6374d981c9" className={styles.img}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.line}></div>
                                    <div className={styles.cont_categories}>
                                        <Swiper
                                        slidesPerView={6}
                                        >
                                            {reduced && reduced.map(dados => {
                                                return (
                                                        <SwiperSlide key={dados.id}
                                                        className={styles.item}
                                                        >
                                                            <buton 
                                                            className={`${styles.categories}`}
                                                            onClick={()=> {setBusca(dados.categoria)}}
                                                            >{dados.categoria}
                                                            </buton>
                                                        </SwiperSlide>
                                                    )
                                            })}
                                        </Swiper>
                                    </div>
                                    <div className={styles.container_categorias}>
                                        <Categorias busca={busca} lista={produtos} theme={usuario && usuario[0].theme} />
                                    </div>
                                </div>
                            </div>
                    </div>
                }

            </>
        )
}