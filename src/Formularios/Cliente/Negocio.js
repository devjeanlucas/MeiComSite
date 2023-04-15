import styles from "./Negocio.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import Themes from "../../Documents/Themes.json"
import {Swiper, SwiperSlide} from "swiper/react"
import Loading from "../../components/Loading"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs,updateDoc, doc} from "@firebase/firestore";
import { Link } from "react-router-dom"



export default function Negocio () {

    const [load, setLoading] = useState(false)
    const [user, setUser] = useState();
    const [alt, setAlt] = useState (false)
    const [imgalt, setImgAlt] = useState()
    const [frasealt, setFraseAlt] = useState()
    const [Users, setUsers] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, "MeiComSite")

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

    const AlteraHome = async () => {
        const prod = []

        Users && user && Users.map(item=> {
            if (item.id ==  user.email) {
                prod.push(item)
            }
        }) 

        await updateDoc(doc(db, "MeiComSite", user && user.email), {
            imgprincipal: !imgalt ? prod[0].imgprincipal : imgalt
        });
        await updateDoc(doc(db, "MeiComSite", user && user.email), {
            fraseprincipal: !frasealt ? prod[0].fraseprincipal : frasealt
        });
        window.location.reload()
    }


    
    return (
            <>
                {Users && user && Users.map(dados => {
                    if (dados.iduser == user.id) {
                        return (
                                <div className={styles.container}>
                                    <h2 className={styles.razao}>{dados.razao}</h2>

                                    <div className="row">
                                        <div className="col-sm-6 order-2">
                                            <div className={styles.cont_info}>
                                                <h3>Informações</h3>
                                                <div className={styles.line}></div>
                                                <p>Plano: <strong>{dados.plan}</strong></p>
                                                <p>Membro desde: <strong>{dados.data}</strong></p>
                                                <p>Modalidade: <strong>{dados.mod}</strong></p>
                                                <p>Tema: <strong>{dados.theme}</strong></p>
                                                <p>Funcionamento: 
                                                    <strong> {dados.abre}:00h </strong> às  
                                                    <strong> {dados.fecha}:00h </strong>
                                                </p>
                                                <p>Token: <strong>{dados.token}</strong></p>
                                                <p>Site: {dados.status == "pronto" ? 
                                                <Link to={`/${dados.site}`} className={styles.link}
                                                target="_blank"
                                                >https://meicomsite.netlify.app/{dados.site}</Link>:
                                                <strong className={styles.link}>{dados.status}</strong>
                                                }
                                                
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 order-1">
                                            <div className={styles.cont_theme}>
                                                {Themes.map(item => {
                                                    if (item.id == dados.idtheme) {
                                                        return (
                                                            <div className={styles.cont_img}>
                                                                <img src={item.img} className={styles.img}/>
                                                                <div className={styles.line}/>
                                                                {alt ?
                                                                <div className={styles.cont_button}>
                                                                    <button
                                                                    onClick={()=> {
                                                                        setAlt(!alt)
                                                                    }}
                                                                    >cancelar</button>
                                                                    <button
                                                                    onClick={() => AlteraHome()}
                                                                    >salvar</button>
                                                                </div>
                                                                :
                                                                <div className={styles.cont_button}>
                                                                    <button
                                                                    onClick={()=> {
                                                                        setAlt(!alt)
                                                                    }}
                                                                    >alterar</button>
                                                                </div>
                                                                }
                                                                {alt ?
                                                                <div>
                                                                <p>Texto Principal: </p>
                                                                <textarea type="text"
                                                                defaultValue={dados.fraseprincipal}
                                                                onChange={(el)=> setFraseAlt(el.target.value)}
                                                                />
                                                                <p>Imagem Principal:</p>
                                                                <input type="text"
                                                                onChange={(el)=> setImgAlt(el.target.value)}
                                                                defaultValue={dados.imgprincipal}
                                                                />
                                                                <img src={!imgalt && dados.imgprincipal} className={styles.img_small}/>
                                                            </div>
                                                                :
                                                                <div>
                                                                    <p>Texto Principal: " <span className={styles.dash_text}>{dados.fraseprincipal}</span> "</p>
                                                                    <p>Imagem Principal:
                                                                        <img src={dados.imgprincipal} alt="" className={styles.img_small}/>
                                                                    </p>
                                                                </div>
                                                                }
                                                            </div>
                                                            )
                                                        }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                })}
                {!load && 
                <Loading/>}
            </>
        )
}