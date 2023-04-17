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
                    <img src="https://img.freepik.com/free-vector/marketing-concept-illustration_114360-3903.jpg?w=740&t=st=1681761026~exp=1681761626~hmac=ae9f4d04dfb59c0e4755e367f792b1b7bdb0c662de24f556aeb1e550f4587406" className={styles.img}/>
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