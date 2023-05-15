import styles from "./Categorias.module.css"
import Loading from "../../components/Loading"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import '@firebase/firestore';
import {FaEdit, FaPlusCircle, FaRegSadTear, FaTrashAlt} from "react-icons/fa"
import { getFirestore, collection, getDocs, setDoc, doc, updateDoc} from "@firebase/firestore";
import BoxConfirm from "../../components/BoxConfirm"
import { Link } from "react-router-dom"



export default function Informations () {

    const [load, setLoading] = useState(false)
    const [user, setUser] = useState();
    const [state, setState] = useState(false)
    const [Users, setUsers] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [ação, setAção] = useState([])
    const [imagem, setImagem] = useState()
    const [categoria, setCategoria] = useState()
    const [produto, setProduto] = useState()
    const [id, setId] = useState()
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
    
    const usuario = []

    usuarios && user && usuarios.filter(dados => {
        if (dados.iduser == user.id) {
            usuario.push(dados)
        }
    })
    const addCategoria = async () => {
        await setDoc(doc(db, `MeiComSite/${user && user.email}/produtos`, `${categoria}`), {
            categoria: categoria,
            imagem: imagem
        });
        window.location.reload()
    }
    const editCategoria = async () => {
        await updateDoc(doc(db, `MeiComSite/${user && user.email}/produtos`, `${produto && produto.id}`), {
            categoria: categoria ? categoria : produto.categoria
        });
        await updateDoc(doc(db, `MeiComSite/${user && user.email}/produtos`, `${produto && produto.id}`), {
            imagem: imagem ? imagem : produto.imagem
        });
        window.location.reload()
    }
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
                ><FaPlusCircle/> Nova Categoria</button>
                <strong>Site ainda não autorizado a adicionar produtos <FaRegSadTear/></strong>
                </div>:
                <div className={styles.cont_btn}>
                <button className={styles.btn}
                type="button" 
                data-bs-toggle="modal" 
                data-bs-target={`#ModalAdd`}
                ><FaPlusCircle/> Nova Categoria</button>
             </div>
                }


                <ul className={styles.list_produtos}>
                    {Users && user && Users.map(dados => {
                        if (dados.status != "inerit") {
                            return (
                                    
                                    <li className={`row ${styles.li}`} key={dados.id}
                                    >
                                        <div className="col-2">
                                            <img src={dados.imagem} className={styles.img}/>
                                        </div>
                                        <div className={`col-10`}>
                                            <div className={styles.cont_item}>
                                                <div className={styles.cont_buttons}>
                                                    <FaEdit className={styles.icon}
                                                    type="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#ModalEditarCategoria`}
                                                    onClick={()=> setProduto(dados)}
                                                    />
                                                    <FaTrashAlt className={styles.icon}
                                                    type="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#ModalConfirmTrash`}
                                                    onClick={()=> {
                                                        setAção("Deletar categoria")
                                                        setProduto(dados)
                                                        setId(dados.id)
                                                    }}
                                                    />
                                                </div>
                                                <div className={styles.item}>
                                                    <p>Categoria: <strong>{dados.categoria}</strong></p>
                                                </div>
                                                <Link
                                                to={`/perfil/user/categorias/${dados.categoria}`}
                                                >Ver Produtos</Link>
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
                    <div className={`modal-dialog modal-sm`}>
                        <div className="modal-content">
                            <div className={styles.cont_new_categorie}>
                                <h4>Nova Categoria</h4>
                                {imagem && <img src={imagem} className={styles.img}/>}
                                <div className="line"/>
                                <div className={styles.info_categorie}>
                                    <strong>nome:</strong>
                                    <input type="text"
                                    onChange={(el)=> setCategoria(el.target.value)}
                                    />
                                    <strong>imagem:</strong>
                                    <input type="text"
                                    onChange={(el)=> setImagem(el.target.value)}
                                    />
                                </div>
                                <button
                                onClick={()=> addCategoria()}
                                >Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="ModalEditarCategoria" tabindex="-1" aria-labelledby="exampleModalLabel">
                    <div className={`modal-dialog modal-sm`}>
                        <div className="modal-content">
                            <div className={styles.cont_new_categorie}>
                                <h4>Editar Categoria</h4>
                                {imagem && <img src={imagem} className={styles.img}/>}
                                <div className="line"/>
                                <div className={styles.info_categorie}>
                                    <strong>nome:</strong>
                                    <input type="text"
                                    defaultValue={produto && produto.categoria}
                                    onChange={(el)=> setCategoria(el.target.value)}
                                    />
                                    <strong>imagem:</strong>
                                    <input type="text"
                                    defaultValue={produto && produto.imagem}
                                    onChange={(el)=> setImagem(el.target.value)}
                                    />
                                </div>
                                <button
                                onClick={()=> editCategoria()}
                                >Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="modal fade" id="ModalConfirmTrash" tabindex="-1" aria-labelledby="exampleModalLabel">
                    <div className={`modal-dialog modal-sm`}>
                        <div className="modal-content">
                            <BoxConfirm
                                type="button"
                                dismiss="modal"
                                aria_label="Close"
                                data_bs_toggle="modal" 
                                data_bs_target={`#ModalConfirmTrash`}
                                obj={obj}
                                dados= {produto && produto}
                                id={id}
                                email = {user && user.email}
                                />
                        </div>
                    </div>
                </div>
            </>
        )
}