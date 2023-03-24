import InfoNegocio from "../Cadastro/InfoNegocio"
import styles from "../Cadastro/FormularioCadastro.module.css"
import BoxConfirm from "../../components/BoxConfirm"

import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";

export default function FormularioEdit () {

    const [user, setUser] = useState();
    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
    const [ação, setAção] = useState()
    const [empty, setEmpty] = useState(true)
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

    const [alt, setAlt] = useState(false)
    const [nome, setNome] = useState()
    const [razao, setRazao] = useState()
    const [phone, setPhone] = useState()
    const [token,setToken] = useState()
    const [rua, setRua] = useState()
    const [bairro, setBairro] = useState()
    const [ref,setRef] = useState()
    const [cidade, setCidade] = useState()
    const [num, setNum] = useState()
    const [CEP, setCEP] = useState()
    
    const obj = {
    nome,
    razao,
    phone, 
    token,
    rua,
    bairro,
    ref,
    cidade,
    num,
    CEP,
    ação:ação
    }
    
   




    return (
        <>
        
        {user &&
        produtos && produtos.map(dados => {
            if (dados.iduser == id) {
                return (
                    <div className={styles.container}>
                <h4>Dados Pessoais Edit</h4>
                <form className={`row ${styles.form}`}>
                    <div className={`row ${styles.dados}`}>
                        <div className="col-sm-6">
                            <label>Nome Completo *</label>
                            <input type="text"
                            onChange={(el)=> {
                                setNome(el.target.value)
                            }}
                            placeholder={dados.nome}
                            required
                            />
                            <label>Razão Social *</label>
                            <input type="text"
                            onChange={(el)=> {
                                setRazao(el.target.value)
                            }}
                            required
                            />
                            <label>Telefone *</label>
                            <input type="phone"
                            onChange={(el)=> {
                                setPhone(el.target.value)
                            }}
                            required
                            />
                            <label>Token Mercado Pago *</label>
                            <input type="text"
                            onChange={(el)=> {
                                setToken(el.target.value)
                            }}
                            required
                            />
                            
                        </div>
                        <div className="col-sm-6">
                            <label className={styles.title_small}>Endereço</label>
                            <div className={styles.cont_dashed_no_padding}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Rua *</label>
                                        <input type="text"
                                        onChange={(el)=> {
                                            setRua(el.target.value)
                                        }}
                                        required
                                        />
                                        <label>Bairro *</label>
                                        <input type="text"
                                        onChange={(el)=> {
                                            setBairro(el.target.value)
                                        }}
                                        required
                                        />
                                        <label>P.de Referência</label>
                                        <input type="text"
                                        onChange={(el)=> {
                                            setRef(el.target.value)
                                        }}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Cidade *</label>
                                        <input type="text"
                                        onChange={(el)=> {
                                            setCidade(el.target.value)
                                        }}
                                        required
                                        />
                                        <label>Número *</label>
                                        <input type="number"
                                        onChange={(el)=> {
                                            setNum(el.target.value)
                                        }}
                                        required
                                        />
                                        <label>CEP *</label>
                                        <input type="number"
                                        onChange={(el)=> {
                                            setCEP(el.target.value)
                                        }}
                                        required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cont_save}>
                            {nome || phone || razao || token || rua || cidade || bairro || num || CEP ?
                                <button
                                type="button" 
                                data-bs-toggle="modal" 
                                data-bs-target="#ModalAdd"
                                onClick={(el)=> {
                                    el.preventDefault()
                                    setAção("Iniciar Cadastro")
                                }}
                                >
                                    salvar
                                </button>
                            :
                            <button
                            className={styles.disabled}
                            onClick={(el)=> {
                                el.preventDefault()
                            }}
                            >salvar</button>
                            }   
                        </div>
                    </div>
                    <InfoNegocio/>
                </form>    
            </div>
            )
            }
        })     
        }
        <div className="modal fade" id="ModalAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className={`modal-dialog modal-md`}>
            <div className="modal-content">
                <BoxConfirm
                obj={obj}
                type="button" 
                data_bs_toggle="modal" 
                data_bs_target="#ModalAdd"
                />
            </div>
        </div>
    </div>
            
        </>
        )
}