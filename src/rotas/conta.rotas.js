import { Router } from "express";
import Conta from '../entidades/conta.js'
import Transacao from '../entidades/transacao.js'

const router = Router()

let contas = []
contas.push(new Conta("Davi", "1234", "12345-6", "corrente"))
contas.push(new Conta("Murilo", "1234", "5432-1", "corrente"))
contas.push(new Conta("Eberton", "1234", "1313-0", "corrente"));

function buscaContaPorNumero(numero_conta) {
  return contas.find(
    (conta) => conta.numero_conta === numero_conta
  )
}

function insereTransacao(numero_conta, tipo_transacao, valor, descricao) {
  for (const conta of contas) {
    if (conta.numero_conta === numero_conta) {
      const transacao = new Transacao(tipo_transacao, valor, descricao)
      conta.transacoes.push(transacao)
      return transacao.transacao_id
    }
  }
}


// Rota Boas Vindas 
router.get('/:numero_conta', (request, response) => {
  const { numero_conta } = request.params;

  const contaEncontrada = buscaContaPorNumero(numero_conta);

  if (contaEncontrada) {
    // retornar os dados da conta
    response.send({
      nome_pessoa: contaEncontrada.nome_pessoa,
      numero_conta: contaEncontrada.numero_conta,
      saldo: contaEncontrada.saldo,
      trasnsacoes: contaEncontrada.transacoes,
    })

  } else {
    response.status(404).send({
      "error": "Conta não encontrada"
    })
  }
});

// Rota Saldo
router.get('/:numero_conta/saldo', (request, response) => {
  const { numero_conta } = request.params;

  const contaEncontrada = buscaContaPorNumero(numero_conta);

  if (contaEncontrada) {
    // retornar os dados da conta
    response.send({
      "saldo": contaEncontrada.saldo
    })
  } else {
    response.status(404).send({
      "error": "Conta não encontrada"
    })
  }
});

// Rota depósito
router.post('/:numero_conta/deposito', (request, response) => {
  const { numero_conta } = request.params;

  const { valor, tipo_deposito } = request.body;



  // validar se a conta existe

  const contaEncontrada = buscaContaPorNumero(numero_conta);

  if (!contaEncontrada) {
    response.send({
      "error": "Conta não encontrada"
    })
  }

  // validar se o valor é positivo
  if (!valor || valor <= 0) {
    response.send({
      "error": "Valor inválido"
    })
  }

  // validar qual o tipo de depósito (DINHEIRO ou CHEQUE)  
  const tipos_validos = ['DINEHIRO', 'CHEQUE']
  if (!tipos_deposito || tipos_validos.includes(tipo_deposito.toUpperCase())) {
    response.send({
      "error": "Tipo Deposito inválido"
    })


  } else if (tipo_deposito.toUpperCase() === 'DINHEIRO') {
    if (!Number.isInteger(valor))
      response.status(400).send({ "error": "Deposito em dinheiro apenas em valores inteiros" })
    insereTransacao(numero_conta, ("ENTRADA", valor, `Deposito em ${tipo_deposito}`))
    response.send({
      message: ""
    })
  }

  else if (tipo.toUpperCase() === 'CHEQUE') {
    insereTransacao(numero_conta, "ENTRADA", `valordeposito em ${tipo_deposito}`)
  }
});

export default { router }