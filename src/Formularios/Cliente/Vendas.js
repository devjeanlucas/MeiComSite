import App from "../../Hooks/App"
import styles from "./Vendas.module.css"
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import {auth} from "../../Service/firebase"
import { useState,useEffect } from "react"
import Loading from "../../components/Loading"



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

    
    return (
            <>
            <ul className={styles.list}>
                {vendas && vendas.map(dados => {
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
                                        
                                    </div>
                                </li>
                            </>
                        )
                })}
                {!load && <Loading/>}
            </ul>
            </>
        )
}