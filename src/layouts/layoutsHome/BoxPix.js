import styles from "./BoxPix.module.css"
import {FaRegCheckCircle} from "react-icons/fa"


export default function BoxPix () {
return (
    <div className={styles.container}>
        <div className="row">
            <div className="col-sm-3 col-md-4 order-3 order-sm-1">
                <div className={styles.container_text}>
                    <div className={styles.content_title}>
                        <h1 className={styles.title}>Pagamento com QR Code</h1>
                        <button className="button_orange">Saiba como</button>
                    </div>
                </div>  
            </div>
            <div className="col-sm-5 col-md-4 order-2 order-sm-2">
                <img src="https://img.freepik.com/vetores-gratis/ilustracao-de-pessoa-digitalizando-um-codigo-qr-com-um-smartphone_23-2148621302.jpg?w=740&t=st=1679004373~exp=1679004973~hmac=f65a619124e37143a7bb5805dfeca12e0236bd60201e863930611dee1d3fd2eb" className={styles.img}/>
            </div>
            <div className="col-sm-4 order-1 order-sm-2">
                <ul className={styles.list}>
                    <li><FaRegCheckCircle className={styles.icon}/> Vendas mais rápidas</li>
                    <li><FaRegCheckCircle className={styles.icon}/> Maior controle em estoque</li>
                    <li><FaRegCheckCircle className={styles.icon}/> Maior conforto ao seu cliente</li>
                </ul>
            </div>
        </div>
    </div>
    ) 

}