import styles from './BoxConfirm.module.css'
import App from "../Hooks/App"
import '@firebase/firestore';
import { doc, updateDoc,  deleteDoc, getFirestore, collection, getDocs,setDoc} from "@firebase/firestore";
import { useState,useEffect } from "react"
import {auth} from "../Service/firebase"

export default function BoxConfirm (props) {

    const obj = props.obj
    const db = getFirestore(App)
    const [user, setUser] = useState();
    const [produtos, setProdutos] = useState([])
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
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])

    
    const AdicionarUSer = async () => {
        await setDoc(doc(db, `MeiComSite`, `${user.email}`), {
            email: user && user.email,
            iduser:user && user.id,
            nome:obj.nome,
            telefone: obj.phone,
            razao:obj.razao,
            token:obj.token,
            rua:obj.rua,
            bairro:obj.bairro,
            ref:!obj.ref ? "" : obj.ref,
            cidade:obj.cidade,
            numero:obj.num,
            plan:obj.plan,
            CEP: obj.CEP
            });

            await setDoc(doc(db, `MeiComSite/${user.email}/negocio`, `dados`), {
                mod:obj.mod,
                theme:obj.theme
            });
        window.history.back()
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
            telefone: !obj.phone ? prod[0].telefone : obj.phone
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            token: !obj.token ? prod[0].token : obj.token
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            rua: !obj.rua ? prod[0].rua : obj.rua
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            cidade: !obj.cidade ? prod[0].cidade : obj.cidade
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            bairro: !obj.bairro ? prod[0].bairro : obj.bairro
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            numero: !obj.num ? prod[0].numero : obj.num
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            ref: !obj.ref ? prod[0].ref : obj.ref
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            CEP: !obj.CEP ? prod[0].CEP : obj.CEP
        });

    }

    



    return (
        <>
        {obj.ação == "Iniciar Cadastro" &&
        <div className={styles.container}>
            <h4>Confirmar alterações?</h4>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                onClick={AdicionarUSer}
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
        
        
        </>
        )
}