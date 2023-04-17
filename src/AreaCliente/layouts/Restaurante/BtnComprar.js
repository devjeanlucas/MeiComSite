import styles from "./BtnComprar.module.css"

export default function BtnComprar (props) {
    
    return (
            <>
                {props.theme && props.theme == "Light" &&
                    <button className={styles[props.theme]}>Comprar </button>
                }
            </>
        )
}