import styles from "./Pagamentos.module.css"

export default function Pagamentos () {
    return (
            <>
                <div className={styles.container}>
                    <h3>Pagamentos pelo whatsapp:</h3>
                    <p>A venda é finalizada de forma independente, formulando as informações da compra do seu cliente, junto com as dados do mesmo em uma mensagem de pronto envio para o seu whatsapp.</p>
                    <h3>Pagamentos por pix:</h3>
                    <p>Disponível apartir do plano plus, cadastrando seu token do mercado pago. O valor das compras irá direto para a mesma, seu intermédio da MeiComSite.</p>
                </div>
            </>
        )
}