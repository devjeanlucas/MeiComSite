import styles from "./InfoPerfil.module.css"
import User from "../../Hooks/User"
import { Link, useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"

export default function InfoPerfil () {


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
    const {id}= useParams()


    return (
        <>
            {user && user.id == id &&
            <div className={styles.container}>
                <div className={styles.cont_status}>
                    <p>Seu perfil está incompleto</p>
                    <Link to={`/perfil/${user.id}/dados`}>Completar cadastro</Link>
                </div>
                <ul className={`row ${styles.list}`}>
                    <li className="col-sm-6">
                        <p>Nome:</p>
                        <strong>{User.length > 0 && User[0].name}</strong>
                    </li>
                    <li className="col-sm-6">
                        <p>Endereço:</p>
                    </li>
                    <li className="col-sm-6">
                        <p>Modalidade:</p>
                    </li>
                </ul>
            </div>
            }
            
        </>
        )
}