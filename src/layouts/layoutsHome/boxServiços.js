import styles from "./BoxServiços.module.css"
import {FaRegCheckCircle} from "react-icons/fa"

export default function BoxServiços () {
return (
    <div className={styles.container}>
        <div className="row">
            <div className="col-md-5">
                <div className={styles.container_img}>
                    <img src="https://img.freepik.com/vetores-gratis/agencia-de-recrutamento-candidatos-e-entrevista-de-emprego_1262-18959.jpg?w=740&t=st=1678980514~exp=1678981114~hmac=db4b110b4babd4c54267cdd5ac3ca89d279b0ac822d1d2047f5eea6e8c010713"/>
                </div>
            </div>
            <div className="col-md-7">
                <div className={styles.container_text}>
                    <h3>Se joga no novo!</h3>
                    <h4 className="title_light">Torne o seu negócio Virtual</h4>
                    <ul className={styles.list}>
                        <li><FaRegCheckCircle className={styles.icon}/> Controlador de estoque</li>
                        <li><FaRegCheckCircle/> Calcular Frete</li>
                        <li><FaRegCheckCircle/> Integração do pix mercado pago</li>
                        <li><FaRegCheckCircle/> Integração com firebase</li>
                        <li><FaRegCheckCircle/> Login de usuários para compra</li>
                        <li><FaRegCheckCircle/> Fácil Manipulação de estoque</li>
                        <li><FaRegCheckCircle/> Favoritar produtos</li>
                        <li>Muito mais</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    )
}