import styles from "./Header.module.css"
import {auth} from "../../Service/firebase"
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom";

export default function Header () {

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
    const {id} = useParams()

    return (
        <div>
            <div>
                {user && user.id == id && 
                <div className={styles.container_header}>
                    <div className={`row ${styles.content}`}>
                        <div className="col-sm-2">
                            <img src={user && user.avatar} className={styles.img}/>
                        </div>
                        <div className="col-sm-6">
                            <p className={styles.name}>{user.name}</p>
                            <h4>{user && user.email}</h4>
                        </div>
                    </div>
                    <div className="line"></div>
                </div>
                }
            </div>
        </div>
        )
}