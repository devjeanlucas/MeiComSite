import styles from "./FormularioCadastro.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import { Link, useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import {Swiper, SwiperSlide} from "swiper/react"
import Themes from "../../Documents/Themes.json"

export default function FormularioCadastro () {

    const [user, setUser] = useState();
    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
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
    const [ação, setAção] = useState()
    const [theme, setTheme] = useState()
    const [mod, setMod] = useState()
    

    const [plan, setPlan] = useState()
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
    const [idtheme, setIdTheme] = useState()
    
    const obj = {
    nome,
    razao,
    phone, 
    token,
    rua,
    bairro,
    ref,
    idtheme,
    cidade,
    num,
    CEP,
    theme,
    mod,
    plan,
    ação:ação,

    }
    
   


    let index = produtos && produtos.findIndex(prop => prop.iduser == id)

    return (
        <>
        
        {user &&
        produtos && produtos.map(dados => {
            if (index >= 0) {
                if (dados.iduser == id) {
                    return (
                        <div>
                            <p>usuario cadastrado</p>
                        </div>
                    )
                }
            } else {
                return (
                    <>
                    <div className={styles.container}>
                        <h4>Dados Pessoais</h4>
                        <form className={`row ${styles.form}`}>
                            <div className={`row ${styles.dados}`}>
                                <div className="col-sm-6">
                                    <label>Nome Completo *</label>
                                    <input type="text"
                                    onChange={(el)=> {
                                        setNome(el.target.value)
                                    }}
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
                            </div>
                        </form>    
                    </div>
                    </>
                )
            }
        })     
        }
            <div className={styles.container}>
                <h4>Seu negócio</h4>
                    <div className={`col-sm-12`}>
                        <div className={styles.cont_dashed}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className={styles.cont_plan}>
                                        <label>Plano:</label>
                                        <select defaultChecked="Basic"
                                        onChange={(el)=> setPlan(el.target.value)}
                                        >
                                            <option>Basic</option>
                                            <option>Plus</option>
                                            <option>Premium</option>
                                        </select>
                                        <Link 
                                        className={styles.btn_theme}
                                        to="/planos"
                                        >
                                            ver planos
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className={styles.cont_theme}>
                                        <label>Modalidade</label>
                                            <select id="modalidade" defaultValue="Loja Virtual"
                                            onChange={(el)=> setMod(el.target.value)}
                                             >
                                                <option defaultChecked>Loja Virtual</option>
                                                <option>Restaurante</option>
                                                <option>Agendamento</option>
                                            </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className={styles.cont_theme}>
                                        <label>Tema:</label>
                                        <strong>{theme}</strong>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.container_themes}>
                                <Swiper
                                spaceBetween={10}
                                className={styles.cont_slides}
                                breakpoints={{
                                    320: {
                                        width: 320,
                                        slidesPerView: 1,
                                    },
                                    768: {
                                        width: 768,
                                        slidesPerView: 2,
                                        },
                                    }}>
                                        {Themes.map(item => {
                                            if (!mod || mod == "null" ? "Loja Virtual" : mod == item.modalidade) {
                                                return (
                                                    <SwiperSlide key={item.id} className={styles.item}
                                                    onClick={(el)=> {
                                                        el.preventDefault()
                                                        setTheme(item.name)
                                                        setIdTheme(item.id)
                                                    }}
                                                    >
                                                        <img src={item.img} className={styles.img}/>
                                                        <div className={styles.cont_escolha}>
                                                            <p>{item.name}</p>
                                                        </div>
                                                    </SwiperSlide>
                                                    )
                                            }
                                        })}
                                </Swiper>
                            </div>
                            
                        </div>
                    </div>
                    <div className={styles.cont_save}>
                            {nome && theme && mod && phone 
                            && razao && token && rua && plan &&
                            cidade && bairro && num && CEP ?
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