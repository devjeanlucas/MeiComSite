import styles from "./BoxCriar.module.css"
import {FaArrowRight} from "react-icons/fa"


export default function BoxCriar () {
    return (
        <>
            <div className={styles.container}>
                <div className="row">
                    <div className="col-sm-6">
                        <h1>Dê o primeiro passo</h1>

                    </div>
                    <div className="col-sm-6">
                        <a href="#">Começar <FaArrowRight/></a>
                    </div>
                </div>
                
            </div>
        </>
        )
    }