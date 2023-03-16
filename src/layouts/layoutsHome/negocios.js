import styles from "./negocios.module.css"


export default function Negocios() {
    return (
        <div className={styles.container}>
            <div>
                
                <div className={`${styles.container_img} `}>
                    <img src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-dispositivos-da-web_114360-2651.jpg?w=740&t=st=1679006978~exp=1679007578~hmac=3aa52c24968ca879db4c85495845790dc4097f657ab19b8349aca11f65114d13" className={styles.img}/>
                </div>
                <div>
                    <h1 className={styles.big_text}>Gerencie seu negócio na palma da sua mão</h1>
                </div>
                <div className={styles.cont_buttons}>
                    <button className={`button`}>Começar Grátis</button>
                    <button className={`button_orange `}>Conheça os Planos</button>
                </div>
            </div>
        </div>
        )
}