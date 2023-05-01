import { Link, useOutletContext, useParams } from "react-router-dom"
import styles from "./ItensSacola.module.css"

export default function ItensSacola () {
    
    const {site} = useParams()
    const {theme} = useOutletContext();

    function pegaDados() {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }

        return produtosSalvos
    }
    
    function pegaItems() {
        let listGeral = []
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            listGeral = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        
        if (listGeral.length == 0) {
            return 0
        } else {
            let listPrecos = []
            
            listGeral.map(item => {listPrecos.push(item.qtd)})
            var soma = listPrecos.reduce((soma, i) => {return soma + i})
            return soma
        }
        
    }
    
    function pegaPreco() {
        let listGeral = []
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            listGeral = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        if (listGeral.length === 0) {
            return 0
        } else {
            let listPrecos = []
            let list = []
            listGeral.map(item => {return listPrecos.push({qtd: item.qtd, preço: item.preço})})
            listPrecos.map(item => {return list.push(item.qtd * item.preço)})
            var soma = list.reduce((soma, i) => {return soma + i})

            return soma
        }
    }
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    const dados = pegaDados()
    var total = pegaPreco()
    var qtd = pegaItems()
    

    function createWhatsAppLink(phoneNumber, message) {
        return `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}`;
      }

    const message = `Olá! Me chamo Jean Lucas estou comprando no ${site}, segue minhas compras:
    ${dados && dados.map(dados => {
        if (dados.site == site) {
            return `${dados.nome} x${dados.qtd} ${FormataValor(dados.preço)}`
        }
    
        })}
    `; 
    /*<a 
    href={createWhatsAppLink('71981298548', message)}
    target="_blank"
    >Finalizar</a>*/
    return (
            <div className={styles[theme && theme]}>
                <h4>Compras</h4>
                <h5>Itens: {qtd}</h5>
                <h3>Total: {FormataValor(total)}</h3>
                <Link to={`/${site}/compras/detalhes`}
                className={styles.btn_finalizar}
                >Continuar </Link>
            </div>
        )
}