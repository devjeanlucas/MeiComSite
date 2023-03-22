import styles from "./NavBar.module.css"
import { FaRegUser } from "react-icons/fa"
import User from "../Hooks/User"
import {firebase, auth} from "../Service/firebase"
import { useState } from "react"


export default function ButtonLogin () {

    const [userLogin, setUserLogin] = useState();

    const HandleClickLoginGoogle = async() => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await auth.signInWithPopup(provider);
        if (!result.user) {
            const {uid, displayName, photoURL} = result.user
            if (!displayName && !photoURL) {
                throw new Error('Usuário sem Nome ou foto')
            }
            setUserLogin({
                id: uid,
                avatar: photoURL,
                name: displayName
            })
        }
    }


    const handleClickLogOut = () => {
        firebase.auth().signOut()
        .then(() => {window.location.href = "/"})
        .catch(() => {alert('não foi possivel sair da conta')})
    }


    return (
        <>
            {!User ? 
            <div>
                <button className={`button_link ${styles.btn_login}`} onClick={HandleClickLoginGoogle}><FaRegUser className={styles.icon}/>Entrar</button>
            </div>:
            <div>
                <button className={`button_link ${styles.btn_login}`} onClick={HandleClickLoginGoogle}><FaRegUser className={styles.icon}/>Sair</button>
            </div>
            }
           
        </>
        )
}