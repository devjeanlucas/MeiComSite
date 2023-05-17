import { useParams } from "react-router-dom"
import styles from "./Produtos.module.css"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs, setDoc, doc} from "@firebase/firestore";
import FormAdd from "../../AreaCliente/Admin/FormAdd"
import FormEdit from "../../AreaCliente/Admin/FormEdit"
import Loading from "../../components/Loading"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import BoxConfirm from "../../components/BoxConfirm"



export default function Produtos () {

    const {categoria} = useParams()

    const [load, setLoading] = useState(false)
    const [user, setUser] = useState();
    const [state, setState] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [ação, setAção] = useState()
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
        setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setLoading(true)
    };
    if (user) {
        if (!state) {
            getUsers()
            setState(true)
        }
    }
    
    const usuario = []

    user && usuarios.filter(dados => {
        if (dados.iduser == user.id) {
            usuario.push(dados)
        }
    })


    const listProdutosTemp = []
    const cat = produtos && produtos.length > 0 && produtos.filter(dados => dados.categoria == categoria)
    const img = cat && cat[0].imagem
    listProdutosTemp.push(cat && cat[0].produtos)

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    const [dados, setDados] = useState()


    const obj = {
        dados,
        ação,
        lista: cat && cat[0].produtos,
        categoria
    }
    const [index, setIndex] = useState()

    return (
            <>
                <div className={styles.container}>
                    <button
                    type="button" 
                    data-bs-toggle="modal" 
                    data-bs-target={`#ModalAdd`}
                    >Adicionar</button>
                    <h4  className={styles.title}>{categoria}</h4>
                    <ul className={styles.list}>
                        {produtos && produtos.length > 0 && produtos.map(dados => {
                            if (dados.produtos) {
                                if (dados.categoria == categoria) {
                                    return (
                                        dados.produtos.map(item => {
                                        return (
                                                <li key={dados.id} className={styles.cont_item}>
                                                    <div className="col-3 col-sm-2">
                                                        <img src={item.img} className={styles.img}/>
                                                    </div>
                                                    <div className="col-9 col-sm-10">
                                                        <FaEdit
                                                        type="button" 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target={`#ModalEdit`}
                                                        onClick={()=> setDados(item)}
                                                        />
                                                        <FaTrashAlt
                                                        type="button" 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target={`#ModalTrash`}
                                                        onClick={()=> {
                                                            setDados(item)
                                                            setAção("Deletar Produto")
                                                            setIndex(1) 
                                                        }}
                                                        />
                                                        <div className={styles.info}>
                                                            <div className={styles.info_item}>
                                                                <p><strong>Nome:</strong>{item.nome}</p>
                                                                <p><strong>Preço:</strong>{FormataValor(item.preço)}</p>
                                                                <p><strong>Material:</strong>{item.material}</p>
                                                            </div>
                                                            <div className={styles.line}/>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                    })
                                    )
                                }
                            } 
                        })
                        }
                    </ul>
                    {!load && <Loading/>}
                </div>


                <div className="modal fade" id="ModalAdd" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-xl`}>
                    <div className="modal-content">
                        <FormAdd
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            email = {user && user.email}
                            categoria = {categoria}
                            modalidade= {usuario.length > 0 && usuario[0].mod}
                            tema = {usuario.length > 0 && usuario[0].theme} 
                            listaProdutos = {listProdutosTemp && listProdutosTemp[0]}
                            img={img}
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
                            dados={dados}
                            />
                    </div>
                </div>
            </div>
            <div className="modal fade" id="ModalTrash" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <BoxConfirm
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            data_bs_toggle="modal" 
                            data_bs_target={`#ModalTrash`}
                            obj={obj}
                            />
                    </div>
                </div>
            </div>
            
                
            </>
        )
}