import styles from './BoxConfirm.module.css'
import App from "../Hooks/App"
import {  getFirestore,  setDoc, doc} from "@firebase/firestore";
import { useState,useEffect } from "react"
import {auth} from "../Service/firebase"

export default function BoxConfirm (props) {

    const obj = props.obj
    const db = getFirestore(App)
    const [user, setUser] = useState();
    
    useEffect(()=>{
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
    }, [])
    
    const getUsers = async () => {
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
            CEP: obj.CEP
            });
        window.location.reload()
    };

    



    return (
        <>
        {obj.ação == "Iniciar Cadastro" &&
        <div className={styles.container}>
            <h4>Confirmar alterações?</h4>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                onClick={getUsers}
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