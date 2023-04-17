import { useState } from "react"
import styles from "./FormEdit.module.css"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { doc, updateDoc,  deleteDoc, getFirestore, collection, getDocs,setDoc} from "@firebase/firestore";

export default function FormEdit (props) {

    const obj = props.dados && props.dados
    const id = props.id && props.id

    const [nome, setNome] = useState()
    const [desc, setDesc] = useState()
    const [preço, setPreço] = useState()
    const [categoria, setCategoria] = useState()
    const db = getFirestore(App)


    async function Update () {   
        await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.id), {
            nome: !nome ? obj.nome : nome
        });
        await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.id), {
            desc: !desc ? obj.desc : desc
        });
        await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.id), {
            preço: !preço ? obj.preço : preço
        });
        await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.id), {
            categoria: !categoria ? obj.categoria : categoria
        });
        window.location.reload()
    }
    

    return (
            <>
            <div className={styles.container}>
                <h1>{obj && obj.nome}</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className={styles.cont_left}>


                            <img src={obj && obj.img} className={styles.img}/>


                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className={styles.cont_right}>
                            <div className="row">
                                <div className="col-md-6">
                                    <p
                                    className={styles.label}
                                    >Nome:</p>
                                    <input 
                                    type="text" 
                                    className={styles.input}
                                    onChange={(el) => setNome(el.target.value)}
                                    defaultValue={obj && obj.nome}/>


                                    <p
                                    className={styles.label}
                                    >Descrição:</p>
                                    <textarea 
                                    type="text" 
                                    className={styles.input}
                                    onChange={(el) => setDesc(el.target.value)}
                                    defaultValue={obj && obj.desc}/>


                                    <p
                                    className={styles.label}
                                    >Preço:</p>
                                    <input 
                                    type="number" 
                                    onChange={(el) => setPreço(el.target.value)}
                                    className={styles.input}
                                    defaultValue={obj &&  obj.preço.toFixed(2)}/>

                                    <p
                                    className={styles.label}
                                    >Categoria:</p>
                                    <input 
                                    type="text" 
                                    onChange={(el) => setCategoria(el.target.value)}
                                    className={styles.input}
                                    defaultValue={obj &&  obj.categoria}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.cont_buttons}>
                        <button
                        onClick={()=> Update()}
                        >Confirmar</button>
                        <button
                        type={props.type}
                        dismiss={props.dismiss}
                        aria-label={props.aria_label}
                        data-bs-toggle={props.data_bs_toggle}
                        data-bs-target={props.data_bs_target}
                        >Cancelar</button>
                    </div>
                </div>
            </div> 
            </>
        )
}