import styles from "./BoxModalidades.module.css"
import {FaUtensils, FaStoreAlt,FaCalendarAlt} from "react-icons/fa"




export default function BoxModalidade () {
    return (
        <div className={styles.container}>
            <div className="row">
                <h1>Nossas modalidades</h1>
                <div className="col-sm-4">
                    <div className={styles.box}>
                        <div className={styles.container_icon}>
                            <FaUtensils className={styles.icon}/>
                        </div>
                        <div className={styles.container_title}>
                            <h4>Restaurantes</h4>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className={styles.box}>
                        <div className={styles.container_icon}>
                            <FaStoreAlt className={styles.icon}/>
                        </div>
                        <div className={styles.container_title}>
                            <h4>Loja Virtual</h4>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className={styles.box}>
                        <div className={styles.container_icon}>
                            <FaCalendarAlt className={styles.icon}/>
                        </div>
                        <div className={styles.container_title}>
                            <h4>Agendamentos</h4>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        )

}