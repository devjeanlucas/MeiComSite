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
    
    
    

    
    const [ação, setAção] = useState()
    const [theme, setTheme] = useState()
    const [mod, setMod] = useState()
    

    const [plan, setPlan] = useState()
    const [nome, setNome] = useState()
    const [razao, setRazao] = useState()
    const [phone, setPhone] = useState()
    const [abre,setAbertura] = useState()
    const [fecha, setFecha] = useState()
    const [site, setSite] = useState()
    const [nascimento,setNascimento] = useState()
    const [token, setToken] = useState()
    const [cidade, setCidade] = useState()
    const [CEP, setCEP] = useState()
    const [idtheme, setIdTheme] = useState()
    
    const obj = {
    nome,
    razao,
    phone, 
    idtheme,
    cidade,
    CEP,
    theme,
    mod,
    nascimento,
    plan,
    token,
    abre,
    site,
    fecha,
    ação:ação,

    }
    


    let index = produtos && produtos.findIndex(prop => prop.iduser == user.id)



    return (
        <>
        
        {index >= 0 ? 
        <div>
            <h1>Usuário já cadastrado</h1>
        </div>:
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
                                    <label>Data de nascimento *</label>
                                    <input type="date"
                                    onChange={(el)=> {
                                        setNascimento(el.target.value)
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
                                </div>
                                <div className="col-sm-6">
                                    <label className={styles.title_small}>Informações do negócio</label>
                                    <div className={styles.cont_dashed_no_padding}>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label>Abertura *</label>
                                                <input type="time"
                                                onChange={(el)=> {
                                                    setAbertura(el.target.value)
                                                }}
                                                required
                                                />
                                                <label>Fechamento *</label>
                                                <input type="time"
                                                onChange={(el)=> {
                                                    setFecha(el.target.value)
                                                }}
                                                required
                                                max={8}
                                                />
                                                <label>Site *</label>
                                                <strong className={styles.block}>https://meicomsite.netlify.com/</strong>
                                                <strong>
                                                    {site &&
                                                    site.toLowerCase().replace(' ', '')}
                                                </strong>
                                                <input type="text"
                                                onChange={(el)=> {
                                                    setSite(el.target.value)
                                                }}
                                                required
                                                />
                                                <label>Cidade *</label>
                                                <input type="text"
                                                onChange={(el)=> {
                                                    setCidade(el.target.value)
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
                    <div className={styles.container}>
                <h4>Seu negócio</h4>
                    <div className={`col-sm-12`}>
                        <div className={styles.cont_dashed}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className={styles.cont_plan}>
                                        <label>Plano:</label>
                                        <select 
                                        onChange={(el)=> setPlan(el.target.value)}
                                        >
                                            <option>-</option>
                                            <option value="Basic">Basic</option>
                                            <option value="Plus">Plus</option>
                                            <option value="Premium">Premium</option>
                                        </select>
                                        <Link 
                                        className={styles.btn_theme}
                                        to="/planos"
                                        >
                                            ver planos
                                        </Link>
                                    </div>
                                    {plan == "Plus" && 
                                    <div className={styles.cont_token}>
                                        <label>Token Mercado Pago:</label>
                                        <input type="text"  onChange={(el)=> setToken(el.target.value)}/>
                                    </div>
                                    }
                                    {plan == "Premium" && 
                                    <div className={styles.cont_token}>
                                        <label>Token Mercado Pago:</label>
                                        <input type="text"  onChange={(el)=> setToken(el.target.value)}/>
                                    </div>
                                    }
                                </div>
                                <div className="col-sm-6">
                                    <div className={styles.cont_theme}>
                                        <label>Modalidade</label>
                                            <select id="modalidade"
                                            onChange={(el)=> setMod(el.target.value)}
                                            defaultValue="-"
                                             >
                                                <option>-</option>
                                                <option>Loja Virtual</option>
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
                                            if (mod == item.modalidade) {
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
                            && razao && plan &&
                            cidade && CEP ?
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

        </>      
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