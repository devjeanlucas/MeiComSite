import App from "../../Hooks/App"
import styles from "./Vendas.module.css"
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import {auth} from "../../Service/firebase"
import { useState,useEffect } from "react"
import Loading from "../../components/Loading"
import VerDetalhesPedido from "../../components/VerDetalhesPedido";



export default function Vendas () {
    
    const [vendas, setVendas] = useState()
    const [load, setLoading] = useState(false)
    const [user, setUser] = useState();
    const [state, setState] = useState(false)
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite/${user && user.email}/vendas`)
    
    useEffect (()=>{
        try{
            auth.onAuthStateChanged(user => {
                if (user) {
                    const {uid, displayName, photoURL, email} = user
                    if (!displayName || !photoURL) {
                        throw new Error('Usuário sem Nome ou foto')
                    }
                    setUser({
                        id: uid,
                        avatar: photoURL,
                        name: displayName,
                        email
                    })
                }
            })
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])
    
    const getUsers = async () => {
        const data = await getDocs(UserCollection);
        setVendas((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setLoading(true)
    };

    if (user) {
        if (!state) {
            getUsers()
            setState(true)
        }
    }
    function FormataNome (nome) {
        nome = nome.split(' ')
        return `${nome[0]} ${nome[1]}`
    }
    
    const [obj, setObj] = useState()
    const [ação, setAção] = useState()

    
    return (
            <>
            <ul className={styles.list}>
                { vendas && vendas.length > 0 ? vendas.map(dados => {
                    return (
                            <>
                                <li key={dados.id} className={
                                    dados.status == "Aguardando confirmação" && styles.pending
                                    }>
                                    <div className={styles.flex}>
                                        <strong>Nome: {FormataNome(dados.nome)}</strong>
                                        <strong>Data: {dados.data}</strong>
                                        <strong>Hora: {dados.hora}</strong>
                                    </div>
                                    <strong>Telefone: {dados.telefone}</strong>
                                    <div className="line"/>
                                    <div className={styles.info}>
                                        <strong>Status:</strong>
                                        <span>{dados.status}</span>
                                    </div>
                                    <div className={styles.cont_button}>
                                        <button
                                        type="button" 
                                        data-bs-toggle="modal" 
                                        data-bs-target={`#VisualizarPedido`}
                                        onClick={()=> {
                                            setAção('Ver Pedido')
                                            setObj(dados)
                                        }}
                                        >Ver pedido</button>
                                        <button
                                        type="button" 
                                        data-bs-toggle="modal" 
                                        data-bs-target={`#VisualizarPedido`}
                                        onClick={()=> {
                                            setAção('Ver Endereço')
                                            setObj(dados)
                                        }}
                                        >Ver Endereço</button>
                                    </div>
                                </li>
                            </>
                        )
                }):
                <h4>Ainda não há vendas</h4>
                }
            </ul>

            <div className="modal fade" id="VisualizarPedido" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-md`}>
                    <div className="modal-content">
                        <VerDetalhesPedido
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            data_bs_toggle="modal" 
                            data_bs_target={`#VisualizarPedido`}
                            obj={obj}
                            ação={ação}
                            />
                    </div>
                </div>
            </div>
            </>
        )
}