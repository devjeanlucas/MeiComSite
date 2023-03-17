import styles from "./BoxCriarSiteGuia.module.css"
import {FaAngleDoubleRight} from "react-icons/fa"

export default function BoxCriarSiteGuia () {
return (
    <div className={styles.container}>
        <div className="row">
            <div className="col-md-5 order-2 order-md-1 col-lg-6">
                <div className={styles.container_text}>
                    <h1>Como criar seu site</h1>
                    <h4>Em poucos passos impulsione seu negócio</h4>
                    <br/>
                    <ol className={styles.list}>
                        <li><strong>Escolha sua modalidade de negócio.</strong></li>
                        <li><strong>Informe o serviço que irá oferecer.</strong></li>
                        <li><strong>Configure seu Pix do Mercago Pago</strong></li>
                        <li><strong>Selecione o layout que deseja na sua página.</strong></li>
                        <li><strong>Adicione fotos do seu One drive.</strong> Acompanhe como</li>
                        <li><strong>Adicione seus produtos.</strong></li>
                    </ol>
                    <div className={styles.cont_links}>
                        <a href="#" className={styles.link}>Criar agora <FaAngleDoubleRight/></a>
                    </div>
                </div>
            </div>
            <div className="col-md-7 order-1 col-lg-6">
                <div>
                    <img src="https://img.freepik.com/fotos-gratis/ilustracao-3d-smartphone-com-tela-branca-em-branco-e-caixas-de-papelao-conceito-de-servico-de-comercio-eletronico-e-frete_58466-14530.jpg?w=740&t=st=1679048604~exp=1679049204~hmac=e298b81ac413a86e313e65064171cec12bba83689664e1fff660d696048eecf1"
                    className={styles.img}
                    />
                </div>
            </div>
        </div>

    </div>
    )
}