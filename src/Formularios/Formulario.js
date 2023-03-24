import { useState,useEffect } from "react"
import {auth} from "../Service/firebase"
import { useParams } from "react-router-dom"
import App from "../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import FormularioCadastro from "./Cadastro/FormularioCadastro";
import FormularioEdit from "./Cliente/FormularioEdit";

export default function Fomulario () {


    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, "MeiComSite")
    const [user, setUser] = useState();

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

    


    return (
            <div>
                {produtos && produtos.map(dados => {
                    if (user && user.id == dados.iduser) {
                        return (
                                <FormularioEdit/>
                            )
                    } else {
                        return (
                                <FormularioCadastro/>
                            )
                    }
                })}
            </div>
        )
}