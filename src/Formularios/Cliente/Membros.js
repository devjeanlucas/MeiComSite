import styles from "./Membros.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import Themes from "../../Documents/Themes.json"
import {Swiper, SwiperSlide} from "swiper/react"
import Loading from "../../components/Loading"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { Link } from "react-router-dom"



export default function Membros () {

    const [load, setLoading] = useState(false)
    const [user, setUser] = useState();
    const [Users, setUsers] = useState([])
    const [Usuario, SetUsuario] = useState([])
    const db = getFirestore(App)
    const Collection = collection(db, "MeiComSite")
    const UserCollection = collection(db, `MeiComSite/${user && user.email}/membros`)
    
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
        
        if (user) {
            const dataUss = await getDocs(Collection);
            SetUsuario((dataUss.docs.map((doc) => ({...doc.data(), id: doc.id}))))

            const data = await getDocs(UserCollection);
            setUsers((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
            setLoading(true)
        }
    };  
    getUsers()


    
    return (
            <>
                {Usuario && Usuario.map(item => {
                    if (item.iduser == user.id) {
                        return (
                                <div className={styles.container}>
                                    {item.plan != "Premium" && 
                                    <div className={styles.flex}>
                                        <p>Atualize para Adicionar mais membros</p>
                                        <Link
                                        to="/planos" 
                                        className={styles.button}>planos</Link>
                                    </div>
                                    }
                                </div>
                            )
                    }
                })}
                {Users && user && Users.map(dados => {
                    return (
                            <div className={styles.container}>
                                <ul className={styles.list}>
                                    <li>
                                        <div className="row">
                                            <div className="col-sm-2">
                                                <img src={dados.avatar} className={styles.img}/>
                                            </div>
                                            <div className="col-sm-6">
                                                <p>{dados.email}</p>
                                                <p>{dados.nome}</p>
                                                {dados.admin && <p>administrador</p>}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )
                })}
                {!load && 
                <Loading/>}
            </>
        )
}