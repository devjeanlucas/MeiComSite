import { useState } from "react";
import styles from "./FormAdd.module.css"
import '@firebase/firestore';
import {  getFirestore, doc,  collection, getDocs, setDoc} from "@firebase/firestore";
import App from "../../Hooks/App"
import Visualizar from "./Visualizar";


export default function FormEdit (props) {

    const [nome, setNome]= useState()
    const [imagem, setImagem] = useState()
    const [imagem2, setImagem2] = useState()
    const [imagem3, setImagem3] = useState()
    const [imagem4, setImagem4] = useState()
    const [desc, setDesc] = useState()
    const [qtdpessoas, setQtdPessoas] = useState()
    const [preço, setPreço] = useState()
    const [categoria, setCategoria] = useState()
    const [estoque, setEstoque] = useState()
    const [small_desc, setSmallDesc] = useState()
    const [espera, setEspera] = useState()

    
    const [cor, setCor] = useState()
    const [p, setP] = useState()
    const [m, setM] = useState()
    const [g, setG] = useState()
    const [material, setMaterial] = useState()


    const db = getFirestore(App)






    async function addItem () {
        await setDoc(doc(db, `MeiComSite/${props.email}/produtos`, `${props.id}`), {
            img: imagem,
            img2:imagem2 ? imagem2 : '',
            img3:imagem3 ? imagem3 : '',
            img4:imagem4 ? imagem3 : '',
            nome:nome.trim(),
            preço:parseFloat(preço),
            estoque: parseInt(estoque),
            iden: props.id,
            categoria:categoria.trim(),
            desc:desc.trim(),
            small_desc:small_desc.trim(),
            cor,
            p: p ? p : '',
            m:  m ? m : '',
            g:  g ? g : '',
            material
            });
        window.location.reload()
    }

 


    return (
            <>
            {props.modalidade == "Restaurante" &&
                <div className={styles.container}>
                <form className={styles.form}>
                    <h1>Adicionando Item</h1>
                    <div className={styles.line}></div>
                    <div className="row">
                        <div className="col-lg-7">
                            <div className={styles.view_add}>
                                <div className={styles.visu}>
                                    {imagem || nome || desc || preço ?
                                        <Visualizar
                                        tema={props.tema}
                                        nome={nome}
                                        imagem={imagem}
                                        imagem2={imagem2}
                                        imagem3={imagem3}
                                        imagem4={imagem4}
                                        preço={preço}
                                        desc={desc}
                                        small_desc={small_desc}
                                        cor={cor}
                                        p={p}
                                        m={m}
                                        g={g}
                                        serve={qtdpessoas}
                                        espera={espera}
                                        />
                                        :
                                        <h2>Comece a adicionar seu produto</h2>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                                <div className={styles.info}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <strong>Imagem:</strong>
                                            <input type="text" onChange={(el)=> setImagem(el.target.value)}/>
                                            <strong>Nome:</strong>
                                            <input type="text" onChange={(el)=> setNome(el.target.value)}/>
                                            <strong>Descrição Curta:</strong>
                                            <input type="text" onChange={(el)=> setSmallDesc(el.target.value)}/>
                                            <strong>Descrição Longa:</strong>
                                            <textarea type="text" onChange={(el)=> setDesc(el.target.value)}/>
                                            <strong>Categoria:</strong>
                                            <input type="text" onChange={(el)=> setCategoria(el.target.value)}/>
                                            <strong>Preço:</strong>
                                            <input type="number" onChange={(el)=> setPreço(el.target.value)}/>
                                            <strong>Servem quantas pessoas:</strong>
                                            <input type="number" onChange={(el)=> setQtdPessoas(el.target.value)}/>
                                            <strong>Temp. Espera:</strong>
                                            <input type="number" onChange={(el)=> setEspera(el.target.value)}/>
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
            }
            {props.modalidade == "Loja Virtual" &&
                <div className={styles.container}>
                <form className={styles.form}>
                    <h1>Adicionando Item</h1>
                    <div className={styles.line}></div>
                    <div className="row">
                        <div className="col-lg-7">
                            <strong>tema: {props.tema}</strong>
                            <div className={styles.view_add}>
                                <div className={styles.visu}>
                                    {imagem || nome || desc || preço ?
                                        <Visualizar 
                                        tema={props.tema}
                                        nome={nome}
                                        imagem={imagem}
                                        imagem2={imagem2}
                                        imagem3={imagem3}
                                        imagem4={imagem4}
                                        preço={preço}
                                        desc={desc}
                                        small_desc={small_desc}
                                        cor={cor}
                                        p={p}
                                        m={m}
                                        g={g}
                                        />
                                        :
                                        <h2>Comece a adicionar seu produto</h2>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                                <div className={styles.info}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <strong>Imagem:</strong>
                                            <input type="text" onChange={(el)=> setImagem(el.target.value)}/>
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#imagens" aria-expanded="false" aria-controls="collapseOne">
                                                        Imagens
                                                        </button>
                                                    </h2>
                                                    <div id="imagens" className="accordion-collapse collapse">
                                                        <div className="accordion-body">
                                                        <strong>Imagem 2:</strong>
                                                            <input type="text" onChange={(el)=> setImagem2(el.target.value)}/>
                                                            <strong>Imagem 3:</strong>
                                                            <input type="text" onChange={(el)=> setImagem3(el.target.value)}/>
                                                            <strong>Imagem 4:</strong>
                                                            <input type="text" onChange={(el)=> setImagem4(el.target.value)}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <strong>Nome:</strong>
                                            <input type="text" onChange={(el)=> setNome(el.target.value)}/>
                                            <strong>Descrição Curta:</strong>
                                            <input type="text" onChange={(el)=> setSmallDesc(el.target.value)}/>
                                            <strong>Descrição Longa:</strong>
                                            <textarea type="text" onChange={(el)=> setDesc(el.target.value)}/>
                                            <strong>Categoria:</strong>
                                            <input type="text" onChange={(el)=> setCategoria(el.target.value)}/>
                                            <strong>Preço:</strong>
                                            <input type="number" onChange={(el)=> setPreço(el.target.value)}/>




                                            <strong>Cor:</strong>
                                            <input type="color" onChange={(el)=> setCor(el.target.value)}/>
                                            <strong>Tamanhos:</strong>

                                            <div className={styles.cont_tamanhos}>
                                                <strong>P</strong>
                                                <input type="number" onChange={(el)=> setP(el.target.value)}
                                                placeholder="QTD"
                                                />
                                                <strong>M</strong>
                                                <input type="number" onChange={(el)=> setM(el.target.value)}
                                                placeholder="QTD"
                                                />
                                                <strong>G</strong>
                                                <input type="number" onChange={(el)=> setG(el.target.value)}
                                                placeholder="QTD"
                                                />
                                            </div>

                                        </div>

                                        <div className="col-sm-6">
                                            <strong>Material:</strong>
                                            <input type="text" onChange={(el)=> setMaterial(el.target.value)}/>
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

                                    {nome && imagem && small_desc && desc && categoria && preço && cor && material? 
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
            }
            
            </>
        )
}