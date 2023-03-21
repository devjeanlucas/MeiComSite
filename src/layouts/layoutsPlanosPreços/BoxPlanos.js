import styles from "./BoxPlanos.module.css"
import {FaCheck} from "react-icons/fa"

export default function BoxPlanos () {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className="row">
                    <div className="col-sm-4">
                        <div className={styles.box}>
                            <h4>Free</h4>
                            <div className="line"></div>
                            <div className={styles.conteudo}>
                                <ul className={styles.list}>
                                    <li><FaCheck className={styles.check}/>Login Com Google</li>
                                </ul>
                            </div>
                            <div className={styles.price}>
                                <h4>Grátis</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className={styles.box}>
                            <h4>Plus</h4>
                            <div className="line"></div>
                            <div className={styles.conteudo}>
                                <ul className={styles.list}>
                                    <li><FaCheck className={styles.check}/>Domínio personalizado</li>
                                </ul>
                            </div>
                            <div className={styles.price}>
                                <h4>R$ 30,00</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className={styles.box}>
                            <h4>Premium</h4>
                            <div className="line"></div>
                            <div className={styles.conteudo}>
                                <ul className={styles.list}>
                                    <li><FaCheck className={styles.check}/>20gb de dados</li>
                                </ul>
                            </div>
                            <div className={styles.price}>
                                <h4>R$ 90,00</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}