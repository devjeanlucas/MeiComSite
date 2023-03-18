import styles from "./PrincipaisDuvidas.module.css"

export default function PrincipaisDuvidas () {
return (
    <>
        <div className={styles.container}>
            <h1>Principais Dúvidas</h1>
            <ul className={styles.list}>
                <div className="line"></div>
                <li>
                    <div className={`${styles.row} row`}>
                        <div className="col-sm-5">
                            <h2>Como Crio meu site?</h2>
                        </div>
                        <div className="col-sm-4">
                            <p className={styles.resposta}>Temos um passo a passo intuitivo que irá desde o cadastro a colocar seu site no ar. Você pode encontrá-lo <a href="#">clicando aqui</a>.</p>
                        </div>
                    </div>
                </li>
                <div className="line"></div>
                <li>
                    <div className={`${styles.row} row`}>
                        <div className="col-sm-5">
                            <h2>Quanto custa ter um site com a MeiComSite?</h2>
                        </div>
                        <div className="col-sm-4">
                            <p className={styles.resposta}>Consulte nossos preços e condições <a href="#">aqui</a>.</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </>
    )
}