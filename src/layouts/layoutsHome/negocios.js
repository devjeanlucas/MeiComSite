import { Link } from "react-router-dom"
import styles from "./negocios.module.css"
import User from "../../Hooks/User"
import {firebase, auth} from "../../Service/firebase"
import { useState } from "react"

export default function Negocios() {

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




    return (
        <div className={styles.container}>
            <div>
                
                <div className={`${styles.container_img} `}>
                    <img src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-dispositivos-da-web_114360-2651.jpg?w=740&t=st=1679006978~exp=1679007578~hmac=3aa52c24968ca879db4c85495845790dc4097f657ab19b8349aca11f65114d13" className={styles.img}/>
                </div>
                <div>
                    <h1 className={styles.big_text}>Gerencie seu negócio na palma da sua mão</h1>
                </div>
                <div className={styles.cont_buttons}>
                    {User.length > 0 ? 
                        <Link to="/home">
                            <button className={styles.btn_start} >Começar Grátis</button>
                        </Link>
                    :
                        
                        <button className={styles.btn_start}
                        onClick={HandleClickLoginGoogle}
                        >Começar Grátis</button>
                    }

                    <Link to="/planos">
                        <button className={styles.btn_plan}>Conheça os Planos</button>
                    </Link>
                </div>
            </div>
        </div>
        )
}