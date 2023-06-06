import { useState } from "react"
import styles from "./FormEdit.module.css"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { doc, updateDoc, getFirestore} from "@firebase/firestore";
import { FaPlusCircle, FaRegSave, FaTimesCircle, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Visualizar from "./Visualizar";

export default function FormEdit (props) {

    const obj = props.dados && props.dados
    const id = props.id && props.id

    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()
    const [img4, setImg4] = useState()
    const [nome, setNome] = useState()
    const [small_desc, setSmallDesc] = useState()
    const [desc, setDesc] = useState()
    const [preço, setPreço] = useState()
    const [material, setMaterial] = useState()



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

        
        {/*await updateDoc(doc(db, `MeiComSite/${id && id}/produtos/${obj.categoria}`, obj.id), {
            nome: !nome ? obj.nome : nome
        });*/}
        obj.dados['nome'] = "ii"
        console.log(obj.dados)
        
        

    }

    


    return (
            <>
            <div className={styles.container}>
                <h1>{obj && obj.dados && obj.dados.nome}</h1>
                <div className="row">
                    <div className="col-md-7">
                        <div className={styles.cont_left}>
                                    
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className={styles.cont_right}>
                            <div className="row">
                                <div className="col-md-6">
                                    <p
                                    className={styles.label}
                                    >Imagem:</p>
                                    <input 
                                    type="text" 
                                    className={styles.input}
                                    onChange={(el) => setImg1(el.target.value)}
                                    defaultValue={obj && obj.dados && obj.dados.img}
                                    />
                                    <p
                                    className={styles.label}
                                    >Nome:</p>
                                    <input 
                                    type="text" 
                                    className={styles.input}
                                    onChange={(el) => setNome(el.target.value)}
                                    defaultValue={obj && obj.dados && obj.dados.nome}
                                    />
                                    <p
                                    className={styles.label}
                                    >Descrição Curta:</p>
                                    <input 
                                    type="text" 
                                    className={styles.input}
                                    onChange={(el) => setSmallDesc(el.target.value)}
                                    defaultValue={obj && obj.dados && obj.dados.small_desc}
                                    />

                                    <p
                                    className={styles.label}
                                    >Descrição:</p>
                                    <textarea 
                                    type="text" 
                                    className={styles.input}
                                    onChange={(el) => setDesc(el.target.value)}
                                    defaultValue={obj && obj.dados && obj.dados.desc}
                                    />


                                    <p
                                    className={styles.label}
                                    >Preço:</p>
                                    <input 
                                    type="number" 
                                    onChange={(el) => setPreço(el.target.value)}
                                    className={styles.input}
                                    defaultValue={obj && obj.dados && obj.dados.preço}
                                    />

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
                                <div className="col-sm-6">
                                    <p
                                    className={styles.label}
                                    >Material:</p>
                                    <input 
                                    type="text" 
                                    className={styles.input}
                                    onChange={(el) => setMaterial(el.target.value)}
                                    defaultValue={obj && obj.dados && obj.dados.material}
                                    />
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