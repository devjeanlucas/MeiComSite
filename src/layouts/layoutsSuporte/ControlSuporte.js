import { Link } from "react-router-dom"
import styles from "./ControlSuporte.module.css"

export default function ControlSuporte () {
    return (
            <div>
                <div className={styles.cont_options}>
                    <ul className={styles.list}>
                        <Link to="/suporte/passos">
                            <li>Como começar?</li>
                        </Link>
                        <Link to="/suporte/pagamentos">
                            <li>Como recebo os pagamentos?</li>
                        </Link>
                        <Link to="/suporte/fotos">
                            <li>Como uso minhas fotos?</li>
                        </Link>
                        <Link to="/suporte/preços">
                            <li>Quanto custa?</li>
                        </Link>
                        <Link to="/suporte/criticasesugestoes">
                            <li>Críticas e sugestões</li>
                        </Link>
                        <Link to="/suporte/politicaeprivacidade">
                            <li>Política de privacidade</li>
                        </Link>
                    </ul>
                </div>  
            </div>
        )
}