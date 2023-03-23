import {Swiper, SwiperSlide} from "swiper/react"
import styles from "./FormularioCadastro.module.css"
import Themes from "../../Documents/Themes.json"
import { useState } from "react"


export default function FormularioCadastro () {

    const [stateTheme,setStateTheme] = useState(false)
    const [stateMod,setStateMod] = useState(false)
    const [theme, setTheme] = useState('')

    const setTemplate =()=> {
        setStateTheme(!stateTheme)
    }
    const setMod = () => {
        setStateMod(!stateMod)
    }
    
    const mod = document.querySelector('#modalidade')

    return (
        <>
            <div className={styles.container}>
                <h4>Dados Pessoais</h4>
                <form className={`row ${styles.form}`}>
                    <div className="col-sm-6">
                        <label>Nome Completo *</label>
                        <input type="text"/>
                        <label>Razão Social *</label>
                        <input type="text"/>
                        <label>Token Mercado Pago *</label>
                        <input type="text"/>
                    </div>
                    <div className="col-sm-6">
                        <label className={styles.title_small}>Endereço</label>
                        <div className={styles.cont_dashed_no_padding}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Rua *</label>
                                    <input type="text"/>
                                    <label>Bairro *</label>
                                    <input type="text"/>
                                    <label>P.de Referência</label>
                                    <input type="text"/>
                                </div>
                                <div className="col-sm-6">
                                    <label>Cidade *</label>
                                    <input type="text"/>
                                    <label>Número *</label>
                                    <input type="number"/>
                                    <label>CEP *</label>
                                    <input type="number"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4>Seu negócio</h4>
                    <div className={`col-sm-12`}>
                        <div className={styles.cont_dashed}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className={styles.cont_theme}>
                                        <label>Modalidade</label>
                                        {stateMod && 
                                            <select id="modalidade" defaultValue="Loja Virtual">
                                                <option defaultChecked>Loja Virtual</option>
                                                <option>Restaurante</option>
                                                <option>Agendamento</option>
                                            </select>
                                        }
                                        {!stateMod && <strong>Loja Virtual</strong>}
                                        
                                        <button className={styles.btn_theme}
                                            onClick={(el)=> {
                                                el.preventDefault()
                                                setMod()
                                            }}
                                        >
                                            Alterar
                                        </button>
                                    </div>

                                </div>
                                <div className="col-sm-6">
                                    <div className={styles.cont_theme}>
                                        <label>Tema:</label>
                                        {!stateTheme ? <strong>Dark</strong>:
                                        <strong>{theme}</strong>
                                        }
                                        

                                        <button className={styles.btn_theme}
                                        onClick={(el)=> {
                                            el.preventDefault()
                                            setTemplate()
                                        }
                                        }
                                        >Alterar Tema</button>
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
                                        if (!mod || mod == "null" ? "Loja Virtual" : mod.value == item.modalidade) {
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
                                <button>Salvar</button>
                            </div>
                            </div>}
                            
                        </div>
                    </div>
                </form>    
            </div>
        </>)
}