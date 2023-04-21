import { Link, useParams } from "react-router-dom";
import styles from "./Categorias.module.css"
import {FaShoppingBag} from "react-icons/fa"

export default function Categorias (props) {

    
    
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    const {site} = useParams()

    return (
            <>
            {props.busca ? props.theme && props.theme == "Light" &&
                <div className={styles[props.theme && props.theme]}>
                    <ul className={`row ${styles.list}`}>
                        {props.lista && props.busca && props.lista.map(dados=> {
                            if (dados.status != "inerit") {
                                if (props.busca == dados.categoria) {
                                    return (
                                            <li key={dados.id} className="col-lg-4 col-md-6">
                                                <div className={styles.item}>
                                                    <div className="row">
                                                        <div className={`col-sm-6 col-lg-12 ${styles.no_padding_no_margin}`}>
                                                            <img src={dados.img} className={styles.img}/>
                                                        </div>
                                                        <div className={`col-sm-6 col-lg-12 ${styles.no_padding_no_margin}`}>
                                                            <div className={styles.cont_text}>
                                                                <h4 className={styles.nome_prod}>{dados.nome}</h4>
                                                                <p className={styles.desc_prod}>{dados.desc}</p>
                                                                <p className={styles.preço_prod}>{FormataValor(dados.preço)}</p>
                                                                <div className={styles.cont_buttons}>
                                                                    <Link

                                                                    >Comprar</Link>
                                                                    <button><FaShoppingBag/></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                }
                            }
                        })}
                    </ul>
                </div>
            :
            <div className={styles[props.theme && props.theme]}>
                <ul className={`row ${styles.list}`}>
                    {props.lista && props.lista.map(dados=> {
                        if (dados.status != "inerit") {
                            return (
                                    <li key={dados.id} className="col-12 col-md-6 col-lg-4">
                                        <div className={styles.item}>
                                            <div className="row">
                                                <div className={`col-4 col-md-12 ${styles.no_padding_no_margin}`}>
                                                    <img src={dados.img} className={styles.img}/>
                                                </div>
                                                <div className={`col-8 col-md-12 ${styles.no_padding_no_margin}`}>
                                                    <div className={styles.cont_text}>
                                                        <h4 className={styles.nome_prod}>{dados.nome}</h4>
                                                        <p className={styles.desc_prod}>{dados.desc}</p>
                                                        <p className={styles.preço_prod}>{FormataValor(dados.preço)}</p>
                                                        <div className={styles.cont_buttons}>
                                                            <Link
                                                             to={`/${site}/cardapio/${dados.nome.toLowerCase().replaceAll(' ', '')}`}
                                                            >Comprar</Link>
                                                            <button><FaShoppingBag/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            
                        }
                    })}
                </ul>
            </div>
            }
            {props.theme && props.theme == "Dark" &&
            <div className={styles[props.theme && props.theme]}>
                <h1>Olá</h1>
            </div>
            }

            </>
        )
}