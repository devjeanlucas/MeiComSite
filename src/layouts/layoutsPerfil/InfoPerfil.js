import styles from "./InfoPerfil.module.css"
import User from "../../Hooks/User"


export default function InfoPerfil () {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.cont_status}>
                    <p>Seu perfil está incompleto</p>
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
        </>
        )
}