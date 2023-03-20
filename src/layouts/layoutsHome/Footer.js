import styles from "./Footer.module.css"
import {FaInstagram,FaWhatsapp} from "react-icons/fa"

export default function Footer () {
    return (
        <div className={styles.container}>
            <div className="row">
                <div className="col-sm-3">
                    <div className={styles.perfil}>
                        <h3>MeiComSite</h3>
                        <p className={styles.description}>
                            MeiComSite é uma iniciativa privada que tem como objetivo promover o seu negócio dando a ele uma presença online.
                            Acreditamos no novo e investindo em tecnologia, você pode ir muito além.
                        </p>
                        <div className={styles.redes}>
                            <a href="#" className={styles.icon}>
                                <FaInstagram/>
                            </a>
                            <a href="#" className={styles.icon}>
                                <FaWhatsapp/>
                            </a>
                        </div>

                    </div>
                </div>
                <div className="col-sm-8 offset-sm-1">
                    <div className={styles.container_lists}>
                        <ul className={styles.list}>
                            <h4>Modalidades</h4>
                            <li><a href="#">Loja Virtual</a></li>
                            <li><a href="#">Restaurante</a></li>
                            <li><a href="#">Agendamento</a></li>
                        </ul>
                        <ul className={styles.list}>
                            <h4>Empresa</h4>
                            <li><a href="#">Sobre nós</a></li>
                            <li><a href="#">Dados e armazenamento</a></li>
                            <li><a href="#">Termos de uso</a></li>
                            <li><a href="#">Politica de privacidade</a></li>
                            <li><a href="#">Nos ajude</a></li>
                        </ul>
                        <ul className={styles.list}>
                            <h4>Ajuda</h4>
                            <li><a href="#">Central de ajuda</a></li>
                            <li><a href="#">Entre em contato</a></li>
                        </ul>
                    </div>
                </div>  
                <div className={`${styles.mobile} accordion accordion-flush`} id="accordionExample">
                    <div className={`${styles.item} accordion-item`}>
                        <h2 className={`${styles.button} accordion-header`} id="headingOne">
                        <button className={` accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Accordion Item #1
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
        )
}