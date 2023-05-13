import { useEffect, useState } from "react";
import styles from "./FormAdd.module.css"
import '@firebase/firestore';
import {  getFirestore, doc,  setDoc, updateDoc} from "@firebase/firestore";
import App from "../../Hooks/App"
import Visualizar from "./Visualizar";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function FormAdd (props) {

    const [nome, setNome]= useState()
    const [imagem, setImagem] = useState()
    const [qtdSabores, setQtdSabores] = useState()
    const [dados, setDados] = useState([])
    const [desc, setDesc] = useState()
    const [qtdpessoas, setQtdPessoas] = useState()
    const [sabor, setSabor] = useState()
    const [Ingredientes, setIngredientes] = useState()
    const [preço, setPreço] = useState()
    const [categoria, setCategoria] = useState()
    const [estoque, setEstoque] = useState()
    const [small_desc, setSmallDesc] = useState()
    const [espera, setEspera] = useState()
    const [driveimg1, setDriveImg1] = useState(true)
    const [driveimg2, setDriveImg2] = useState(true)
    const [driveimg3, setDriveImg3] = useState(true)
    const [driveimg4, setDriveImg4] = useState(true)

    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()
    const [img4, setImg4] = useState()

    
    const [cor, setCor] = useState()
    const [p, setP] = useState()
    const [m, setM] = useState()
    const [g, setG] = useState()
    const [material, setMaterial] = useState()
    const [saborComida,setSaborComida] = useState([])


    const db = getFirestore(App)

    function reiniciar() {
        localStorage.setItem(`sabores`,JSON.stringify([]))
    }

    useEffect(()=> {
        reiniciar()
    },[])






    async function addItem () {
        if (props.modalidade == "Restaurante") {
            await setDoc(doc(db, `MeiComSite/${props.email}/produtos`, `${props.id}`), {
                img: driveimg1 ? `https://docs.google.com/uc?id=${img1}`: img1,
                img2: img2 ? driveimg2 ? `https://docs.google.com/uc?id=${img2}`: img2 : "",
                img3: img3 ? driveimg3 ? `https://docs.google.com/uc?id=${img3}`: img3 : "",
                img4: img4 ? driveimg4 ? `https://docs.google.com/uc?id=${img4}`: img4 : "",
                nome:nome.trim(),
                preço:parseFloat(preço),
                estoque: parseInt(estoque),
                iden: props.id,
                categoria:categoria.trim(),
                desc:desc.trim(),
                serve: parseInt(qtdpessoas),
                espera: espera,
                qtdSabores: parseInt(qtdSabores) ? qtdSabores.trim() : '',
                listaSabores:saborComida
                });
        }

        if (props.modalidade == "Loja Virtual") {
            if (props.listaProdutos) {
                await updateDoc(doc(db, `MeiComSite/${props.email}/produtos`, `${props.categoria}`), {
                    produtos: [...props.listaProdutos,
    
                    {
                        nome:nome.trim(),
                        preço: parseFloat(preço),
                        img: driveimg1 ? `https://docs.google.com/uc?id=${img1}`: img1,
                        img2: img2 ? driveimg2 ? `https://docs.google.com/uc?id=${img2}`: img2 : "",
                        img3: img3 ? driveimg3 ? `https://docs.google.com/uc?id=${img3}`: img3 : "",
                        img4: img4 ? driveimg4 ? `https://docs.google.com/uc?id=${img4}`: img4 : "", 
                        desc:desc.trim(),
                        small_desc: small_desc.trim(),
                        material: material.trim()
                    }
                    ]
                    });
            } else {
                await setDoc(doc(db, `MeiComSite/${props.email}/produtos`, `${props.categoria}`), {
                    categoria: props.categoria,
                    img:props.img,
                    produtos: [
    
                    {
                        nome:nome.trim(),
                        preço:parseFloat(preço),
                        img: driveimg1 ? `https://docs.google.com/uc?id=${img1}`: img1,
                        img2: img2 ? driveimg2 ? `https://docs.google.com/uc?id=${img2}`: img2 : "",
                        img3: img3 ? driveimg3 ? `https://docs.google.com/uc?id=${img3}`: img3 : "",
                        img4: img4 ? driveimg4 ? `https://docs.google.com/uc?id=${img4}`: img4 : "",
                        desc:desc.trim(),
                        small_desc: small_desc.trim(),
                        material: material.trim()
                    }
                    ]
                    });
            }
        }
        window.location.reload()
    }


    const addSabor = (sabor) => {

        let index = saborComida.findIndex(prop => prop.sabor == sabor)
        
        if (index < 0) {
            setSaborComida([...saborComida, {sabor, Ingredientes}])
            setSabor('')
            setIngredientes('')
            toast.success('Sabor adicionado com sucesso!')
        } else {
            toast.error('Sabor já existe!')
        }
    }
    const retirarSabor = (sabor) => {
        let index = saborComida.findIndex(prop => prop.sabor == sabor)
        saborComida.splice(index, 1)
        setSaborComida(saborComida)
        toast.success('Sabor retirado com sucesso!')
    }
    function formataTextoGoogleDrive (texto) {
        texto = texto.split('/')
        return texto[5]
    }
    
 

    return (
            <>
            {props.modalidade == "Restaurante" &&
                <div className={styles.container}>
                <form className={styles.form}>
                    <h1>Adicionando Item</h1>
                    <div className={styles.line}></div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className={styles.view_add}>
                                <div className={styles.visu}>
                                    {img1 || nome || desc || preço ?
                                        <Visualizar 
                                        tema={props.tema}
                                        nome={nome}
                                        imagem={driveimg1 ? `https://docs.google.com/uc?id=${img1}`: img1}
                                        imagem2={driveimg2 ? `https://docs.google.com/uc?id=${img2}`: img2}
                                        imagem3={driveimg3 ? `https://docs.google.com/uc?id=${img3}`: img3}
                                        imagem4={driveimg4 ? `https://docs.google.com/uc?id=${img4}`: img4}
                                        preço={preço}
                                        desc={desc}
                                        small_desc={small_desc}
                                        cor={cor}
                                        p={p}
                                        m={m}
                                        g={g}
                                        serve={qtdpessoas}
                                        espera={espera}
                                        listaSabores={dados}
                                        />
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
                                            <div className={styles.check_box}>
                                                <input type="checkbox"
                                                onClick={() => setDriveImg1(!driveimg1)} defaultChecked
                                                />
                                                <label>drive</label>
                                            </div>
                                            
                                            <input type="text" onChange={(el)=> {
                                            if (driveimg1) {
                                                setImg1(formataTextoGoogleDrive(el.target.value))
                                            } else {
                                                setImg1(el.target.value)
                                            }} 
                                            } 
                                            placeholder="imgdrive"
                                            />
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
                                                            <div className={styles.check_box}>
                                                                <input type="checkbox"
                                                                onClick={() => setDriveImg2(!driveimg2)} defaultChecked
                                                                />
                                                                <label>drive</label>
                                                            </div>
                                                            
                                                            <input type="text" onChange={(el)=> {
                                                                if (driveimg2) {
                                                                    setImg2(formataTextoGoogleDrive(el.target.value))
                                                                } else {
                                                                    setImg2(el.target.value)
                                                                }
                                                            }

                                                                }/> 
                                                            <strong>Imagem 3:</strong>
                                                            <div className={styles.check_box}>
                                                                <input type="checkbox"
                                                                onClick={() => setDriveImg3(!driveimg3)} defaultChecked
                                                                />
                                                                <label>drive</label>
                                                            </div>
                                                            
                                                            <input type="text" onChange={(el)=> {
                                                                if (driveimg3) {
                                                                    setImg3(formataTextoGoogleDrive(el.target.value))
                                                                } else {
                                                                    setImg3(el.target.value)
                                                                }
                                                                }}/>

                                                            <strong>Imagem 4:</strong>
                                                            <div className={styles.check_box}>
                                                                <input type="checkbox"
                                                                onClick={() => setDriveImg4(!driveimg4)} defaultChecked
                                                                />
                                                                <label>drive</label>
                                                            </div>
                                                            
                                                            <input type="text" onChange={(el)=> {
                                                                if (driveimg4) {
                                                                    setImg4(formataTextoGoogleDrive(el.target.value))
                                                                } else {
                                                                    setImg4(el.target.value)
                                                                }
                                                                }}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <strong>Nome:</strong>
                                            <input type="text" onChange={(el)=> setNome(el.target.value)}/>
                                            <strong>Descrição:</strong>
                                            <textarea type="text" onChange={(el)=> setDesc(el.target.value)}/>
                                            {categoria && categoria.includes('izza') &&
                                                <div>
                                                    <strong>Quantos sabores?</strong>
                                                    <input type="number" onChange={(el)=> setQtdSabores(el.target.value)}/>
                                                </div>
                                            }
                                            <strong>Preço:</strong>
                                            <input type="number" onChange={(el)=> setPreço(el.target.value)}/>
                                            <strong>Servem quantas pessoas:</strong>
                                            <input type="number" onChange={(el)=> setQtdPessoas(el.target.value)}/>
                                            <strong>Temp. Espera:</strong>
                                            <input type="time" onChange={(el)=> setEspera(el.target.value)}/>
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
                                            <div className={styles.cont_adicionais}>
                                                <input type="checkbox"/>
                                                <strong>Cebola</strong>
                                            </div>
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sabores" aria-expanded="false" aria-controls="collapseOne">
                                                        Sabores
                                                        </button>
                                                    </h2>
                                                    <div id="sabores" className="accordion-collapse collapse">
                                                        <div className="accordion-body" >

                                                            <ul className={`${styles.saborescomida} saborescomida`}>
                                                                {saborComida.length > 0 && saborComida.map(item => {
                                                                    return (
                                                                            <li key={item.sabor}>
                                                                                <strong>{item.sabor}</strong>
                                                                                <FaTrash
                                                                                type="button"
                                                                                onClick={()=> retirarSabor(item.sabor)}
                                                                                />
                                                                            </li>
                                                                        )
                                                                })}
                                                            </ul>
                                                            <div>
                                                                <strong>Sabor</strong>
                                                                <input placeholder="Sabor" onChange={(el)=> setSabor(el.target.value)}
                                                                value={sabor}
                                                                />
                                                                <strong>Ingredientes</strong>
                                                                <input placeholder="Ingedientes" onChange={(el)=> setIngredientes(el.target.value)}
                                                                value={Ingredientes}
                                                                />
                                                                <FaPlusCircle type="button"
                                                                onClick={()=> addSabor(sabor)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                                    {nome && categoria && preço && img1 && desc && estoque && qtdpessoas?
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
                                    {img1 || nome || desc || preço ?
                                        <Visualizar 
                                        tema={props.tema}
                                        nome={nome}
                                        imagem={driveimg1 ? `https://docs.google.com/uc?id=${img1}`: img1}
                                        imagem2={driveimg2 ? `https://docs.google.com/uc?id=${img2}`: img2}
                                        imagem3={driveimg3 ? `https://docs.google.com/uc?id=${img3}`: img3}
                                        imagem4={driveimg4 ? `https://docs.google.com/uc?id=${img4}`: img4}
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
                                            <div className={styles.check_box}>
                                                <input type="checkbox"
                                                onClick={() => setDriveImg1(!driveimg1)} defaultChecked
                                                />
                                                <label>drive</label>
                                            </div>
                                            {driveimg1 ?
                                            <input type="text" onChange={(el)=> {setImg1(formataTextoGoogleDrive(el.target.value))}}/>: 

                                            <input type="text" onChange={(el)=> {setImg1(el.target.value)}}/>}


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
                                                            <div className={styles.check_box}>
                                                                <input type="checkbox"
                                                                onClick={() => setDriveImg2(!driveimg2)} defaultChecked
                                                                />
                                                                <label>drive</label>
                                                            </div>
                                                            {driveimg2 ?
                                                            <input type="text" onChange={(el)=> {setImg2(formataTextoGoogleDrive(el.target.value))}}/>: 

                                                            <input type="text" onChange={(el)=> {setImg2(el.target.value)}}/>}

                                                            <strong>Imagem 3:</strong>
                                                            <div className={styles.check_box}>
                                                                <input type="checkbox"
                                                                onClick={() => setDriveImg3(!driveimg3)} defaultChecked
                                                                />
                                                                <label>drive</label>
                                                            </div>
                                                            {driveimg3 ?
                                                            <input type="text" onChange={(el)=> {setImg3(formataTextoGoogleDrive(el.target.value))}}/>: 

                                                            <input type="text" onChange={(el)=> {setImg3(el.target.value)}}/>}

                                                            <strong>Imagem 4:</strong>
                                                            <div className={styles.check_box}>
                                                                <input type="checkbox"
                                                                onClick={() => setDriveImg4(!driveimg4)} defaultChecked
                                                                />
                                                                <label>drive</label>
                                                            </div>
                                                            {driveimg4 ?
                                                            <input type="text" onChange={(el)=> {setImg4(formataTextoGoogleDrive(el.target.value))}}/>: 

                                                            <input type="text" onChange={(el)=> {setImg4(el.target.value)}}/>}
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

                                    <button
                                    onClick={(el)=> {
                                        el.preventDefault()
                                        addItem()
                                    }}
                                    className={styles.btn_confirm}
                                    >Confirmar</button>
                                    
                                </div>
                        </div>
                    </div>
                </form>
            </div>
            }
            <ToastContainer/>
            </>
        )
}