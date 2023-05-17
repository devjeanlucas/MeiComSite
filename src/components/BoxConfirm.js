import styles from './BoxConfirm.module.css'
import App from "../Hooks/App"
import '@firebase/firestore';
import { doc, updateDoc,  deleteDoc, getFirestore, collection, getDocs,setDoc} from "@firebase/firestore";
import { useState,useEffect } from "react"
import {auth} from "../Service/firebase"
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';

export default function BoxConfirm (props) {

    const obj = props.obj && props.obj
    const db = getFirestore(App)
    const [user, setUser] = useState();
    const [produtos, setProdutos] = useState([])
    const UserCollection = collection(db, "MeiComSite")
    const {site} = useParams()
    
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
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])

    
    const AdicionarUSer = async () => {
        await setDoc(doc(db, `MeiComSite`, `${user.email}`), {
            data: moment().format('DD/MM/YYYY'),
            email: user && user.email,
            mod:obj.mod,
            theme:obj.theme,
            idtheme:obj.idtheme,
            iduser:user && user.id,
            status:"Em análise",
            nome:obj.nome,
            telefone: obj.phone,
            razao:obj.razao,
            cidade:obj.cidade,
            plan:obj.plan,
            abre: obj.abre,
            fecha: obj.fecha,
            site: obj.site,
            nascimento: obj.nascimento,
            listCidades: props.listCidades,
            listBairros: props.listBairros,
            logo:obj.logo,
            admin: true,
            token:obj.token ? obj.token : ""
            });

        window.location.reload()
    };



    const EditaUser = async () => {
        const prod = []

        produtos && produtos.map(item=> {
            if (user && user.id == item.iduser) {
                prod.push(item)
            }
        })    

        await updateDoc(doc(db, "MeiComSite", user.email), {
            nome: !obj.nome ? prod[0].nome : obj.nome
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            razao: !obj.razao ? prod[0].razao : obj.razao
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            logo: !obj.logo ? prod[0].logo : obj.logo
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            telefone: !obj.phone ? prod[0].telefone : obj.phone
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            token: !obj.token ? prod[0].token : obj.token
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            cidade: !obj.cidade ? prod[0].cidade : obj.cidade
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            CEP: !obj.CEP ? prod[0].CEP : obj.CEP
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            site: !obj.site ? prod[0].site : obj.site
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            plan: !obj.plan ? prod[0].plan : obj.plan
        });
        window.location.reload()
    }

    const EditaNegocio = async () => {
        const prod = []

        produtos && produtos.map(item=> {
            if (user && user.id == item.iduser) {
                prod.push(item)
            }
        }) 
        await updateDoc(doc(db, `MeiComSite`, user.email), {
            mod: !obj.mod ? prod[0].mod : obj.mod
        });
        await updateDoc(doc(db, `MeiComSite`, user.email), {
            theme: !obj.theme ? prod[0].theme : obj.theme
        });
        window.location.reload()
    }   

    const DeletarProduto = async () => {

        const Doc = doc(db, `MeiComSite/${props.email}/produtos`, `${props.id}`);
        await deleteDoc(Doc)
        window.location.reload()
    }
    const deletacompra = (nome) => {
        let produtosSalvos = new Array()

        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }

        let index = produtosSalvos.findIndex(prop => prop.nome == nome)
        
        produtosSalvos.splice(index, 1) 
        
        localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify(produtosSalvos))
        window.location.reload()
    }

    const deletarBairro = async () => {
        const index = obj.listBairros.findIndex(prop => prop.bairro == obj.novoBairro)
        obj.listBairros.splice(index, 1)
        await updateDoc(doc(db, `MeiComSite`, user.email), {
            bairros: obj.listBairros
        });
        window.location.reload()
    }
    const deletarCidade = async () => {
        const index = obj.listCidades.findIndex(prop => prop.cidade == obj.novaCidade)
        obj.listCidades.splice(index, 1)
        await updateDoc(doc(db, `MeiComSite`, user.email), {
            cidades: obj.listCidades
        });
        window.location.reload()
    }



    return (
        <>
        {obj.ação == "Iniciar Cadastro" &&
        <div className={styles.container}>
            <h4>Confirma seus dados?</h4>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                onClick={AdicionarUSer}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Confirmo</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
         {obj.ação == "Editar" &&
        <div className={styles.container}>
            <h4>Confirmar alterações?</h4>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                onClick={EditaUser}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }

        {obj.ação == "Editar negocio" &&
        <div className={styles.container}>
            <h4>Confirmar alterações? Neg</h4>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={EditaNegocio}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
        
        {obj.ação == "Deletar categoria" &&
        <div className={styles.container}>
            <h4>Deletar Produto?</h4>
            <p>- {props.dados.categoria}</p>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={DeletarProduto}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }

        {obj.ação == "Deletar Compra" &&
        <div className={styles.container}>
            <h4>Deletar produto?</h4>
            <div className='line'></div>
            <div className={styles.cont_btn}>
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={()=> deletacompra(props.obj.id)}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
        {obj.ação == "Deletar Bairro" &&
        <div className={styles.container}>
            <h4>Deletar Bairro?</h4>
            <strong>{obj.novoBairro}</strong>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={()=> deletarBairro()}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
        {obj.ação == "Deletar Cidade" &&
        <div className={styles.container}>
            <h4>Deletar Cidade?</h4>
            <strong>{obj.novaCidade}</strong>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={()=> deletarCidade()}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
        
        
        </>
        )
}