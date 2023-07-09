import styles from "./Categorias.module.css"
import Loading from "../../components/Loading"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import '@firebase/firestore';
import {FaCheck, FaCheckCircle, FaEdit, FaPlusCircle, FaRegSadTear, FaTimesCircle, FaTrashAlt} from "react-icons/fa"
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
    const [mostrar, setMostrar] = useState()
    const [text, setText] = useState()
    const [destaque, setDestaque] = useState()
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
            img: imagem,
            mostrar:false,
            destaque:false,
            text:''
        });
        window.location.reload()
    }
    const editCategoria = async () => {
        await updateDoc(doc(db, `MeiComSite/${user && user.email}/produtos`, `${produto && produto.id}`), {
            categoria: categoria ? categoria : produto.categoria
        });
        await updateDoc(doc(db, `MeiComSite/${user && user.email}/produtos`, `${produto && produto.id}`), {
            img: imagem ? imagem : produto.img
        });
        await updateDoc(doc(db, `MeiComSite/${user && user.email}/produtos`, `${produto && produto.id}`), {
            destaque: destaque ?  destaque == 'Sim' ? true : destaque == 'Não' && false : produto.destaque
        });
        await updateDoc(doc(db, `MeiComSite/${user && user.email}/produtos`, `${produto && produto.id}`), {
            mostrar: mostrar ?  mostrar == 'Sim' ? true : mostrar == 'Não' && false : produto.mostrar
        });
        await updateDoc(doc(db, `MeiComSite/${user && user.email}/produtos`, `${produto && produto.id}`), {
            text: text ?  text  : produto.text
        });
        window.location.reload()
    }
    const obj ={
        ação
    }

    
    return (
            <>
                {usuario && usuario.length > 0 &&
                <>
                    {usuario[0].status == "Em análise" ?
                    <div className={styles.cont_btn}>
                        <button className={styles.btn_disabled}
                        type="button" 
                        disabled
                        ><FaPlusCircle/> Nova Categoria</button>
                        <strong>Site ainda não autorizado a adicionar produtos <FaRegSadTear/></strong>
                    </div>
                    :
                    <div className={styles.cont_btn}>
                        <button className={styles.btn}
                        type="button" 
                        data-bs-toggle="modal" 
                        data-bs-target={`#ModalAdd`}
                        ><FaPlusCircle/> Nova Categoria</button>
                    </div>
                    
                }
                </>
                }


                <ul className={styles.list_produtos}>
                    {Users && user && Users.map(dados => {
                        if (dados.status != "inerit") {
                            return (
                                    
                                    <li className={`row ${styles.li}`} key={dados.id}
                                    >
                                        <div className="col-2">
                                            <img src={dados.img} className={styles.img}/>
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
                                    <strong>Nome:</strong>
                                    <input type="text"
                                    defaultValue={produto && produto.categoria}
                                    onChange={(el)=> setCategoria(el.target.value)}
                                    />
                                    <strong>Imagem:</strong>
                                    <input type="text"
                                    defaultValue={produto && produto.imagem}
                                    onChange={(el)=> setImagem(el.target.value)}
                                    />


                                    <div className={styles.cont_check_box}>
                                        <strong>Mostrar no inicio</strong>
                                        {produto && produto.mostrar ? <FaCheckCircle className={styles.on}/> : <FaTimesCircle className={styles.off}/>}
                                        <select
                                        onChange={(el)=> setMostrar(el.target.value)}
                                        >
                                            <option
                                            value="--"
                                            >--</option>
                                            <option
                                            value="Sim"
                                            >Sim</option>
                                            <option
                                            value="Não"
                                            >Não</option>
                                        </select>
                                    </div>
                                    <div className={styles.cont_check_box}>
                                        <strong>Destacar categoria</strong>
                                        {produto && produto.destaque ? <FaCheckCircle className={styles.on}/> : <FaTimesCircle className={styles.off}/>}
                                        <select
                                        defaultValue='sim'
                                        onChange={(el)=> setDestaque(el.target.value)}
                                        >
                                            <option
                                            value="--"
                                            >--</option>
                                            <option
                                            value="Sim"
                                            >Sim</option>
                                            <option
                                            value="Não"
                                            >Não</option>
                                        </select>
                                    </div>
                                    {produto && produto.mostrar &&
                                    <div>
                                        <strong>Texto de destaque</strong>
                                        <textarea
                                        defaultValue={produto.text}
                                        className={styles.input}
                                        onChange={(el)=> setText(el.target.value)}
                                        />
                                    </div>
                                    }











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