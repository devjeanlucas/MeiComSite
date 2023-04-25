import { useEffect, useState } from "react"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import styles from "./Exposed.module.css"
import { Link } from "react-router-dom";

export default function Exposed (props) {
   
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const [lojas, setLojas] = useState([])

    useEffect (() => {
        const getLojas = async () => {
            const data = await getDocs(UserCollection)
            setLojas((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        }
        getLojas()
    },[])

    return (
            <>
                <ul className={styles.list}>
                    {lojas && lojas.map(dados => {
                        if (dados.status == "pronto") {
                            if (props.modalidade == "alimentação") {
                                if (dados.mod == "Restaurante") {
                                    return (
                                            <li key={dados.id}>
                                                <div>
                                                    <h5>{dados.razao}</h5>
                                                    <Link to={`/${dados.site}`}
                                                    className={styles.link}
                                                    >meicomsite.netlify.com/{dados.site}</Link>
                                                </div>
                                            </li>
                                        )
                                }
                            }
                            if (props.modalidade == "shopping") {
                                if (dados.mod == "Loja Virtual") {
                                    return (
                                        <li key={dados.id}>
                                            <div>
                                                <h5>{dados.razao}</h5>
                                                <Link to={`/${dados.site}`}
                                                className={styles.link}
                                                >meicomsite.netlify.com/{dados.site}</Link>
                                            </div>
                                        </li>
                                    )
                                }
                            }
                        }
                    })}
                </ul>
            </>
        )
}