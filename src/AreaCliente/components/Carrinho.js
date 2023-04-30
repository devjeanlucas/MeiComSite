import { Link, useParams } from "react-router-dom"
import styles from "./Carrinho.module.css"
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import App from "../../Hooks/App";
import { useEffect, useState } from "react";
import {FaPlus, FaMinus, FaTrash} from "react-icons/fa"
import NavShop from "../components/NavShop"

export default function Carrinho () {
    
    const {site} = useParams()
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const [user, setUser] = useState([])

    useEffect(()=>{
        const getUsers = async () => {
            const data = await getDocs(UserCollection)
            setUser((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        }
        getUsers()
    }, [])


    const usuario = user && user.filter(dados => {
        if (dados.site == site) {
            return dados
        }
    })
    function pegaDados() {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }

        return produtosSalvos
    }

    function pegaItems() {
        let listGeral = []
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            listGeral = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        
        if (listGeral.length == 0) {
            return 0
        } else {
            let listPrecos = []
            
            listGeral.map(item => {listPrecos.push(item.qtd)})
            var soma = listPrecos.reduce((soma, i) => {return soma + i})
            return soma
        }
        
    }
    
    function pegaPreco() {
        let listGeral = []
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            listGeral = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        if (listGeral.length === 0) {
            return 0
        } else {
            let listPrecos = []
            let list = []
            listGeral.map(item => {return listPrecos.push({qtd: item.qtd, preço: item.preço})})
            listPrecos.map(item => {return list.push(item.qtd * item.preço)})
            var soma = list.reduce((soma, i) => {return soma + i})

            return soma
        }
    }
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }


    
    
    
    const dados = pegaDados()
    var total = pegaPreco()
    var qtd = pegaItems()
    
    
    function createWhatsAppLink(phoneNumber, message) {
        return `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}`;
      }

    const message = `Olá! Me chamo Jean Lucas estou comprando no ${site}, segue minhas compras:
    ${dados && dados.map(dados => {return (`${dados.nome} x${dados.qtd} ${FormataValor(dados.preço)}`)})}
    `; 


    return (
            <>
            {usuario.length >0 && usuario[0].theme == "Dark" &&
                <div className={`${styles[usuario && usuario[0].theme]}`}>
                    <div className="row">
                        <div className="col-sm-7">
                        <div>
                            <ul className={`row ${styles.list}`}>
                            {dados && dados.map(dados => {
                                return (
                                        <li key={dados.id}>
                                            <div className="row">
                                                <div className="col-4 col-sm-5">
                                                    <Link
                                                        to={`/${site}/produto/${dados.nome.replaceAll(' ', '').toLowerCase()}`}
                                                    >
                                                        <img src={dados.img} className={styles.img}/>
                                                    </Link>
                                                </div>
                                                <div className="col-8 col-sm-7">
                                                    <div className={styles.cont_desc}>
                                                        <div className="row">
                                                            <h5>{dados.nome}</h5>
                                                            <p>{FormataValor(dados.preço)}</p>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-10">
                                                                <strong>x{dados.qtd}</strong>
                                                                <FaPlus className={styles.icon}/>
                                                                <FaMinus className={styles.icon}/>
                                                            </div>
                                                            <div className="col-2">
                                                                <FaTrash className={styles.icon}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className={`${styles.no_padding_right} col-sm-5`}>
                        <div className={styles.cont_total}>
                            <h4>Minhas Compras</h4>
                            <h5>Itens: {qtd}</h5>
                            <h3>Total: {FormataValor(total)}</h3>
                            <a className={styles.btn_comprar}
                            href={createWhatsAppLink('71981298548', message)}
                            target="_blank"
                            >Finalizar</a>
                        </div>
                    </div>
                                </div>
                </div>
            }
            {usuario.length >0 && usuario[0].theme == "Light" && 
                <div className={`${styles[usuario && usuario[0].theme]}`}>
                    <div className="row">
                        <div className="col-lg-3">
                            <NavShop/>
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-sm-7">
                                        <ul className={`row ${styles.list}`}>
                                            {dados && dados.map(dados => {
                                            return (
                                                <li key={dados.id}>
                                                    <div className="row">
                                                        <div className="col-4 col-sm-5">
                                                            <Link
                                                                to={`/${site}/produto/${dados.nome.replaceAll(' ', '').toLowerCase()}`}
                                                            >
                                                                <img src={dados.img} className={styles.img}/>
                                                            </Link>
                                                        </div>
                                                        <div className="col-8 col-sm-7">
                                                            <div className={styles.cont_desc}>
                                                                <div className="row">
                                                                    <h5>{dados.nome}</h5>
                                                                    <p>{FormataValor(dados.preço)}</p>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-10">
                                                                        <strong>x{dados.qtd}</strong>
                                                                        <FaPlus className={styles.icon}/>
                                                                        <FaMinus className={styles.icon}/>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <FaTrash className={styles.icon}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                    )
                                                })}
                                        </ul>
                                </div>
                                <div className={`${styles.no_padding_right} col-sm-5`}>
                                    <div className={styles.cont_total}>
                                        <h4>Minhas Compras</h4>
                                        <h5>Itens: {qtd}</h5>
                                        <h3>Total: {FormataValor(total)}</h3>
                                        <button className={styles.btn_comprar}>Finalizar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </>
        )
}