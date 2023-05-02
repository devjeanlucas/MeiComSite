import styles from "../Cadastro/FormularioCadastro.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import Themes from "../../Documents/Themes.json"
import {Swiper, SwiperSlide} from "swiper/react"
import Loading from "../../components/Loading"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs, updateDoc, doc} from "@firebase/firestore";

export default function FormularioEdit () {

    const [user, setUser] = useState();
    const [Users, setUsers] = useState([])
    const db = getFirestore(App)
    const [ação, setAção] = useState()
    const [li, setLi] = useState()
    const [novaCidade, setNovaCidade] = useState()
    const [novoBairro, setNovoBairro] = useState()
    const [stop, setStop] = useState(false)
    const UserCollection = collection(db, "MeiComSite")

    const usuario = user && Users && Users.filter(dados => dados.iduser == user.id)

    

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
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setUsers((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                setLoading(true)
            };
            

                
            getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])
    

    const [load, setLoading] = useState(false)
    const [nome, setNome] = useState()
    const [razao, setRazao] = useState()
    const [phone, setPhone] = useState()
    const [token,setToken] = useState()
    const [site, setSite]= useState()
    const [logo, setLogo] = useState()
    const [plan, setPlan] = useState()
    const [modplan, setModPlan] = useState(false)
    const [stateTheme,setStateTheme] = useState(false)
    const [stateMod,setStateMod] = useState(false)
    const [theme, setTheme] = useState()
    const [mod, setMod] = useState()
    const [addCidade, setAddCidade] = useState(false)
    const [addBairro, setAddBairro] = useState(false)
    

   const Edit = (tema) => {
        setStateTheme(!stateTheme)
        setStateMod(!stateMod)
        setTheme(tema)
    }
    
    const obj = {
        nome,
    razao,
    phone, 
    token,
    plan,
    mod,
    theme,
    site,
    logo, 
    ação:ação
    }


    const listCidades = []
    const listBairros = []

    Users && Users.map(dados => {
        if (dados.iduser == user.id) {
            dados.cidades.map(item => {
                listCidades.push({cidade: item.cidade})
            })
            dados.bairros.map(item => {
                listBairros.push({bairro: item.bairro})
            })
        }
    })
    console.log(listBairros)
    const salvarLocal = async () => {
        listCidades.push({cidade: novaCidade})
        listBairros.push({bairro: novoBairro})

        if (novaCidade) {
            await updateDoc(doc(db, `MeiComSite`, user.email), {
                cidades: listCidades
            });
        }
        if (novoBairro) {
            await updateDoc(doc(db, `MeiComSite`, user.email), {
                bairros: listBairros
            });
        }
        
        window.location.reload()
    }

            
    



    return (
        <>
        {!load ? <Loading/> : 
        
        user &&
        Users && Users.map(dados => {
            if (dados.iduser == user.id) {
                return (
                    <>
                        <div className={styles.container} key={dados.id}>
                            <h4>Dados Pessoais Edit</h4>
                            <form className={`row ${styles.form}`}>
                                <div className={`row ${styles.dados}`}>
                                    <div className="col-lg-6">
                                        <label>Nome Completo *</label>
                                        <input type="text"
                                        onChange={(el)=> {
                                            setNome(el.target.value)
                                        }}
                                        defaultValue={dados.nome}/>
                                        <label>Razão Social *</label>
                                        <input type="text"
                                        onChange={(el)=> {
                                            setRazao(el.target.value)
                                        }}
                                        defaultValue={dados.razao}/>
                                        <label>Site *</label>
                                        <strong>meicomsite.netlify.app/{!site ? dados.site: site}</strong>
                                        <input type="text"
                                        onChange={(el)=> {
                                            setSite(el.target.value)
                                        }}
                                        defaultValue={dados.site}/>
                                        <label>Logo *</label>
                                        <input type="text"
                                        onChange={(el)=> {
                                            setLogo(el.target.value)
                                        }}
                                        defaultValue={dados.logo}/>
                                        <label>Telefone *</label>
                                        <input type="phone"
                                        onChange={(el)=> {
                                            setPhone(el.target.value)
                                        }}
                                        defaultValue={dados.telefone}/>
                                        {dados.plan != "Basic" &&
                                            <div>
                                                <label>Token Mercado Pago *</label>
                                                <input type="text"
                                                onChange={(el)=> {
                                                    setToken(el.target.value)
                                                }}
                                                defaultValue={dados.token}/>
                                            </div>
                                        
                                        }
                                        
                                <div className={styles.cont_plan}>
                                        <label>Plano:</label>
                                        {!modplan ? 
                                        <strong>{dados.plan}</strong>:
                                        
                                        <select defaultValue={dados.plan}
                                        onChange={(el)=> setPlan(el.target.value)}
                                        >
                                            <option>Basic</option>
                                            <option>Plus</option>
                                            <option>Premium</option>
                                        </select>

                                        }

                                        <button className="button_link"
                                        onClick={(el)=> {
                                            el.preventDefault()
                                            setModPlan(!modplan)
                                        }}
                                        >
                                            alterar
                                        </button>
                                    </div>
                                
                                    </div>
                                    <div className="col-lg-6">
                                        <label className={styles.title_small}>Áreas Atendidas</label>
                                        <div className={styles.cont_dashed_no_padding}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Cidades</label>
                                                    {addCidade && 
                                                    <div>
                                                        <input type="text" 
                                                        onChange={(el)=> setNovaCidade(el.target.value)}
                                                        />
                                                        <button
                                                        className={styles.btn_save}
                                                        onClick={(e)=> {
                                                            e.preventDefault()
                                                            salvarLocal()
                                                        }}
                                                        >salvar</button>
                                                    </div>
                                                    }
                                                    <button
                                                    className={styles.btn_add_cidade}
                                                    onClick={(e)=> {
                                                        e.preventDefault()
                                                        setAddCidade(!addCidade)
                                                    }}
                                                    >{!addCidade ? "Adicionar": "Cancelar"}</button>
                                                </div>
                                                <div className="col-md-6">
                                                    <select>
                                                        {dados.cidades && dados.cidades.map(item => {
                                                            return (
                                                                <option value={item.cidade}>{item.cidade}</option>
                                                                )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Bairros</label>
                                                    {addBairro && 
                                                    <div>
                                                        <input type="text" 
                                                        onChange={(el)=> setNovoBairro(el.target.value)}
                                                        />
                                                        <button
                                                        className={styles.btn_save}
                                                        onClick={(e)=> {
                                                            e.preventDefault()
                                                            salvarLocal()
                                                        }}
                                                        >salvar</button>
                                                    </div>
                                                    }
                                                    <button
                                                    className={styles.btn_add_cidade}
                                                    onClick={(e)=> {
                                                        e.preventDefault()
                                                        setAddBairro(!addBairro)
                                                    }}
                                                    >{!addBairro ? "Adicionar": "Cancelar"}</button>
                                                </div>
                                                <div className="col-md-6">
                                                    <select>
                                                        {dados.bairros && dados.bairros.map(item => {
                                                            return (
                                                                <option value={item.bairro}>{item.bairro}</option>
                                                                )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.status}>
                                        <p>status : <strong>{dados.status}</strong></p>
                                    </div>
                                    <div className={styles.cont_save}>
                                        {nome || phone || razao || token  || plan || site || logo ?
                                            <button
                                            type="button" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#ModalAdd"
                                            onClick={(el)=> {
                                                el.preventDefault()
                                                setAção("Editar")
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
                            </form>    
                        </div>
                        <div className={styles.container}>
            <h4>Seu negócio</h4>
                    <div className={`col-sm-12`}>
                        <div className={styles.cont_dashed}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className={styles.cont_theme}>
                                        <label>Modalidade</label>
                                        <strong>{dados.mod}</strong>
                                    </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={styles.cont_theme}>
                                            <label>Tema:</label>
                                            {!stateTheme ? 
                                                <div className={styles.flex}>
                                                    <strong>{dados.theme}</strong>
                                                </div>
                                            
                                            :
                                            <strong>{theme}</strong>
                                        }
                                        <button
                                        onClick={(el)=>
                                        {
                                            el.preventDefault()
                                            Edit(dados.theme)
                                        }
                                        }
                                        className={styles.btn_theme}
                                        >alterar</button>
                                            
                                        </div>
                                    </div>
                                </div>
                                {stateTheme && <div className={styles.container_themes}>
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
                                  }}
                                >
                                    {Themes.map(item => {
                                        if (!mod || mod == "null" ? item.modalidade : mod ) {
                                            return (
                                                <SwiperSlide key={item.id} className={styles.item}
                                                onClick={(el)=> {
                                                    el.preventDefault()
                                                    setTheme(item.name)
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
                                <div className={styles.cont_btn_save}>
                                    <button
                                    onClick={(el)=> {
                                    el.preventDefault()
                                    Edit()
                                    }}
                                    >cancelar</button>
                                    
                                    <button
                                    onClick={(el)=> {
                                        setAção("Editar negocio")
                                        el.preventDefault()
                                        }}
                                        type="button" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#ModalAdd"
                                    >salvar</button>
                                </div>
                            </div>
                            }
                        </div>
                        </div>
                    </div>
                </>
                )
            }
        })        }
         



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