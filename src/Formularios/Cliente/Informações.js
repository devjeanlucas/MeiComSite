import styles from "./Information.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import Themes from "../../Documents/Themes.json"
import {Swiper, SwiperSlide} from "swiper/react"
import Loading from "../../components/Loading"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import '@firebase/firestore';
import {FaEdit, FaPlusCircle, FaTrashAlt} from "react-icons/fa"
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import FormAdd from "../../AreaCliente/Admin/FormAdd"



export default function Informations () {

    const [load, setLoading] = useState(false)
    const [user, setUser] = useState();
    const [state, setState] = useState(false)
    const [Users, setUsers] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite/${user && user.email}/produtos`)

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
        setUsers((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setLoading(true)
    };
    if (user) {
        if (!state) {
            getUsers()
            setState(true)
        }
    }
    
    var listIDs = []
    
    Users && Users.map(item => listIDs.push(parseInt(item.id)))
    
    var max = listIDs.reduce(function(a, b) {
        return Math.max(a, b);
    }, -Infinity);
    
    var id = max + 1

    

    return (
            <>
                <div className={styles.cont_btn}>
                    <button className={styles.btn}
                    type="button" data-bs-toggle="modal" data-bs-target={`#ModalAdd`}
                    ><FaPlusCircle/> Adicionar Novo</button>
                </div>
                <ul className={styles.list_produtos}>
                    {Users && user && Users.map(dados => {
                        if (dados.status != "inerit") {
                            return (
                                    <li className={`row`} key={dados.id}>
                                        <div className="col-2">
                                            <img src={dados.img} className={styles.img}/>
                                        </div>
                                        <div className={`col-10`}>
                                            <div className={styles.cont_item}>
                                                <div className={styles.cont_buttons}>
                                                    <FaEdit className={styles.icon}

                                                    />
                                                    <FaTrashAlt className={styles.icon}

                                                    />
                                                </div>
                                                <div className={styles.item}>
                                                    <p>Nome: <strong>{dados.nome}</strong></p>
                                                    <p>Preço: <strong>R${dados.preço}</strong></p>
                                                    <p>Categoria: <strong>{dados.categoria}</strong></p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </li>
                                )
                        }
                    })}
                </ul>
                {!load &&
                <Loading/>
                }

                <div className="modal fade" id="ModalAdd" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-xl`}>
                    <div className="modal-content">
                        <FormAdd
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            id = {id && id}
                            email = {user && user.email}
                            />
                    </div>
                </div>
            </div>
            </>
        )
}