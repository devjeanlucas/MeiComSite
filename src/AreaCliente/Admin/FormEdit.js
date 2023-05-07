import { useState } from "react"
import styles from "./FormEdit.module.css"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { doc, updateDoc, getFirestore} from "@firebase/firestore";
import { FaPlusCircle, FaRegSave, FaTimesCircle, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function FormEdit (props) {

    const obj = props.dados && props.dados
    const id = props.id && props.id

    const [nome, setNome] = useState()
    const [desc, setDesc] = useState()
    const [preço, setPreço] = useState()
    const [categoria, setCategoria] = useState()
    var [ação, setAção] = useState()
    const [addsabor, setAddSabor] = useState(false)
    const [sabor, setSabor] = useState()
    const [escolhaSabor, setEscolhaSabor] = useState()
    const [ingredientes, setIngredientes] = useState()
    const db = getFirestore(App)


    var saborPizza = {sabor, ingredientes}

    async function UpdateSabores (ação) {
        if (ação == "Excluir") {
            let index = obj.listaSabores.findIndex(prop => prop.sabor == escolhaSabor)
            obj.listaSabores.splice(index,1)
            await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.id), {
                listaSabores: obj.listaSabores
            });
            window.location.reload()
            return
        }
        if (ação == "add") {
            let index = obj.listaSabores.findIndex(prop => prop.sabor == sabor)
            
            if (index < 0) {
                obj.listaSabores.push(saborPizza)
                await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.id), {
                    listaSabores: obj.listaSabores
                });
                window.location.reload()
                return
            } else {
                toast.error('Sabor já existe')
                return
            }
            
        }
    }


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

                                    {obj && obj.listaSabores &&
                                        <div>
                                            <p
                                            className={styles.label}
                                            >Sabores:</p>
                                                {!addsabor ?
                                                    <div>
                                                        <div className={styles.listaSabores}>
                                                            <select
                                                            onChange={(el) => setEscolhaSabor(el.target.value)}
                                                            className={styles.select}
                                                            >
                                                                {obj.listaSabores.map(dados => {
                                                                    return (
                                                                        <option
                                                                        value={dados.sabor}
                                                                        key={dados.sabor}                             >{dados.sabor}
                                                                        </option>
                                                                        )
                                                                })}
                                                            </select>
                                                            {escolhaSabor &&
                                                            <FaTrash
                                                            type="button"
                                                            onClick={()=> {
                                                                UpdateSabores("Excluir")
                                                            }}
                                                            />
                                                            
                                                            }
                                                        </div>
                                                        <FaPlusCircle
                                                        type="button"
                                                        className={styles.icon_plus}
                                                        onClick={()=> {
                                                        setAddSabor(!addsabor)
                                                        }}
                                                        />
                                                    </div>
                                                    :
                                                    <div>
                                                        <div className={styles.listaSabores}>
                                                            <input type="text" className={styles.select}
                                                            onChange={(el)=> setSabor(el.target.value)}
                                                            placeholder="Sabor"
                                                            />
                                                            <input type="text" className={styles.select}
                                                            onChange={(el)=> setIngredientes(el.target.value)}
                                                            placeholder="Ingredientes"
                                                            />
                                                            <FaRegSave
                                                            type="button"
                                                            onClick={()=> {
                                                                UpdateSabores("add")
                                                            }}
                                                            />
                                                        </div>
                                                        <FaTimesCircle
                                                        type="button"
                                                        className={styles.icon_plus}
                                                        onClick={()=> {
                                                        setAddSabor(!addsabor)
                                                        }}
                                                        />
                                                    </div>
                                                }
                                        </div>
                                    }

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
            <ToastContainer/>
            </>
        )
}