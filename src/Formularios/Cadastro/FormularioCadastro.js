import InfoNegocio from "./InfoNegocio"
import styles from "./FormularioCadastro.module.css"
import { useState } from "react"

export default function FormularioCadastro () {

    const [alt, setAlt] = useState(false)


    return (
        <>
            <div className={styles.container}>
                <h4>Dados Pessoais</h4>
                <form className={`row ${styles.form}`}>
                    <div className={`row ${styles.dados}`}>
                        <div className="col-sm-6">
                            <label>Nome Completo *</label>
                            <input type="text"
                            onChange={(el)=> setAlt(el.target.value)}
                            />
                            <label>Razão Social *</label>
                            <input type="text"
                            onChange={(el)=> setAlt(el.target.value)}
                            />
                            <label>Telefone *</label>
                            <input type="phone"
                            onChange={(el)=> setAlt(el.target.value)}
                            />
                            <label>Token Mercado Pago *</label>
                            <input type="text"
                            onChange={(el)=> setAlt(el.target.value)}
                            />
                            
                        </div>
                        <div className="col-sm-6">
                            <label className={styles.title_small}>Endereço</label>
                            <div className={styles.cont_dashed_no_padding}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Rua *</label>
                                        <input type="text"
                                        onChange={(el)=> setAlt(el.target.value)}
                                        />
                                        <label>Bairro *</label>
                                        <input type="text"
                                        onChange={(el)=> setAlt(el.target.value)}
                                        />
                                        <label>P.de Referência</label>
                                        <input type="text"
                                        onChange={(el)=> setAlt(el.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Cidade *</label>
                                        <input type="text"
                                        onChange={(el)=> setAlt(el.target.value)}
                                        />
                                        <label>Número *</label>
                                        <input type="number"
                                        onChange={(el)=> setAlt(el.target.value)}
                                        />
                                        <label>CEP *</label>
                                        <input type="number"
                                        onChange={(el)=> {
                                            setAlt(el.target.value)
                                        }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cont_save}>
                            {alt && 
                            <button>
                                salvar
                            </button>
                            }
                        </div>
                    </div>
                    <InfoNegocio/>
                </form>    
            </div>
        </>)
}