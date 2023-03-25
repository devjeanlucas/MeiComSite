import styles from "./InfoPerfil.module.css"
import User from "../../Hooks/User"
import { Link, useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";

export default function InfoPerfil () {

    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
    const [user, setUser] = useState();
    const UserCollection = collection(db, "MeiComSite")
    
    useEffect(()=>{
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
    }, [])
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])
    const {id}= useParams()

    let index = produtos && produtos.findIndex(prop => prop.iduser == id)


    return (
        <>
            {user && user.id == id &&
            <div className={styles.container}>

                    {index < 0 ? 
                    <div className={styles.cont_status}>
                        <p>Preencha para começar</p>
                        <Link to={`/perfil/${user.id}/cadastro`}>Começar</Link>
                    </div>:
                    <div className={styles.cont_status}>
                        <p>Suas informações</p>
                        <Link to={`/perfil/${user.id}/dados`}>aqui</Link>
                    </div>
                    }

                <ul className={`row ${styles.list}`}>
                    <li className="col-sm-6">
                        <p>Nome:</p>
                        <strong>{User.length > 0 && User[0].name}</strong>
                    </li>
                    <li className="col-sm-6">
                        <p>Endereço:</p>
                    </li>
                    <li className="col-sm-6">
                        <p>Modalidade:</p>
                    </li>
                </ul>
            </div>
            }
            
        </>
        )
}