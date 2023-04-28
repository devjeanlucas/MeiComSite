import {  useParams } from "react-router-dom";
import styles from "./Produto.module.css"
import { useState } from "react"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import {FaAngleLeft, FaRegClock, FaUtensils} from "react-icons/fa"
import Loading from "../../components/Loading";


export default function Produto () {
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const [produtos, setProdutos] = useState([])
    const [users, setUsers] = useState([])
    const [load, setLoading] = useState(false)
    const [state, setState] = useState("start")
    var [counter, setCounter] = useState(1)
    const {site, nome} = useParams()
    
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

    const produto = produtos && produtos.filter(dados => {if (dados.nome.replaceAll(' ', '').toLowerCase() == nome) {return dados}})

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    const retorna = () => {
        window.history.back()
    }

    var total = produto.length > 0  && produto[0].preço * counter
    

    return (
        <>
            <div className={styles.container}>
                {usuario.length > 0 && produto.length > 0  && usuario[0].theme == "Light" &&
                    <div className={styles[usuario[0].theme]}>
                        {!load && <Loading/>}
                        <button className={styles.btn_return}
                        onClick={retorna}
                        ><FaAngleLeft/></button>
                        <div className="row">
                            <div className="col-md-6">
                                <img src={produto[0].img} className={styles.img}/>
                            </div>
                            <div className="col-md-6">
                                <div className={styles.cont_card}>
                                    <div>
                                        <h4>{produto[0].nome}</h4>
                                        <div className={styles.flex}>
                                            <p><FaUtensils className={styles.icon}/>serve {produto[0].serve}</p>
                                            <p><FaRegClock className={styles.icon}/>{produto[0].espera} min</p>
                                        </div>
                                        <div className={styles.line}/>
                                        <div className={styles.cont_price}>
                                            <div className="row">
                                                <div className="col-5 col-sm-8 col-md-7 col-lg-8">
                                                    <div className={styles.c_price}>
                                                        <h5 className={styles.price}>{FormataValor(produto[0].preço)}</h5>
                                                    </div>
                                                </div>
                                                <div className="col-7 col-sm-4 col-md-5 col-lg-4">
                                                    <div className={styles.counter}>
                                                        <button
                                                        onClick={()=> setCounter(counter -= 1)}
                                                        >-</button>
                                                        <input type="number" value={counter}/>
                                                        <button
                                                        onClick={()=> setCounter(counter+=1)}
                                                        >+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.about}>
                                            <strong>Sobre</strong>
                                            <p>{produto[0].desc}</p>
                                        </div>
                                        <div className={styles.btn_comprar}>
                                            <button>Comprar <span>{FormataValor(total)}</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {usuario.length > 0 && produto.length > 0  && usuario[0].theme == "Dark" &&
                    <div className={styles[usuario[0].theme]}>
                        {!load && <Loading/>}
                        <div className="row">
                            <div className="col-lg-7">
                                <img src={produto[0].img} className={styles.img}/>
                            </div>
                            <div className="col-lg-5">
                                <div className={styles.cont_right}>
                                    <div className={styles.header}>
                                        <h3 className={styles.name}>{produto[0].nome}</h3>
                                        <p className={styles.desc}>{produto[0].desc}</p>
                                        <h4>{FormataValor(produto[0].preço)}</h4>
                                    </div>
                                    <strong>cores disponiveis</strong>
                                    <div className={styles.cont_colors}>
                                        <div className={styles.item}>
                                            <input type="color" disabled/>
                                        </div>
                                        <div className={styles.item}>
                                            <input type="color" disabled/>
                                        </div>
                                        <div className={styles.item}>
                                            <input type="color" disabled/>
                                        </div>
                                    </div>
                                    <strong>tamanho</strong>
                                    <div className={styles.cont_tam}>
                                        <button>P</button>
                                        <button>M</button>
                                        <button>G</button>
                                    </div>
                                    <button className={styles.btn_buy}>Comprar</button>
                                    <div className="accordion" id="accordionExample">

                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#detalhes" aria-expanded="false" aria-controls="collapseOne">
                                                Detalhes
                                                </button>
                                            </h2>
                                            <div id="detalhes" className="accordion-collapse collapse">
                                                <div className="accordion-body">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
        )
}