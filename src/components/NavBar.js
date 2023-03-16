import styles from "./NavBar.module.css"

export default function NavBar () {
return (
    <div className={styles.container}>
        <div className={styles.content}>
            <h4>MeiComSite</h4>
            <div className={styles.menu}>
                <p>Soluções</p>
                <p>Planos e Preços</p>
                <p>Ajuda</p>
            </div>
            <div className={styles.login}>
                <button className="button_link">Entrar</button>
                <button className="button_orange">cadastre-se</button>
            </div>
        </div>
    </div>
    )
}