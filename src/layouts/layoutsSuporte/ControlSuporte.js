import styles from "./ControlSuporte.module.css"

export default function ControlSuporte () {
    return (
            <div>
                <div className={styles.container}>
                    <div className={styles.cont_input}>
                        <h4>O que precisa saber?</h4>
                        <input type="text" className={styles.input}/>
                    </div>
                    <div className={styles.cont_options}>
                        <ul className={styles.list}>
                            <li>Como começar?</li>
                            <li>Como recebo os pagamentos?</li>
                            <li>Como uso minhas fotos?</li>
                            <li>Quanto custa?</li>
                            <li>Críticas e sugestões</li>
                            <li>Política de privacidade</li>
                        </ul>
                    </div>  

                </div>
            </div>
        )
}