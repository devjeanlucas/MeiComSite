import styles from "./PrincipaisDuvidas.module.css"
import {FaRegUserCircle} from "react-icons/fa"


export default function PrincipaisDuvidas () {
return (
    <>
        <div className={styles.container}>
            <h1>Principais Dúvidas</h1>
            <ul className={`row ${styles.list}`}>
                <li className={`col-sm-6 ${styles.display_table}`}>
                    <div className={styles.box}>
                        <div className={styles.perfil}>
                            <FaRegUserCircle className={styles.icon}/>
                            <p className={styles.name}></p>
                        </div>
                        <h2>Como Crio meu site?</h2>
                        <div className="line"></div>
                        <p className={styles.resposta}>Temos um passo a passo intuitivo que irá desde o cadastro a colocar seu site no ar. Você pode encontrá-lo <a href="#">clicando aqui</a>.</p>
                    </div>
                </li>
                <li className={`col-sm-6 ${styles.margin_top_2em}`}>
                    <div className={styles.box}>
                        <div className={styles.perfil}>
                            <FaRegUserCircle className={styles.icon}/>
                            <p className={styles.name}></p>
                        </div>
                        <h2>Quanto custa ter um site com a MeiComSite?</h2>
                        <div className="line"></div>
                        <p className={styles.resposta}>Comece de graça! Cobranças podem acontecer mediante seu uso de dados e armazenamento. <a href="#">Como Funciona?</a></p>
                    </div>
                </li>
                <li className={`col-sm-6 ${styles.margin_top_3}`}>
                    <div className={styles.box}>
                        <div className={styles.perfil}>
                            <FaRegUserCircle className={styles.icon}/>
                            <p className={styles.name}></p>
                        </div>
                        <h2>Preciso saber programar?</h2>
                        <div className="line"></div>
                        <p className={styles.resposta}>Não! Você pode administrar sua empresa pela própria plataforma.</p>
                    </div>
                </li>
                <li className={`col-sm-6`}>
                    <div className={styles.box}>
                        <div className={styles.perfil}>
                            <FaRegUserCircle className={styles.icon}/>
                            <p className={styles.name}></p>
                        </div>
                        <h2>Funciona em computador também?</h2>
                        <div className="line"></div>
                        <p className={styles.resposta}>Sim! Garantimos a responsividade para todas as telas.</p>
                    </div>
                </li>
                <li className={`col-sm-6`}>
                    <div className={styles.box}>
                        <div className={styles.perfil}>
                            <FaRegUserCircle className={styles.icon}/>
                            <p className={styles.name}></p>
                        </div>
                        <h2>Estou com problemas.</h2>
                        <div className="line"></div>
                        <p className={styles.resposta}>Encontre ajuda <a href="#">aqui</a>. Se mesmo assim seu problema não for solucionado, entre em contato conosco através do <a href="#">whatsapp</a> ou <a href="#">e-mail</a>.</p>
                    </div>
                </li>
                <li className={`col-sm-6`}>
                    <div className={styles.box}>
                        <div className={styles.perfil}>
                            <FaRegUserCircle className={styles.icon}/>
                            <p className={styles.name}></p>
                        </div>
                        <h2>Porque a MeiComSite?</h2>
                        <div className="line"></div>
                        <p className={styles.resposta}>Oferecemos um serviço completo, humano e transparente com nossos clientes. Nosso objetivo é que seu negócio seja visto com mais facilidade aumentando assim, seus lucros. Nosso sistema de administração irá te ajudar a controlar gastos, estoque, ver os preferidos entre outros.</p>
                    </div>
                </li>
            </ul>
        </div>
    </>
    )
}