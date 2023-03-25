import {Swiper, SwiperSlide} from "swiper/react"
import styles from "../Cadastro/CadastroNegocio.module.css"
import Themes from "../../Documents/Themes.json"
import { useState } from "react"
import { Link } from "react-router-dom"




export default function EditNegocio () {

    const [stateTheme,setStateTheme] = useState(false)
    const [stateMod,setStateMod] = useState(false)
    const [theme, setTheme] = useState()
    const [mod, setMod] = useState()
    

   const Edit = () => {
        setStateTheme(!stateTheme)
        setStateMod(!stateMod)
    }
    


    return (
        <div className={styles.container}>
            <h4>Seu negócio</h4>
                    <div className={`col-sm-12`}>
                        <div className={styles.cont_dashed}>
                            <div className="row">
                                <div className="col-sm-12">
                                <div className={styles.cont_plan}>
                                    <label>Plano:</label>
                                    <strong>Basic</strong>
                                    <Link 
                                    className={styles.btn_theme}
                                    to="/planos"
                                    >
                                        Upgrade
                                    </Link>
                                </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.cont_theme}>
                                        <label>Modalidade</label>
                                        {stateMod && 
                                            <select id="modalidade" defaultValue="Loja Virtual"
                                            onChange={(el)=> setMod(el.target.value)}
                                             >
                                                <option defaultChecked>Loja Virtual</option>
                                                <option>Restaurante</option>
                                                <option>Agendamento</option>
                                            </select>
                                        }
                                        {!stateMod && <strong>Loja Virtual</strong>}
                                    </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={styles.cont_theme}>
                                            <label>Tema:</label>
                                            {!stateTheme ? <strong>Dark</strong>:
                                            <strong>{theme}</strong>
                                            }

                                            {!stateTheme &&
                                                <button
                                                onClick={(el)=> 
                                                {
                                                    el.preventDefault()
                                                    Edit()
                                                }
                                                }
                                                className={styles.btn_theme}
                                                >alterar</button>
                                            }
                                            
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
                                        if (!mod || mod == "null" ? "Loja Virtual" : mod == item.modalidade) {
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
                                        el.preventDefault()
                                        }}
                                    >salvar</button>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
        </div>
        )

}