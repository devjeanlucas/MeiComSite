import { useState } from "react";
import { Form, Link, useOutletContext, useParams } from "react-router-dom";
import styles from "./FormularioDetalhesComprador.module.css"

export default function FormularioDetalhesComprador () {
    const {site} = useParams()
    const {theme, name} = useOutletContext()
    const [nome, setNome] = useState()
    const [rua, setRua] = useState()
    const [cidade, setCidade] = useState()
    const [bairro, setBairro] = useState()
    const [numero, setNumero] = useState()
    const [pagamento, setPagamento] = useState()
    const [telefone, setTelefone] = useState()


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
    function pegaDados() {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }

        return produtosSalvos
    }


    var total = pegaPreco()
    var qtd = pegaItems()
    const dados = pegaDados()

    function createWhatsAppLink(phoneNumber, message) {
        return `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}`;
      }

    const message = `Olá! Me chamo ${nome} estou comprando no ${site},
    endereço- Cidade:${cidade} Bairro: ${bairro} Rua:${rua}, Nº ${numero} 
    ,segue minhas compras:
    ${dados && dados.map(dados => {return (`${dados.nome} x${dados.qtd} ${FormataValor(dados.preço)}.
    Forma de pagamento: ${pagamento}

    `)})}
    `; 

    const href = createWhatsAppLink('71981298548', message)


    
    return (
            <>
                <h4>Já estamos finalizando...</h4>
                <form className={styles[theme && theme]}>
                    <h5>Nome *</h5>
                    <input type="text" onChange={(el)=> setNome(el.target.value)}/>
                    <h5>Telefone *</h5>
                    <input type="text" onChange={(el)=> setTelefone(el.target.value)}/>
                    <h5>Cidade *</h5>
                    <input type="text" onChange={(el)=> setCidade(el.target.value)}/>
                    <h5>Bairro *</h5>
                    <select onChange={(el) => setBairro(el.target.value)}>
                        <option value="barbalho">Barbalho</option>
                    </select>
                    <h5>Rua *</h5>
                    <input type="text" onChange={(el)=> setRua(el.target.value)}/>
                    <h5>Numero *</h5>
                    <input type="number" onChange={(el)=> setNumero(el.target.value)}/>
                    <h5>Pagamento *</h5>
                    <select onChange={(el) => setPagamento(el.target.value)}>
                        <option value="Cartão de crédito">Cartão de crédito</option>
                    </select>
                    <div className={styles.cont_total}>
                        <h4>Total: {FormataValor(total)}</h4>
                    </div>
                    <div className={styles.line}/>
                    {telefone && nome && cidade && rua && bairro && numero && pagamento ?
                        <a href={href} target="_blank"  className={styles.btn_finalizar}>Finalizar pelo Wpp</a>
                        :
                        <button className={styles.btn_disabled} type="button" disabled>Complete as informações</button>
                    }
                </form>
            </>
        )
}