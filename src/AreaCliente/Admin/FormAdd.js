import { useState } from "react";
import styles from "./FormAdd.module.css"
import '@firebase/firestore';
import {  getFirestore, doc,  collection, getDocs, setDoc} from "@firebase/firestore";
import App from "../../Hooks/App"


export default function FormEdit (props) {

    const [nome, setNome]= useState()
    const [imagem, setImagem] = useState()
    const [desc, setDesc] = useState()
    const [qtdpessoas, setQtdPessoas] = useState()
    const [preço, setPreço] = useState()
    const [categoria, setCategoria] = useState()
    const [estoque, setEstoque] = useState()

    const db = getFirestore(App)






    async function addItem () {
        await setDoc(doc(db, `MeiComSite/${props.email}/produtos`, `${props.id}`), {
            img: imagem,
            nome:nome.trim(),
            preço:parseFloat(preço),
            estoque: parseInt(estoque),
            iden: props.id,
            categoria:categoria.trim(),
            desc:desc.trim()
            });
        window.location.reload()
    }

 



    return (
            <>
            <div className={styles.container}>
                <form className={styles.form}>
                    <h1>Adicionando Item</h1>
                    <div className={styles.line}></div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className={styles.view_add}>
                                <div className={styles.visu}>
                                    {imagem || nome || desc || preço ?
                                        <div className="row">
                                            <div className="col-6">
                                                <img src={imagem} className={styles.img}/>
                                            </div>
                                            <div className="col-6">
                                                <p className={styles.nome}>{nome}</p>
                                                <p>{desc}</p>
                                                <p>R${preço}</p>
                                            </div>
                                        </div>
                                        :
                                        <h2>Comece a adicionar seu produto</h2>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                                <div className={styles.info}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <strong>Imagem:</strong>
                                            <input type="text" onChange={(el)=> setImagem(el.target.value)}/>
                                            <strong>Nome:</strong>
                                            <input type="text" onChange={(el)=> setNome(el.target.value)}/>
                                            <strong>Desc:</strong>
                                            <textarea type="text" onChange={(el)=> setDesc(el.target.value)}/>
                                            <strong>Categoria:</strong>
                                            <input type="text" onChange={(el)=> setCategoria(el.target.value)}/>
                                            <strong>Preço:</strong>
                                            <input type="number" onChange={(el)=> setPreço(el.target.value)}/>
                                            <strong>Servem quantas pessoas:</strong>
                                            <input type="number" onChange={(el)=> setQtdPessoas(el.target.value)}/>
                                            <strong>Estoque:</strong>
                                            <input type="number" onChange={(el)=> setEstoque(el.target.value)}/>
                                        </div>
                                        <div className="col-sm-6">
                                            <h4>Adicionais</h4>
                                            <div className={styles.cont_adicionais}>
                                                <input type="checkbox"/>
                                                <strong>+18 anos</strong>
                                            </div>
                                            <div className={styles.cont_adicionais}>
                                                <input type="checkbox"/>
                                                <strong>Cheedar</strong>
                                            </div>
                                            <div className={styles.cont_adicionais}>
                                                <input type="checkbox"/>
                                                <strong>Catupiry</strong>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className={styles.cont_buttons}>
                                    <button
                                    onClick={(el)=> {
                                        el.preventDefault()
                                    }}
                                    type={props.type}
                                    data-bs-dismiss={props.dismiss}
                                    aria-label={props.aria_label}
                                    >Cancelar</button>
                                    {nome && categoria && preço && imagem && desc && estoque && qtdpessoas?
                                        <button
                                        onClick={(el)=> {
                                            el.preventDefault()
                                            addItem()
                                        }}
                                        className={styles.btn_confirm}
                                        >Confirmar</button>
                                        :
                                        <button
                                        onClick={(el)=> {
                                            el.preventDefault()

                                        }}
                                        disabled
                                        >Confirmar</button>
                                    }
                                </div>
                        </div>
                    </div>
                </form>
            </div>
            </>
        )
}