import { Link } from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import Loading from "../../../components/Loading"
import {FaWineGlassAlt} from "react-icons/fa"
import styles from "./Categorias.module.css"
import { useState } from "react"
import App from "../../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";

export default function Categories (props) {

    const db = getFirestore(App)
    const ProdutosCollection = props.cliente && collection(db, `MeiComSite/${props.cliente.email}/produtos`)
    const [produtos, setProdutos] = useState([])
    const [state, setState] = useState(false)
    const [busca, setBusca] = useState()

    const getProdutos = async () => {
        const data = await getDocs(ProdutosCollection)
        setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
    }

    if (ProdutosCollection) {
        if (!state) {
            getProdutos()
            setState(true)
        }
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
                {props.cliente && props.cliente.theme == "Light" && 
                    <div className={styles[props.cliente && props.cliente.theme]}>
                        
                    </div>
                }

            </>
        )
}