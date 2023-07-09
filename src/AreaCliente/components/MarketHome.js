import styles from "./MarketHome.module.css"
import { Link, useOutletContext, useParams } from "react-router-dom";
import NavShop from "./NavShop"
import Loading from "../../components/Loading"
import { useState } from "react"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { FaShoppingBag } from "react-icons/fa";
import { Helmet } from "react-helmet";

import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/navigation';
import LinkMeiComSite from "./LinkMeiComSite";



export default function MarketHome () {
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const [produtos, setProdutos] = useState([])
    const [users, setUsers] = useState([])
    const [state, setState] = useState("start")
    const [primeira_categoria, setPrimeira_categoria] = useState()
    const [segunda_categoria, setSegunda_categoria] = useState()
    const [load, setLoading] = useState(false)
    const {site} = useParams()
    
    const getProdutos = async () => {
        const ProdutosCollection = usuario && collection(db, `MeiComSite/${usuario[0].email}/produtos`)
        const data = await getDocs(ProdutosCollection)
        setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setState("fim")
        setLoading(true)
    }

    const getCliente = async () => {
        const data = await getDocs(UserCollection)
        setUsers((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setState("produto")
    }

    const usuario = users && users.filter(dados => {
        if (dados.site == site) {
            return dados
        }
    })

    if (usuario) {
        if (state == "produto") {
            getProdutos()
        }
    }

    if (state == "start") {
        getCliente()
    }
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    

    const reduced = [] 
    
    produtos && produtos.forEach((item) => {
        var duplicated  = reduced.findIndex(redItem => {
            return item.categoria == redItem.categoria;
        }) > -1;
    
        if(!duplicated) {
            reduced.push(item);
        }
    });




    
    return (
        <>
                <>
                {usuario.length > 0 && usuario[0].theme == "Dark" &&
                <>
                {!load && <Loading/>}
                <div className={`${styles.container} row ${styles[usuario && usuario[0].theme]}`}>
                    <div className="col-md-12">
                        <div className={styles.list}>
                        <Swiper
                        spaceBetween={10}
                        className={styles.cont_slides_destaque}
                        slidesPerView={1}
                        loop={true}
                        pagination={true}
                        >
                        {produtos && produtos.map(dados => {
                            if (dados.destaque) {
                                return (
                                        <SwiperSlide key={dados.id} className={`${styles.li}`}>
                                            <div className="row">
                                                <div className="col-6 col-sm-5 col-md-6 col-lg-8">
                                                    <div className={styles.cont_text_destaque}>
                                                        <div>
                                                            <h1 className={styles.text_destaque}>{dados.text}</h1>
                                                            <Link
                                                            to={`/${site}/${dados.categoria}`}
                                                            className={styles.link_destaque}>
                                                            Confira</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-7 col-md-6 col-lg-4">
                                                    <div className={styles.cont_img_destaque}><img src={dados.img} className={styles.img_destaque}/></div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                            }
                                
                            })
                            }
                        </Swiper>
                        <h2 className={styles.text_align_center}>Categorias</h2>
                        <Swiper
                        spaceBetween={1}
                        breakpoints={{
                            320: {
                                width: 320,
                                slidesPerView: 2,
                            },
                            576: {
                                width: 576,
                                slidesPerView: 3,
                            },
                        }}
                        >
                            {produtos && produtos.map(dados => {
                                return (
                                        <SwiperSlide key={dados.id} className={`${styles.li}`}>
                                            <Link to={`/${site}/${dados.categoria}`} className={styles.link_categorias}>
                                                <div className={styles.cont_categorias}>
                                                    <img src={dados.img} className={styles.img_categoria}/>
                                                    <p className={styles.text_categoria}>{dados.categoria}</p>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                
                            })
                            }

                        </Swiper>

                            <div className={styles.cont_prod}>
                                    {produtos && produtos.map(dados => {
                                    if (dados.mostrar) {
                                        if (dados.produtos && dados.produtos.length > 0) {
                                            return (
                                                <>
                                                    
                                                    <h5 key={dados.categoria} className={styles.title_categoria}>{dados.categoria}</h5>

                                                    <Swiper
                                                    spaceBetween={25}
                                                    loop={true}
                                                    pagination={true}
                                                    breakpoints={{
                                                        320: {
                                                            width: 320,
                                                            slidesPerView: 2,
                                                        },
                                                        576: {
                                                            width: 576,
                                                            slidesPerView: 1,
                                                        },
                                                    }}
                                                    >
                                                        {dados.produtos.map(item => {
                                                            return (
                                                                <SwiperSlide key={dados.nome}>
                                                                    <div>
                                                                        <Link
                                                                        to={`/${site}/${dados.categoria}/${item.nome.toLowerCase().replaceAll(' ','')}`}
                                                                        >
                                                                        <img src={item.img} className={styles.img_examples}/>
                                                                        </Link>
                                                                        <div className={styles.info_produto}>
                                                                            <p className={styles.text_info}>{item.nome}</p>
                                                                            <p className={styles.text_info}>{FormataValor(item.preço)}</p>
                                                                        </div>
                                                                    </div>
                                                                </SwiperSlide>
                                                                )
                                                        })}
                                                    </Swiper>
                                                    
                                                        
                                                </>
                                                )
                                        }
                                    }    
                                    })
                                    }
                            </div>
                        </div>
                        </div>
                </div>
                
                </>
            }










            
            {usuario.length > 0 && usuario[0].theme == "Light" && 
                    <div className={`${styles.container} row ${styles[usuario && usuario[0].theme]}`}>
                        <div className="col-lg-3">
                            <NavShop/>
                        </div>
                        <div className="col-lg-9">
                        <ul className={`row ${styles.list}`}>
                                {produtos && produtos.map(dados=> {
                                    if (dados.status != "inerit") {
                                        return (
                                                <li key={dados.id} className="col-lg-4 col-md-6">
                                                    <div className={styles.item}>
                                                        <div className="row">
                                                            <div className={`col-4 col-lg-12 ${styles.no_padding_no_margin}`}>
                                                                <div className={styles.cont_img}><img src={dados.img} className={styles.img}/></div>
                                                            </div>
                                                            <div className={`col-8 col-lg-12 ${styles.no_padding_no_margin}`}>
                                                                <div className={styles.cont_text}>
                                                                    <h4 className={styles.nome_prod}>{dados.nome}</h4>
                                                                    <p className={styles.desc_prod}>{dados.desc}</p>
                                                                    <p className={styles.preço_prod}>{FormataValor(dados.preço)}</p>
                                                                    <div className={styles.cont_buttons}>
                                                                        <Link
                                                                        to={`/${site}/produto/${dados.nome.replaceAll(' ', '').toLowerCase()}`}
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
                    </div>
                }
                
                
                </>
            
                <Helmet>
                    <title>{usuario.length > 0 && usuario[0].razao}</title>
                    <link rel="icon" type="image/url" href={usuario.length > 0 && usuario[0].logo} sizes="16x16" />
                </Helmet>
                <LinkMeiComSite/>
        </>
        )
}