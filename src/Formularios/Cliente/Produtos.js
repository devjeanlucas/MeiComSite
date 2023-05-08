import styles from "./Produtos.module.css"
import Loading from "../../components/Loading"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import '@firebase/firestore';
import {FaEdit, FaPlusCircle, FaRegSadTear, FaTrashAlt} from "react-icons/fa"
import { getFirestore, collection, getDocs, doc,setDoc} from "@firebase/firestore";
import FormAdd from "../../AreaCliente/Admin/FormAdd"
import FormEdit from "../../AreaCliente/Admin/FormEdit"
import BoxConfirm from "../../components/BoxConfirm"



export default function Informations () {

    const [load, setLoading] = useState(false)
    const [user, setUser] = useState();
    const [state, setState] = useState(false)
    const [Users, setUsers] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [ação, setAção] = useState([])
    const [produto, setProduto] = useState()
    const db = getFirestore(App)
    const Collec = collection(db, "MeiComSite")
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
        const dataUser = await getDocs(Collec)
        setUsuarios((dataUser.docs.map((doc) => ({...doc.data(), id: doc.id}))))
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
    }, 0);
    
    var id = max + 1

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    
    const usuario = []

    usuarios && user && usuarios.filter(dados => {
        if (dados.iduser == user.id) {
            usuario.push(dados)
        }
    })
    const obj ={
        ação
    }

    
    return (
            <>
                {usuario[0] && usuario[0].status == "Em análise" ?
                <div className={styles.cont_btn}>
                <button className={styles.btn_disabled}
                type="button" 
                disabled
                ><FaPlusCircle/> Adicionar Novo</button>
                <strong>Site ainda não autorizado a adicionar produtos <FaRegSadTear/></strong>
                </div>:
                <div className={styles.cont_btn}>
                <button className={styles.btn}
                type="button" 
                data-bs-toggle="modal" 
                data-bs-target={`#ModalAdd`}
                ><FaPlusCircle/> Adicionar Novo</button>
             </div>
                
                }


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
                                                    type="button" 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target={`#ModalEdit`}
                                                    onClick={()=> setProduto(dados)}
                                                    />
                                                    <FaTrashAlt className={styles.icon}
                                                    type="button" 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target={`#ModalConfirm`}
                                                    onClick={()=> {
                                                        setAção("Deletar")
                                                        setProduto(dados)}}
                                                    />
                                                </div>
                                                <div className={styles.item}>
                                                    <p>Nome: <strong>{dados.nome}</strong></p>
                                                    <p>Preço: <strong>{FormataValor(dados.preço)}</strong></p>
                                                    <p>Categoria: <strong>{dados.categoria}</strong></p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </li>
                                )
                        }
                    })}
                    {!load &&
                    <Loading/>
                    }
                </ul>
                

                <div className="modal fade" id="ModalAdd" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-xl`}>
                    <div className="modal-content">
                        <FormAdd
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            id = {id && id}
                            email = {user && user.email}
                            modalidade= {usuario.length > 0 && usuario[0].mod}
                            tema = {usuario.length > 0 && usuario[0].theme} 
                            />
                    </div>
                </div>
            </div>
            <div className="modal fade" id="ModalEdit" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-xl`}>
                    <div className="modal-content">
                        <FormEdit
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            data_bs_toggle="modal" 
                            data_bs_target={`#ModalEdit`}
                            
                            dados={produto}
                            id={user && user.email}
                            />
                    </div>
                </div>
            </div>
            
            <div className="modal fade" id="ModalConfirm" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <BoxConfirm
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            data_bs_toggle="modal" 
                            data_bs_target={`#ModalConfirm`}
                            obj={obj}
                            dados={produto}
                            id={user && user.email}
                            />
                    </div>
                </div>
            </div>
            </>
        )
}